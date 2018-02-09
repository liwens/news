export function thinArr(arr) {
  return arr.reduce((a, b) => {
    return arr.concat(Array.isArray(b) ? thinArr(b) : b)
  }, []);
  return arr;
}
