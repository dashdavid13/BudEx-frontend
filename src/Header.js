import React from 'react'
import {BrowserRouter, NavLink} from "react-router-dom";
import EditAccount from "./EditAccount"
import ExpenseForm from "./ExpenseForm"



function Header({onLogin, onLogout, currentUser}) {
    
    return (
        <>
        <div className="banner">
            <h1>BudEx</h1>
        </div>
        <div id="container">
            
                <BrowserRouter>{currentUser ?
                        <NavLink className="logout-button" exact to="/" onClick={onLogout}>Log out</NavLink>
                    : null }
                    </BrowserRouter>
                
                
                {currentUser ? <h1 className="welcome-user">Welcome, {currentUser.first_name}</h1> : null}

                    {currentUser ?
                    <EditAccount />
                    : null
                    }
        
                
                    {currentUser ?
                        <ExpenseForm/>
                    : null
                    }
                
        </div>
        </>
       
    )
    
}


export default Header