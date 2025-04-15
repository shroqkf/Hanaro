// 다음과 같은 deleteArray를 순수 함수로 작성하시오.
const assert = require("assert");

const arr = [1, 2, 3, 4];

const deleteArray = (array, startOrKey, endOrValue) => {
  if (typeof startOrKey === "string") {
    return array.filter((a) => a[startOrKey] !== endOrValue);
  } else {
    return array.filter((_, i) => i < startOrKey || i >= endOrValue);
  }
};

assert.deepStrictEqual(deleteArray(arr, 2), [1, 2]); // 2부터 끝까지 지우고 나머지 리턴
assert.deepStrictEqual(deleteArray(arr, 1, 3), [1, 4]); // 1부터 3미만까지 지우고 나머지 리턴

assert.deepStrictEqual(arr, [1, 2, 3, 4]);

const Hong = { id: 1, name: "Hong" };
const Kim = { id: 2, name: "Kim" };
const Lee = { id: 3, name: "Lee" };
const users = [Hong, Kim, Lee];

const repaintUsers = users.filter((user) => user.id !== 2);
console.log("🚀 repaintUsers:", [...repaintUsers]);

assert.deepStrictEqual(deleteArray(users, 2), [Hong, Kim]);
assert.deepStrictEqual(deleteArray(users, 1, 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, "id", 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, "name", "Lee"), [Hong, Kim]);
