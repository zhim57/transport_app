                            // kyle added useState, Fragment and useContext
import React, {  useState, Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo.jpg';
import styled from 'styled-components';
import { ButtonContainer } from './Button';
import UserContext from "../utils/UserContext";
import LoginForm from "../components/LoginForm";

function Navbar(props)  {
    
        // kyle added 11-12
        const [loginExpanded, setLoginExpanded] = useState(false);
        const {email, loggedIn} = useContext(UserContext);
        return (
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
             
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
                    <li className="nav-item ml-5">
                        <Link to='/' className="nav-link" >
                            Products
                        </Link>
                    </li>
                </ul>
            

                {/* kyle added 35-52*/}
                { (() => {
        if(loggedIn){
          return <p className="logged-in-text">Logged in as {email} <Link className="btn btn-dark" to="/logout" onClick={ () => setLoginExpanded(false)}>Logout <span><i className="fa fa-sign-out" aria-hidden="true"></i></span> </Link> </p>;
        }
        else{
          if(!loginExpanded){
            return(
              <>
            <button className="btn btn-secondary" onClick={ () => setLoginExpanded(true) }>Login <span><i className="fa fa-sign-in" aria-hidden="true"></i></span> </button>
           
        </>
            );
          }
          else{
            return (
              <Fragment>
                <LoginForm className="top-menu-login"/>
                <button onClick={ () => setLoginExpanded(false) }>X</button>
              </Fragment>
            )
          } 
        }
      })()}
      {(loggedIn) ? null : (<Link to='/signup' className="ml-left" >
            <ButtonContainer>
                <span className="mr-2">
                   <i className="fas fa-user-alt"></i>
                </span>
                Sign Up
            </ButtonContainer>
        </Link>) }


        <Link to='/cart' className="ml-auto" >
                    <ButtonContainer>
                        <span className="mr-2">
                            <i className="fa fa-cart-plus" />
                        </span>
                        My Cart
                    </ButtonContainer>
                </Link>
      



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
}
`

export default Navbar;
