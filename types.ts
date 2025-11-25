
export type Category = 'deck' | 'green' | 'yellow' | 'red';

export type CorrectCategory = 'green' | 'yellow' | 'red';

export interface CardData {
  id: number;
  text: string;
  correctCategory: CorrectCategory;
}

export type Columns = {
  [key in Category]: CardData[];
};
