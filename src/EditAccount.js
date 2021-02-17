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
        <form onSubmit={handleSignForm}>
         <h1>Edit Account</h1>
         <label htmlFor="Name">First Name</label>
         <input
             type="text"
             value={firstName}
             onChange={(e) => setFirstName(e.target.value)}
         />
        <br /> 
         <label htmlFor="cost">Last Name</label>
         <input 
             type="text"
             value={lastName}
             onChange={(e) => setLastName(e.target.value)}
         />
         <br /> 
          <label htmlFor="cost">Username</label>
         <input 
             type="text"
             value={username}
             onChange={(e) => setUsername(e.target.value)}
         />
         <br /> 
          <label htmlFor="cost">Password</label>
         <input 
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
         />
         <br /> 
          <label htmlFor="cost">Monthly income after taxes</label>
         <input 
             type="text"
             value={monthlyIncome}
             onChange={(e) => setMonthlyIncome(e.target.value)}
         />
         <br /> 
         <input type="submit" value="Submit" />
        </form>
    </div>
       
    )
}


export default EditAccount