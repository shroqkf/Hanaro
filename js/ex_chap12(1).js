const assert = require("assert");

const arr = [1, 2, 3, 4];

function push(array, ...args) {
  return [...array, ...args];
}
assert.deepStrictEqual(push(arr, 5, 6), [1, 2, 3, 4, 5, 6]);

const pop = (array, count) => (count ? array.slice(-count) : array.at(-1));
assert.deepStrictEqual(pop(arr), 4);
assert.deepStrictEqual(pop(arr, 2), [3, 4]); // 2개 팝!

const unshift = (array, ...args) => [...args, ...array];
assert.deepStrictEqual(unshift(arr, 0), [0, 1, 2, 3, 4]);
assert.deepStrictEqual(unshift(arr, 7, 8), [7, 8, 1, 2, 3, 4]);

const shift = (array, count = 1) => [array.slice(0, count), array.slice(count)];
assert.deepStrictEqual(shift(arr), [[1], [2, 3, 4]]); // [shift되는 원소들, 남은 원소들]
assert.deepStrictEqual(shift(arr, 2), [
  [1, 2],
  [3, 4],
]); // 2개 shift
assert.deepStrictEqual(arr, [1, 2, 3, 4]);
