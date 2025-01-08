import { useState,useCallback } from "react";

// Custom hook for managing form input state
const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback ((event) => {
    setValue(event.target.value);
   },[]);
  return [value, handleChange]; // Return value and change handler
};

export default useInput;


// Two approaches by using useInput(Custom hook) and useReducer hook

// Two possible approaches to resolve the issue:
// Approach 1: Use useReducer for All State Management
// In this approach, you will remove useInput and instead manage all state, including the form fields, using the useReducer approach. This way, the email and password values are managed through the reducer.

// import React, { useCallback, useReducer } from "react";

// // Reducer function for form state
// const formReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_EMAIL":
//       return { ...state, email: action.payload };
//     case "SET_PASSWORD":
//       return { ...state, password: action.payload };
//     case "SET_ERROR":
//       return { ...state, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const Login = () => {
//   // Using useReducer to manage the entire form state
//   const [state, dispatch] = useReducer(formReducer, { email: "", password: "", error: null });

//   // Optimized loginClick function with useCallback
//   const loginClick = useCallback((event) => {
//     event.preventDefault();
//     if (state.email === "chitresh@gm.com" && state.password === "abcd1234") {
//       dispatch({ type: "SET_ERROR", payload: "Login Successful..!" });
//     } else {
//       dispatch({ type: "SET_ERROR", payload: "Invalid Credentials" });
//     }
//   }, [state.email, state.password]);

//   // Handlers for form inputs
//   const handleEmailChange = (event) => {
//     dispatch({ type: "SET_EMAIL", payload: event.target.value });
//   };

//   const handlePasswordChange = (event) => {
//     dispatch({ type: "SET_PASSWORD", payload: event.target.value });
//   };

//   return (
//     <div>
//       <form onSubmit={loginClick}>
//         <h1>Login Form Optimization</h1>
//         <label htmlFor="email">Email</label>
//         <input
//           type="text"
//           name="email"
//           value={state.email}  // Controlled input using reducer state
//           onChange={handleEmailChange}  // Dispatch action to update state
//         />
//         <label htmlFor="password">Password</label>
//         <input
//           type="password"
//           name="password"
//           value={state.password}  // Controlled input using reducer state
//           onChange={handlePasswordChange}  // Dispatch action to update state
//         />
//         <button type="submit">Login</button>
//         {state.error && <p>{state.error}</p>}
//       </form>
//     </div>
//   );
// };
// Explanation:
// State Management: We're using the useReducer hook to manage all form state (email, password, and error).
// Handlers: Instead of useInput, we define handleEmailChange and handlePasswordChange which dispatch actions to update the email and password state inside the reducer.
// Controlled Inputs: The email and password inputs are now controlled through the state.email and state.password values, respectively, which come from the useReducer state.
// Approach 2: Use useInput for Form Fields and Remove Reducer for Inputs
// If you want to stick with the useInput custom hook for managing form input states, you can remove the reducer logic for the email and password fields, keeping the useReducer only for managing errors (or other complex state management).

// Updated Code:
// javascript
// Copy code
// import React, { useCallback, useReducer } from "react";
// import useInput from "./useInput";  // Importing the custom hook

// // Reducer function for form state (handling error state)
// const formReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_ERROR":
//       return { ...state, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const Login = () => {
//   // Using useInput for email and password (no need for reducer here)
//   const [email, emailInput] = useInput("");  // Use custom hook for email
//   const [password, passwordInput] = useInput("");  // Use custom hook for password

//   // Using useReducer to manage form error state
//   const [state, dispatch] = useReducer(formReducer, { error: null });

//   // Optimized loginClick function with useCallback
//   const loginClick = useCallback((event) => {
//     event.preventDefault();
//     // Perform login validation
//     if (email === "chitresh@gm.com" && password === "abcd1234") {
//       dispatch({ type: "SET_ERROR", payload: "Login Successful..!" });
//     } else {
//       dispatch({ type: "SET_ERROR", payload: "Invalid Credentials" });
//     }
//   }, [email, password]);

//   return (
//     <div>
//       <form onSubmit={loginClick}>
//         <h1>Login Form Optimization</h1>
//         <label htmlFor="email">Email</label>
//         <input
//           type="text"
//           name="email"
//           value={email}  // Controlled input using custom hook state
//           onChange={emailInput}  // Handler from useInput hook
//         />
//         <label htmlFor="password">Password</label>
//         <input
//           type="password"
//           name="password"
//           value={password}  // Controlled input using custom hook state
//           onChange={passwordInput}  // Handler from useInput hook
//         />
//         <button type="submit">Login</button>
//         {state.error && <p>{state.error}</p>}  // Display error from reducer
//       </form>
//     </div>
//   );
// };
// Explanation:
// Form Fields: We're using useInput to handle the state of email and password inputs.
// Reducer: We still use useReducer to manage the error state (state.error), but we're not using it for email and password anymore.
// Form Handlers: The form input handlers (emailInput and passwordInput) are derived from the useInput custom hook, so those inputs are still controlled.
// Conclusion:
// Use One Approach: You should use either useReducer for managing all form state or use useInput for individual form fields and useReducer for other complex state (like error handling).
// Avoid Conflicting States: Mixing useReducer and useInput for the same form fields leads to conflicting behavior. It is recommended to stick to one for managing the fields to ensure proper state updates.
// Let me know if you need further clarification!
