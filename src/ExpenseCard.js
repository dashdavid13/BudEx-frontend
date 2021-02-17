import React from 'react';
import ExpenseDetail from "./ExpenseDetail"
import Search from './Search'
import FilterSort from './FilterSort'
import NotePad from './NotePad'



function ExpenseCard({setWallet ,wallet, expenses, search, handleSearchChange, handleDeleteExpense, sortBy, setSortBy, onHandleUpdate, currentUser, isLoaded}) {


    
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
        <div className="sort-flex">
            <Search
                search={search}
                handleSearchChange={handleSearchChange}
            />
            <FilterSort 
                sortby={sortBy}
                setSortBy={setSortBy}
                />
                </div>
            <div className="flex-container">
       <div className="excard">
           <h2>Current Bills</h2>
            <hr/>
           {usersExpenses.length > 0 ? usersExpenses : "You have no expenses"}
       </div>
       <div className="notePad">
       <NotePad isLoaded={isLoaded}/>
       </div>
       </div>
        
       </>
       
    )
}


export default ExpenseCard