import './App.css';
import React, { useState, useEffect } from 'react';
import Header from "./Header"
import { Switch, Route, useHistory} from "react-router-dom";
import ExpenseCard from "./ExpenseCard"
import Login from "./Login"


function App() {

  const[currentUser, setCurrentUser] = useState(null);
  const[expenses, setExpenses] = useState([])
  const[wallet, setWallet] = useState("")
  const[search, setSearch] = useState("")
  const[sortBy, setSortBy] = useState("name")
  const [isLoaded, setIsLoaded] = useState(false)

  const history = useHistory();

  useEffect(() => {
      const token = localStorage.getItem("token")
    if (token) {
        fetch("http://localhost:3000/home", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(r => r.json())
            .then((user) => {
                setCurrentUser(user)
                setExpenses(user.expenses)
                setWallet(user.monthly_income)
                setIsLoaded(true)
            });
  }
  }, [])



  
 
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

  function handleSignUp(user) {
    console.log(user)
    setCurrentUser(user)
    history.push("/profile")
  }

  function handleLogout() {
    setCurrentUser(null);
    localStorage.removeItem("token")
    history.push("/");
  }

  function handleSearchChange(newSearch){
    setSearch(newSearch)
  }

 

  function handleDeleteExpense(expenseToDelete){
    fetch(`http://localhost:3000/expenses/${expenseToDelete.id}`, {
      method: "DELETE"
  })
  .then(r => r.json())
  .then(expenseObj => {
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


  function handleDeleteAccount(id){
    debugger
    fetch(`http://localhost:3000/users/${currentUser.id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(userObj=> {
      setCurrentUser(null)
      localStorage.removeItem("token")
    });
    history.push("/");
  }

   


  // function onHandleUpdate(updatedDetails) {
  //   const updatedExpenseList = expenses.map((expense) => {
  //     return expense.id === updatedDetails.id ? updatedDetails : expense
  //   })
  //   setExpenses(updatedExpenseList)
  // }

  const displayedExpenses = expenses.filter( expense => 
   
    expense.name.toLowerCase().includes(search.toLowerCase()))
    .sort((x, y) => {
      if (sortBy === "Due soon") {
        return x.created_at-y.created_at
      } else{
        return x.name.localeCompare(y.name)
      }
    })
    
  // if (!isLoaded) return <h1>Loading</h1>
    
    
  return (
    <div className="App">
      <Header 
        handleLogout={handleLogout} 
        currentUser={currentUser}
        expenses={expenses}
        setExpenses={setExpenses}
        setWallet={setWallet}   
        wallet={wallet}
        handleDeleteAccount={handleDeleteAccount}
       
      />
      

      <Switch>

        <Route exact path="/">
          <Login 
          setCurrentUser={setCurrentUser}
          currentUser={currentUser} 
          handleSignUp={handleSignUp}
          />
        </Route>
        <Route exact path="/profile">
          {currentUser ? (
          <ExpenseCard
          expenses={displayedExpenses}
          search={search}
          handleSearchChange={handleSearchChange}
          handleDeleteExpense={handleDeleteExpense}
          sortBy={sortBy}
          setSortBy={setSortBy}
          // onHandleUpdate={onHandleUpdate}
          wallet={wallet}
          setWallet={setWallet}
          currentUser={currentUser}
          isLoaded={isLoaded}
          />
          ) : null} 
          </Route>
      </Switch> 
      {currentUser ? 
      <div id="chat-bot"></div>
      : null }
      
    </div>
  );
}

export default App;
