// ex1
const user1 = { id: 1, name: "Hong", addr: { city: "Seoul" } };

const hong = { id: 1, name: "Hong" };
const lee = { id: 2, name: "Lee" };

function f1({ id, name }) {
  console.log(id, name);
}

f1(user1);

// ex2
const user2 = { id: 1, name: "Hong", passwd: "xxx", addr: "Seoul" };
const { passwd, ...userInfo } = user2; // passwd를 제외하고 userInfo 출력하기 위해 불러옴
console.log(userInfo);

// ex3
const arr = [[{ id: 1 }], [{ id: 2 }, { id: 3 }]];
const [[{ id: id1 }], [{ id: id2 }, { id: id3 }]] = arr; // 모양 맞추기
console.log(id1, id2, id3);

// ex4
const user4 = { name: "Hong", passwd: "xyz", addr: "Seoul" };
function getUserValueExceptInitial(k) {
  // 변수명을 프로퍼티 키로 쓸 때는 대괄호 사용
  const { [k]: val } = user4;
  const [, ...result] = val; // val는 문자열 array
  return result.join("");
}
console.log(getUserValueExceptInitial("name")); // 'ong'
console.log(getUserValueExceptInitial("passwd")); // 'yz'
console.log(getUserValueExceptInitial("addr")); // 'eoul'
