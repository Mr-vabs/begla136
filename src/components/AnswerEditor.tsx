import React from "react";

interface Props {
  answer: string;
  onChange: (text: string) => void;
}

const AnswerEditor: React.FC<Props> = ({ answer, onChange }) => {
  return (
    <textarea
      className="w-full h-60 p-3 border rounded-md text-base"
      placeholder="Write your answer here..."
      value={answer}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default AnswerEditor;