const user = {
  "": 1,
  " ": 1, // 'id': 1, '0y': 2 모두 OK!
  123: 1, // user[123], user['123'] OK, but user.123 is SyntaxError!!
  12345n: 2, // user[12345], user[12345n], user['12345'] OK, but user['12345n'] is undefined!
  true: 1, // OK  user[true]  user.true
  id: 2,
  [`name`]: "Hong", // But, `name`: 'Hong'은 SyntaxError: Unexpected template string!
  [Symbol()]: "Hong", // OK But, Symbol(): 'Hong'은 SyntaxError: Unexpected token ':'
  [`${new Date()}`]: 365, // OK! 'Sun Jul …': 365
  "my-friends": ["Han", "Kim"],
  getInfo: () => `${this.id}-${this.name}`, // OK! But, this is not user!
  getInfo() {
    return `${this.id}-${this.name}`;
  }, // OK! getInfo의 최종 <f.o>
};
console.log(user);

const keys = Object.keys(user);
console.log(keys); // ['123', '12345n', 'true', 'id', 'my-friends', 'getInfo']

const k = "id";
const { [k]: kk } = user; // kk = user[k] = 2

const oth = user[123]; // 1

const a = {};
const b = { k: 1 };
const c = { k: 2 };

a[b] = 77; // a['[object Object]'] = 77
a[c] = 99; // a['[object Object]'] = 99
console.log(a[b], a[c], a); // 99 99 { '[object Object]': 99 }

const entries2 = [];
for (let k of Object.keys(user)) {
  entries2.push([k, user[k]]);
}

delete user.id;
const hasId = "id" in user; // false
const hasId2 = user.hasOwnProperty("id"); // true

const ooo = Object(123);
console.log("🚀 ooo:", ooo);

class Dog {
  id = 1;
  static x = 2;
}
const dogId = Dog.id;
const dogX = Dog.x;
console.log(dogId, dogX); // undefined 2

const naxx = new Dog.id();
console.log(naxx); // 1

user.age = 33;
const des = Object.getOwnPropertyDescriptor(user);
Object.defineProperty(user, "age", { value: 39, writable: false });
console.log(des); // { value: 1, writable: true, enumerable: true, configurable: true }
user["123"] = 999;
console.log(user["123"]); // 999
