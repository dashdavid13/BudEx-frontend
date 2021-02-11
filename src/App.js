import './App.css';
import React, { useState } from 'react';
import Header from "./Header"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ExpenseCard from "./ExpenseCard"
import Login from "./Login"

function App() {

  const[currentUser, setCurrentUser] = useState(null);
  const[expenses, setExpenses] = useState([])
  const[wallet, setWallet] = useState("")
  const[search, setSearch] = useState("")
  const[sortBy, setSortBy] = useState("name")
 
// Chatbot fetch

  // useEffect(() => {
  //   setTimeout (
  //     () => {
  //       const script = document.createElement("script");
  //       script.src = "./chat_bot_app.js";
  //       script.setAttribute("data-main","chat_bot_app");
  //       script.async = true;
  //       document.body.appendChild(script);
  //     },
  //     1000
  //   );

  // },[])


  // Chatbot fetch ends here

  function handleLogin() {
    fetch("http://localhost:3000/login")
      .then((r) => r.json())
      .then(userObj => {
        setCurrentUser(userObj)
        setExpenses(userObj.expenses)
        setWallet(userObj.monthly_income)
      });
  }
 
  function handleLogout() {
    setCurrentUser(null);
  }

  function handleSearchChange(newSearch){
    setSearch(newSearch)
  }

 

  function handleDeleteExpense(expenseToDelete){
    debugger
    fetch(`http://localhost:3000/expenses/${expenseToDelete.id}`, {
      method: "DELETE"
  })
  .then(r => r.json())
  .then(expensebj => {
    setExpenses(expenses.filter((expense) => expense.id !== expenseToDelete.id))
    fetch(`http://localhost:3000/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        monthly_income: wallet + expenseToDelete.cost
      })
    })
    .then(r => r.json())
    .then(updatedUserObj => setWallet(updatedUserObj.monthly_income))
  })
  }

   
  const displayedExpenses = expenses.filter( expense => 
   
    expense.name.toLowerCase().includes(search.toLowerCase()))
    .sort((x, y) => {
      if (sortBy === "Due soon") {
        return x.created_at-y.created_at
      } else{
        return x.name.localeCompare(y.name)
      }
    })

  function onHandleUpdate(updatedDetails) {
    const updatedExpenseList = expenses.map((expense) => {
      return expense.id === updatedDetails.id ? updatedDetails : expense
    })
    setExpenses(updatedExpenseList)
  }

  

  return (
    <div className="App">
      <Header 
        onLogin={handleLogin}
        onLogout={handleLogout} 
        currentUser={currentUser}
        expenses={expenses}
        setExpenses={setExpenses}
        setWallet={setWallet}   
        wallet={wallet}
       
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
          expenses={displayedExpenses}
          search={search}
          handleSearchChange={handleSearchChange}
          handleDeleteExpense={handleDeleteExpense}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onHandleUpdate={onHandleUpdate}
          wallet={wallet}
          setWallet={setWallet}
          />
        </Route>
      </Switch>
      </BrowserRouter>
      {currentUser ? 
      <div id="chat-bot"></div>
      : null }
      
    </div>
  );
}

export default App;
