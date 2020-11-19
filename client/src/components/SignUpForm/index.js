import React, { Fragment, useContext, useRef, useState } from 'react';
// import "./style.scss";
import API from '../../utils/API';
import UserContext from '../../utils/UserContext';
import passwordValidator from "password-validator";

function SignUpForm(props) {
    const { email, setEmail, loggedIn, setLoggedIn } = useContext(UserContext);
    const emailInput = useRef();
    const passwordInput = useRef();
    const nameInput = useRef();
    const [passwordGood, setpasswordGood] = useState(true)

    var passwordVal = new passwordValidator();

    passwordVal
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(2)                                // Must have at least 2 digits
        .has().not().spaces()                           // Should not have spaces
        .is().not().oneOf(['Passw0rd', 'Password123']) // Blacklist these values
        .has().symbols(1);                              // Must have 1 symbol


    let extraProps = {}
    if (props.className) {
        extraProps.className = props.className;
    }
    let emailId = props.className ? props.className + "-signup-email" : "signup-email";
    let emailHelpId = props.className ? props.className + "-signup-email-help" : "signup-email-help";
    let passwordId = props.className ? props.className + "-signup-password" : "signup-password";
    let nameId = props.className ? props.className + "-signup-name" : "signup-name";

    const handleSubmit = event => {
        // if the user hits enter or hits the button, this function will fire
        event.preventDefault();
        // console.log("submit happened");
        // console.log({ email: emailInput.current.value, password: passwordInput.current.value});
        // API.testUserRouter()
        // .then(data => {
        //     console.log(data);
        // })
        // .catch(err => {
        //     console.log(err);
        // });
        if(passwordVal.validate(passwordInput.current.value)){
            console.log('password is good')
            API.signup({ email: emailInput.current.value, password: passwordInput.current.value, name: nameInput.current.value })
            .then(data => {
                console.log(data);
                setEmail(data.data.email);
                setLoggedIn(true);
            })
            .catch(err => {
                console.log(err);
            });
        }else {
            console.log('password failed')
            setpasswordGood(false);
        }


    }
    return (
        <Fragment>
            { (() => {
                if (!loggedIn) {
                    return (<form {...extraProps} onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor={emailId}>Email address</label>
                            <input ref={emailInput} type="email" className="form-control" id={emailId} aria-describedby={emailHelpId} />
                            <small id={emailHelpId} className="email-help-text form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor={nameId}>User Name</label>
                            <input ref={nameInput} type="text" className="form-control" id={nameId} />
                        </div>
                        <div className="form-group">
                            <label htmlFor={passwordId}>Password</label>
                            <input ref={passwordInput} type="password" className="form-control" id={passwordId} />
                            {(!passwordGood) ? <h2>Password failed, try again</h2> : null }
                        </div>
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </form>
                    );
                }
                else {
                    return <h3>{email}</h3>;
                }
            })()
            }
        </Fragment>
    )
}

export default SignUpForm;