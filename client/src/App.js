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




function App() {
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  // const [apiResult, setApiResult] = useState();

  // useEffect( () => {
  //   // on load run this api call
  //   API.testApi()
  //   .then( result => {
  //     setApiResult(result);
  //   })
  //   .catch( err => {
  //     console.log(err);
  //   });
  // }, []);
  // console.log(apiResult);

  useEffect(() => {
    // uses the react life cycle to update the page's state or context,
    // with global context it updates the entire app
     
  }, []);





  return (
    <Router>
      <React.Fragment>
       
          <UserContext.Provider value={{ email, setEmail, loggedIn, setLoggedIn }}>
            <div>
              <Navbar />
              <Switch>
                  <Route exact path='/tasks' component={Tasks} />
                <Route exact path='/'>
                  {/* <CustomCarousel /> */}
                  <TaskList />
                </Route>
                {/* <Route exact path='/cart'>
                  <Cart
                    checkoutButton={
                      <Button className="btn btn-lg btn-block btn-success text-uppercase" variant="primary" onClick={() => setModalShow(true)}>
                        Checkout
                </Button>
                    }
                  /> */}
                  {/* <CheckoutModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    modalBody={<CheckoutModalBody />}
                  />

                </Route> */}
                {/* <Route exact path='/details' component={Details} >
                  <Details pDetail={productDetail} />
                </Route> */}
                {/* kyle added 39-47*/}
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
