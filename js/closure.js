const DC_RATE = 0.5;

function discount() {
  const dcRate = 0.5;
  return function (price) {
    return price * dcRate;
  };
}

// 화살표 함수 활용
const discount2 = () => (price) => price * DC_RATE;

// currying
const MENU = { chinese: ["a", "b"], italian: ["p", "s"] };
function restaurant(kind) {
  const menu = MENU[kind];
  return function (menuIndex) {
    return menu[menuIndex];
  };
}

const lunch = restaurant("chinese");
console.log(lunch(1)); // b

const dinner = restaurant("italian");
console.log(dinner(0), dinner(1)); // p s

// // 다크 모드 개발 시 활용
// const Button = (mode) => () => < Button mode={mode} />;
// const darkButton = Button("dark");

// 출입자 수를 게이트 별로 구하는 함수를 작성하세요
function getCounter() {
  let currCount = 0;
  return {
    plus() {
      currCount += 1;
    },
    minus() {
      currCount--;
    },
    count() {
      currCount;
    },
  };
}

const gate1 = getCounter();
const gate2 = getCounter();

gate1.plus();
gate2.plus();
gate2.minus();

console.log("gate1>>", gate1.count());
console.log("gate2>>", gate2.count());

// 재귀함수
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
const f3 = factorial(3);
console.log("🚀 f3:", f3);
const f5 = factorial(5);
console.log("🚀 f5:", f5);

// 재귀함수처럼 똑같은 로직을 돌리는 함수는 loop로 구현을 많이 함
let n = 3;
let sum = 1;
for (let i = n; i > 0; i -= 1) {
  sum = i * sum;
}
console.log("🚀 result =", sum, "factorial:", n);

// TCO (Tail Call Optimization) ⇒ 함수의 마지막 retutn문이 함수자신만 존재!
function factorialTCO(n, acc = 1) {
  if (n === 1) return acc;
  return factorialTCO(n - 1, n * acc);
}

const result = factorialTCO(3);
console.log("🚀 factorialTCO result:", result);

// 1 ~ n까지의 원소로 이루어진 배열을 만드는 함수를 재귀함수로 작성하시오.
// (단, array 메소드를 사용하지 말고, destructuring을 사용하시오)
function makeArray(n) {
  if (n === 0) return [];
  return [...makeArray(n - 1), n];
}
const resultArr = makeArray(10);
console.log("🚀 resultArr:", resultArr);

function makeReverseArray(n) {
  if (n === 0) return [];
  return [n, ...makeReverseArray(n - 1)];
}
const resultReverseArr = makeReverseArray(10);
console.log("🚀 resultReverseArr:", resultReverseArr);

// 클로저의 활용: memoized function
const memoizedTable = {};
// f(3) {3: 3 * 2, 2: 2 * 1}
// f(5) {5: 120, 4: 24, 3: 6, 2: 2 * 1}
function factorial(n) {
  runCnt += 1; // dummy
  if (n === 1) return 1;
  return memoizedTable[n] || (memoizedTable[n] = n * factorial(n - 1));
}

const mf3 = factorial(3);
console.log("🚀  f3:", f3, runCnt);
runCnt = 0;
const mf5 = factorial(5);
console.log("🚀  f5:", f5, runCnt);
