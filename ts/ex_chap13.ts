// 두 타입을 합치는 Combine 유틸리티 타입 만들기
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
