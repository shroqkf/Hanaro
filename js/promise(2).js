const promi = new Promise((resolve, reject) => {
  setTimeout(() => {
    const now = Date.now();
    if (now % 2 === 0) resolve(console.log("fulfill", now));
    else reject(new Error("어디로?"));
  }, 1000);
});

console.log(promi);

promi.then(
  (succ) => console.log("Resolve!", succ, promi),
  (err) => console.log("Reject!", err, promi)
);

const promiseFn = (id = 1) =>
  new Promise((resolve, reject) => {
    console.log("id>>", id);
    if (id < 7) resolve(id + 1);
    else reject(new Error("어디로?" + id));
  });

console.log("---------------------------------------------------------------");

promiseFn() // 1
  .then((res) => {
    console.log("res1>>", res); // 2
    promiseFn(res); // 2
  })
  .then((res) => {
    console.log("res2>>", res); // undefined
    return promiseFn(res ?? 3); // 3
  })
  .then(promiseFn) // 4
  .then((res) => {
    console.log("res3>>", res); // 5
    return promiseFn(res); // 5
  })
  .then(() => promiseFn(4)) // 4 ← fist then callback
  .then((res) => promiseFn(res)) // 6
  .catch((err) => console.log("Error!!>>", err));


