import React, { Fragment, useContext, useRef, useState } from 'react';
// import "./style.scss";
import API from '../../utils/API';
import UserContext from '../../utils/UserContext';
import passwordValidator from "password-validator";

function SignUpForm(props) {
    const { email, setEmail, loggedIn, setLoggedIn, role, setRole } = useContext(UserContext);
    const emailInput = useRef();
    const passwordInput = useRef();
    const nameInput = useRef();
    const roleInput = useRef();
    const [passwordGood, setpasswordGood] = useState(true)

    var passwordVal = new passwordValidator();

    passwordVal
        .is().min(6)                                    // Minimum length 6
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(1)                                // Must have at least 1 digit
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
    let roleId = props.className ? props.className + "-signup-role" : "signup-role";

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
            setpasswordGood(true);
            console.log(passwordInput.current.value);
            console.log(passwordGood);
           
            API.signup({ email: emailInput.current.value, password: passwordInput.current.value, name: nameInput.current.value, role: roleInput.current.value })
            .then(data => {
                console.log(data);
                setEmail(data.data.email);
                setLoggedIn(true);
                setRole(data.data.role);
                setpasswordGood(passwordInput.current.value);
                console.log(passwordInput.current.value);
            })
            .catch(err => {
                console.log(err);
                console.log('password failed ,Min length 6,  Max 100 , need a CAP,  a lower case at least 1 digit , 1 symbol, no spaces  ');
                
            });
        }else {
            setpasswordGood(false);
            console.log('password failed ,Min length 6,  Max 100 , need a CAP,  a lower case at least 1 digit , 1 symbol, no spaces  ')
           
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
                            {(!passwordGood) ? <h2>Password failed, try again, Min length 6,  Max 100 , need a CAP,  a lower case at least 1 digit , 1 symbol, no spaces</h2> : null }
                        </div>
                        <div className="form-group">
                            <label htmlFor={roleId}>Role</label>
                            <select className="form-control" ref={roleInput} type="text" id={roleId} size="2" >
                                <option type="text" ref={roleInput} value="driver">Driver</option>
                                <option type="text" ref={roleInput} value="customer">Customer</option>
                            </select>
                            
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