import React, {useState} from 'react'




function ExpenseForm({currentUser, setExpenses, expenses, wallet, setWallet  }) {


    const[name, setName] = useState("")
    const[cost, setCost] = useState("")
   

function handleSubmit(e){
    
      e.preventDefault()
      const data = {
        name:name,
        cost:cost,
        user_id:currentUser.id,
      }
if(currentUser && wallet >= cost ){
    debugger
    fetch("http://localhost:3000/expenses/new", {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          "Accept": "application/json"
        },
        body:JSON.stringify(data)
      })
        .then(r => r.json())
        .then((newData) => {
            setExpenses([...expenses, newData])
            fetch(`http://localhost:3000/users/${currentUser.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                monthly_income: wallet - cost
                })
            })
            .then(r => r.json())
            .then(updatedUserObj => setWallet(updatedUserObj.monthly_income))
            })
        } else {
            debugger
            alert("Cant afford another expense with your current monthly income")
        }
    }

    return (
       <div className="exform">
           <form className="exFORM" onSubmit={handleSubmit}>
            <h1>Add an Expense</h1>
            <br />
            <input
                className="addEXinput"
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br />
            <br />
            <br />
            <input 
                className="addEXinput"
                placeholder="Cost"
                type="text"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
            />
            <h5 className="red">Due date will start once submitted</h5>
            <input type="submit" className="addexSubmit"value="Submit" />
           </form>
       </div>
       
    )
}


export default ExpenseForm