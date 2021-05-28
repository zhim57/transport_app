import React from 'react'


const GeoTriggerRadius =(props) =>{
    const geoRadius = (targetLat, targetLong, radius) => {
        // get the user's location
        navigator.geolocation.getCurrentPosition((location) => {
            if (location.coords) {
                // if their location is available, plot out a radius around the desired target
                // check if the user's location is within that radius of the target's location
                // "(x – h)2 + (y – k)2 = r2, where (h, k) represents the coordinates of the center of the circle, and r represents the radius of the circle"
                let distanceBetween = (location.coords.latitude - targetLat) ** 2 + (location.coords.longitude - targetLong) ** 2;
                radius *= radius;
                if (distanceBetween <= radius) {
                    console.log("You're within a mile of the target!")
                }
                else { console.log("No, you're not") }
            }
            else {
                console.log("Your location is unavailable")
            };
        });
    };
    // enter the X and Y coordinates of the target location, and a distance to "draw" a radius from it
    // also set your timer
    // Today I Learned 1 degree of latitude is = 69 miles
    setInterval(()=>{geoRadius("x coordinate", "y coordinate", 0.0144927536231884)}, 3000)
    return(
    <div>

        {console.log("geolocation")}

    </div>
    )
}

export default GeoTriggerRadius;


//