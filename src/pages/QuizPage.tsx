import React, { useEffect, useState } from "react";
import questions from "../data/begla136-june2022.json";
import AnswerEditor from "../components/AnswerEditor";
import jsPDF from "jspdf";

const QuizPage: React.FC = () => {
  const [showSummary, setShowSummary] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>(() => {
    const saved = localStorage.getItem("begla136-answers");
    return saved ? JSON.parse(saved) : Array(questions.length).fill("");
  });

  useEffect(() => {
    localStorage.setItem("begla136-answers", JSON.stringify(answers));
  }, [answers]);

  const [saveMessage, setSaveMessage] = useState("");

  const handleAnswerChange = (text: string) => {
    const updated = [...answers];
    updated[current] = text;
    setAnswers(updated);
    setSaveMessage("Saved ✔");
    setTimeout(() => setSaveMessage(""), 1000);
  };

  const wordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleNavigation = (dir: "next" | "prev") => {
    setCurrent(prev =>
      dir === "next"
        ? Math.min(prev + 1, questions.length - 1)
        : Math.max(prev - 1, 0)
    );
  };

  const getAnswerStatus = (ans: string) =>
    ans.trim().length > 0 ? "✅" : "⚠️";

  const handleExport = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("BEGLA-136 Answer Sheet", 10, 10);

    let y = 20;
    questions.forEach((q, index) => {
      const questionText = `Q${q.id}. ${q.question}`;
      const answerText = `Answer: ${answers[index] || "[Not Answered]"}`;
      const splitQ = doc.splitTextToSize(questionText, 180);
      const splitA = doc.splitTextToSize(answerText, 180);

      if (y + splitQ.length * 7 + splitA.length * 7 > 280) {
        doc.addPage();
        y = 10;
      }

      doc.text(splitQ, 10, y);
      y += splitQ.length * 7;
      doc.text(splitA, 10, y);
      y += splitA.length * 7 + 5;
    });

    doc.save("begla136-answers.pdf");
  };

  return (
    <div className={`max-w-7xl mx-auto p-4`}>
      <h1 className="text-2xl font-bold mb-4 text-center print:text-xl">
        BEGLA-136 Answer Sheet
      </h1>

      <div className="mb-4 flex flex-wrap gap-2 justify-center">
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded"
          onClick={() => setShowSummary(prev => !prev)}
        >
          {showSummary ? "Hide Summary" : "View Summary"}
        </button>

        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={handleExport}
        >
          Export as PDF
        </button>
      </div>

      {showSummary && (
        <div className="mb-6 border p-4 rounded bg-white shadow">
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <ul className="space-y-1 text-sm">
            {questions.map((q, index) => (
              <li key={q.id} className="flex justify-between">
                <span>
                  Q{q.id}: {q.question.slice(0, 60)}...
                </span>
                <span>{getAnswerStatus(answers[index])}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar - Hidden in Print */}
        <div className="md:w-1/4">
          <h2 className="font-semibold text-sm mb-1">Jump to Section</h2>
          <div className="flex flex-wrap gap-2">
            {[...new Set(questions.map(q => q.section))].map(section => (
              <button
                key={section}
                className="px-3 py-1 rounded bg-purple-100 hover:bg-purple-200 text-sm"
                onClick={() => {
                  const index = questions.findIndex(q => q.section === section);
                  if (index !== -1) setCurrent(index);
                }}
              >
                Section {section}
              </button>
            ))}
          </div>

          <h2 className="mt-4 font-semibold text-sm mb-1">Question Status</h2>
          <div className="grid grid-cols-5 md:grid-cols-3 gap-2">
            {questions.map((q, index) => (
              <button
                key={q.id}
                className={`w-10 h-10 text-xs rounded-full border shadow ${
                  index === current
                    ? "bg-blue-600 text-white"
                    : answers[index].trim()
                    ? "bg-green-100"
                    : "bg-red-100"
                }`}
                title={`Q${q.id}: ${getAnswerStatus(answers[index])}`}
                onClick={() => setCurrent(index)}
              >
                {q.id}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-4 p-4 bg-gray-100 rounded-md">
            <h2 className="text-lg font-medium">
              Q{questions[current].id}: {questions[current].question}
            </h2>
            {questions[current].marks && (
              <p className="text-sm text-gray-500 mb-2">
                [Marks: {questions[current].marks}] &nbsp; [Section:{" "}
                {questions[current].section}]
                {questions[current].comment && (
                  <>
                    {" "}
                    —{" "}
                    <span className="text-purple-600">
                      {questions[current].comment}
                    </span>
                  </>
                )}
              </p>
            )}
          </div>

          <AnswerEditor
            answer={answers[current]}
            onChange={handleAnswerChange}
          />

          <div className="text-sm text-gray-600 mt-2 flex justify-between items-center">
            <span>Word Count: {wordCount(answers[current])}</span>
            <span className="text-green-600 font-medium">{saveMessage}</span>
          </div>

          <div className="no-print flex flex-wrap justify-between gap-3 mt-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded-md"
              disabled={current === 0}
              onClick={() => handleNavigation("prev")}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
              disabled={current === questions.length - 1}
              onClick={() => handleNavigation("next")}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
