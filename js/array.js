const hong = { id: 1, name: "Hong" };
const kim = { id: 2, name: "Kim" };
const lee = { id: 3, name: "Lee" };
const park = { id: 4, name: "Park" };

const users = [hong, kim, lee, park];

const find3 = (a) => a.id === 3;
const idxId2 = users.findIndex(find3);
console.log("🚀 idxId2:", idxId2);

const findId = (id) => (a) => a.id === id; // closure

function f(x) {
  return function (a) {
    return a.id === x;
  };
}
const ff = f(2);
const id2 = users.findLastIndex(ff);
console.log("🚀 id2:", id2);

const idxId11 = users.findLastIndex(findId(2));
console.log("🚀 idxId11:", idxId11);

Array.prototype.pushX = function (x) {
  this[this.length] = x;
};
const xx = users.pushX({ id: 100, name: "킹 세종" });
console.log("🚀 xx:", xx);

Array.prototype.forEach = function (f) {
  for (let i = 0; i < this.length; i++) {
    f(this[i], i, this);
  }
};

users.forEach((a, i) => {
  console.log(i + 1, a.name);
});

Array.prototype.filter = function (f) {
  const results = [];
  for (let i = 0; i < this.length; i++) {
    if (f(this[i], i, this)) results.push(this[i]);
  }
  return results;
};
const oddIds = users.filter((a) => a.id % 2);
console.log("🚀 oddIds:", oddIds);

const sl1 = users.slice(1, 3);
console.log("🚀 sl1:", sl1);

const spl1 = users.splice(1, 3);
console.log("🚀 spl1:", spl1); // 지운 것을 return함

const arr2 = [1, 2, 3, 4, 5];

// ex1) [2,3]을 추출
const a1 = arr2.slice(1, 3);
console.log("🚀 a1:", a1);

// ex2) [3]부터 모두 다 추출
const a2 = arr2.slice(2);
console.log("🚀 a2:", a2);

// ex3) [2,3,4] 제거하기
const d3 = arr2.splice(1, 3);
console.log("🚀 d3:", d3, "result=", arr2);

// ex4) 복원하기
arr2.splice(1, 0, ...d3);
console.log("🚀 a4:", arr2);

// ex5) [3] 부터 끝까지 제거하기
const d5 = arr2.splice(2);
console.log("🚀 ==>", arr2);

// ex6) 복원하기
arr2.splice(2, 0, ...d5);
console.log("🚀 ==>", arr2);

// ex7) [1,2, 'X', 'Y', 'Z', 4, 5] 만들기
// - 방법1) 3부터 모두 지우고 'X', 'Y', 'Z', 4, 5 추가
arr2.splice(2, Infinity, "X", "Y", "Z", 4, 5);
console.log("🚀 7-1 ===>", arr2);

// - 방법2) 3만 지우고 'X', 'Y', 'Z' 추가
arr2.splice(2, 3, 3);
console.log("🚀 ==>", arr2);
arr2.splice(2, 1, "X", "Y", "Z");
console.log("7-2 ===>", arr2);

// ex8) 위 7번 문제를 splice를 사용하지 말고 작성하시오.
const a8 = [...arr2.slice(0, 2), "X", "Y", "Z", ...arr2.slice(-2)];
console.log("🚀 a8:", a8);
