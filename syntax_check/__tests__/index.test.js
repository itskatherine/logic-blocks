const { returnErrors } = require("../index");

describe("testing corrupted chunks", () => {
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
    const input = `([])
      (]
      {()()()>
      <()>`;
    expected = ["line 2, ) expected found ]", "line 3, } expected found >"];
    expect(returnErrors(input)).toEqual(expected);
  });
});

describe("Testing incomplete chunks", () => {
  test("given single incomplete chunk missing 1 bracket string returns error in arr", () => {
    const input = "<()";
    expect(returnErrors(input)).toEqual(["line 1, missing >"]);
  });
  test("given incomplete chunk with multiple missing bracket return error in arr", () => {
    const input = "<((((((";
    expect(returnErrors(input)).toEqual(["line 1, missing ))))))>"]);
  });
  test("Jim's test gives 5 incomplete errors", () => {
    const input = `[({(<(())[]>[[{[]{<()<>>
      [(()[<>])]({[<{<<[]>>(
      {([(<{}[<>[]}>{[]{[(<()>
      (((({<>}<{<{<>}{[]{[]{}
      [[<[([]))<([[{}[[()]]]
      [{[{({}]{}}([{[{{{}}([]
      {<[[]]>}<{[{[{[]{()[[[]
      [<(<(<(<{}))><([]([]()
      <{([([[(<>()){}]>(<<{{
      <{([{{}}[<[[[<>{}]]]>[]]`;
    const errors = returnErrors(input);
    const incompleteErrors = errors.filter((error) => {
      return error.includes("missing");
    });
    expect(incompleteErrors).toHaveLength(5);
  });
  test("Jims test gives 5 corrupt chunk errors", () => {
    const input = `[({(<(())[]>[[{[]{<()<>>
      [(()[<>])]({[<{<<[]>>(
      {([(<{}[<>[]}>{[]{[(<()>
      (((({<>}<{<{<>}{[]{[]{}
      [[<[([]))<([[{}[[()]]]
      [{[{({}]{}}([{[{{{}}([]
      {<[[]]>}<{[{[{[]{()[[[]
      [<(<(<(<{}))><([]([]()
      <{([([[(<>()){}]>(<<{{
      <{([{{}}[<[[[<>{}]]]>[]]`;
    const errors = returnErrors(input);
    const corruptErrors = errors.filter((error) => {
      return error.includes("expected");
    });
    expect(corruptErrors).toHaveLength(5);
  });
});
