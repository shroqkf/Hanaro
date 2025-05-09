import { useState, version } from "react";
import "./App.css";

function MyButton({ onClick }) {
  return <button onClick={onClick}>MyButton</button>;
}

const HONG = { name: "Hong", hobbies: ["Bike", "Tennis"] };

const AboutMe = ({ myinfo }) => {
  const { name, hobbies } = myinfo;
  return (
    <>
      <h1>{name}</h1>
      <ul style={{ listStyle: "none" }}>
        {hobbies.map((hobby) => (
          <li key={hobby}>{hobby}</li>
        ))}
      </ul>
    </>
  );
};

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <h1>Vite + React {version} </h1>
      <MyButton onClick={() => setLoggedIn(!isLoggedIn)} />
      {isLoggedIn ? <AboutMe myinfo={HONG} /> : <h3>Login Form</h3>}
    </>
  );
}

export default App;
