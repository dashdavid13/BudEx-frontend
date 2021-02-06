import React from 'react'
import { Link } from "react-router-dom";





function Login({onLogin}) {

    return (
       <div className="login">
        <h1>log in </h1>
        <form method="post">
    	    <input type="text" name="u" placeholder="Username"  />
            <input type="password" name="p" placeholder="Password"  />
            <Link type="submit" to="/home" onClick={onLogin}>Log in</Link>
        </form>
       </div>
       
    )
}


export default Login