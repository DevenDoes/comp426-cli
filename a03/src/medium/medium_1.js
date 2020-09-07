import {variance} from "./data/stats_helpers.js";
import {maxAndMin} from "../mild/mild_1.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
  let sum = 0;
  array.forEach((item, index) => {
    sum += item;
  })
  return sum;
}

//console.log(getSum([1,5,8,3]));


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
  if (array.length === 0) return 0;
  array.sort((a, b) => a - b);
  if (array.length % 2 === 1) {
    return array[Math.floor(array.length / 2)];
  }
  else {
    let a = array[Math.floor(array.length / 2)-1];
    let b = array[Math.floor(array.length / 2)];
    return (a + b) / 2;
  }
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
  let maxMin = maxAndMin(array);
  let sum = getSum(array);
  let mean = sum / array.length;
  let varianceCalc = variance(array, mean);
  return {
    'length': array.length,
    'sum': sum,
    'mean': mean,
    'median': getMedian(array),
    'min': maxMin.min,
    'max': maxMin.max,
    'variance': varianceCalc,
    'standard_deviation': Math.sqrt(varianceCalc)
  };

}

//console.log(getStatistics([3,2,4,5,5,5,2,6,7]));
