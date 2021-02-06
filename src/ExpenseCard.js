import React from 'react';
import ExpenseDetail from "./ExpenseDetail"




function ExpenseCard({expenses}) {

    const usersExpenses = expenses.map((expense) => {
    return (<ExpenseDetail
        key={expense.id}
        expense={expense}
        />
        )
    })


    
    return (
       <div className="excard">
           <h1>Current Expenses</h1>
           {usersExpenses.length > 0 ? usersExpenses : "You have no expenses"}
       </div>
       
    )
}


export default ExpenseCard