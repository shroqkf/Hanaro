const obj = {
  name: "ObjName",
  bark() {
    // good!(호출한 객체)
    console.log("bark=", this.name);
  },
  bark2: () =>
    // bad!! (this=전역/module)
    console.log("bark2=", this.name),
};

const o1 = Object.assign({}, obj);
const o2 = Object.create(obj);
Object.prototype.xxx = "xxx";

console.log("o1, o2=", o1.xxx, o2.xxx);

const arr = [1, 2, 3, 4, 5];
console.log("arr: ", arr.length, arr.xxx());
Array.prototype.firstObject = function () {
  return this[0];
};
const fo = arr.firstObject();
console.log("fo=", fo);
return;

const object = {
  name: "Object Name",
  printName() {
    console.log(this.name);
  },
};

const printName = object.printName;
printName(); // 출력 결과: Global Name

// 이전 페이지의 expressFn, arrowFn에 this를 각각 hong과 kim으로 지정해 보세요.
const hong = { id: 1, name: "Hong" };
const kim = { id: 2, name: "Kim" };

const expressFn = function (name) {
  console.log("efn ---->", this.name, name, this instanceof expressFn);
};

const arrowFn = (name) => {
  console.log("afn ---->", this.name, name, name);
};

expressFn.bind(hong)("expFn");
arrowFn.bind(kim)("arrFn");
return;
