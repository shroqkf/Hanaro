console.log(zz);
// ReferenceError: zz is not defined

zz = 9; // 이 라인 실행 시 암묵적 var!
console.log(zz); // OK
console.log(globalThis["zz"]);

var zz;

// node는 모듈을 사용해서 다르지만 브라우저에서 실행하면 같은 값 출력됨
console.log(this);
console.log(globalThis);

function add() {
  return a + B;
}
