type Xid = { id: number };
type Xname = { name: string };
type Xage = { age: number };
type X = Xname | Xage;
type Y = Xname & Xage;
type Z = string & number; // never

type P = Xid | (Xname & Xage); // a + bc
type Q = Xid & (Xname | Xage); // ab + ac

let xx: X = { name: "Hong" };
xx = { age: 33 };

let yy: Y = { name: "Hong", age: 33 };

let pp: P = { id: 1 };
pp = { id: 1, name: "Noh", age: 25 };
pp = { name: "Noh", age: 25 };

let qq: Q = { id: 2, name: "Noh" };
qq = { id: 2, age: 26 };

interface CallSignature {
  (input: string): number; // call signature
  count: 0; // cf. count: number
  greeting: (name: string) => void;
}

const typedCallSignature: CallSignature = (input) => input.length;

typedCallSignature.count = 0;
typedCallSignature.greeting = (name) => console.log(`Hi, ${name}`);

// Index Signature
interface Novel {
  title: string; // 필수 속성 (실제 사용할 속성)
  [key: string]: string | number | boolean;
}
const novel: Novel = {
  title: "novel",
  page: 130,
};
