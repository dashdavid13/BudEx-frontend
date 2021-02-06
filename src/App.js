import './App.css';
import React, { useState, useEffect } from 'react';
import Header from "./Header"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ExpenseCard from "./ExpenseCard"
import Login from "./Login"

function App() {

  const[currentUser, setCurrentUser] = useState(null);
  const[expenses, setExpenses] = useState([])
 
  // get all expenses joiner table
  // useEffect(() => {
  //   fetch('http://localhost:3000/uexes')
  //   .then((r)=>r.json())
  //   .then(allData => {
  //     setUex(allData)
  //   })
  // }, [])



// Chatbot fetch
  useEffect(() => {
    setTimeout (
      () => {
        const script = document.createElement("script");
        script.src = "./chat_bot_app.js";
        script.setAttribute("data-main","chat_bot_app");
        script.async = true;
        document.body.appendChild(script);
      },
      1000
    );

  },[]);

  // Chatbot fetch ends here

  function handleLogin() {
    fetch("http://localhost:3000/login")
      .then((r) => r.json())
      .then(userObj => {
        setCurrentUser(userObj)
        debugger 
        setExpenses(userObj.expenses)
        
      });
  }
 
  function handleLogout() {
    setCurrentUser(null);
  }
  return (
    <div className="App">
      <Header 
        onLogin={handleLogin}
        onLogout={handleLogout} 
        currentUser={currentUser}
      />
      <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login 
          currentUser={currentUser} 
          onLogin={handleLogin} 
          />
        </Route>
        <Route exact path="/home">
          <ExpenseCard
          expenses={expenses}
          />
        </Route>
      </Switch>
      </BrowserRouter>
      <div id="chat-bot"></div>
    </div>
  );
}

export default App;
