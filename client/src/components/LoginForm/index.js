import React, { Fragment, useContext, useRef } from "react";
import "./style.scss";
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";
import { Redirect} from "react-router-dom";

var value1 = { test: "test" };

function LoginForm(props) {
  const consumerInfo = (value) => {
    value1 = value;
  };
  var userContextData = {};
  const {
    email,
    setEmail,
    loggedIn,
    setLoggedIn,
    role,
    updateUserContextData,
  } = useContext(UserContext);
  // const history = useHistory();
  const emailInput = useRef();
  const passwordInput = useRef();
  //   const roleInput = useRef();
  let extraProps = {};
  if (props.className) {
    extraProps.className = props.className;
  }
  let emailId = props.className
  ? props.className + "-login-email"
  : "login-email";
  let emailHelpId = props.className
  ? props.className + "-login-email-help"
  : "login-email-help";
  let passwordId = props.className
  ? props.className + "-login-password"
  : "login-password";
  const handleSubmit = (event) => {
    // if the user hits enter or hits the button, this function will fire
    event.preventDefault();
    // console.log("submit happened");
    // console.log({ email: emailInput.current.value, password: passwordInput.current.value});
    // {console.log("HERE: " + JSON.stringify(roleInput.value))}
    API.login({
      email: emailInput.current.value,
      password: passwordInput.current.value,
    }).then((data) => {
      // console.log(" present user context data");
      // console.log(data);
      // console.log(" present user context data");
      userContextData = {
        userId: data.data._id,
        email: data.data.email,
        role: data.data.role,
        profilePicture: data.data.profilePicture,
        nameFirst: data.data.nameFirst,
        nameLast: data.data.nameLast,
        vesselName: data.data.vesselName,
        vesselEmail: data.data.vesselEmail,
        position: data.data.position,
        phoneNumber: data.data.phoneNumber
                // loggedIn: true,
        //   email: "dudur",
        //   role: "sladur",
        //   loggedIn: true,
        //   userId: "petrov"
      };
      
      updateUserContextData(userContextData);
      console.log(" present user context value");
      console.log(value1);
      console.log(" present user context value");

      setTimeout(() => consolesLogs(), 500);
      
      const consolesLogs = () => {
        console.log("value1");
  
        
        console.log(loggedIn);
        console.log(value1);
        // console.log(" printed out consumer info");
        // console.log("email");
        // console.log(value1.email);
        // console.log("loggedIn");
        // console.log(value1.loggedIn);

        // console.log("role");
        // console.log(value1.role);
        // const text =
        // console.log(value1.email + value1.role + value1.loggedIn);
      };
      // // console.log(data);
      setEmail(data.data.email);
      // // setRole(data.data.role);
      setLoggedIn(true);
      // setRole("Driver");
      // setRole(userContextData.role);
      // setRole("Driver");
    });

  }

  let re_path = "/login";
 


    if (value1.role){
  
      // console.log("role");
    
      // console.log(role);
        switch (role) {
          case "customer":
            console.log("customer");
            re_path = "/client";
    
            break;
          case "driver":
            console.log("driver");
            re_path = "/driver";
            break;
          case "dispatcher":
            console.log("dispatcher");
            re_path = "/dispatcher";
    
            break;
          default:
            re_path = "/login";
            console.log(`Sorry, we are out of paths.`);
           
        }
    }


    // if(role==="driver"){
    //     // console.log("history push: driver")
    //     console.log(email, loggedIn, role);
    //     history.push("/driver");
    // }
    //  else if(role==="customer"){
    //         history.push("/client");

    // }
    // else{
    //   console.log(email, loggedIn, role);
    //     history.push("/");
    // }

    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });

    return (
      <Fragment>
                  <UserContext.Consumer>
                    {(value) => consumerInfo(value)}
                  </UserContext.Consumer>
        {(() => {
          if (!value1.role) {
            return (
              <form {...extraProps} onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor={emailId}>Email address</label>
                  <input
                    ref={emailInput}
                    type="email"
                    className="form-control"
                    id={emailId}
                    aria-describedby={emailHelpId}
                    />
                  <small
                    id={emailHelpId}
                    className="email-help-text form-text text-muted"
                  >
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor={passwordId}>Password</label>
                  <input
                    ref={passwordInput}
                    type="password"
                    className="form-control"
                    id={passwordId}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            );
          } else {
            return (
            <div>
                  <UserContext.Consumer>
                    {(value) => consumerInfo(value)}
                  </UserContext.Consumer>
              <Redirect to={re_path}/>
               <h3>{email}</h3>
            
              </div>
            );
          }
        })()}
      </Fragment>
    );
  
}
export default LoginForm;
