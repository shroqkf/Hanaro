globalThis.name = "Global Name"; // 전역 객체의 name 속성
this.name = "Module Name"; // 모듈 객체의 name 속성

const dog = {
  name: "Maxx",
  showMyName() {
    console.log(`My name is ${this.name}.`);
  },
  whatsYourName() {
    setTimeout(this.showMyName.bind(this), 1000); // 1번 답안

    // bind보다 화살표 함수가 더 일반적
    setTimeout(() => {
      console.log("f.this >>", this); // 화살표 함수의 this는 상위 스코프의 this를 가리킴
      this.showMyName();
    }, 1000); // 2번 답안
  },
};

dog.whatsYourName();

const weekName = () => weekNo => {
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];
  return weeks[weekNo];
};

const getWeekName = weekName(); // closure

// const getWeekName = function (weekNo) {
//   return `${weeks[weekNo]}요일`;
// };

const day = new Date().getDay();
console.log(`오늘은 ${getWeekName(day)}요일 입니다!`);
