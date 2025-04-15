const assert = require("assert");

// 아래 users 배열에 대하여 추가/수정/삭제하는 순수 함수를 작성하시오.
const hong = { id: 1, name: "Hong" };
const choi = { id: 5, name: "Choi" };
const kim = { id: 2, name: "kim" };
const lee = { id: 3, name: "Lee" };
const park = { id: 4, name: "Park" };
const users = [kim, lee, park]; // 오염되면 안됨!!

const addUser = (user) => [...users, user]; // 앞에 추가
addUser(hong); // [kim, lee, park, hong]
assert.deepStrictEqual(addUser(hong), [kim, lee, park, hong]);
assert.deepStrictEqual(users, [kim, lee, park]);

// const removeUser = (user) => users.filter((u) => u.id !== user.id);
// const removeUser = (user) => users.filter(({ id }) => id !== user.id);
const removeUser = ({ id: pid }) => users.filter(({ id }) => id !== pid);
removeUser(lee); // [kim, park]
assert.deepStrictEqual(removeUser(lee), [kim, park]);
assert.deepStrictEqual(users, [kim, lee, park]);

const changeUser = (
  from,
  to // from: 현재 사람 to: 바꿀 대상
) => users.map((user) => (user.id === from.id ? to : user));

changeUser(kim, choi); // [choi, lee, park]
assert.deepStrictEqual(changeUser(kim, choi), [choi, lee, park]);
assert.deepStrictEqual(users, [kim, lee, park]);
