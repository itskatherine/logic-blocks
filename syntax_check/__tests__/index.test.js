const {returnErrors } = require("../index")

describe("return syntax error", () => {
  test("given empty string returns empty array", () => {
    expect(returnErrors("")).toEqual([]);
  });
});

