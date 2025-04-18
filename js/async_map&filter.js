// map에서의 실수
//  - 각각이 별도 Promise(thread)로 실행 (async는 Promise를 반환한다!!)

const afterTime = (sec) =>
  new Promise((resolve) => setTimeout(resolve, sec * 1000, sec));
console.time("MapTime");
const mapResult = [1, 2, 3].map(async (val, i) => {
  const r = await afterTime(val);
  console.log("🚀 r:", r, i);
  if (i === 2) console.timeEnd("MapTime", i);
  return r;
});
console.log("mapResult=", mapResult);

const mapResults = [1, 2, 3].map((val) => afterTime(val));
console.log("🚀 mapResults:", mapResults);
// const results = await Promise.allSettled(mapResults);
const results = await Promise.all(mapResults);
console.log("🚀 results:", results);


// filter에서의 실수
//  - 각각이 Promise(thread) 반환. 즉 Never False!!

// TryThis) 다음과 같이 출력되도록 병렬 실행하는 코드를 작성하시오.
// const rrr = <이 부분을 작성하세요>;
// console.log('odds=', rrr);

const odds = (await Promise.all([1, 2, 3].map(afterTime))).filter((r) => {
  console.log("r: ", r);
  return r % 2;
});
console.log("odds=", odds);
