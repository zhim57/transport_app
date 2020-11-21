import React, {useContext, useEffect} from 'react';
import API from '../utils/API';
import UserContext from '../utils/UserContext';

function Logout(props){
    const {setEmail, setLoggedIn, setRole} = useContext(UserContext);
    useEffect( () => {
        API.logout()
        .then( data => {
            setLoggedIn(false);
            setEmail("");
            setRole("");
        })
        .catch(err => {
            console.log(err);
        });
    }, [setEmail, setLoggedIn, setRole])
    return (
        <div><p>You are now logged out.</p></div>
    )
}
export default Logout;