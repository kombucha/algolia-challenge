import { range, generatePagesWindow } from "./utils";

describe("range", () => {
  it("should return an array with the correct size", () => {
    expect(range(0, 5).length).toEqual(5);
  });
});

describe("generatePagesWindow", () => {
  it("should not return more that totalPages", () => {
    expect(generatePagesWindow(0, 5).length).toEqual(5);
    expect(generatePagesWindow(4, 5).length).toEqual(5);
    expect(generatePagesWindow(0, 1).length).toEqual(1);
  });

  it("should throw if currentPage is >= totalPages", () => {
    expect(generatePagesWindow.bind(10, 10)).toThrow();
    expect(generatePagesWindow.bind(10, 1)).toThrow();
  });

  it("should throw if currentPage is invalid", () => {
    expect(generatePagesWindow.bind(-10, 10)).toThrow();
  });

  it("should throw if totalPages is invalid", () => {
    expect(generatePagesWindow.bind(0, 0)).toThrow();
    expect(generatePagesWindow.bind(0, -10)).toThrow();
  });

  it("should return at most seven pages", () => {
    expect(generatePagesWindow(0, 50).length).toEqual(7);
    expect(generatePagesWindow(25, 50).length).toEqual(7);
    expect(generatePagesWindow(49, 50).length).toEqual(7);
  });

  it("should center the currentPage if the range and currentPage are big enough", () => {
    expect(generatePagesWindow(4, 10)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(generatePagesWindow(50, 100)).toEqual([47, 48, 49, 50, 51, 52, 53]);
  });

  it("should keep the range on the edges", () => {
    // Begin
    expect(generatePagesWindow(0, 10)).toEqual([0, 1, 2, 3, 4, 5, 6]);
    expect(generatePagesWindow(3, 10)).toEqual([0, 1, 2, 3, 4, 5, 6]);

    // End
    expect(generatePagesWindow(9, 10)).toEqual([3, 4, 5, 6, 7, 8, 9]);
    expect(generatePagesWindow(48, 50)).toEqual([43, 44, 45, 46, 47, 48, 49]);
  });
});
