import React, {useState} from 'react'





function EditAccount({currentUser, setWallet}) {
    const[firstName, setFirstName] = useState("")
    const[lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [monthlyIncome, setMonthlyIncome] = useState("")


    function handleSignForm(e){
    
        e.preventDefault();
        const formData = { 
            first_name: firstName, 
            last_name:lastName,
            username: username,
            password: password,
            monthly_income:monthlyIncome,
        }
        console.log(formData)
        fetch(`http://localhost:3000/users/${currentUser.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((r) => r.json())
          .then((data) => {
            setWallet(data.monthly_income)

    
          });
    }

    return (
        <div className="signup">
        <form  className="edit-from"onSubmit={handleSignForm}>
            <br/>
         <h1>Edit Account</h1>
         <br />
         <input
            className="edit-input"
            placeholder="First Name"
             type="text"
             value={firstName}
             onChange={(e) => setFirstName(e.target.value)}
         />
        <br /> 
        <br /> 
        <br /> 
         <input 
             placeholder="Last Name"
             className="edit-input"
             type="text"
             value={lastName}
             onChange={(e) => setLastName(e.target.value)}
         />
         <br /> 
         <br /> 
         <br /> 
         <input 
             type="text"
             placeholder="Username"
             className="edit-input"
             value={username}
             onChange={(e) => setUsername(e.target.value)}
         />
         <br /> 
         <br /> 
         <br /> 
         <input 
             type="password"
             placeholder="Password"
             className="edit-input"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
         />
         <br /> 
         <br /> 
         <br /> 
         <input 
             type="text"
             placeholder="Monthly income after taxes"
             className="edit-input"
             value={monthlyIncome}
             onChange={(e) => setMonthlyIncome(e.target.value)}
         /> 
         <br /> 
         <br /> 
         <br /> 
         <input  className="edit-button"type="submit" value="Submit" />
        </form>
    </div>
       
    )
}


export default EditAccount