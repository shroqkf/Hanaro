function trycatchFn() {
  try {
    throw new Error("오류났어요!");
  } catch (err) {
    console.error(err);
  } finally {
    console.log("finally!!!");
  }
}

const promiseThrow = () =>
  new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        // throw new Error('오류났어요!');
        if (Math.random() > 0.5) reject(new Error("오류났어요!"));
        resolve(999);
      }, 1000);
    } catch (err) {
      console.error("catch>>", err);
    } finally {
      console.log("finally!!!");
    }
    console.log("Then End");
  });

// promiseThrow()
//   .then(console.log)
//   .catch(err => console.log('PromiseCatch:', err));

const asyncThrow = async () => {
  try {
    const res = await promiseThrow();
    console.log("🚀 res:", res);
  } catch (err) {
    console.error("catch>>", err);
  } finally {
    console.log("finally!!!");
  }
};

asyncThrow();


