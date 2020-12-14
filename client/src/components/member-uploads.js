import React, { useContext } from "react";
import API from "../utils/API";
import UserContext from "../utils/UserContext";

const MemberUploads = (props) => {
  const { cloudUploadName, cloudUploadPreset } = useContext(UserContext);

  var myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: cloudUploadName,
      uploadPreset: cloudUploadPreset,
    },
    (error, result) => {
      console.log("result");
      console.log(result);
      checkUploadResult(result);
    }
  );

  const checkUploadResult = (resultEvent) => {
    if (resultEvent.event === "success") {
      let profilePictureData = {
        profilePicture: resultEvent.info.secure_url,
      };
      API.update1(props.id, profilePictureData)
        .then((res) => console.log("res.data"))
        .catch((err) => console.log(err));
    }
  };

  const showWidget = (myWidget) => {
    myWidget.open();
  };
  return (
    <div id="photo-form-container">
      <button
        className="button ui primary"
        onClick={() => showWidget(myWidget)}
      >
        submit picture
      </button>
    </div>
    );
};

export default MemberUploads;
