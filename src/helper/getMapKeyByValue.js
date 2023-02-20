export function getMapKeyByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue) return key;
  }
}
