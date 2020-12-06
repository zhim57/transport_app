import React from "react";
import API from "../utils/API";


const MemberUploads = (props) => {
 
  var myWidget = window.cloudinary.createUploadWidget({
      // cloudName: cloudData.cloudUploadName,
      // uploadPreset: cloudData.cloudUploadPreset,
      cloudName: "dt6ie2v0k",
      uploadPreset: "bloggdvc",
    },
    (error, result) => {
      checkUploadResult(result);
    }
  );
  

  const checkUploadResult = (resultEvent) => {
    if (resultEvent.event === "success") {
      // console.log("props.currentUser.id");
      // console.log(resultEvent.info.secure_url);
     
        let profilePictureData ={
          profilePicture: resultEvent.info.secure_url
        }
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
      <button className="button ui primary" onClick={( ()=> showWidget(myWidget))}>
        submit picture
      </button>
    </div>
    // document.getElementById('example')
  );
}
export default MemberUploads;
