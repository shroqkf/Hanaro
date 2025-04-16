const hong = { id: 1, name: "Hong" };
const m = new Map();
m.set(1, 100);
m.set(2, 200);
m.set(hong, hong.name);
m.set(2, 222);
m.delete(1);
console.log("m: ", m, m.has(hong));

const keys = m.keys();
console.log("🚀 keys:", keys);

const s = new Set([1, 2, "3"]);
s.add(4);
s.add(hong);
console.log("s: ", s, s.has(hong), [...s]);

// ---------------------------------------------------------

const ws = new WeakSet();
const ss = new Set();
const obj3 = { id: 1 };
ws.add(obj3);
ss.add(obj3);

{
  let obj1 = { id: 1 };
  const obj2 = { id: 2 };
  ws.add(obj1);
  ss.add(obj1);

  ws.add(obj2);
  ss.add(obj2);

  obj1 = null; // obj1 주소 변경
  console.log(ws, ws.has(obj1));
  console.log(ss, ss.has(obj1));
}

console.log(ss.size, ws.size);
console.log("ws>", ws, ws.has(obj3));
console.log("ss>>", ss, ss.has(obj3));

