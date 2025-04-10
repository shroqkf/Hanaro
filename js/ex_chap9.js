const assert = require("assert");

function makeArray(n) {
  if (n === 1) return [1];
  return [...makeArray(n - 1), n];
}

const ma10 = makeArray(10);
console.log("🚀 ma10:", ma10);
assert.deepEqual(ma10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // equal
assert.equal(ma10[0], 1); // equal
assert.equal(ma10[0], "1"); // equal
// assert.strictEqual(ma10[0], "1"); // Not equal

function makeReverseArray(n) {
  if (n === 1) return [1];
  return [n, ...makeArray(n - 1)];
}
const mra5 = makeReverseArray(5);
// console.log("🚀 mra5:", mra5);
// assert.deepEqual(mra5, [5, 4, 3, 2, 1]); // equal

function makeArrayTCO(n, acc = []) {
  if (n === 1) return [1, ...acc];
  return makeArrayTCO(n - 1, [n, ...acc]);
}
const maTco10 = makeArrayTCO(10);
console.log("🚀 maTco10:", maTco10);

// 피보나치 수열을 구하는 함수를 작성하시오.
// 수열의 규칙은 f(n) = f(n - 2) + f(n - 1)  (단, n <= 1 일 때 f(n) = n)
// 즉, 0 ~ 9까지의 값은 [0, 1, 1, 2, 3, 5, 8, 13, 21, 34] 이다.

// // 1) Loop를 이용하여 작성하시오.
const loopFibonacci = (n) => {
  if (n <= 1) return 1;
  let prev = 0;
  let curr = 1;
  for (let i = 2; i <= n; i += 1) {
    // let t = prev;
    // prev = curr;
    // curr = t + curr;
    [prev, curr] = [curr, prev + curr]; // destructuring
  }
  return curr;
};
console.log("🚀 loopFibonacci(5):", loopFibonacci(5));

// 2) 재귀함수만을 이용하여 작성하시오.
const recurFibonacci = (n) => {
  if (n <= 1) return n;
  return recurFibonacci(n - 2) + recurFibonacci(n - 1);
};
console.log("🚀 recurFibonacci(7):", recurFibonacci(7));

// 3) memoized 함수를 이용하여 작성하시오.
const memoized = (fn) => {
  const cacheTable = {};
  return (k) => {
    return cacheTable[k] || (cacheTable[k] = fn(k));
  };
};

const memoFibonacci = memoized((n) => {
  if (n <= 1) return n;
  return memoFibonacci(n - 2) + memoFibonacci(n - 1);
});
console.log("🚀 memoFibonacci(30):", memoFibonacci(30));
