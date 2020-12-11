import { Mark } from "../../domain";
import { getMarksMean } from "../get-marks-mean";

const valueMatrix: { marks: Mark[]; result: Mark }[] = [
  { marks: ["NA"], result: "NA" },
  { marks: ["AS"], result: "AS" },
  { marks: ["AN"], result: "AN" },
  { marks: ["AE"], result: "AE" },
  { marks: ["NA", "AS"], result: "AS" },
  { marks: ["NA", "AN"], result: "AS" },
  { marks: ["NA", "AE"], result: "AN" },
  { marks: ["AS", "AS"], result: "AS" },
  { marks: ["AS", "AN"], result: "AN" },
  { marks: ["AS", "AE"], result: "AN" },
  { marks: ["AN", "AN"], result: "AN" },
  { marks: ["AN", "AE"], result: "AE" },
  { marks: ["AE", "AE"], result: "AE" },
  { marks: ["NA", "AS", "AN", "AE"], result: "AN" },
  { marks: ["NA", "NA", "AN", "AE"], result: "AS" },
  { marks: ["NA", "NA", "NA", "AE"], result: "AS" },
  { marks: ["NA", "NA", "NA", "NA"], result: "NA" },
  { marks: ["AS", "AS", "AS", "AS"], result: "AS" },
  { marks: ["AS", "AN", "AS", "AS"], result: "AS" },
  { marks: ["AS", "AN", "AN", "AS"], result: "AN" },
  { marks: ["AS", "AN", "AN", "AN"], result: "AN" },
  { marks: ["AN", "AN", "AN", "AN"], result: "AN" },
  { marks: ["AN", "AE", "AN", "AN"], result: "AN" },
  { marks: ["AN", "AE", "AE", "AN"], result: "AE" },
  { marks: ["AN", "AE", "AE", "AE"], result: "AE" },
  { marks: ["NA", "AS", "AS", "AN"], result: "AS" },
  { marks: ["NA", "AS", "AN", "AN"], result: "AS" },
  { marks: ["NA", "AS", "AE", "AE"], result: "AN" },
  { marks: ["AS", "AN", "AE", "AE"], result: "AN" },
  { marks: ["AS", "AS", "AE", "AE"], result: "AN" },
  { marks: ["AN", "AN", "AE", "AE"], result: "AE" },
  { marks: ["AN", "AE", "AE", "AE"], result: "AE" },
  { marks: ["AE", "AE", "AE", "AE"], result: "AE" },
];

describe("@tp/calculator", () => {
  describe("When using getMarksMean", () => {
    describe("and no marks are provided", () => {
      it("should return undefined", () => {
        expect(getMarksMean()).toBeUndefined();
      });
    });
    describe("and a single AE mark is provided", () => {
      it("should return same value", () => {
        expect(getMarksMean(["AE"])).toEqual("AE");
      });
    });
    describe("given a value matrix is provided", () => {
      it("should comply all expected results", () => {
        const results = valueMatrix.map(
          (row) => getMarksMean(row.marks) == row.result
        );
        expect(results.filter((r) => r).length).toEqual(results.length);
      });
    });
  });
});
