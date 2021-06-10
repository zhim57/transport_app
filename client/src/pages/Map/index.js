import React, {useState, useEffect} from "react";
import styles from './map.module.css';
import car from './car.png';

const {compose, withProps, withStateHandlers} = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    DirectionsRenderer,
    GoogleMap,
    Marker,
    InfoWindow,
} = require("react-google-maps");
const MapWithAMakredInfoWindow = compose(
    withStateHandlers(() => ({
        isOpen: false,
    }), {
        onToggleOpen: ({isOpen}) => () => ({
            isOpen: !isOpen,
        })
    }),
    withScriptjs,
    withGoogleMap
)(props => {
    const [state, setState] = useState({
        directions: null,
        isOpen: false,
        pickupLocation: {lat: 31.4233882, lng: 74.3771547},
        driverLocation: {lat: 31.4314, lng: 74.3485},
        coordinates: null
    });
    const onSuccess = location => {
        setState({
            ...state,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            }
        });
    };
    const onError = error => {
        setState({
            error,
        });
    };
    const {pickupLocation, driverLocation} = state;
    useEffect(() => {
        if (!("geolocation" in navigator)) {
            alert("Navigator is not available here");
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }, []);
    useEffect(() => {
        if (state.coordinates) {
            try {
                const directionsService = new window.google.maps.DirectionsService();
                const origin = state.coordinates;
                const destination = pickupLocation;
                let distance;
                let duration;
                // calculate eta and draw route between my location and pickup point
                directionsService.route(
                    {
                        origin: origin,
                        destination: destination,
                        travelMode: window.google.maps.TravelMode.DRIVING
                    },
                    (result, status) => {
                        if (status === window.google.maps.DirectionsStatus.OK) {
                            console.log("result", result);
                            distance = result.routes[0].legs[0].distance.text;
                            duration = result.routes[0].legs[0].duration.text;
                            setState({
                                ...state,
                                directions: result,
                                distance,
                                duration,
                                myLocationName: result.routes[0].legs[0].start_address,
                                pickupLocationName: result.routes[0].legs[0].end_address
                            });
                        } else {
                            alert("error");
                            console.error(`error fetching directions ${result}`);
                        }
                    }
                );
            } catch (err) {
                alert(err.message);
            }
        }
    }, [state.coordinates]);
    useEffect(() => {
        if (state.coordinates) {
            try {
                const directionsService = new window.google.maps.DirectionsService();
                // calculate eta and draw route between my location and pickup point
                directionsService.route(
                    {
                        origin: driverLocation,
                        destination: pickupLocation,
                        travelMode: window.google.maps.TravelMode.DRIVING
                    },
                    (result, status) => {
                        if (status === window.google.maps.DirectionsStatus.OK) {
                            console.log("result2", result);
                            setState({
                                ...state,
                                driver: {
                                    distance: result.routes[0].legs[0].distance.text,
                                    duration: result.routes[0].legs[0].duration.text,
                                },
                                driverLocationName: result.routes[0].legs[0].start_address,
                            });
                        } else {
                            console.error(`error fetching directions ${result}`);
                        }
                    }
                );
            } catch (err) {
                alert(err.message);
            }
        }
    }, [state.distance]);
    return (
        <div>
            {
                state.distance ?
                    <div id='output' className={styles.output}>
                        <b>My Location</b><br/>
                        Location: {state.myLocationName} <br/>
                        Pickup Location: {state.pickupLocationName} <br/>
                        ETA: {state.duration} <br/>
                        Distance: {state.distance}
                        {
                            state.driver ?
                                <>
                                    <br/><br/><b>Driver</b> <br/>
                                    Location: {state.driverLocationName} <br/>
                                    ETA: {state.driver.duration} <br/>
                                    Distance: {state.driver.distance}
                                </> : null
                        }
                    </div> : null
            }
            <GoogleMap
                zoom={11}
                defaultCenter={{lat: 31.4626, lng: 74.3309}}
            >
                <DirectionsRenderer
                    directions={state.directions}
                />
                <Marker
                    icon={car}
                    position={driverLocation}
                    onClick={props.onToggleOpen}
                >
                    {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
                        Driver
                    </InfoWindow>}
                </Marker>
            </GoogleMap>
        </div>
    )
});

const Map = () => {
    return (
        <MapWithAMakredInfoWindow
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{height: `100%`}}/>}
            containerElement={<div style={{height: `calc(100vh - 120px)`}}/>}
            mapElement={<div style={{height: `100%`}}/>}
        />
    )
};
export default Map;