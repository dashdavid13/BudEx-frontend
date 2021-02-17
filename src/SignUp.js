import React, {useState} from 'react'




function SignUp({handleSignUp}) {

    const[firstName, setFirstName] = useState("")
    const[lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [monthlyIncome, setMonthlyIncome] = useState("")
    const [errors, setErrors] = useState("")

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
    
        fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((r) => r.json())
          .then((data) => {
            // then set that user in state in our App component
            console.log(data.user)
            if (data.user) {
                handleSignUp(data.user)
                localStorage.setItem("token", data.token)
            } else {
                console.log(data)
                setErrors(data.error)
              // alert('Incorret username or password')
            }
          });
    }

    return (
        <div className="signup">
        <form className="signup-form"onSubmit={handleSignForm}>
         <h1>Create an Account</h1>
         <br />
         <input
            className="signup-input"
            placeholder="First Name"
             type="text"
             value={firstName}
             onChange={(e) => setFirstName(e.target.value)}
         />
        <br />
        <br />
        <br />
        <br />
         <input 
            className="signup-input"
             placeholder="Last Name"
             type="text"
             value={lastName}
             onChange={(e) => setLastName(e.target.value)}
         />
         <br /> 
         <br />
         <br />
         <br />
         <input 
            className="signup-input"
            placeholder="Username"
             type="text"
             value={username}
             onChange={(e) => setUsername(e.target.value)}
         />
         <br />
         <br /> 
         <br /> 
         <br />  
         <input 
            className="signup-input"
            placeholder="Password"
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
         />
         <br /> 
         <br />
         <br /> 
         <br /> 
         <input 
            className="signup-input"
            placeholder="Monthly income after taxes"
             type="text"
             value={monthlyIncome}
             onChange={(e) => setMonthlyIncome(e.target.value)}
         />
         <br /> 
         <br /> 
         <br /> 
         <input className="signup-button" type="submit" value="Submit" />
        </form>
    </div>
       
    )
}


export default SignUp