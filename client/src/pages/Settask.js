import React, { Fragment,  useRef, useState, useContext } from "react"; // Fragment,
import {Redirect} from 'react-router-dom';
// import tasksController from '../controllers/tasksController';
// import "./style.scss";
import API from "../utils/API";
import UserContext from '../utils/UserContext';

const Settask = function (props) {
  
  //====================
  
  const { email, setEmail, loggedIn, setLoggedIn, role } = useContext(UserContext);
  const [tasks1, setTasks1] = useState([]);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  // console.log(tasks1);
  const clientEmailInput = useRef();
  const taskStartPointInput = useRef();
  const taskEndPointInput = useRef();
  const timeTargetTimeInput = useRef();
  const clientNameLastInput = useRef();
  const clientNameFirstInput = useRef();
  const peopleCountInput = useRef();
  const vesselNameInput = useRef();
  const vesselEmailInput = useRef();

  // const [passwordGood, setpasswordGood] = useState(true)

  let extraProps = {};
  if (props.className) {
    extraProps.className = props.className;
  }
  let taskStartPoint = props.className
    ? props.className + "-taskStartPoint"
    : "taskStartPoint";
  let taskEndPoint = props.className
    ? props.className + "-taskEndPoint"
    : "taskEndPoint";
  let timeTargetTime = props.className
    ? props.className + "-timeTargetTime"
    : "timeTargetTime";
  let clientNameFirst = props.className
    ? props.className + "-clientNameFirst"
    : "clientNameFirst";
  let clientNameLast = props.className
    ? props.className + "-clientNameLast"
    : "clientNameLast";
  let clientEmail = props.className
    ? props.className + "-clientEmail"
    : "clientEmail";
  let peopleCount = props.className
    ? props.className + "-peopleCount"
    : "peopleCount";
  let vesselName = props.className
    ? props.className + "-vesselName"
    : "vesselName";
  let vesselEmail = props.className
    ? props.className + "-vesselEmail"
    : "vesselEmail";

  // let passwordId = props.className ? props.className + "-signup-password" : "signup-password";
  // let nameId = props.className ? props.className + "-signup-name" : "signup-name";
  // let roleId = props.className ? props.className + "-signup-role" : "signup-role";

  // taskStartPoint v
  // taskEndPoint v
  // timeTargetTime v
  // clientNameFirst v
  // clientNameLast v
  // clientEmail v
  // peopleCount v
  // vesselName v

  const handleSubmit = (event) => {
    // if the user hits enter or hits the button, this function will fire
    event.preventDefault();

    API.getTasks()
      .then((res) => setTasks1(res.data))
      .then(console.log(tasks1))
      .catch((err) => console.log(err));
    
  

    API.saveTasks({
      clientEmail: clientEmailInput.current.value,
      taskStartPoint: taskStartPointInput.current.value,
      taskEndPoint: taskEndPointInput.current.value,
      timeTargetTime: timeTargetTimeInput.current.value,
      clientNameFirst: clientNameFirstInput.current.value,
      clientNameLast: clientNameLastInput.current.value,
      peopleCount: peopleCountInput.current.value,
      vesselName: vesselNameInput.current.value,
      description: "Transport",
      taskNumber: tasks1.length - 1,
      clientImage: "./clientImage1.jpg",
      driverImage: "./driverImage1.jpg",
      driverName: "Placeholder",
      vehicleImage: "./vanImage.png",
      vehiclePlate: "placeholder",
      vesselEmail: vesselEmailInput.current.value,
    })
      .then((data) => {
        console.log(data);
        
        setRedirectToReferrer(true);
        // setLoggedIn(true);
        // window.location.reload();
      
        props.refreshTasks(tasks1);
        
      })
      .catch((err) => {
        // console.log("some error");
        console.log("set task  failed  ");
      });
  };
  const redirect_path = role ==="driver"?"/driver":"/client" 
  //======================

  return (
    <Fragment> 
      {
      (() => {
        if (redirectToReferrer === false) {
          return (
            <div className="container">
              <h1>Settask page</h1>

              <form {...extraProps} onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor={taskStartPoint}>Pickup point</label>
                  <select
                    className="form-control"
                    ref={taskStartPointInput}
                    id={taskStartPoint}
                    size="7"
                  >
                    <option value="PNCT">PNCT</option>
                    <option value="APM">APM</option>
                    <option value="MAHER">MAHER</option>
                    <option value="Global Staten Island">
                      Global Staten Island
                    </option>
                    <option value="Global Bayonne">Global Bayonne</option>
                    <option value="Auto berth">Auto berth</option>
                    <option value="Jersey Gardens Door 5">
                      Jersey Gardens Door 5
                    </option>
                    <option value="Seamans Center">Seamans Center</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor={taskEndPoint}>Drop off point</label>
                  <select
                    className="form-control"
                    ref={taskEndPointInput}
                    id={taskEndPoint}
                    size="7"
                  >
                    <option value="PNCT">PNCT</option>
                    <option value="APM">APM</option>
                    <option value="MAHER">MAHER</option>
                    <option value="Global Staten Island">
                      Global Staten Island
                    </option>
                    <option value="Global Bayonne">Global Bayonne</option>
                    <option value="Auto berth">Auto berth</option>
                    <option value="Jersey Gardens Door 5">
                      Jersey Gardens Door 5
                    </option>
                    <option value="Seamans Center">Seamans Center</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor={timeTargetTime}>Pickup Time</label>
                  <input
                    ref={timeTargetTimeInput}
                    type="time"
                    className="form-control"
                    id={timeTargetTime}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={clientEmail}>Email address</label>
                  <input
                    ref={clientEmailInput}
                    type="email"
                    className="form-control"
                    id={clientEmail}
                  />
                  {/* <small id={clientEmailHelpId} className="email-help-text form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group">
                  <label htmlFor={vesselEmail}>Vessel's Email address</label>
                  <input
                    ref={vesselEmailInput}
                    type="email"
                    className="form-control"
                    id={vesselEmail}
                  />
                  {/* <small id={clientEmailHelpId} className="email-help-text form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group">
                  <label htmlFor={clientNameFirst}>first Name</label>
                  <input
                    ref={clientNameFirstInput}
                    type="text"
                    className="form-control"
                    id={clientNameFirst}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={clientNameLast}>Last Name</label>
                  <input
                    ref={clientNameLastInput}
                    type="text"
                    className="form-control"
                    id={clientNameLast}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={peopleCount}>how many people </label>
                  <input
                    ref={peopleCountInput}
                    type="number"
                    className="form-control"
                    id={peopleCount}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={vesselName}>Vessel Name</label>
                  <input
                    ref={vesselNameInput}
                    type="text"
                    className="form-control"
                    id={vesselName}
                  />
                </div>

                {/* <div className="form-group">
                            <label htmlFor={passwordId}>Password</label>
                            <input ref={passwordInput} type="password" className="form-control" id={passwordId} />
                            {(!passwordGood) ? <h2>validation instructions</h2> : null }
                        </div>
                        <div className="form-group">
                            <label htmlFor={roleId}>Role</label>
                            <select className="form-control" ref={roleInput} id={roleId} size="2" >
                                <option value="driver">Driver</option>
                                <option value="customer">Customer</option>
                            </select>
                            
                        </div> */}
                <button type="submit" className="btn btn-primary">
                  Submit Job
                </button>
              </form>
            </div>
          );
        } else {
          return ( 
              <div>
               
            <Redirect to={redirect_path}/>
                   
              </div>
                  );
        }
      })()}
      
    </Fragment>
  );
};

export default Settask;
