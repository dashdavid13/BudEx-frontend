import React, {useState} from 'react'
import {BrowserRouter, NavLink} from "react-router-dom";
import EditAccount from "./EditAccount"
import ExpenseForm from "./ExpenseForm"



function Header({onLogin, onLogout, currentUser, wallet, setWallet, expenses, setExpenses, onAddExpense}) {
    
    const [modalState, setModalState] = useState(false)
    const [secondModalState, setSecondModalState] = useState(false )


    const toggleModalState = () => {
        setModalState(!modalState)
    }

    const secondToggleModalState = () => {
        setSecondModalState(!secondModalState)
    }

    return (
        <>
        <div className="banner">
            <h1>BudEx</h1>
        </div>
        <div id="container">
            <nav>
            
                <BrowserRouter>{currentUser ?
                    <NavLink className="logout-button" exact to="/" onClick={onLogout}>Log out</NavLink>
                    : null }
                    </BrowserRouter>

                <div className={`modalBackground modalShowing-${secondModalState}`}>
                    <div className="modalInner">
                    {currentUser ?
                    <EditAccount />
                    : null}
                {currentUser ?
                    <button className="exitButton" onClick={() => secondToggleModalState()}>Exit</button>
                    : null}
                    </div>
                </div>
                {currentUser ?
                <button  className="exform_button"onClick={() => secondToggleModalState()}>Edit account</button>
                : null}
                <div className={`modalBackground modalShowing-${modalState}`}>
                    <div className="modalInner">
                    {currentUser ?
                        <ExpenseForm
                        currentUser={currentUser}
                        expenses={expenses}
                        setExpenses={setExpenses}
                        setWallet={setWallet} 
                        wallet={setWallet}
                        />
                    : null}
                    {currentUser ?
                    <button className="exitButton" onClick={() => toggleModalState()}>Exit</button>
                    : null}
                    </div>
                </div>
                {currentUser ?
                <button  className="exform_button"onClick={() => toggleModalState()}>Add Expense</button>
                : null}
            </nav>
            {currentUser ? <h1 className="welcome-user"> Welcome, {currentUser.first_name}! You have ${wallet} remaining for the month</h1> : null}
        </div>
        </>
       
    )
    
}


export default Header