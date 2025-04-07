const n = 1;
const b = true; // boolean은 1 바이트
const nb = n + b;
console.log("🚀 ~ nb:", nb);

// const nil = null;
const nil = [];
const n_nil = n + nil;
console.log("🚀 ~ n_nil:", n_nil);

const undef = undefined;
const n_undef = n + undef;
console.log("🚀 ~ n_undef:", n_undef);

console.log("==========================");
let x = 5;
console.log(-10 * -x * -2);

console.log("==========================");

switch (n) {
  case 1:
    console.log("one");
  case 4:
    console.log("four");
  default:
    console.log("end");
}
