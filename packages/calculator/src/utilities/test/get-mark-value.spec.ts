import { getMarkValue } from "../get-mark-value";

describe("@tp/calculator", () => {
  describe("When using getMarkValue", () => {
    describe("and no mark is provided", () => {
      it("should return undefined", () => {
        expect(getMarkValue()).toBeUndefined();
      });
    });
    describe("and no valid mark is provided", () => {
      it("should return undefined", () => {
        expect(getMarkValue("foo" as any)).toBeUndefined();
      });
    });
    describe("and a valid mark is provided", () => {
      it("should return corresponding mark value", () => {
        expect(getMarkValue("AE")).toEqual(3);
      });
    });
  });
});
