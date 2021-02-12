import React, {useState} from 'react'
import SignUp from './SignUp';
import { useHistory } from "react-router-dom";




function Login({setCurrentUser, currentUser}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [modalState, setModalState] = useState(false)


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
        setCurrentUser(data.user)
        localStorage.setItem("token", data.token);
     })
     history.push("/profile")
    }

    return (
        <>
         {currentUser ? null :
       <div className="login">
        
        <form onSubmit={handleSubmit}>
        <h1>Login </h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <input type="submit" value="Login" />
        </form>
        <button  className="exform_button"onClick={() => toggleModalState()}>SignUp</button>
       </div>
        }
       <div className={`modalBackground modalShowing-${modalState}`}>
        <div className="modalInner">
           <SignUp />
           <button className="exitButton" onClick={() => toggleModalState()}>Exit</button>
        </div>
       </div>
        
       </>

    )
}


                


export default Login