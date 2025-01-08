import React, { useState, useRef } from "react";

export const TodoList = () => {
  const [mapData, setMapData] = useState([]);
  const [todo, setTodo] = useState("");
  const [updateIndex, setUpdateIndex] = useState(null);

  //Login Form logic
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [protectedData, setProtectedData] = useState(null); // State to hold protected data

  const activeRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const buttonRef = useRef(null);

  const todoChangeInput = (event) => {
    setTodo(event.target.value);
  };

  const enterClickHandler = () => {
    if (todo.trim()) {
      if (updateIndex !== null) {
        const updateTodos = mapData.map((el, index) =>
          index === updateIndex ? todo : el
        );
        // setMapData(updateTodos);
        setUpdateIndex(null);
      } else {
        setMapData([...mapData, todo]);
      }
      setTodo("");
    }
    activeRef.current.focus();
  };

  const updateHandler = (index) => {
    setTodo(mapData[index]);
  };

  const deleteHandler = (index) => {
    // const deleteTodos=mapData.filter((_,el)=>el!==index);
    // setMapData(deleteTodos);
    const deleteTodos = [...mapData];
    deleteTodos.splice(index, 1);
    setMapData(deleteTodos);
  };

  //Logic for Login form
  const emailChangeHandler=(e)=>{setEmail(e.target.value);emailRef.current.focus(); };
  const passwordChangeHandler=(e)=>{setPassword(e.target.value);};
  const formHandleSubmit=(e)=>{e.preventDefault()};
  const handleEmailKeyPress=(e)=>{if(e.key==='Enter'){passwordRef.current.focus();}};
  const handlePasswordKeyPress=(e)=>{if(e.key==='Enter'){buttonRef.current.focus(); }};

  // const loginClickHandler=()=>{
    // if(email==='chitresh916@gmail.com'&&password==="abcd1234"){
    //   setError(<p style={{color:'green'}}>Welcome to Home page</p>)
    //   console.log('Opened Home Page');
    // }else if (!email&&!password || email===""&&password===""){
    //   setError(<p style={{color:'red'}}>Enter Email Id and Password </p>)
    //   console.log('Enter Email and Password');
    // }else if(email &&!password){
    //   setError(<p style={{color:'red'}}>Password is not entered.Please enter</p>)
    //   console.log('Password is not entered.Please enter');
    // }else if(!email && password){
    //   setError(<p style={{color:'red'}}>Email is not entered.Please enter</p>)
    //   console.log('Email is not entered.Please enter');
    // }else{
    //   setError(<p style={{color:'red'}}>Invalid Credentials...!</p>);
    //   console.log("Invalid Credentials");
    // }
  //   const errorMessage=email==='chitresh@gmail.com'&&password==="abcd1234"?<p style={{color:'green'}}>Welcome to Home page</p>:!email&&!password || email===""&&password===""?<p style={{color:'red'}}>Enter Email Id and Password </p>:email &&!password?<p style={{color:'red'}}>Password is not entered.Please enter</p>:!email && password?<p style={{color:'red'}}>Email is not entered.Please enter</p>:<p style={{color:'red'}}>Invalid Credentials...!</p>;
  //   setError(errorMessage);
  //   console.log("Password===>",password);
  // };

  const loginClickHandler=async (event)=>{
    event.preventDefault();
    try{
      const response=await fetch('http://localhost:5000/login',{
        method:'POST',
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify({email,password}),
      });
      if(!response.ok){
        throw new Error("Invalid login");
      }

      const data= await response.json();
      localStorage.setItem('token',data.token); //Store the Token
      alert("Login Successful");

      // // Fetch protected data after successful login
      // const token = localStorage.getItem('token');
      // const protectedResponse= await fetch('http://localhost:5000/protected-route',{
      //   headers:{"Authorization":`Bearer ${token}`},
      // });

      // if(!protectedResponse.ok){
      //   throw new Error('Failed to fetch protected data');
      // }

      // const protectedData = await protectedResponse.json();
      // setProtectedData(protectedData); // Store the protected data in state

    }catch (error){
      console.error('Login Error:', error); // Log full error for debugging
      setError(error.message);
    }
  };

  return (
    <div>
      <input
        ref={activeRef}
        type="text"
        placeholder="Make your Note"
        value={todo}
        onChange={todoChangeInput}
      />
      <button onClick={enterClickHandler}>
        Enter
      </button>
      {mapData.map((el, index) => {
        return (
          <div key={el}>
            <p>{el}</p>
            <button onClick={() => updateHandler(index)}>Update</button>
            <button onClick={() => deleteHandler(index)}>Delete</button>
          </div>
        );
      })}
      <form onSubmit={formHandleSubmit}>
      <input type="text" name="email" value={email} onChange={emailChangeHandler} ref={emailRef} onKeyPress={handleEmailKeyPress}/>
      <input type="password" name="password" value={password} onChange={passwordChangeHandler} ref={passwordRef} onKeyPress={handlePasswordKeyPress}/>
      <button type="submit" onClick={loginClickHandler} ref={buttonRef}>Login</button>

       {/* Display protected data if available */}
       {protectedData && (
        <div>
          <h3>Protected Data:</h3>
          <pre>{JSON.stringify(protectedData, null, 2)}</pre>
        </div>
      )}
      {error}
      </form>

    </div>
  );
};

