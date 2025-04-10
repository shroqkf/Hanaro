const arr = [100, 200, 300, 400, 500, 600, 700];
console.log(
  "------------------------------1번-------------------------------------------"
);
// 배열의 인덱스(키) 출력
for (const i in arr) {
  console.log(i);
}

console.log(
  "------------------------------2번-------------------------------------------"
);
// 배열의 원소(값) 출력
for (const v in arr) {
  console.log(arr[v]);
}

const obj = { name: "Kim", addr: "Yongsan", level: 1, role: 9, receive: false };
console.log(
  "------------------------------3번-------------------------------------------"
);
// 프로퍼티 이름(키) 출력
for (const k in obj) {
  console.log(k);
}

console.log(
  "------------------------------4번-------------------------------------------"
);
// 프로퍼티 값 출력
for (const v in obj) {
  console.log(obj[v]);
}
console.log(
  "------------------------------5번-------------------------------------------"
);
for (const v of Object.values(obj)) {
  console.log(v);
}

console.log(
  "------------------------------6번-------------------------------------------"
);
// level 프로퍼티가 열거(entries)되지 않도록 설정하시오. - Object.defineProperty
Object.defineProperty(obj, "level", {
  enumerable: false,
});
for (const k in obj) {
  console.log(k);
}

console.log(
  "------------------------------7번-------------------------------------------"
);
// role 프로퍼티는 읽기전용으로 설정하시오. - Object.defineProperty
Object.freeze(obj);

console.log(
  "------------------------------8번-------------------------------------------"
);
// 배열을 객체로 만드시오. (makeObjectFromArray)
const data = [
  ["A", 10, 20],
  ["B", 30, 40],
  ["C", 50, 60, 70],
];
function makeObjectFromArray(arrdata) {
  let retObj = {};
  for (const [k, ...v] of arrdata) {
    // retObj[k] = v; // backend
    retObj = { ...retObj, [k]: v }; // front-end
  }

  return retObj;
}
console.log(makeObjectFromArray(data)); // { A: [ 10, 20 ], B: [ 30, 40 ], C: [ 50, 60, 70 ] }

console.log(
  "------------------------------9번-------------------------------------------"
);
// 객체를 다시 배열로 만드시오. (makeArrayFromObject)
function makeArrayFromObject(objdata) {
  let retArr = [];
  for (const [k, v] of Object.entries(objdata)) {
    // retArr.push([k, ...v]);
    retArr = [...retArr, [k, ...v]];
  }
  return retArr;
}
console.log(makeArrayFromObject(makeObjectFromArray(data))); // [ [ 'A', 10, 20 ], [ 'B', 30, 40 ], [ 'C', 50, 60, 70 ] ]

console.log(
  "------------------------------10-1번-------------------------------------------"
);
// 원시값(primitive)만을 갖는 객체 kim을 복사하는 프로그램을 Object의 클래스 메소드 또는 spread(...) 연산자를 사용하지 말고 작성하시오.
// 1) shallow copy
const shallowCopy = (obj) => {
  const newObj = {};
  for (const k in obj) {
    newObj[k] = obj[k];
  }
  return newObj;
};

const kim = { nid: 3, nm: "Kim", addr: "Pusan" };
const newKim1 = shallowCopy(kim);
const newKim11 = { ...kim }; // 더 쉬운 shallow copy 방법
newKim1.addr = "Daegu";
console.log(kim.addr !== newKim1.addr); // true면 통과!

console.log(
  "------------------------------10-2번-------------------------------------------"
);

// 2) 이하 deep copy
const kim2 = {
  nid: 3,
  nm: "Kim",
  nil: null,
  addr: { city: "Pusan", road: "Haeundaero", zip: null, detail: { dong: 123 } },
};
const deepCopy = (obj) => {
  const ret = {};
  for (const [k, v] of Object.entries(obj)) {
    // ret[k] = v !== null && typeof v === 'object' ? { ...v } : v;
    if (v !== null && typeof v === "object") {
      ret[k] = deepCopy(v);
    } else {
      ret[k] = v;
    }
  }
  return ret;
};
const newKim2 = deepCopy(kim2);
newKim2.addr.city = "Daegu";
console.log(kim2.addr.city !== newKim2.addr.city); // true면 통과!
