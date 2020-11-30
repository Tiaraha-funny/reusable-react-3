import React, { useEffect, useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
/*
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))
*/
function useAuth(ENDPOINT_URL) {
    let [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'LOADING': {
        return { ...state, loading: true }
      }
      case 'RESOLVED': {
        return {
          ...state,
          loading: false,
          response: action.response,
          error: null
        }
      }
      case 'ERROR': {
        return {
          ...state,
          loading: false,
          response: null,
          error: action.error
        }
      }
      default:
        return state
    }
  }, {
    loading: false,
    response: null,
    error: null
  })
  useEffect(() => {
    let isCurrent = true
    dispatch({ type: "LOADING" })
    fetch(ENDPOINT_URL)
      .then(response => response.json())
      .then(json => {
        if (isCurrent) {
          dispatch({ type: "RESOLVED", response: json })
        }
      }).catch(error => {
        dispatch({ type: "ERROR", error })
      })
    return () => {
      isCurrent = false
    }
  }, [])
  return [state.loading, state.response, state.error]
}
const App = () => {
  let [ loading, response, error ] = useAuth('https://jsonplaceholder.typicode.com/todos/1')
  return (
    <section>
      <h2>Get User Data</h2>
      <div className="user">
        { loading && <div>Loading...</div> }
        { error && <div className="error">ERROR OH NO</div> }
        { response && <>
          User ID: {response.id} <br />
          User Title: {response.title}
        </>}
      </div>
    </section>
  )
}
ReactDOM.render(<App />, document.getElementById('root'));