export type Mark = "AE" | "AN" | "AS" | "NA";

export interface Criteria {
  [id: string]: Mark;
}

export interface CriteriaDimensions {
  id: string;
  dimensions: string[];
}

export type MarkValues = {
  [id in Mark]: number;
};

export interface Student {
  name: string;
  firstSurname: string;
  secondSurname: string;
  criteria: Criteria;
}
