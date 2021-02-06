import React from 'react'





function ExpenseDetail({expense}) {

    return (
       <div className="exform">
        <h1>Expense list</h1>
        <h1>{expense.due_date}</h1>
        <h1>{expense.name}</h1>
        <h1>{expense.cost}</h1>
       </div>
       
    )
}


export default ExpenseDetail