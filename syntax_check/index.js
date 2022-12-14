const returnErrors = (chunkStr) => {
  const chunkLineArray = chunkStr.split(/\n/g); //split by line breaks
  const errorArray = chunkLineArray.map((chunk, index) => {
    const error = checkChunkLineForError(chunk);
    return error ? `line ${index + 1}, ${error}` : "";
  });
  return errorArray.filter((error) => error); //filter where there is no error
};

const checkChunkLineForError = (chunkLineStr) => {
  const openBrackets = ["{", "[", "(", "<"];
  const closingBrackets = ["}", "]", ")", ">"];
  const chunkStrArr = chunkLineStr.split("");

  let openBracketsInStr = [];

  for (let i = 0; i < chunkStrArr.length; i++) {
    let currentBracket = chunkStrArr[i];
    if (openBrackets.includes(currentBracket)) {
      openBracketsInStr.push(currentBracket);
    } else {
      const lastOpenBracket = openBracketsInStr.at(-1);
      const lastOpenBracketIndex = openBrackets.indexOf(lastOpenBracket);
      if (lastOpenBracketIndex === closingBrackets.indexOf(currentBracket)) {
        openBracketsInStr.pop();
      } else {
        return `${closingBrackets[lastOpenBracketIndex]} expected found ${currentBracket}`;
      }
    }
  }
  if (openBracketsInStr.length !== 0) {
    const leftOverOpenBrackets = openBracketsInStr;
    const correspondingClosedBrackets = leftOverOpenBrackets.map(
      (openBracket) => {
        return closingBrackets[openBrackets.indexOf(openBracket)];
      }
    );
    return `missing ${correspondingClosedBrackets.reverse().join("")}`;
  }
  return "";
};

module.exports = { returnErrors };
