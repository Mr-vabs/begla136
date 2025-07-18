import React from "react";
import questions from "../data/begla136-june2022.json";

interface Props {
  answers: string[];
}

const SummaryPage: React.FC<Props> = ({ answers }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Summary of Your Answers</h1>
      {questions.map((q, index) => (
        <div key={q.id} className="mb-6 border-b pb-4">
          <h2 className="text-lg font-semibold">Q{q.id}: {q.question}</h2>
          {q.marks && (
            <p className="text-sm text-gray-600">[Marks: {q.marks}]</p>
          )}
          <p className="mt-2 whitespace-pre-wrap text-gray-800">
            {answers[index] || "[Not Answered]"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Word Count: {answers[index]?.trim().split(/\s+/).filter(Boolean).length || 0}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryPage;