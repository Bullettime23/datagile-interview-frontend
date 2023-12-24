export interface TestData {
  name: string;
  _id: string;
  time: number;
  questions: Question[];
}

export interface Question {
  _id: string;
  multy: boolean;
  question: string;
  answers: string[];
}

export interface TestAnswer {
  [key: string]: string[];
}
