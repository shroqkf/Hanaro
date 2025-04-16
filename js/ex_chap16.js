// 1970년 1월 1일과 1970년 1월 2일의 차이를 초로 나타내시오.
// 단 중복 안되고
// const day1 = new Date(1970, 1, 1);
const day = new Date();
day.setTime(0);
console.log("🚀 day1:", day);

const day_time = day.getTime();
day.setDate(2);
console.log("🚀 day1:", day, day.getTime() - day_time) / 1000;

// 이 달의 날짜 5개를 무작위로 만들어 역순으로 정렬하시오.
const random = (s, e) => s + Math.floor((e - s + 1) * Math.random());

const today = new Date();
today.setMonth(today.getMonth() + 1);
today.setDate(0);
const endOfDay = today.getDate();
console.log("🚀 today:", today, endOfDay);

const days = [];
do {
  const r = random(1, endOfDay);
  if (!days.includes(r)) days.push(r);
} while (days.length < 5);
// for (let i = 0; i < 5; i++) {
//   days.push(random(1, endOfDay));
// }
console.log("🚀 days:", days);
const yyyy = today.getFullYear();
const mm = (today.getMonth() + 1).toString().padStart(2, 0);
const results = days
  .sort((a, b) => (a < b ? 1 : -1))
  .map((day) => `${yyyy}-${mm}-${day.toString().padStart(2, 0)}`);
console.log("🚀 results:", results);

// 내년(2025년)의 오늘의 요일을 출력하시오.
const td = new Date();
td.setFullYear(td.getFullYear() + 1);
console.log("🚀 td:", td, td.getDay());
console.log("Next year >>> ", "일월화수목금토"[td.getDay()]);

// 오늘로 부터 100일 후의 날짜는?
const td2 = new Date();
td2.setDate(td2.getDate() + 100-1);
console.log("🚀 td2:", td2);
