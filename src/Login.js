import React, {useState} from 'react'
import SignUp from './SignUp';
import { useHistory } from "react-router-dom";
import gold from './gold.png'


function Login({setCurrentUser, currentUser,handleSignUp}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [modalState, setModalState] = useState(false)
    const [errors, setErrors] = useState("")


    const history = useHistory()

    const toggleModalState = () => {
        setModalState(!modalState)
    }

    function handleSubmit(e){
     e.preventDefault();
     const formData = {
         username, password 
     }
     fetch("http://localhost:3000/login", {
         method: "POST",
         headers: {
             "Content-Type": "application/json",
         },
         body: JSON.stringify(formData)
     })
     .then((r) => r.json())
     .then((data) => {
        if(data.user){
            setCurrentUser(data.user)
            localStorage.setItem("token", data.token)
            history.push("/profile")
     } else {
            setErrors(data.error)
         }
     });
}

    

    return (
        <>
        
         {currentUser ? null :
       <div className="login">
        <h1 className="login-title">Budex</h1>
        <h3 className="login-explain">Create and keep track of your bills. </h3>
        <div className="image-div">
        <img className="image"src={gold} alt="gold coins"/>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
        <br/>
        <br/>
        <br/>
        <br/>
        <input
          type="text"
          placeholder="Username"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br/>
        <br/>
        <br/>
        <br/>

        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <br/>
        <br/>
        <br/>
        <br/>
        <input type="submit" value="Login" id="login-button" />
        <br/>
        <br/>
        <br/>
        <button id="signup-bottom" className="exform_button"onClick={() => toggleModalState()}>SignUp</button>
        </form>
       </div>
        }
       <div className={`modalBackground modalShowing-${modalState}`}>
        <div className="modalInner">
           <SignUp handleSignUp={handleSignUp}/>
           <button className="exitButton" onClick={() => toggleModalState()}>❌</button>
        </div>
       </div>
        
       </>

    )
}


                


export default Login