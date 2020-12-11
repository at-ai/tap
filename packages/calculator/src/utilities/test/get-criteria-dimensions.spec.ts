import { criteriaDimensions } from "../../master-data/criteria-dimensions";
import { getCriteriaDimensions } from "../get-criteria-dimensions";

describe("@tp/calculator", () => {
  describe("When using getCriteriaDimensions", () => {
    describe("and no criteria is provided", () => {
      it("should return undefined", () => {
        expect(getCriteriaDimensions()).toBeUndefined();
      });
    });
    describe("and no valid criteria is provided", () => {
      it("should return undefined", () => {
        expect(getCriteriaDimensions("foo")).toBeUndefined();
      });
    });
    describe("and a valid criteria is provided", () => {
      it("should return corresponding dimensions array", () => {
        expect(getCriteriaDimensions(criteriaDimensions[0].id)).toEqual(
          criteriaDimensions[0].dimensions
        );
      });
    });
  });
});
