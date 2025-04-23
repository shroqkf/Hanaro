// 다음 TypeScript 파일을 오류가 없도록 작성하시오.
import assert from "assert";

type Prop = string | number | symbol;

declare global {
  interface Array<T> {
    firstObject: T;
    lastObject: T;
    mapBy: (prop: Prop) => any[];
    filterBy: (prop: Prop, value: unknown, isInclude?: boolean) => T[];
    findBy: (prop: Prop, value: unknown) => T;
  }
}
const arr = [1, 2, 3, 4, 5];
const hong = { id: 1, name: "Hing" };
const kim = { id: 2, name: "Kim" };
const lee = { id: 3, name: "Lee" };
const users = [hong, lee, kim];

Object.defineProperties(Array.prototype, {
  firstObject: {
    get() {
      return this[0];
    },
    set(value) {
      this[0] = value;
    },
  },
  lastObject: {
    get() {
      return this.at(-1);
    },
    set(value) {
      this[this.length - 1] = value;
    },
  },
});

assert.deepStrictEqual([arr.firstObject, arr.lastObject], [1, 5]);

assert.deepStrictEqual(users.firstObject, hong);
assert.deepStrictEqual(users.lastObject, kim);

Array.prototype.mapBy = function (prop) {
  return this.map((a) => a[prop]);
};
assert.deepStrictEqual(users.mapBy("id"), [1, 3, 2]);
assert.deepStrictEqual(users.mapBy("name"), ["Hing", "Lee", "Kim"]);

Array.prototype.filterBy = function (prop, value, isInclude) {
  return this.filter((a) =>
    isInclude ? a[prop].includes(value) : a[prop] === value
  );
};
assert.deepStrictEqual(users.filterBy("id", 2), [kim]);
assert.deepStrictEqual(users.filterBy("name", "i", true), [hong, kim]); // key, value일부, isInclude

Array.prototype.findBy = function (prop, value) {
  return this.find((a) => a[prop] === value);
};
assert.deepStrictEqual(users.findBy("name", "Kim"), kim);

users.firstObject = kim;
assert.deepStrictEqual(users.firstObject, kim);
users.lastObject = hong;
assert.deepStrictEqual(users.lastObject, hong);
