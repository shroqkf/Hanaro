const n = 123; // 8 바이트 메모리
const bi = 123n; // 16 바이트 메모리

const n_bi1 = n === bi;
console.log("🚀 n_bi1:", n_bi1); // false

const n__bi1 = n == bi;
console.log("🚀 n_bi1:", n__bi1); // true

const nAddbi = BigInt(n) + bi;
console.log("🚀 ~ nAddbi:", nAddbi, typeof nAddbi);

const s = "abc";
const ss = new String("abc");
const s__ss = s == ss;
console.log("🚀 ~ s__ss:", s__ss);
const s___ss = s === ss;
console.log("🚀 ~ s__ss:", s___ss);

const sNum = Number(s);
console.log("🚀 ~ sNum:", sNum);

const ssNum = Number(ss);
console.log("🚀 ~ ssNum:", ssNum);
console.log("Number(s) = Number(ss)", Number(s) == Number(ss));

const sss = `${s} - ${n + Number(bi)}`;
console.log("🚀 ~ sss:", sss);

const s1 = Symbol("foo");
const s2 = Symbol("foo");
const s1_s2 = s1 == s2;
console.log("🚀 ~ s1_s2:", s1_s2); // false

const sk1 = Symbol.for("H");
const sk2 = Symbol.for("H");
const sk1_sk2 = sk1 == sk2;
console.log("🚀 ~ sk1_sk2:", sk1_sk2); // true

const undef = undefined;
const nil = null;
const undef_nil = undef == nil;
const undef__nil = undef === nil;
console.log("🚀 ~ undef_nil:", undef_nil); // true
console.log("🚀 ~ undef__nil:", undef__nil); // false

const hong = { id: 1, name: "Hong" };
let kim = { id: Symbol(), name: "Kim" };
console.log(hong === kim);
kim = hong;
console.log(hong === kim);

const o1 = new Object();
const o2 = {};
console.log("o1===o2", o1 === o2);

const nStr = n.toString();
console.log("🚀 ~ nStr:", nStr, typeof nStr);
const nStr2 = new Number(n).toString();
console.log("🚀 ~ nStr2:", nStr2, typeof n);

const nStr16 = n.toString(16);
console.log("🚀 ~ nStr16:", nStr16);
const nStr16d = parseInt(n.toString(16), 16);
console.log("🚀 ~ nStr16d:", nStr16d);
