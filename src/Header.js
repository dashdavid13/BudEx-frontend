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
		            <nav className="header-navigation">

                    <div className={`modalBackground modalShowing-${modalState}`}>
                                <div className="modalInner">
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
                                <button className="exitButton" onClick={() => toggleModalState()}>Exit</button>
                                : null}
                                </div>
                            </div>
                            {currentUser ?
                            <button  className="exform_button"onClick={() => toggleModalState()}>Add Expense</button>
                            : null}
			            <ul>
            <li> {currentUser ?<p>Setting</p> : null }
                <ul>
                <li><div className={`modalBackground modalShowing-${secondModalState}`}>
                                <div className="modalInner">
                                {currentUser ?
                                <EditAccount currentUser={currentUser} setWallet={setWallet}/>
                                : null}
                            {currentUser ?
                                <button className="exitButton" onClick={() => secondToggleModalState()}>Exit</button>
                                : null}
                                </div>
                            </div>
                            {currentUser ?
                            <button  className="exform_button"onClick={() => secondToggleModalState()}>Edit account</button>
                            : null}</li>
                <li> {currentUser ?
                                <button className="logout-button"  onClick={() => handleLogout(currentUser)}>Log out</button>
                                : null }</li>
                <li>  {currentUser ? <h1 className="welcome-user"> Welcome, {currentUser.first_name}! You have ${wallet} remaining for the month</h1> : null}</li>
                <li>  {currentUser ? <button  onClick={handleDeleteAccount}className="welcome-user"> Delete Account</button> : null}</li>
                </ul>
            </li>
            </ul>
		            </nav>
	            </div>
        </header>

       
        </>
       
    )
    
}


export default Header