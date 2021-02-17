import React from 'react'




function ExpenseDetail({ expense, handleDeleteExpense}) {
    // , onHandleUpdate, setWallet, wallet, currentUser
    // const [expenses, setExpenses] = useState(null)
    // const [modalState, setModalState] = useState(false)
    

    // const toggleModalState = () => {
    //     setModalState(!modalState)
    // }

    // function handleUpdateExpense(newExpense) {
    //     setExpenses(newExpense)
    // }


    return (
        <>
       <div className="exform">
        <h3>{expense.name}</h3>
        <h3>${expense.cost}</h3>
        <button className="delete-btn" onClick={() => handleDeleteExpense(expense)}>Delete</button>
       </div>
       {/* <div className={`modalBackground modalShowing-${modalState}`}>
        <div className="modalInner">
        <EditForm id={expense.id} name={expense.name} cost={expense.cost} onHandleUpdate={onHandleUpdate} handleUpdateExpense={handleUpdateExpense} setWallet={setWallet} wallet={wallet} currentUser={currentUser}/>
            <button className="exitButton" onClick={() => toggleModalState()}>Exit</button>
        </div>
       </div>
       <button  className="exform_button"onClick={() => toggleModalState()}>Edit Expense</button> */}

       </>
    )
}


export default ExpenseDetail
