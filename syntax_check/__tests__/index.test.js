const { returnErrors } = require("../index");

describe("return syntax error", () => {
  test("given empty string returns empty array", () => {
    expect(returnErrors("")).toEqual([]);
  });
  test("given uncorrupted single string returns empty array", () => {
    expect(returnErrors("<{<>}>")).toEqual([]);
  });
  test("given corrupted single string '<{})' returns array with ['line 1, > expected ]", () => {
    expect(returnErrors("<{})")).toEqual(["line 1, > expected found )"]);
    expect(returnErrors("<{}{}}")).toEqual(["line 1, > expected found }"]);
    expect(returnErrors("<{}{}<>>(}")).toEqual(["line 1, ) expected found }"]);
  });
  test("given multiple lines of corrupted chunks, returns multiple value error msg array", () => {
    const input = `<{})
<(()))`;
    expect(returnErrors(input)).toEqual([
      "line 1, > expected found )",
      "line 2, > expected found )",
    ]);
  });
  test("given mix of corrupted and uncorrupted chunks returns relevant errors", () => {
    const input = `([]
      (]
      {()()()>
      <([{}`;
    expected = ["line 2, ) expected found ]", "line 3, } expected found >"];
    expect(returnErrors(input)).toEqual(expected);
  });
});
