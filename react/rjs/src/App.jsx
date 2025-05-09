import { useState } from "react";
import "./App.css";

// const StatePool = {};
// function useState(initValue) {
//   if (!StatePool._x) {
//     StatePool._x = initValue;
//   }

//   const obj = {
//     get x() {
//       console.log('🚀 getx:', StatePool._x);
//       return StatePool._x;
//     },
//     setX(newValueOrFn) {
//       console.log('🚀 setX:', typeof newValueOrFn);
//       if (typeof newValueOrFn === 'function') {
//         StatePool._x = newValueOrFn(StatePool._x);
//         console.log('🚀 setx:', StatePool._x);
//       } else {
//         StatePool._x = newValueOrFn;
//       }

//       React.rerender();
//       App();
//     },
//   };

//   return [obj.x, obj.setX];
// }

function App() {
  const [count, setCount] = useState(1);
  let x = 100;
  console.log("*****************", count, x);
  const str = `${x}`;
  // console.log("🚀 str:", str, count, StatePool);
  console.log("🚀 str:", str, count);

  const plusCount = () => {
    console.log("🚀 x1:", x, count);
    setCount((count) => count + 1);
    x = x + 1;
    console.log("🚀 x2:", x, count);
  };

  return (
    <>
      <h1>Vite React {x}</h1>
      <div className="card">
        <button onClick={plusCount}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
