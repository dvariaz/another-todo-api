const {
  getRandomNumber,
  pickRandomElements,
  getRandomChunks,
} = require("../../utils/random");

describe("Random utils tests", () => {
  test("The random number should be less than the minimum value and greater than the maximum value", () => {
    const number = getRandomNumber(0, 10);

    expect(number).toBeGreaterThanOrEqual(0);
    expect(number).toBeLessThanOrEqual(10);
  });

  test("The random pick should have elements included in the original array", () => {
    const original = [10, 20, 30, 40, 50, 60];
    const picked = pickRandomElements(original, 3);

    expect(picked).toHaveLength(3);
    picked.forEach((element) =>
      expect(original.includes(element)).toBeTruthy()
    );
  });

  test("The random pick should return an array of a single element", () => {
    const original = [10, 20, 30, 40, 50, 60];
    const picked = pickRandomElements(original, 1);

    expect(picked).toHaveLength(1);
  });

  test("The random pick shouldn't have undefined or null elements", () => {
    const original = [
      { name: "a" },
      { name: "b" },
      { name: "c" },
      { name: "d" },
    ];
    const picked = pickRandomElements(original, 2);

    expect(picked).toHaveLength(2);
    expect(picked).not.toEqual(expect.arrayContaining([undefined, null]));
  });

  test("The random chunks should have the same items of the original array", () => {
    const original = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ];
    const chunked = getRandomChunks(original, {
      minChunkSize: 2,
      maxChunkSize: 8,
    });

    expect(chunked.flat()).toHaveLength(original.length);
    original.forEach((item) => {
      expect(chunked.flat()).toContain(item);
    });
  });
});
