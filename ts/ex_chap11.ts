// ex1 - 특정 key의 타입을 변경하는 Change 유틸리티 타입 만들기
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

// type Change<T, K extends keyof T, U> = < 이 부분을 작성하세요 >
type Change<T, K extends keyof T, U> = {
  [k in keyof T]: k extends K ? U : T[k];
};
type DeptCaptain = Change<IDept, "captain", IUser>;
// type Err = Change<IDept, "xxx", IUser>; // 존재하지 않는 키는 Error!!!

// ex2 - 다음 코드가 오류가 나지 않도록 수정하시오. 단, itemPrices의 item에는 재고(stock)에 있는 item들만 가능합니다.
type Item = { item: string; price: number };
// type ItemPrice<T, U> = < 이 부분을 작성하세요 >
type ItemPrice<T, U> = {
  [k in keyof T]: k extends "item" ? keyof U : T[k];
};

const stock = { X: 1, Y: 2, Z: 30 };

const itemPrices: ItemPrice<Item, typeof stock>[] = [
  { item: "X", price: 1000 },
  { item: "Y", price: 2000 },
  { item: "Z", price: 3000 },
];

const total = itemPrices.reduce(
  (curr, itemPrice) => curr + stock[itemPrice.item] * itemPrice.price,
  0
);

// ex3 - 다음 deleteArray 함수를 제네릭으로 작성하시오
type TPropertyKeyType = string | number | symbol;
type TUser = { [key: string]: string | number };

function deleteArray<T>(
  arr: T[],
  startOrKey: number | keyof T,
  endOrValue?: number | T[keyof T]
) {
  if (typeof startOrKey === "number") {
    if (typeof endOrValue === "number") {
      return arr.filter((_, i) => i < startOrKey || i > endOrValue - 1);
    }
    return arr.slice(0, startOrKey);
  }

  if (typeof startOrKey === "string") {
    return arr.filter((e) => {
      if (e && typeof e === "object") {
        return e[startOrKey] !== endOrValue;
      }
    });
  }

  return [];
}

console.log(deleteArray(arr, 2)); // [1, 2]
console.log(deleteArray(arr, 1, 3)); // [1, 4]
console.log(arr); // [1, 2, 3, 4]

const users = [
  { id: 1, name: "Hong" },
  { id: 2, name: "Kim" },
  { id: 3, name: "Lee" },
];

console.log(deleteArray(users, 2)); // [Hong, Kim]
console.log(deleteArray(users, 1, 2)); // [Hong, Lee]
console.log(deleteArray(users, "id", 2)); // [Hong, Lee]
console.log(deleteArray(users, "name", "Lee")); // [Hong, Kim]

export {};
