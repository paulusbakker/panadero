/**
 * Retrieves the key of a given value in a Map.
 * If the value is not present, the function returns undefined.
 *
 * @param {Map} map - The map in which to search.
 * @param {*} searchValue - The value for which the key should be returned.
 * @returns {any|undefined} - The key of the given value or undefined if the value is not present.
 */
export function getMapKeyByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue) {
      return key;
    }
  }
  // Explicitly returning undefined if the value is not found.
  // This can be omitted as functions without a return statement implicitly return undefined in JavaScript.
  return undefined;
}
