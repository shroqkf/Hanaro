const assert = require("assert");

// ex1) 배열의 각 원소를 String으로 변환하시오.
const arr = [1, 2, 3, true];
arr.push(true);

// const ret1 = arr.map(a => String(a));
// (n) => String(n)
// String(n)
const ret1 = arr.map(String);
assert.deepStrictEqual(ret1, ["1", "2", "3", "4", "true"]);

// ex2) 다음과 같이 작동하는 classNames 함수를 작성하시오.
const classNames = (...args) =>
  args
    .filter(Boolean) // <-- a => Boolean(a) <-- a => !!a
    // .map(a => a) // function(a) { return a; }
    .join(" ");
const ret2 = classNames("", "a b c", "d", "", "e", undefined);
// <h1 class="a bc">
assert.strictEqual(ret2, "a b c d e");
