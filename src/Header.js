import React, {useState} from 'react'
import EditAccount from "./EditAccount"
import ExpenseForm from "./ExpenseForm"



function Header({handleLogout,handleDeleteAccount, currentUser, wallet, setWallet, expenses, setExpenses}) {
    
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
            <header className="header-outer">
	            <div className="header-inner responsive-wrapper">
		            {currentUser ? <div className="header-logo">
			            <h1 className="title">BudEx</h1>
		            </div>
                    : null }
                   { currentUser ? 
		            <nav className="header-navigation">

                    <div className={`modalBackground modalShowing-${modalState}`}>
                                <div className="modal-create-expense">
                                {currentUser ?
                                    <ExpenseForm
                                    currentUser={currentUser}
                                    expenses={expenses}
                                    setExpenses={setExpenses}
                                    setWallet={setWallet} 
                                    wallet={wallet}
                                    />
                                : null}
                                {currentUser ?
                                <button className="exitButton" onClick={() => toggleModalState()}>❌</button>
                                : null}
                                </div>
                            </div>
                            {currentUser ?
                            <button  id="exform_button"onClick={() => toggleModalState()}>Add Expense</button>
                            : null}
			<div className="dropdown">
             {currentUser ?<p className="dropbtn">Settings</p> : null }
                  <div className="dropdown-content">
               <div className={`modalBackground modalShowing-${secondModalState}`}>
                                <div className="modalInner">
                                {currentUser ?
                                <EditAccount currentUser={currentUser} setWallet={setWallet}/>
                                : null}
                            {currentUser ?
                                <button className="exitButton" onClick={() => secondToggleModalState()}>❌</button>
                                : null}
                                </div>
                            </div>
                            {currentUser ?
                            <button  className="exform_button"onClick={() => secondToggleModalState()}>Edit account</button>
                            : null}
                            <br />
                 {currentUser ?
                                <button className="logout-button"  onClick={() => handleLogout(currentUser)}>Log out</button>
                                : null }
                  {currentUser ? <h3 className="welcome-user"> Welcome, {currentUser.first_name}.
                  <br/> 
                  <br/> ${wallet} remaining for the month</h3> : null}
                  {currentUser ? <button  onClick={handleDeleteAccount}className="delete-user"> Delete Account</button> : null}
                  </div>
            </div> 
           
            
		            </nav>
                    : null }
	            </div>
        </header>

       
        </>
       
    )
    
}


export default Header