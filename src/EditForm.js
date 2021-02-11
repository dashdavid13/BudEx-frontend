import React, { useState } from 'react'





function EditForm({id, onHandleUpdate, handleUpdateExpense, wallet, setWallet, currentUser}) {
   const[name, setName] =useState('')
   const[cost, setCost] =useState('')

function handleEditForm(e) {
    e.preventDefault();

    const data={
        id: id,
        name:name,
        cost:cost,
    }
  
    if(currentUser && wallet >= cost){
        
        onHandleUpdate(data)
        fetch(`http://localhost:3000/expenses/${id}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((newData) => {
                handleUpdateExpense(newData)
            fetch(`http://localhost:3000/users/${currentUser.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                monthly_income: wallet - cost
                })
            })
            .then(r => r.json())
            .then(updatedUserObj => setWallet(updatedUserObj.monthly_income))   
            
        })
      } else {
        alert("Cant afford another expense with your current monthly income")
    }
    }

    return (
        <div className="exform">
            <form onSubmit={handleEditForm}>
            <h1>Edit Expense</h1>
            <label htmlFor="Name">Name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="cost">Cost</label>
            <input 
                type="text"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
            />
            <input type="submit" value="Submit" />
            </form>
    </div>
        
    )
}

export default EditForm