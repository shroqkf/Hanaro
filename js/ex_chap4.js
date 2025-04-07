// ex1
for (let i = 0.1; i < 1; i += 0.1) {
  console.log(i, i.toFixed(1));
}

// ex2
for (let i = 1; i <= 10; i++) {
  const root = Math.sqrt(i);
  if (root % 1) console.log("🚀 root:", i, root.toFixed(3));
}

// ex3 - ver1
const today = new Date().getDay();
let weekName;
switch (today) {
  case 0:
    weekName = "일";
    break;
  case 1:
    weekName = "월";
    break;
  case 2:
    weekName = "화";
    break;
  case 3:
    weekName = "수";
    break;
  case 4:
    weekName = "목";
    break;
  case 5:
    weekName = "금";
    break;
  case 6:
    weekName = "토";
    break;
  default:
    weekName = "알 수 없음";
    break;
}
console.log(`오늘은 ${weekName}요일입니다.`);

// ex3 - ver2
const Today = new Date().getDay();
let WeekName = "일월화수목금토"[Today];
console.log("🚀 weekName:", WeekName);

// ex4 - ver1
function plength(n) {
  // 0.1 => '0.1'
  return n.length - Math.trunc(n).toString.length;
}

function addPoints1(a, b) {
  const alen = plength(a);
  const blen = plength(b);
  console.log("🚀 addPoints alen & blen:", alen, blen);
  const result = (a + b).toFixed(alen > blen ? alen : blen);
  console.log("🚀 addPoints result:", result);
}

// ex4 - ver2
function addPoints2(a, b) {
  const p = 10 ** 10;
  const ai = a * p;
  const bi = b * p;
  const ret = Math.trunc(ai + bi) / p;
  console.log("🚀 addPoints2 ret:", ret);
}

// ex4 - ver3(실무용 정답)
function addPoints3(...args) {
  p = 10 ** 10;
  let ret = 0;
  for (const n of args) {
    ret += Math.trunc(n * p);
  }
  ret = ret / p;
  console.log("🚀 addPoints3 ret:", ret);
  console.log(args.join(" + "), "=", ret);
}
addPoints1(0.21354, 0.1); // 0.31354
addPoints2(0.14, 0.28); // 0.42
addPoints3(0.34, 0.226); // 0.566
addPoints1(10.34, 200.226); // 210.566
addPoints2(0.143, -10.28); // -10.137
addPoints3(0.143, -10); // -9.857

// ex5
const prices = [10.34, "xxx", 5.678, null, 20.9, 1.005, 0, 15, undefined, 0.5];

const validPrices = prices.filter((p) => typeof p === "number" && !isNaN(p));
const sum = validPrices.reduce((acc, cur) => acc + cur, 0);
const avg = (sum / validPrices.length).toFixed(2);
console.log("🚀 avg:", avg);

