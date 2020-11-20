import {createContext} from 'react';

const UserContext = createContext({
    email: "",
    setEmail: () => {},
    loggedIn: false,
    setLoggedIn: () => {},
    role: "",
    setRole: () => {}
});

export default UserContext;