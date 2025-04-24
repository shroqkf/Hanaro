// ex1 - 타입 서술어 (Type Predicate)
const isStringNumber = (value: unknown): value is [string, number] =>
  // <아래 부분을 작성하시오>
  Array.isArray(value) &&
  typeof value[0] === "string" &&
  typeof value[1] === "number";

const f1 = (value: number | string | boolean | [string, number]) => {
  if (isStringNumber(value)) {
    console.log(value[0].toUpperCase(), value[1].toFixed());
  }
};

f1(["item", 1000]);

interface Animal {}
interface Dog extends Animal {
  name: string;
}
interface Cat extends Animal {
  punch(): void;
}
class Retriever implements Dog {
  constructor(public name: string) {}
}

function isDog(a: Animal): a is Dog {
  // <아래 부분을 작성하시오>
  return "name" in a && typeof a.name === "string";
}

const maxx: Dog = { name: "Maxx" };
if (isDog(maxx)) console.log(maxx.name, "is Dog!");

const gunhee = new Retriever("Gunhee");
if (isDog(gunhee)) console.log(gunhee.name, "is Dog!");

console.log("------------------------------------------------------------");

// ex2 - keyof - typeof
// 문제1) 다음에서 T1과 동일한 타입으로 T2를 정의하시오.
const cart = {
  X: 1,
  Y: 2,
  Z: 3,
};

type T1 = "X" | "Y" | "Z";
type T2 = keyof typeof cart;

// 문제2) 다음에서 T3과 동일한 타입으로 T4를 정의하시오.
const constCart = {
  X: 1,
  Y: 2,
  Z: 3,
} as const;

type T3 = 1 | 2 | 3;
type ConstCart = typeof constCart;
type T4 = ConstCart[keyof ConstCart];

const xCart = { x: 1, y: "str" } as const;
type XCart = typeof xCart;
type T5 = XCart[keyof XCart];

type ValueOf<T> = T[keyof T];
type T44 = ValueOf<typeof constCart>;
type T55 = ValueOf<typeof xCart>;

console.log("------------------------------------------------------------");

// ex3 - 다음에서 '가', '나', '다' 어떤 걸 throw 해도 에러 메시지를 출력하도록 (라) 부분을 수정하시오. (type predicate)

interface IErrorWithMessage {
  message: string;
}

const isErrorWithMessage = (error: unknown): error is IErrorWithMessage =>
  typeof error === "object" &&
  error !== null &&
  "message" in error &&
  typeof error.message === "string";
// (error as Record<string, unknown>).message === 'string'

const toErrorWithMessage = (error: unknown) =>
  isErrorWithMessage(error) ? error : new Error(JSON.stringify(error));

try {
  // throw new Error('some error!!!!');   // 가
  // throw 'some string error!!!';        // 나
  throw ["some", "array", "error"]; // 다
} catch (error) {
  console.log(toErrorWithMessage(error).message); // (라)
}

export {};
