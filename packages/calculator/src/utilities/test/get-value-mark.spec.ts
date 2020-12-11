import { getValueMark } from "../get-value-mark";

describe("@tp/calculator", () => {
  describe("When using getValueMark", () => {
    describe("and no mark is provided", () => {
      it("should return undefined", () => {
        expect(getValueMark()).toBeUndefined();
      });
    });
    describe("and no valid mark is provided", () => {
      it("should return undefined", () => {
        expect(getValueMark(5)).toBeUndefined();
      });
    });
    describe("and a valid mark is provided", () => {
      it("should return corresponding mark value", () => {
        expect(getValueMark(3)).toEqual("AE");
      });
    });
  });
});
