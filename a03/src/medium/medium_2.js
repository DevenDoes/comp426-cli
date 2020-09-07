import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: {
        'city': (mpg_data.map(x => x.city_mpg).reduce((acc, cur) => acc + cur)) / mpg_data.length,
        'highway': (mpg_data.map(x => x.highway_mpg).reduce((acc, cur) => acc + cur)) / mpg_data.length,
    },
    allYearStats: getStatistics(mpg_data.map(x => x.year)),
    ratioHybrids: (mpg_data.map(x => x.hybrid).reduce((acc, cur) => acc + cur)) / mpg_data.length,
};

//console.log(allCarStats);

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */

export function makerHybridsFunc(cars) {
    let makerHybrids = [];
    cars.filter((car) => {
        return car.hybrid;
    }).forEach((car, index) => {
        let indexMH = makerHybrids.findIndex(x => x.make === car.make)
        if (indexMH === -1) {
            makerHybrids.push({
                'make': car.make,
                'hybrids': [car.id]
            });
        } else {
            if (!(car.id in makerHybrids[indexMH].hybrids)) {
                makerHybrids[indexMH].hybrids.push(car.id);
            }
        }
    });

    makerHybrids.sort((a, b) => b.hybrids.length - a.hybrids.length);

    return makerHybrids;
}

export function avgMpgByYearAndHybridFunc(cars) {
    const result = {};
    
    cars.forEach((car, index) => {
        if (!result.hasOwnProperty(car.year)) {
            if (car.hybrid) {
                result[String(car.year)] = {
                    'hybrid': {
                        'count': 1,
                        'city': car.city_mpg,
                        'highway': car.highway_mpg,
                    },
                    'notHybrid': {
                        'count': 0,
                        'city': 0,
                        'highway': 0,
                    }
                };
            } else {
                result[String(car.year)] = {
                    'hybrid': {
                        'count': 0,
                        'city': 0,
                        'highway': 0,
                    },
                    'notHybrid': {
                        'count': 1,
                        'city': car.city_mpg,
                        'highway': car.highway_mpg,
                    }
                };
            }
        } else {
            if (car.hybrid) {
                result[String(car.year)].hybrid.count += 1;
                result[String(car.year)].hybrid.city += car.city_mpg;
                result[String(car.year)].hybrid.highway += car.highway_mpg;
            } else {
                result[String(car.year)].notHybrid.count += 1;
                result[String(car.year)].notHybrid.city += car.city_mpg;
                result[String(car.year)].notHybrid.highway += car.highway_mpg;
            }
        }
    });

    for (const [key, value] of Object.entries(result)) {
        value.hybrid.city /= value.hybrid.count;
        value.hybrid.highway /= value.hybrid.count;
        delete value.hybrid.count;
        value.notHybrid.city /= value.notHybrid.count;
        value.notHybrid.highway /= value.notHybrid.count;
        delete value.notHybrid.count;
    };

    return result;
}

export const moreStats = {
    makerHybrids: makerHybridsFunc(mpg_data),
    avgMpgByYearAndHybrid: avgMpgByYearAndHybridFunc(mpg_data),
};
