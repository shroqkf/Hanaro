type A = {
  name: string;
  age: number;
};

type B = {
  name: string;
  addr: string;
};

const onlyA: A[] = [
  { name: "lim", age: 10 },
  { name: "hong", age: 20 },
];

const onlyB: B[] = [
  { name: "jang", addr: "Seoul" },
  {
    name: "park",
    addr: "Busan",
  },
];

const aOrB = [...onlyA, ...onlyB];

const abobj = {
  name: "Tan",
  age: 30,
  addr: "Incheon",
};

let abx: A | B = abobj;

aOrB.push(abobj);
aOrB.push({ name: "x", age: 20, addr: "xx" });

let aOrB2: [A | B] = [abobj];

type IS = {
  [k: string]: string | number;
  [k: symbol]: boolean;
};

type IS2 = {
  [k: number]: string | number;
  id: number;
};

const sym1 = Symbol("s1");
let isobj1: IS = { id: 1, name: "Hong", 3: 5, [sym1]: false };
let isobj2: IS2 = { 3: 5, id: 3, 7: 77 };

{
  type A = { name: string; addr: string };
  const blockA: A = { name: "Hong", addr: "Busan" };
  console.log("🚀 blockA:", blockA);
}

const outerA: A = { name: "Kim", age: 33 };

function tuple() {
  const a: [number, string, boolean] = [1, "lim", false];
  let b: [number, string] = [a[0], a[1]];
  console.log("🚀 tuple b:", b);
}
tuple();

const greeting = (greet: "Hi" | "Hello", name: string, age: number) => {
  console.log(`${greet}~ ${name}, You are ${age}.`);

  return [name, age] as const;
};

const gr1 = greeting("Hi", "Hong", 33);
console.log("🚀 gr1:", gr1[0]);

const gr2 = greeting("Hi", "Hong", 33);
const gr3 = [gr2[0], "zz"];
console.log("🚀 gr2 age, gr3:", gr2[1], gr3);

const tup: [string, number] = ["Kim", 55];
greeting("Hello", ...tup);

const ary = ["Park", 44];
// greeting("Hello", ary[0], ary[1]);
// greeting("Hello", ...ary);

const arr1 = [1, 2, 3];
const arr2: [number, number, number] = [4, 5, 6];
const arr22 = [4, 5, 6] as const;
console.log("🚀 arr22:", arr22);

type T1 = [string, number];

type AT1 = [number, string, number];
type AT2 = [number, T1]; // [number, [string, number]]
type AT3 = [number, ...T1]; // [number, string, number]
