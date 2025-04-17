const assert = require("assert");

// 오른쪽과 같은 형태로 출력하는 fmt 함수를 작성하시오.

function fmt(txts, value) {
  return `${txts[0]}${value.toLocaleString().padStart(8)}${txts[1]}`;
}

const total = { price: 45000, vat: 4500 };
console.log(fmt`주문합계: ${total.price}원`);
console.log(fmt`세액합계: ${total.vat}원`);

// 문자열 str에서 대문자만 골라 소문자로 변환하세요. (trythis: 대문자 <-> 소문자)
const upperToLower = (str) =>
  str.replace(/[A-Z]+/g, (foundStr) => foundStr.toLowerCase());

const low = upperToLower("Senior BIG Coding Learning JS");
console.log("🚀 low:", low);

const swapCase정답 = (str) =>
  str?.replace(
    /([A-Z]+)([a-z]*)/g,
    (foundStr, upper, lower) => `${upper.toLowerCase()}${lower.toUpperCase()}`
  );

const swapCase = (str) =>
  str.replace(/([A-Z\s\d]*)([a-z]*)/g, (foundStr, upper, lower) => {
    if (!foundStr?.trim()) return "";
    console.log("call>>", foundStr, upper, lower);
    return `${upper.toLowerCase()}${lower.toUpperCase()}`;
  });
console.log(swapCase("abc Sen,ior efg Coding Learning JS"));

assert.equal(
  swapCase("abc Senior efg Coding Learning JS"),
  "ABC sENIOR EFG cODING lEARNING js"
);
assert.equal(swapCase("Hanaro 7기 Class"), "hANARO 7기 cLASS");

// 전화번호를 정확한 형식으로 출력하는 함수를 작성하시오.
const telfmt = (telno) => {
  const len = telno?.length ?? 0;
  if (len <= 7) return telno;

  if (len === 8) return `${telno.substring(0, 4)}-${telno.substring(4)}`;

  let a = telno.startsWith("02") ? 2 : len > 10 ? len - 8 : 3;
  let b = len - a - 4;
  const reg = new RegExp(`(\\d{${a}})(\\d{${b}})(\\d{4})`);
  return telno.replace(reg, "$1-$2-$3");
};

telfmt("0101234567"); // '010-123-4567'
telfmt("01012345678"); // '010-1234-5678'
telfmt("0212345678"); // '02-1234-5678'
telfmt("021234567"); // '02-123-4567'
telfmt("0331234567"); // '033-123-4567'
telfmt("15771577"); // '1577-1577'
telfmt("07012341234"); // '070-1234-1234'

assert.deepStrictEqual(telfmt("0101234567"), "010-123-4567");
assert.deepStrictEqual(telfmt("01012345678"), "010-1234-5678");
assert.deepStrictEqual(telfmt("0212345678"), "02-1234-5678");
assert.deepStrictEqual(telfmt("021234567"), "02-123-4567");
assert.deepStrictEqual(telfmt("0331234567"), "033-123-4567");
assert.deepStrictEqual(telfmt("15771577"), "1577-1577");
assert.deepStrictEqual(telfmt("07012341234"), "070-1234-1234");
assert.deepStrictEqual(telfmt("050712345678"), "0507-1234-5678");
