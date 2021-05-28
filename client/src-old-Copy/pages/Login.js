import React, { useContext } from 'react';
import LoginForm from '../components/LoginForm';
import {Redirect} from 'react-router-dom';
import UserContext from '../utils/UserContext';

function Login(props){
    const {loggedIn, role, username} = useContext(UserContext);
    console.log("user-context from log in ");
    console.log(UserContext);
    console.log("role info");
    console.log(loggedIn);
    console.log(role);
    console.log(username);

    // const setUserContext =(setUserContextData) =>{
    //     console.log("setUserContext from the login.js"+ setUserContextData);
    //     props.setUserContext1(setUserContextData);
    // }
   
    return (
        <div className="container">
            {loggedIn && <Redirect to="/"/> } 
            <h1>Login</h1>
            <LoginForm className="full-page-login" />
            {/* setUserContext={setUserContext} checkChannel="checked"  */}
        </div>
    )
}
export default Login;