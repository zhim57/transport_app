import React, { useState, Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo.png';
import styled from 'styled-components';
import { ButtonContainer } from './Button';
import UserContext from "../utils/UserContext";
import LoginForm from "../components/LoginForm";
import Timer from "./Timer";

function Navbar(props) {

  // kyle added 11-12
  const [loginExpanded, setLoginExpanded] = useState(false);
  const { email, loggedIn, role } = useContext(UserContext);

  return (
    <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5 row-tasks">

      <Link to='/'>
        <img className="logo" src={Logo} alt="logo" />
      </Link>
      {/* { !loginExpanded && <button onClick= {() => setLoginExpanded(true)}>Login</button>}
                { loginExpanded && 
                (() =>
                <Fragment>
                    <LoginForm>

                    </LoginForm>
                <button onClick= {() => setLoginExpanded(false)}>X</button>
                </Fragment>
                )()
} */}
      <ul className="navbar-nav align-items-center">
        <li className="nav-item ml-5 ">
          <Link to='/' className="btn btn-secondary" >
            Tasks
          </Link>
        </li>
      </ul>


      {/* kyle added 35-52*/}
      { (() => {
        if (loggedIn) {
          return <p className="logged-in-text">Logged in as {email} : {role} <Link className="btn btn-dark" to="/logout" onClick={() => setLoginExpanded(false)}>Logout <span><i className="fa fa-sign-out" aria-hidden="true"></i></span> </Link> </p>;
        }
        else {
          if (!loginExpanded) {
            return (
              <>
                <button className="btn btn-secondary" onClick={() => setLoginExpanded(true)}>Login <span><i className="fa fa-sign-in" aria-hidden="true"></i></span> </button>

              </>
            );
          }
          else {
            return (
              <Fragment>
                <LoginForm className="top-menu-login" />
                <button onClick={() => setLoginExpanded(false)}>X</button>
              </Fragment>
            )
          }
        }
      })()}
      {(loggedIn) ? null : (<Link to='/signup' className="ml-left btn btn-primary" >
        {/* <ButtonContainer> */}
                Sign Up
        {/* </ButtonContainer> */}
      </Link>)}
      <Timer />

      
      {(loggedIn) ?  (<Link to='/settask' className="button-right" >
                    <ButtonContainer>
                        <span className="mr-2">
                            <i className="" />
                        </span>
                        Request Pick-up
                    </ButtonContainer>
                </Link>):null }
      {(loggedIn) ?  (<Link to='/profile' className="button-right" >
                    <ButtonContainer>
                        <span className="mr-2">
                            <i className="fa fa-cart-plus" />
                        </span>
                        Profile
                    </ButtonContainer>
                </Link>):null }




    </NavWrapper>
  )

}

const NavWrapper = styled.nav`
background: var(--mainBlue);
.nav-link:{
    color: var(--mainWhite)!important;
    font-size: 1.3rem;
    text-transform:capitalize;
}
// kyle added 66-72
.logged-in-text{
    font-size:10px;
    a {
        font-size:14px;
        color: white;
    }
},
.row-tasks {
  display: flex;
flex-direction: row;
background-color: #282c34;
padding:10px;
margin-top: 0px;
color:white;
}
`

export default Navbar;
