function add(a: number, b: number) {
  return a + b;
}

const s = "abc";

// return 타입은 꼭 명시하지 않아도 됨
const add2 = (a: number, b: number): number => a + b;
const add3 = (a: number, b: number) => a + b;

const introduce = (name: string, height?: number) => {
  console.log(`이름 : ${name}`);
  if (height && height > 0) console.log(`키 : ${height + 10}`);
  //   if (typeof height === "number") console.log(`키 : ${height + 10}`);
  //   console.log(`키 : ${height + 10}`); //Error : 'height' is possibly 'undefined'.
};

introduce("김현준"); // OK
introduce("김현준", undefined); // OK
introduce("김현준", 170); // OK

console.log(
  "-----------------------------------------------------------------"
);

const introduce2 = (name: string, height?: number) => {
  console.log(`이름 : ${name}`);
  if (typeof height === "number") {
    // → 내로잉을 통해서 타입 좁혀줌
    console.log(`키 : ${height + 10}`);
  }
};
introduce2("김현준2"); // OK
introduce2("김현준2", undefined); // OK
introduce2("김현준2", 170); // OK

console.log(
  "-----------------------------------------------------------------"
);

const introduce4 = (name: string, height = 0) => {
  console.log(`이름 : ${name}`);
  console.log(`키 : ${height + 10}`);
};

introduce4("김현준4"); // OK
introduce4("김현준4", undefined);
introduce4("김현준4", 170);

//Error: Argument of type 'string' is not assignable to parameter of type 'number'.

function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

const aFactorial = (n: number): number => {
  if (n <= 1) return 1;
  return n * aFactorial(n - 1);
};

const af = (n: number): number => (n <= 1 ? n : n * af(n - 1));

// 선언된 타입의 위치에 제공된 함수의 매개변수 타입을 유추
let singer: (song: string) => string;

singer = function (song) {
  // song : string의 타입
  return `Singing : ${song.toUpperCase()}!`; // OK
};

const arr3 = [1, 2, 3];
arr3.map((a, i) => a + i);

// void 반환 타입
function ff(params: number) {
  console.log("ff");
}

type F = () => void;
const f5: F = () => {};
const f6: Function = (n: string) => {};
const obj: Object = {};

// this
function tfn(this: { id: number }, X: string) {
  console.log("tfn>>", this.id);
}
// bind되는 this의 타입을 적어야 한다. 매개변수 자리의 첫번째 this가 bind 되는 this 값이다.
tfn.bind({ id: 1 })("X");

// not this
function ntfn(this: void, X: string) {
  console.log("tfn>>", X);
}
ntfn("Y");
