/**
 *
 * @param variable
 * @returns {{type: ("undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"), value: *}}
 * example: identifyVariable(4);
 * returns: { type: 'number', value: 4 }
 */
export function identifyVariable(variable) {
   return {
      'type': (typeof variable),
      'value': variable,
   };
}


/**
 *
 * @param array
 * @returns {[]}
 * example: identifyArray(['some', 3, [3, 4], false]);
 * returns: [
 { type: 'string', value: 'some' },
 { type: 'number', value: 3 },
 { type: 'object', value: [ 3, 4 ] },
 { type: 'boolean', value: false }
 ]

 */
export function identifyArray(array) {
   let id = []
   array.forEach((item, index) => {
      id.push({
         'type': (typeof item),
         'value': item,
      });
   });
   return id;
}

/**
 * mutates the object that is passed in.
 * @param object
 * @param key
 * @returns {*} does not have to return anything
 *
 * example:
 * let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
};
 removeKey(obj, 'password');
 obj now does not contain the `password` field
 */
export function removeKey(object, key) {
   delete object[String(key)];
}

/**
 * Does not mutate the object passed in
 * @param object
 * @param key
 * @returns {*} The object with its keys removed
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 * let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
};
 obj = removeKeyNonDestructive(obj, 'password');
 obj will not have the `password` field only because it was assigned the result of the function.
 If only `removeKeyNonDestructive` was called, nothing would have changed.
 */
export function removeKeyNonDestructive(object, key) {
   const objectCopy = {...object};
   delete objectCopy[String(key)];
   return objectCopy;
}

/**
 * Remove and return the listed keys. Without mutating the object passed in.
 * @param object
 * @param {string[]} keyList
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 *
 * example:


 let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
 };
 obj = removeKeys(obj, ['password', 'age']);
 // object not looks like this
 { name: 'Mr. Boss', title: 'boss' }

 * @return {*} The object with its keys removed.
 */
export function removeKeys(object, keyList) {
   const objectCopy = {...object};
   keyList.forEach((item, index) => {
      delete objectCopy[String(item)];
   })
   return objectCopy;
}

// console.log(identifyVariable(4));
// console.log('---------------');
// console.log(identifyArray(['some', 3, [3, 4], false]));
// console.log('---------------');
// let obj1 = {
//    name: 'Mr. Boss',
//    title: 'boss',
//    age: 33,
//    password: 'pass123'
// };
// console.log(obj1);
// console.log(removeKey(obj1, 'password'));
// console.log(obj1);
// console.log('---------------');
// let obj2 = {
//    name: 'Mr. Boss',
//    title: 'boss',
//    age: 33,
//    password: 'pass123'
// };
// console.log(obj2);
// console.log(removeKeyNonDestructive(obj2, 'password'));
// console.log(obj2);
// console.log('---------------');
// let obj3 = {
//    name: 'Mr. Boss',
//    title: 'boss',
//    age: 33,
//    password: 'pass123'
// };
// console.log(obj3);
// console.log(removeKeys(obj3, ['password', 'age']));
// console.log(obj3);
