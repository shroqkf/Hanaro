"use strict"; // strict mode는 ES5부터 도입된 자바스크립트의 엄격한 문법 모드
// package.json의 "type": "module"을 사용하면 자동으로 strict mode가 적용됨

// var와 fuction은 함수 스코프
f = 1;
NaN = 1;
Infinity = 0;
function f(a, a) {
  console.log("outer f", a);
}
delete f; // delete는 객체에 있는 프로퍼티만 삭제 가능
{
  f(100);
  function f(a) {
    console.log("block f", a);
  }
}
f(200);
