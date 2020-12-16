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

export interface StudentHeader {
  name: string;
  firstSurname: string;
  secondSurname: string;
}

export interface Student extends StudentHeader {
  criteria: Criteria;
}

export type StudentDimensionType = {
  mark: Mark;
  value: number;
  fringe: boolean;
};
export type StudentDimensions = { [dimension: string]: StudentDimensionType };
export type StudentMarks = StudentHeader & StudentDimensions;
export interface GroupMarks {
  [group: string]: StudentMarks[];
}
export type FinalStudentMarks = StudentHeader & { [dimension: string]: Mark };
