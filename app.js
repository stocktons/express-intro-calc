/** Simple demo Express app. */

const express = require("express");
const app = express();

const { convertStrNums } = require("./utils");

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");
const { findMean,findMedian,findMode} = require("./stats")

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  let strNums = req.query.nums.split(",");

  if (strNums.length === 0) {
    throw new BadRequestError("nums are required");
  }

  let nums = convertStrNums(strNums);
  
  return res.send({ operation : "mean", value : findMean(nums) });

});


/** Finds median of nums in qs: returns {operation: "median", result } */


/** Finds mode of nums in qs: returns {operation: "mean", result } */


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) { // do we need any of these params? 
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;