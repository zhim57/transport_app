import React, { Fragment, useRef, useState, useContext } from "react"; // Fragment,
import { Redirect } from "react-router-dom";
// import tasksController from '../controllers/tasksController';
// import "./style.scss";
import API from "../utils/API";
import UserContext from "../utils/UserContext";
import LocationSelector from "./LocationSelector";
import data from '../utils/data';
import {Modal, Button} from 'react-bootstrap';

const Settask = function (props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const [allzones, setAllZones] = useState(data)
    const [selectedZone, setSelectedZone] = useState(null)
    const [nearestZone, setNearestZone] = useState(null);
    const [otherZones, setOtherZones] = useState([]);
 const handleChange = (event) =>
  {
      const zone = data.find((data) => data.userZone === event.target.value);
      setSelectedZone(zone);
  }
const handleClick = (event) =>
{
   const ele= document.querySelector(".formik")
    if(ele.classList.contains('d-none')){
        ele.classList.remove("d-none")
    }
}


    const timecalculate =() =>{
     const speed = 60;
      let zone =   selectedZone && selectedZone.distance ? selectedZone.distance.toFixed(2): 10
        const time = speed/zone;
        return time;
        console.log(zone)
 }
  const result = timecalculate()
    console.log(result.toFixed(0))

  const {
    userId,
    email,
    role,
    nameFirst,
    nameLast,
    vesselName,
    position,
    profilePicture,
    vesselEmail,
    phoneNumber,
  } = useContext(UserContext);
  const [tasks1, setTasks1] = useState([]);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const clientEmailInput = useRef();
  const taskStartPointInput = useRef();
  const taskEndPointInput = useRef();
  const timeTargetTimeInput = useRef();
  const clientNameLastInput = useRef();
  const clientNameFirstInput = useRef();
  const peopleCountInput = useRef();
  const vesselNameInput = useRef();
  const vesselEmailInput = useRef();
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
  const handleSubmit = (event) => {
    event.preventDefault();
    let dateNow =new Date(Date.now());
    let dateNowLocal= dateNow.toLocaleString();
    const taskData = {
      clientEmail: clientEmailInput.current.value,
      taskStartPoint: selectedZone ? selectedZone.pickupName : '',
      taskEndPoint: taskEndPointInput.current.value,
      timeTargetTime: timeTargetTimeInput.current.value,
      timeCreated: dateNowLocal,
      clientNameFirst: clientNameFirstInput.current.value,
      clientNameLast: clientNameLastInput.current.value,
      peopleCount: peopleCountInput.current.value,
      vesselName: vesselNameInput.current.value,
      description: "Transport",
      taskNumber: tasks1.length - 1,
      clientImage: profilePicture,
      driverImage: "./driverImage1.jpg",
      driverName: "Placeholder",
      vehicleImage: "./vanImage.png",
      vehiclePlate: "placeholder",
      vesselEmail: vesselEmailInput.current.value,
    };
    API.getTasks()
      .then((res) => setTasks1(res.data))
      // .then(console.log(tasks1))
      .catch((err) => console.log(err));
 API.saveTasks({...taskData})
      .then((data) => {
        // console.log(data);

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
  let redirect_path = "";
  if (role){

    // console.log("role");
  
    // console.log(role);
      switch (role) {
        case "customer":
          console.log("customer");
          redirect_path = "/client";
  
          break;
        case "driver":
          console.log("driver");
          redirect_path = "/driver";
          break;
        case "dispatcher":
          console.log("dispatcher");
          redirect_path = "/dispatcher";
  
          break;
        default:
          redirect_path = "/login";
          console.log(`Sorry, we are out of paths.`);
         
      }
  }

  return (
    <Fragment>
      {(() => {
        if (redirectToReferrer === false) {
          return (
            <div className="container">
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Choose a location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className={'text-center'}>
                    {
                      otherZones.map(zone => (
                          <Button
                              className={'m-2'}
                              variant={zone === selectedZone ? 'success' : 'primary'}
                              onClick={() => setSelectedZone(zone)}
                          >
                            {zone.userZone} - {zone.distance.toFixed(2)} km
                          </Button>
                      ))
                    }
                  </div>
                </Modal.Body>
              </Modal>
              <br/>
              <h1>Settask page</h1>
              <form {...extraProps} onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor={taskStartPoint}>Pickup point</label>
                    <div>
                        <LocationSelector
                            handleSetOtherZones={setOtherZones}
                            handleSetNearestZone={setNearestZone}
                            handleSelectZone={setSelectedZone}
                            selectedZone={selectedZone} />

                      {
                        nearestZone ?
                            <>
                              <Button
                                  onClick={() => setSelectedZone(nearestZone)}
                                  variant={nearestZone === selectedZone ? 'success' : 'primary'}>
                                {nearestZone.userZone} - {nearestZone.distance.toFixed(2)} km</Button>
                              <Button className={'ml-md-2 ml-xs-0 mt-xs-4'} variant="primary" onClick={handleShow}>Choose another location</Button>
                            </>
                            : null
                      }

                      {
                        selectedZone ?
                            <p className="mt-3">
                              Selected Location: <span>
                                {selectedZone.userZone} - {selectedZone.distance.toFixed(2)} km
                              </span>
                                <div className="mb-3 mt-3">
                                    <span> Duration : <bold>{result.toFixed(0)} mins.</bold></span>
                                </div>
                            </p> : null
                      }

                    {/*<button onClick={handleClick}>Choose An option</button>*/}

                    </div>
                        <select
                    className="form-control formik d-none"
                    ref={taskStartPointInput}
                    id={taskStartPoint}
                    size="7"
                    value={selectedZone ? selectedZone.userZone : ''}
                    onChange={handleChange}
                  >
                      {
                          allzones.map(zone => (
                              <option value={zone.userZone}>{zone.pickupName}</option>
                          ))
                      }
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
                    <option value="Global Staten Island" >
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
                  <div className="mt-5 mb-5">
                      here is the total time data :<span></span>
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
              {/* <Redirect to="/client" /> */}
              <Redirect to={redirect_path}/>
            </div>
          );
        }
      })()}
    </Fragment>
  );
};

export default Settask;
