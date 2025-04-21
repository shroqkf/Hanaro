// type S = string; // alias
const myName = "chanyoung";

let age: number;
age = 33;

let lastName: string | boolean = "King";
lastName = true;

console.log("🚀 age:", age);

console.log("🚀 myName:", myName);

// type Name = string; // 타입 별칭(type alias)
type Name = "Noh" | "Kim" | "Lee"; // StringLiteral Type
let nm: Name = "Noh"; // nm의 type = 'Noh

type SomeType = {
  id: string | number;
  name: Name;
  age: number;
  address: string;
};

const somthing = ({ id, name, age, address }: SomeType) => {
  console.log(id, name, age, address);
};

const user: SomeType = { id: 1, name: "Noh", age: 25, address: "Seoul" };
somthing(user);

let x: string | undefined = Math.random() > 0.5 ? "str" : undefined;
let y: string | number | undefined = x;
let z: string;

if (x) z = x;
if (typeof x === "string") z = x;

type Member = {
  name: string;
  addr: string;
  discountRate: number;
};

type Guest = {
  name: string;
  age: number;
};

type Customer = Member | Guest;
type MemberGuest = Member | Guest;

let cust: Customer;
let m: Member;
let g: Guest;
let mg: MemberGuest;

cust = {
  name: "홍길동",
  addr: "용산구",
  discountRate: 0.1,
};

// instanceof
if (cust instanceof Object) cust = { name: "", age: 0 };

// m = cust;
mg = cust;
cust = {
  name: "홍길동",
  addr: "용산구",
  discountRate: 0.1,
  age: 26,
};

// type guard
if ("addr" in cust) m = cust;
if ("age" in cust) g = cust;

let arr: number[];
arr = [1, 2, 3];
const xarr = Math.random() > 0.5 ? [1, 2, 3] : 123;
// const xarr = Math.random() > 0.5 ? ["x"] : 123;

// if (Array.isArray(xarr) && typeof xarr[0] === "number") arr = xarr;
if (Array.isArray(xarr) && typeof xarr[0] === "number") arr = xarr;
