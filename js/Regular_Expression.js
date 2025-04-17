const str = "Senior Coding Learning JS";

const a = /[A-z\d]/.test(str); // true
console.log("🚀 a:", a);

const b = /(A-z\d)/.test(str); // false
console.log("🚀 b:", b);

const c = /(A-z\d)/.test("XA-z2"); // true
console.log("🚀 c:", c);

const d = /(A-z\d)/.test("XA-z2"); // true
console.log("🚀 d:", d);

const r1 = str.replace(/[A-Z]/, "*"); // str 안에 대문자가 있으면 "*"로 바꾸기
console.log("🚀 r1:", r1);

const regexp1 = new RegExp(/[A-Z]/);
const r11 = regexp1.test(str);
console.log("🚀 r11:", r11);
const r12 = regexp1.exec(str);
console.log("🚀 r12:", r12);

// ex) 정확한 이메일 형식을 지켰는지 체크하는 정규표현식을 작성하시오.
const regex = /^[A-Za-z0-9][\w-\.]*@[\w-]+(\.[A-z]{2,7}){1,2}$/; // 2f_d.f@a.company
regex.test("jade123@topician.com"); // true
regex.test("jade123@topician.store"); // true
regex.test("jade123@topician"); // false
regex.test("ja_de.j-u-n@topician.store"); // true
regex.test("jade@jeon@topician.store"); // false

function xxx(...args) {
  console.log("xxx >> ", args);
}
const star = "Senior Coding Learning JS".replace(
  /[A-Z]/g,
  (foundStr, position) => {
    if (foundStr === "L") return "X" + position;
    return foundStr.toLowerCase() + position;
  }
);
console.log("🚀 star:", star);
