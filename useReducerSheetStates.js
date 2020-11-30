import React, { useState, useReducer } from "react";
import ReactDOM from "react-dom";
import friendlyWords from "friendly-words";
import "./index.css";

let backgrounds = [
  "Noble",
  "Urchin",
  "Folk Hero",
  "Acolyte",
  "Criminal",
  "Hermit",
  "Guild Artisan",
  "Sage",
];

// 1. Replace the useStates with a useReducer
// 2. Move our useReducer into a custom hook

function randomBackground() {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
}

function randomName() {
  let array = friendlyWords.predicates;
  let string = array[Math.floor(Math.random() * array.length)];
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function App() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "ERROR":
          return { ...state, error: action.error };
          break;
        case "DARKMODE":
          return { ...state, darkMode: !state.darkMode };
          break;
        case "BACKGROUND":
          return { ...state, background: action.background };
          break;
        case "NAME":
          return { ...state, name: action.name };
          break;
        case "NULL":
          return { ...state, error: null };
          break;
        default:
          return state;
      }
    },
    {
      darkMode: false,
      name: "",
      background: "",
      error: null,
    }
  );

  // let initialState = { darkMode: true, name: "", background: "", error: null };

  const { darkMode, name, background, error } = state;

  //  let [darkMode, setDarkMode] = useState(false)
  //  let [name, setName] = useState('')
  //  let [background, setBackground] = useState('')
  //  let [error, setError] = useState(null)

  function handleBackgroundSelect(event) {
    let value = event.target.value;
    dispatch({ type: "BACKGROUND",  background: value });
    if (!backgrounds.includes(value)) {
      dispatch({ type: "ERROR", error: "This background is not exist" });
    } else {
      dispatch({ type: "NULL" });
    }
  }

  return (
    <>
      <div className={`App ${darkMode ? "darkmode" : ""}`}>
        <button
          onClick={() => {
            dispatch({ type: "DARKMODE" });
            // setDarkMode(!darkMode);
          }}
        >
          Dark Mode {darkMode ? "ON" : "OFF"}
        </button>{" "}
        <br />
        <input
          type="text"
          placeholder="Type your name"
          value={name}
          onChange={(event) => {
            dispatch({ type: "NAME", name: event.target.value });
            if (event.target.value.length > 15) {
              dispatch({ type: "ERROR", error: "Name is WAY too long bucko" });
            }
          }}
        />
        <select value={background} onChange={handleBackgroundSelect}>
          {backgrounds.map((b) => {
            return <option key={`bg-${b}`}>{b}</option>;
          })}
        </select>
        {error && (
          <div className="error">
            {error}
            <button
              onClick={() => {
                dispatch({ type: "NULL" });
                // setError(null);
              }}
            >
              Dismiss
            </button>
          </div>
        )}
        <div className="sheet">
          <h3>Name: {name}</h3>
          <h3>Background: {background}</h3>
        </div>
        <button
          onClick={() => {
            dispatch({ type: "NAME", name: randomName() });
            dispatch({ type: "BACKGROUND", background: randomBackground() });
            // setName(randomName());
            // setBackground(randomBackground());
          }}
        >
          Do it all for me instead
        </button>
      </div>
    </>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
