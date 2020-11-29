import {createContext} from 'react';

const UserContext = createContext({
    email: "default email",
    setEmail: () => {},
    loggedIn: false,
    setLoggedIn: () => {},
    role: "role model",
    setRole: () => {},

    updateUserContextData: ()=>{}

});

export default UserContext;