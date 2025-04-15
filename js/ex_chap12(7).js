const assert = require("assert");

// 다음과 같은 정수 배열을 생성하는 range 함수를 구현하시오.

// ** rules f(s, e, step)
// - step 기본값 = s > e ? -1 : 1
// - step === 0 || s === e ? [s] 반환
// - e 가 없다면,
//  ⇒ s > 0 ? e = s, s = 1
//  ⇒ s < 0 ? e = -1
//  ⇒ s === 0 ? [0]
// - 비정상(예외)
//  ⇒ s > e && step > 0 ? []
//  ⇒ s < e && setp < 0 ? []
//  즉, (s - e) * step > 0

const range = (start, end, step = start > end ? -1 : 1) => {
  if (step === 0 || start === end) return [start];

  // if (start > end && step > 0) return [];
  // if (start < end && step < 0) return [];
  if ((start - end) * step > 0) return [];

  if (end === undefined) {
    if (start > 0) {
      end = start;
      start = 1;
    } else if (start < 0) {
      end = -1;
    } else {
      return [0];
    }
  }

  const results = [];

  for (let i = start; start > end ? i >= end : i <= end; i += step) {
    results.push(i);
  }
  return results;
};

range(1, 10, 1); // [1, 2, 3, 4,  5, 6, 7, 8, 9, 10]
range(1, 10, 2); // [1, 3, 5, 7, 9]
range(1, 10); // [1, 2, 3, 4,  5, 6, 7, 8, 9, 10]
range(10, 1); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
range(10, 1, -2); // [10, 8, 6, 4, 2]
range(5); // [1, 2, 3, 4, 5]
range(100); // [1, 2, 3, 4, 5, …, 99, 100]
range(-5); // [-5, -4, -3, -2, -1]
range(5, 5); // [5]
range(1, 5, 0); // [1]
range(5, 5, 0); // [5]
range(0, 5); // [0, 1, 2, 3, 4, 5]
range(5, 5, -1); // [5]
range(0, -1); // [0, -1]
range(5, 1, 1); // []
range(0, -3); // [0, -1, -2, -3]
range(1, 5, -1); // []
range(-3, 0); // [-3, -2, -1, 0]
range(1, 5, 6); // [1]
range(5, 1); // [5, 4, 3, 2, 1]
range(0); // [0]
range(0, 0); // [0]
range(0, 0, 5); // [0]
range(2, 1, -5); // [2]
range(0, -1, -5); // [0]

assert.deepStrictEqual(range(1, 10, 1), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.deepStrictEqual(range(1, 10, 2), [1, 3, 5, 7, 9]);
assert.deepStrictEqual(range(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
assert.deepStrictEqual(range(10, 1), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);

assert.deepStrictEqual(range(5, 5, 0), [5]);
assert.deepStrictEqual(range(1, 5, 0), [1]);
assert.deepStrictEqual(range(5, 5, -1), [5]);
assert.deepStrictEqual(range(5, 5), [5]);
assert.deepStrictEqual(range(0, 0, 5), [0]);
assert.deepStrictEqual(range(1, 5, -1), []);

assert.deepStrictEqual(range(1, 5, 6), [1]);
assert.deepStrictEqual(range(0, 5), [0, 1, 2, 3, 4, 5]);
assert.deepStrictEqual(range(-3, 0), [-3, -2, -1, 0]);

assert.deepStrictEqual(range(5, 1, 1), []);
assert.deepStrictEqual(range(0, -1), [0, -1]);
assert.deepStrictEqual(range(0, -3), [0, -1, -2, -3]);
assert.deepStrictEqual(range(5, 1), [5, 4, 3, 2, 1]);
assert.deepStrictEqual(range(10, 1, -2), [10, 8, 6, 4, 2]);

assert.deepStrictEqual(range(5), [1, 2, 3, 4, 5]);
assert.deepStrictEqual(range(0), [0]);
assert.deepStrictEqual(range(0, 0), [0]);
assert.deepStrictEqual(range(2, 1, -5), [2]);
assert.deepStrictEqual(range(0, -1, -5), [0]);
assert.deepStrictEqual(range(-5), [-5, -4, -3, -2, -1]);
assert.deepStrictEqual(
  range(50),
  Array.from({ length: 50 }, (_, i) => i + 1)
);
assert.deepStrictEqual(
  range(1, 150, 3),
  Array.from({ length: 50 }, (_, i) => i * 3 + 1)
);
