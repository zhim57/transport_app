import React, { Fragment, useContext, useRef } from "react";
import "./style.scss";
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";
import { Redirect} from "react-router-dom";
import axios from "axios";



var value1 = { test: "test" };
var mapImg="";

var lat = "beggining value";
var lon = "beggining value";
var position = "beggining value";
function LoginForm(props) {
 
  //=====geolocation
  let z = 12 ;       // Zoom level
let latRad;
let n
let xTile
let yTile

  // var x = document.getElementById("demo");
  function getLocation() {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      lat= "Geolocation is not supported by this browser.";
    }
  }
 

  console.log("hi")
    function showPosition(position) {
      lat = position.coords.latitude ;
      lon= position.coords.longitude}

    // geoLoc = "Latitude: " + position.coords.latitude +
    // "<br>Longitude: " + position.coords.longitude;
  
  getLocation() 
  setTimeout(() => {

    console.log( navigator.geolocation);
    console.log(position);
    console.log(lat);
    console.log(lon);

  }, 19800);
  ///==== geolocation end
  ///==== geolocation mapping 


    // var latlon = position.coords.latitude + "," + position.coords.longitude;
    var latlon = lat + "," + lon;

    // var API_KEYembedMap
  
  
    // var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false&key="+ API_KEY;

  //  var img_urlMap='<iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key='+ API_KEYembedMap + "&q="+latlon+"></iframe>"
   var img_url_map1="https://www.google.com/maps/embed/v1/place?key="+ API_KEYembedMap + "&q="+ latlon ; // Space+Needle,Seattle+WA"
  
    // document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
// mapImg= "<img src='"+img_url+"'>";

//-- javascript ---
// var lat = 52.525439, // Latitude
// lon = 13.38727,    // Longitude


// latRad = lat * Math.PI / 180;
// n = Math.pow(2, z);
// xTile = n * ((lon + 180) / 360);
// yTile = n * (1-(Math.log(Math.tan(latRad) + 1/Math.cos(latRad)) /Math.PI)) / 2;

// //--- output ---
// let lat_rad = 0.916
// // n = 4096
// console.log("xTile") //= 2200.31 // Column
// console.log(xTile) //= 2200.31 // Column
// console.log("yTile") //= 1343.20 // Row
// console.log(yTile) //= 1343.20 // Row




// const options = {
//   method: 'GET',
//   url: 'https://maptiles.p.rapidapi.com/local/osm/v1/12/'+ parseInt(xTile) +'/'+ parseInt(yTile)+'.png',
//   headers: {
//     'x-rapidapi-key': '6f4c62189fmshacee60036d76b2cp101a45jsn8679c155c21e',
//     'x-rapidapi-host': 'maptiles.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

  ///==== geolocation mapping end


  const consumerInfo = (value) => {
    value1 = value;
  };
  var userContextData = {};
  const {
    email,
    setEmail,
    // loggedIn,
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
        phoneNumber: data.data.phoneNumber,
        cloudUploadName: data.data.cloudUploadName,
        cloudUploadPreset: data.data.cloudUploadPreset
      };
      
      updateUserContextData(userContextData);
 
      setTimeout(() => consolesLogs(), 500);
      
      const consolesLogs = () => {

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
            <h1>geolocation : {lat} : {lon}</h1>
            {/* {mapImg} */}
            {/* {img_urlMap} */}
            <div>
            <iframe title="map1" width="600" height="450" frameBorder="0" style={{border:0}} src={img_url_map1}></iframe>
            </div>
          
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
