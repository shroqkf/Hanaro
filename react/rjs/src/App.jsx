import { useState, version } from "react";
import "./App.css";

function MyButton({ onClick, className }) {
  return <button className={className} onClick={onClick}>MyButton</button>;
}

const HONG = { name: "Hong", hobbies: ["Bike", "Tennis"] };

const AboutMe = ({ myinfo }) => {
  const { name, hobbies } = myinfo;
  return (
    <div>
      <h1>{name}</h1>
      <ul style={{ listStyle: "none" }}>
        {hobbies.map((hobby) => (
          <li key={hobby}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div className="flex flex-col m-5 justify-center items-center">
      <h1 className="text-3xl mb-4 font-bold">Vite + React {version} </h1>
      <MyButton onClick={() => setLoggedIn(!isLoggedIn)} className="bg-blue-300 text-white rounded-xl p-3 hover:bg-blue-500 mb-60" />
      {isLoggedIn ? <AboutMe myinfo={HONG} /> : <h3>Login Form</h3>}
    </div>
  );
}

export default App;
