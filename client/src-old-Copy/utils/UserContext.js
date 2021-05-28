// import { PromiseProvider } from 'mongoose';
import React,  {createContext, useState} from 'react';

const UserContext = createContext({
    email: "test",
    setEmail: () => {},
    loggedIn: false,
    setLoggedIn: () => {},
    role: "",
    setRole: () => {},
    userId: 0,
    setUserId: () => {}
   
});

const UserStore = (props)=>{

    const [userDataStore, setUserDataStore] = useState({
     UserContext


    })

    
    return(
        <UserContext.provider value={{...userDataStore, setUserDataStore }}>
            {props.children}
        </UserContext.provider>
        )
        
    }
    export {UserStore}
export default UserContext;