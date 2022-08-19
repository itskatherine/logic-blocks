const returnErrors = (chunkStr) => {
  const openBrackets = ["{", "[", "(", "<"];
  const closingBrackets = ["}", "]", ")", ">"];
  const chunkStrArr = chunkStr.split("");

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
        return [`line 1, ${closingBrackets[lastOpenBracketIndex]} expected`];
      }
    }
  }

  return [];
};

module.exports = { returnErrors };
