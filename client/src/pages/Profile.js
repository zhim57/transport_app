import React, { Fragment, useContext, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import MemberUploads from "../components/member-uploads";
import API from "../utils/API";
import UserContext from "../utils/UserContext";

const Profile = function (props) {
    const [profileUpdated, setProfileUpdated] = useState(false);
    const nameFirstInput = useRef();
    const nameLastInput = useRef();
    const vesselNameInput = useRef();
    const vesselEmailInput = useRef();
    const positionInput = useRef();
    const phoneNumberInput = useRef();
    // const profilePictureInput = useRef();
    
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
        updateUserContextData,
    } = useContext(UserContext);
//     console.log("residual data ")
// console.log(userId)
// console.log(nameFirst)
// console.log(nameLast)
// console.log("residual data ")
// console.log("residual data ")
    
  const onProfileupdateSubmit = (event) => {
    event.preventDefault();
    const profileContext = {
      userId: userId,

      vesselEmail: vesselEmailInput.current.value,
      role: role,
      phoneNumber: phoneNumberInput.current.value,
      nameFirst: nameFirstInput.current.value,
      nameLast: nameLastInput.current.value,
      vesselName: vesselNameInput.current.value,
      position: positionInput.current.value,
    };

    updateUserContextData(profileContext);
    console.log("profileContext started");
    const id = profileContext.userId;
    API.update(id, profileContext)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setProfileUpdated(true);
  };
//   console.log("what is the role?");
//   console.log(role);
  const redirect_path = role === "driver" ? "/driver" : "/client";
  return (
    <Fragment>
      {(() => {
        if (profileUpdated === false) {
          return (
            //-------------------------------
            <div className="ui container">
              <h1>Profile page</h1>
              <h5>userId: {userId} </h5>
              <h5>email: {email} </h5>
              <h5>role: {role} </h5>
              <h5>
                First Name: {nameFirst}
                <input
                  ref={nameFirstInput}
                  type="text"
                  className="form-control"
                  id={nameFirst}
                ></input>
              </h5>
              <h5>
                Last Name: {nameLast}
                <input
                  ref={nameLastInput}
                  type="text"
                  className="form-control"
                  id={nameLast}
                ></input>
              </h5>
              <h5>
                Vessel name: {vesselName}
                <input
                  ref={vesselNameInput}
                  type="text"
                  className="form-control"
                  id={vesselName}
                ></input>
              </h5>
              <h5>
                Vessel email address: {vesselEmail}
                <input
                  ref={vesselEmailInput}
                  type="text"
                  className="form-control"
                  id={vesselEmail}
                ></input>
              </h5>
              <h5>
                Position: {position}
                <input
                  ref={positionInput}
                  type="text"
                  className="form-control"
                  id={position}
                ></input>
              </h5>
              <h5>
                Phone number: {phoneNumber}
                <input
                  ref={phoneNumberInput}
                  type="text"
                  className="form-control"
                  id={phoneNumber}
                ></input>
              </h5>
              <button
                className="ui button primary"
                onClick={(event) => onProfileupdateSubmit(event)}
              >
                Submit
              </button>
              <br />
              <hr />

              <h5>
                Profile Picture:{" "}
                <img src={profilePicture} alt={profilePicture} />
              </h5>
              <MemberUploads id={userId} profilePicture={profilePicture}>
                <h4>Hi members uploads is here</h4>
              </MemberUploads>
            </div>
          );
        } else {
          return (
            <div>
              <Redirect to={redirect_path} />
            </div>
          );
        }
      })()}
    </Fragment>
  );
};

export default Profile;
