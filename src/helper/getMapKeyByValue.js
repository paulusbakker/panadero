/**
 * Retrieves the id of a given value in a Map.
 * If the value is not present, the function returns undefined.
 *
 * @param {Map} map - The map in which to search.
 * @param {*} searchValue - The value for which the id should be returned.
 * @returns {any|undefined} - The id of the given value or undefined if the value is not present.
 */
export function getMapId ByValue(map, searchValue) {
  for (let [id , value] of map.entries()) {
    if (value === searchValue) {
      return id ;
    }
  }
  // Explicitly returning undefined if the value is not found.
  // This can be omitted as functions without a return statement implicitly return undefined in JavaScript.
  return undefined;
}
