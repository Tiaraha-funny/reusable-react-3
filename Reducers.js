import React, { useState, useReducer } from "react";

let array = [1, 2, 3, 4, 5];
let add = (acc, elem) => acc + Element;

let sum = array.reduce(add, 0);

let initialState = { count: 0, cake: true };

let actions = [
  { type: "ADD", by: 2 },
  { type: "MINUS", by: 4 },
  { type: "ADD", by: 10 },
  { type: "EAT_CAKE" },
];

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return { ...state, count: state.count + action.by };
      break;
    case "MINUS":
      return { ...state, count: state.count - action.by };
      break;
    case "EAT_CAKE":
      return { ...state, cake: false };
    default:
      return state;
  }
  //   if (action.type === "ADD") {
  //     return { ...state, count: state.count + action.by };
  //   } else if ((action.type = "MINUS")) {
  //     return { ...state, count: state.count - action.by };
  //   } else if (action.type === "EAT_CAKE") {
  //     setEatCake(false);
  //   }
  //   return state + action;
}

console.log(actions.reduce(reducer, initialState));

function Reducers() {
  //   const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "INCREAMENT":
          return { ...state, count: state.count + 1 };
          break;
        case "DECREAMENT":
          return { ...state, count: state.count - 1 };
          break;
        default:
          return state;
      }
    },
    {
      count: 0,
    }
  );

  let { count } = state;

  const add = () => {
    // setCount(count + 1);
    dispatch({ type: "INCREAMENT" });
  };

  function subtract() {
    if (count > 0) {
      //   setCount(count - 1);
      dispatch({ type: "DECREAMENT" });
    }
  }

  return (
    <div>
      <button onClick={subtract}>-</button>

      <b style={{ margin: "10px" }}>{count}</b>

      <button onClick={add}>+</button>
    </div>
  );
}

export default Reducers;
