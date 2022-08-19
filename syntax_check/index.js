const returnErrors = (chunkStr) => {
  const chunkLineArray = chunkStr.split(/\n/g);
  const errorArray = chunkLineArray.map((chunk, index) => {
    const error = checkChunkLineForCorruption(chunk);
    return error ? `line ${index + 1}, ${error}` : "";
  });
  return errorArray.filter((error) => error);
};

const checkChunkLineForCorruption = (chunkLineStr) => {
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
  return "";
};

module.exports = { returnErrors };
