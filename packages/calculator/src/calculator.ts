import * as _ from "lodash";
import { Student } from "./domain";
import { students } from "./students";
import { getCriteriaDimensions } from "./utilities/get-criteria-dimensions";
import { getMarksMean } from "./utilities/get-marks-mean";
const excelToJson = require("convert-excel-to-json");
const fs = require("fs");

export const calculate = (student: Student) => {
  const toCriteriaDimensions = Object.keys(student.criteria).reduce(
    (cd, c) =>
      cd.concat(
        getCriteriaDimensions(c)?.map((d) => ({
          dimension: d,
          mark: student.criteria[c],
        }))
      ),
    []
  );
  const groupDimensions = _.groupBy(toCriteriaDimensions, "dimension");
  const marks = Object.keys(groupDimensions).reduce(
    (dimensions, d) => ({
      ...dimensions,
      [d]: getMarksMean(groupDimensions[d].map((value) => value?.mark)),
    }),
    {}
  );
  return marks;
};

const result = excelToJson({
  sourceFile: __dirname + "/marks.xlsx",
  sheets: ["sheet1"],
})?.sheet1;

const headers = result[0]; // _.invert(result[0]);
result.shift();
const mappedStudents = result.map((r) =>
  Object.keys(r).reduce((mapped: any, k) => {
    if (k == "A" || k == "B" || k == "C")
      return { ...mapped, [headers[k]]: r[k] };
    else
      return {
        ...mapped,
        criteria: { ...(mapped.criteria || {}), [headers[k]]: r[k] },
      };
  }, {})
);

const studentMarks = mappedStudents.map((s) => ({
  name: s.Nom,
  firstSurname: s["Primer Cognom"],
  secondSurname: s["Segon Cognom"],
  // marks: calculate(s),
  ...calculate(s),
}));
console.table(studentMarks);
