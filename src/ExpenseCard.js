import React from 'react';
import ExpenseDetail from "./ExpenseDetail"
import Search from './Search'
import FilterSort from './FilterSort'



function ExpenseCard({setWallet ,wallet, expenses, search, handleSearchChange, handleDeleteExpense, sortBy, setSortBy, onHandleUpdate, currentUser}) {

    const usersExpenses = expenses.map((expense) => {
    return (<ExpenseDetail
        key={expense.id}
        expense={expense}
        handleDeleteExpense={handleDeleteExpense}
        onHandleUpdate={onHandleUpdate}
        setWallet={setWallet}
        wallet={wallet}
        currentUser={currentUser}
        />
        )
    })


    
    return (
        <>
            <Search
                search={search}
                handleSearchChange={handleSearchChange}
            />
            <FilterSort 
                sortby={sortBy}
                setSortBy={setSortBy}
                />
       <div className="excard">
           <h1>Current Expenses</h1>
           {usersExpenses.length > 0 ? usersExpenses : "You have no expenses"}
       </div>
       </>
       
    )
}


export default ExpenseCard