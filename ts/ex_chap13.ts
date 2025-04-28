// ex1 - 두 타입을 합치는 Combine 유틸리티 타입 만들기
// * 힌트: 두 타입의 같은 key 라면 union type, 그렇지 않다면 각 타입의 key type
// - 공통키: 키들의 교집합(keyof T & keyof U)

// cf. 키들의 합집합: keyof (T & U)
//     키들의 교집합: keyof T & keyof U

interface IUser {
  id: number;
  age: number;
  name: string;
}

interface IDept {
  id: number;
  age: string;
  dname: string;
  captain: string;
}

// type Combine<T, U> = < 이 부분을 작성하세요 >
type Combine2<T, U> = {
  [k in keyof (T & U)]: k extends keyof T
    ? k extends keyof U
      ? T[k] | U[k]
      : T[k]
    : k extends keyof U
    ? U[k]
    : never;
};

type Combine1<T, U> = {
  [k in keyof (T & U)]: k extends keyof T & keyof U
    ? T[k] | U[k]
    : k extends keyof T
    ? T[k]
    : (T & U)[k];
};

type CombineGood<T, U> = {
  [k in keyof (T & U)]: k extends keyof T & keyof U ? T[k] | U[k] : (T & U)[k];
};

type ICombined = CombineGood<IUser, IDept>;

let combineX: ICombined = {
  id: 0,
  age: 33,
  name: "aaa",
  dname: "bbb",
  captain: "ccc",
};
let combineY: ICombined = {
  id: 0,
  age: "33세",
  name: "aaa",
  dname: "bbb",
  captain: "ccc",
};

// ex2 - 특정 함수의 인자 타입을 추출하는 유틸리티 타입을 작성하시오. (infer)
// type FirstArgs<F> = < 이 부분을 작성하세요 >
// type SecondArgs<F> = < 이 부분을 작성하세요 >
// type Args<F> = < 이 부분을 작성하세요 >

type FirstArgs<F> = F extends (arg1: infer A, ...args: any) => any ? A : never;

type SecondArgs<F> = F extends (arg1: any, arg2: infer B, ...args: any) => any
  ? B
  : never;

type Args<F> = F extends (...args: infer P) => any ? P[number] : never;

function add(a: number, b: string) {
  return `${a}-${b}`;
}

type A = FirstArgs<typeof add>; // number
type B = SecondArgs<typeof add>; // string
type C = Args<typeof add>; // string | number

type AX1 = Args<typeof String.prototype.endsWith>;
// ⇒ string | number | undefined
type AX2 = Args<typeof String.prototype.charAt>;
// ⇒ number

// ex3 - 두 타입을 합치고 일부는 제외하는 CombineExclude 유틸리티 타입 만들기
// * 힌트: 두 타입의 같은 key 라면 union type, 그렇지 않다면 각 타입의 key type
interface IUser {
  id: number;
  age: number;
  name: string;
}

interface IDept {
  id: number;
  age: string;
  dname: string;
  captain: string;
}

// cf) type ExcludeX<T, U> = T extends U ? never : T;

// type CombineExclude<T, U> = < 이 부분을 작성하세요 >
type Combine<T, U> = {
  [k in keyof (T & U)]: k extends keyof T & keyof U ? T[k] | U[k] : (T & U)[k];
}; // 객체

// Exclude는 유니온에 대해 적용됨
type CombineExclude<T, U, E extends keyof Combine<T, U>> = {
  [k in Exclude<keyof Combine<T, U>, E>]: Combine<T, U>[k];
};

type ICombineExclude = CombineExclude<IUser, IDept, "name" | "dname">;

let combineExclude: ICombineExclude = {
  id: 0,
  age: 33,
  captain: "ccc",
};

// ex4 - regist 함수가 다음과 같을 때 파라미터 처리를 해보세요.
function registUserObj({ name, age }: { name: string; age: number }) {
  const id = 100;
  return { id, name, age };
}

// type RegistUserObj = Parameters<이용하여 이 부분을 작성해 보세요>;
type RegistUserObj = Parameters<typeof registUserObj>[number];

const paramObj: RegistUserObj = { name: "Hong", age: 32 };
const newUser2 = registUserObj(paramObj);
console.log("🚀  newUser2:", newUser2);

// ex5 - debounce와 throttle 함수를 TypeScript로 작성하시오.
// 방법1) …args를 Generic으로!
// 방법2) cb 을 Generic으로!

const debounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  cb: T,
  delay: number = 1
) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<typeof cb>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(cb, delay, ...args);
  };
};

const throttle = <T>(cb: (...args: T[]) => any, delay: number = 1) => {
  let timer: ReturnType<typeof setTimeout> | null;
  return (...args: T[]) => {
    if (timer) return;
    timer = setTimeout(() => {
      cb(...args);
      timer = null;
    }, delay);
  };
};

// test
const debo = debounce((a: number, b: string) => console.log(a + 1, b), 1000);
for (let i = 10; i < 15; i++) debo(i, "abc"); // 15, 'abc'

const thro = throttle((a: number) => console.log(a + 1), 1000);
for (let i = 10; i < 15; i++) thro(i); // 11

// ex6 - JS 시간에 작성했던 memoized 함수를 범용성을 고려하여 TS로 작성하시오.

// .tsx 파일에서는 제네릭을 사용할 때 화살표함수가 아닌 function으로 작성해야 한다.
// Parameters<T>의 type은 함수의 아규먼트의 튜플
function memoized<T extends (...args: Parameters<T>) => ReturnType<T>>(fn: T) {
  const cache: Record<string, any> = {};
  return function (...args: Parameters<T>) {
    const k = [...args].join();
    // const k = [...args].sort().join();
    return k in cache ? cache[k] : (cache[k] = fn(...args));
  };
}

// test
const memoizeAdd = memoized((a: number, b: number) => {
  return a + b;
});

console.log(memoizeAdd(1, 2)); // 3
console.log(memoizeAdd(3, 4)); // 7

const memoizeFactorial = memoized((n: number): number => {
  if (n <= 1) return 1;

  return n * memoizeFactorial(n - 1);
});

console.log(memoizeFactorial(1)); // 1
console.log(memoizeFactorial(3)); // 6

export {};
