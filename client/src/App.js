import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Login from "./pages/Login";
import UserContext from "./utils/UserContext";
import Logout from "./pages/Logout";
import SignUp from "./pages/SignUp";
import TaskList from './components/TaskList';
import Tasks from './pages/Tasks';
import DriversScreen from './components/driversScreen';





function App() {
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [role] = useState("");
  // console.log(email.value)
  // const { role } = useContext(UserContext);
  // console.log(role);

  useEffect(() => {
    // uses the react life cycle to update the page's state or context,
    // with global context it updates the entire app
  }, []);

  return (
    <Router>
      <React.Fragment>
          <UserContext.Provider value={{ email, setEmail, loggedIn, setLoggedIn, role}}>
          {console.log("Role of User logged in: " + JSON.stringify(role))}
            <div>
              <Navbar />
              <Switch>
                  <Route exact path='/tasks' component={Tasks} />
                <Route exact path='/'>
                  {/* {console.log("Console Logging: " + {email})} */}
                  {/* <h1>{JSON.stringify(role)}</h1> */}
                  <TaskList />
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
              </Switch>
            </div>
          </UserContext.Provider>
      </React.Fragment>
    </Router>
  );
}

export default App;
