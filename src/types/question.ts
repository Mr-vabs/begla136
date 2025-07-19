// src/types/question.ts
export interface Question {
  id: number;
  section: string;
  question: string;
  marks: number;
  comment?: string;
}
