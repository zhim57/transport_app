import React, {useContext} from 'react'
import UserContext from '../utils/UserContext';


function DriversScreen() {
    const {loggedIn, role} = useContext(UserContext);
  
if ((loggedIn) && (role === "driver") ){

    console.log("welcome driver")
}
    




    return (
        <h1>ONLY DRIVERS SHOULD SEE THIS SCREEN</h1>
    )
}
export default DriversScreen;
