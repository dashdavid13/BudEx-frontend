import React, {useState} from 'react'




function ExpenseForm({currentUser,  wallet, setExpenses, expenses, setWallet  }) {

    const[name, setName] = useState("")
    const[cost, setCost] = useState("")
   
const totalCost = currentUser.monthly_income - expenses.cost 
    function handleSubmit(e){
      e.preventDefault()
      const data = {
        name:name,
        cost:cost,
        user_id:currentUser,
      }
if(currentUser && wallet >= cost ){
    fetch("http://localhost:3000/expenses/new", {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      })
        .then(r => r.json())
        .then((newData) => {
            setExpenses([...expenses, newData])
            fetch(`http://localhost:3000/users/${currentUser.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                monthly_income: totalCost
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
           <form onSubmit={handleSubmit}>
            <h1>Create an Expense</h1>
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


export default ExpenseForm