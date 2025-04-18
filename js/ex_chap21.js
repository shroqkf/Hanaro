// ex1
// 테스트를 위한 임의의 시간(1초 미만)에 resolve를 실행하는 randTime 함수를 작성하시오.
const randTime = (val) =>
  new Promise((resolve, reject) => setTimeout(resolve, Math.random() * 1000));

randTime(100).then(console.log);

[1, 2, 3, 4, 5].forEach((a) => randTime(a).then(console.log));

// ex2
// 다음 코드를 Promise를 이용하여 refactoring 하시오.
setTimeout(function () {
  console.log("depth1", new Date());
  setTimeout(function () {
    console.log("depth2", new Date());
    setTimeout(function () {
      console.log("depth3", new Date());
      throw new Error("Already 3-depth!!");
    }, 3000);
  }, 2000);
}, 1000);

console.log("START!", new Date());

const depthTimer = (sec) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log("depth" + sec, new Date());
      resolve(sec + 1);
    }, sec * 1000)
  );
};

// depthTimer(1)
//   .then((res) => {
//     console.log("res: ", res);
//     return depthTimer(res);
//   })
//   .then(depthTimer)
//   .catch((err) => console.error("Error >> ", err));

// const r1 = await depthTimer(1);
// const r2 = await depthTimer(r1);
// const r3 = await depthTimer(r2);
let r = 1;
while (r <= 3) {
  r = await depthTimer(r);
}
