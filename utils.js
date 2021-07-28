const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  for (let str of strNums) {
    if (!parseFloat(str)) {
      throw new BadRequestError(`${str} is not a number`);
    }
  }
  let nums = strNums.map(n => +n);
  return nums;
}


module.exports = { convertStrNums };