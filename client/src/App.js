import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import UserContext from "./utils/UserContext";
import Logout from "./pages/Logout";
import SignUp from "./pages/SignUp";
import TaskList from "./components/TaskList";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Settask from "./pages/Settask";
import API from "./utils/API";
import DriversScreen from "./components/driversScreen";

function App() {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [nameFirst, setNameFirst]= useState("");
  const [nameLast, setNameLast]= useState("");
  const [vesselName,setVesselName]= useState("");
  const [position,setPosition]= useState("");
  const [profilePicture,setProfilePicture]= useState("");
  const [vesselEmail,setVesselEmail]= useState("");
  const [phoneNumber,setPhoneNumber]= useState("");
 
  var updateUserContextData = (userContextData) => {
    // setEmail(userContextData.email);
    // console.log("userContextData.email");
    // console.log(userContextData.email);
    // setLoggedIn(userContextData.loggedIn);
    // console.log("userContextData.loggedin");
    // console.log(userContextData.loggedin);
    setRole(userContextData.role);
    setUserId(userContextData.userId);
    setNameFirst(userContextData.nameFirst);
    setNameLast(userContextData.nameLast);
    setVesselName(userContextData.vesselName);
    setPosition(userContextData.position);
    console.log("userContextData.role");
    console.log(userContextData.role);
    setUserId(userContextData.userId);
    setProfilePicture(userContextData.profilePicture);
    setVesselEmail(userContextData.vesselEmail);
    setPhoneNumber(userContextData.phoneNumber);
    console.log("userContextData.userId");
    console.log(userContextData.userId);
  };
  console.log("user-context");
  console.log(UserContext._currentValue);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // uses the react life cycle to update the page's state or context,
    // with global context it updates the entire app
  }, []);
  // Setting our component's initial state

  // Load all products and store them with setProducts
  useEffect(() => {
    loadTasks();
  }, []);

  const refreshTasks = () => {
    loadTasks();
  };

  // Loads all products and sets them to products
  function loadTasks() {
    API.getTasks()
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <Router>
      <React.Fragment>
        <UserContext.Provider
          value={{
            email,
            setEmail,
            loggedIn,
            setLoggedIn,
            role,
            setRole,
            userId,
            nameFirst,
            nameLast,
            vesselName,
            position,
            profilePicture,
            vesselEmail,
            phoneNumber,
            updateUserContextData,
          }}
        >
          {console.log("Role of User logged in: " + JSON.stringify(role))}
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/tasks" component={Tasks} />
              <Route exact path="/profile" component={Profile}>
                <Profile></Profile>
              </Route>
              <Route exact path="/settask">
                {/* component={Settask}  */},
                <Settask tasks={tasks} refreshTasks={refreshTasks} />
              </Route>
              <Route exact path="/">
                <TaskList tasks={tasks} refreshTasks={refreshTasks} />
              </Route>

              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/logout">
                <Logout />
              </Route>
              <Route exact path="/driver">
                <DriversScreen />
              </Route>
              {/* <Route exact path="/checkoutTest">
                  <CheckoutModalBody />
                </Route> */}
            </Switch>
            {/* kyle added 47-48 and 51*/}
          </div>
        </UserContext.Provider>
      </React.Fragment>
    </Router>
  );
}

export default App;
