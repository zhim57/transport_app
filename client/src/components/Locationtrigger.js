import React from 'react'


const GeoTrigger =(props) =>{
    setInterval(() => { 
        navigator.geolocation.getCurrentPosition((location) => { 
              if (location.coords.latitude < "top of your lat range" && location.coords.latitude > "bottom of lat range" && location.coords.longitude < "top of long range" && location.coords.longitude > "bottom of long range") { 
                  console.log("yes")}
              else { console.log("no")}              
          })
      }, 
      3000);

    return(
    <div>

        {console.log("geolocation")}

    </div>
    )
}

export default GeoTrigger;


//