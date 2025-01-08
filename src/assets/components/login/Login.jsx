// Optimised code without rerenders with advanced concepts

// import React, { useCallback, useState } from "react";


// export const Login =()=>{
//     const [email,setEmail]=useState("");
//     const [pwd,setPwd]=useState("");
//     const [err,setErr]=useState(null);

//     const emailInput=useCallback((event)=>{
//         setEmail(event.target.value);
//     },[]);

//     const pwdInput=useCallback((event)=>{
//         setPwd(event.target.value);
//     },[]);

//     const loginClick=useCallback((event)=>{
//         event.preventDefault();
//         if(email === "chitresh@gm.com" && pwd=== "abcd1234"){
//             setErr(<p>Login Successful..!</p>)
//         }else {
//             setErr(<p>Invalid Credentials</p>)
//         }
//     },[email,pwd]);


//     return <>
//     <div>
//     <form onSubmit={loginClick}>
//     <h1>Login form Optimisation</h1>
//     <label htmlFor="email">Email</label>
//     <input type="text" name="email" value={email} onChange={emailInput}/>
//     <label htmlFor="Password">Password</label>
//     <input type="password" name="password" value={pwd} onChange={pwdInput}/>
//     <button type="submit">Login</button>
//     {err&& <p>{err}</p>}
//     </form>
//     </div>
//     </>
// };

import React, { useCallback, useState, useReducer } from "react";
import useInput from "./useInput";

// Custom hook for managing form input state
// const useInput = (initialValue) => {
//   const [value, setValue] = useState(initialValue);
//   const handleChange = useCallback((event) => {
//     setValue(event.target.value);
//   }, []);
//   return [value, handleChange];
// };

// Reducer function for form state (alternative to useState for more complex forms)
const formReducer = (state, action) => {
  switch (action.type) {
    // case "SET_EMAIL":
    //   return { ...state, email: action.payload };
    // case "SET_PASSWORD":
    //   return { ...state, password: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const Login = () => {
  // Using custom hook for inputs
  const [email, emailInput] = useInput("");
  const [password, passwordInput] = useInput("");
  
  // Using useReducer to manage form state
  const [state, dispatch] = useReducer(formReducer, { /*email: "", password: "",*/ error: null });

  // Optimized loginClick function with useCallback
  const loginClick = useCallback((event) => {
    event.preventDefault();
    // Move logic outside state updates for optimization
    if (email === "chitresh@gm.com" && password === "abcd1234") {
      dispatch({ type: "SET_ERROR", payload: "Login Successful..!" });
    } else {
      dispatch({ type: "SET_ERROR", payload: "Invalid Credentials" });
    }
  }, [email, password]);

  return (
    <div>
      <form onSubmit={loginClick}>
        <h1>Login Form Optimization</h1>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
        //   value={state.email}
          value={email}
          onChange={emailInput}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
        //   value={state.password}
          onChange={passwordInput}
        />
        <button type="submit">Login</button>
        {state.error && <p>{state.error}</p>}
      </form>
    </div>
  );
};
