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

function App() {
  console.log("user-context");
  console.log(UserContext);

  // setInterval(function(){ console.log("user-context"); }, 3000);

  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

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

  return (
    <Router>
      <React.Fragment>
        <UserContext.Provider
          value={{ email, setEmail, loggedIn, setLoggedIn }}
        >
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/tasks" component={Tasks} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/settask">
                {/* component={Settask}  */}
                <Settask />
              </Route>
              <Route exact path="/">
                <TaskList tasks={tasks} />
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
