import React, {
  Fragment,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import "./style.scss";
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";
import { useHistory } from "react-router-dom";

function LoginForm(props) {
  //     let setUserContextData ="bolche";
  const [currentUserData, setCurrentUserData] = useState({});
  console.log("get userData");
  console.log(currentUserData);

  // console.log(props.checkChannel);
  // props.setUserContext(setUserContextData);

  // { email, setEmail, loggedIn, setLoggedIn, role ,setRole, id, setId}
  const {
    email,
    setEmail,
    loggedIn,
    setLoggedIn,
    role,
    setRole,
    userId,
    setUserId,
  } = useContext(UserContext);
  console.log(email);
  console.log(loggedIn);

  const history = useHistory();
  const emailInput = useRef();
  const passwordInput = useRef();
  // const roleInput = useRef();
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
    })
      .then((data) => {
        // console.log(data);

        console.log("data");
        console.log(data);

        const currentUserData = {
          email: data.data.email,
          role: data.data.role,
          userId: data.data._id,
          loggedIn: true,
        };
        setCurrentUserData(currentUserData);
        // setEmail(data.data.email);
        // setLoggedIn(true);
        // setRole(data.data.role);
        // setUserId(data.data._id);

        console.log("newuserContext");
        console.log(UserContext);

        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateUserContext = (value) => {
    console.log("updateUserContext called");
    console.log(value);
    //   value.setEmail("jimmy");
    //     value.setLoggedIn(currentUserData.loggedIn);
    //     value.setRole(currentUserData.role);
    //     value.setUserId(currentUserData.userId);
        
        value.setUserDataStore({
           email:currentUserData.email,
            loggedIn: currentUserData.loggedIn,
            role: currentUserData.role,
            userId: currentUserData.userId

        })
        .then(console.log(value.email));
  };

  

  return (
    <Fragment>
      {(() => {
        if (!loggedIn) {
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
                <label htmlFor={passwordId}>Password ja </label>
                <input
                  ref={passwordInput}
                  type="password"
                  className="form-control"
                  id={passwordId}
                  />
              </div>
              <button type="submit" className="btn btn-primary">
                Login
                  <UserContext.Consumer>
                    {value => value.setUserDataStore (value)}
                  </UserContext.Consumer>
              </button>
            </form>
          );
        } else {
          return(


              <h3>{email}
              
              </h3>
              ) 
              
        }
      })()}
    </Fragment>
  );
}

export default LoginForm;
