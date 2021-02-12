import React, {useState} from 'react'
import EditForm from "./EditForm"



function ExpenseDetail({ expense,handleDeleteExpense, onHandleUpdate, setWallet, wallet, currentUser}) {

    const [expenses, setExpenses] = useState(null)
    const [modalState, setModalState] = useState(false)
    

    const toggleModalState = () => {
        setModalState(!modalState)
    }

    function handleUpdateExpense(newExpense) {
        setExpenses(newExpense)
    }


    return (
        <>
       <div className="exform">
        <h1>{expense.name}</h1>
        <h1>{expense.cost}</h1>
        <button className="delete-btn" onClick={() => handleDeleteExpense(expense)}>Delete Expense</button>
       </div>
       <div className={`modalBackground modalShowing-${modalState}`}>
        <div className="modalInner">
        <EditForm id={expense.id} name={expense.name} cost={expense.cost} onHandleUpdate={onHandleUpdate} handleUpdateExpense={handleUpdateExpense} setWallet={setWallet} wallet={wallet} currentUser={currentUser}/>
            <button className="exitButton" onClick={() => toggleModalState()}>Exit</button>
        </div>
       </div>
       <button  className="exform_button"onClick={() => toggleModalState()}>Edit Expense</button>

       </>
    )
}


export default ExpenseDetail
