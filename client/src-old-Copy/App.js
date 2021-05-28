import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import UserContext from "./utils/UserContext";
// import UserContext from "./components/UserContext";
import Logout from "./pages/Logout";
import SignUp from "./pages/SignUp";
import TaskList from "./components/TaskList";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Settask from "./pages/Settask";
import API from "./utils/API";
import DriversScreen from './components/driversScreen';


function App() {
  const {email, setEmail, loggedIn, setLoggedIn, role, setRole, userId, setUserId} = useContext(UserContext);
  // const  {   email , loggedIn,  role  } = useContext(UserContext);
  console.log("user-context");
  console.log(UserContext);

  // setInterval(function(){ console.log("user-context"); }, 3000);

  // const [email, setEmail] = useState("");
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [role] = useState("");



  // console.log(email.value)
  // const { role } = useContext(UserContext);
  // console.log(role);

  useEffect(() => {
    // uses the react life cycle to update the page's state or context,
    // with global context it updates the entire app
  }, []);
  // Setting our component's initial state
  const [tasks, setTasks] = useState([]);

  // Load all products and store them with setProducts
  useEffect(() => {
    loadTasks();
  }, []);




  // Loads all products and sets them to products
  function loadTasks() {
    API.getTasks()
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  }
const taskDelete= (id) => {
  API.deleteTasks(id);
  //  console.log("task deleted");

  
};
    // const setUserContext1= (serUserContextData)=>{
  
  
  
    //   console.log(" setUserContext1(serUserContextData);")
    // };
  return (
    <Router>
      <React.Fragment>
      <UserContext.Provider value={{  email, setEmail, loggedIn, setLoggedIn, role, setRole, userId, setUserId}}>
          {console.log("Role of User logged in: " + JSON.stringify(role))}
          {console.log("Role of User logged in: " + role)}
          <div className="ui container">
            <Navbar />
            <Switch>
              <Route exact path="/tasks" component={Tasks} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/settask">
                {/* component={Settask}  */}
                <Settask />
              </Route>
              <Route exact path="/">
                <TaskList tasks={tasks} taskDelete={taskDelete}/>
                
              </Route>

              <Route exact path="/login">
              {/* setUserContext1={setUserContext1} for the login */}
                <Login   /> 
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
