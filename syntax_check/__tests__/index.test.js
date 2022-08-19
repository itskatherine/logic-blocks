const { returnErrors } = require("../index");

describe("return syntax error", () => {
  test("given empty string returns empty array", () => {
    expect(returnErrors("")).toEqual([]);
  });
  test("given uncorrupted single string returns empty array", () => {
    expect(returnErrors("<{<>}>")).toEqual([]);
  });
  test("given corrupted single string '<{})' returns array with ['line 1, > expected ]", () => {
    expect(returnErrors("<{})")).toEqual(["line 1, > expected"]);
    expect(returnErrors("<{}{}}")).toEqual(["line 1, > expected"]);
    expect(returnErrors("<{}{}<>>(}")).toEqual(["line 1, ) expected"]);
  });
});
