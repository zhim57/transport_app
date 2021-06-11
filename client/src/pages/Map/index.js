import React, {useState, useEffect} from "react";
import styles from './map.module.css';
import car from './car.png';
import Driver from './Driver';
import withLiveLocation from "./withLiveLocation";

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
    withProps({
        googleMapURL:`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        // googleMapURL:`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`,
        loadingElement:<div style={{height: `100%`}}/>
    }),
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
        showInfo: false
    });
    const toggleInfo = () => {
        setState({
            ...state,
            showInfo: !state.showInfo
        })
    }
    const {pickupLocation, driverLocation} = state;
    useEffect(() => {
        if (props.coordinates) {
            try {
                const directionsService = new window.google.maps.DirectionsService();
                const origin = props.coordinates;
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
                            console.error(`error fetching directions ${result}`);
                        }
                    }
                );
            } catch (err) {
                alert(err.message);
            }
        }
    }, [props.coordinates]);
    useEffect(() => {
        if (props.coordinates) {
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
                state.distance && !state.showInfo ?
                    <div className={styles.infoBox} onClick={toggleInfo}>
                        <i className={`fa fa-info`}></i>
                    </div> : null
            }
            {
                state.distance && state.showInfo ?
                    <div id='output' className={styles.output}>
                        <div>
                        <i onClick={toggleInfo} className={`fa fa-times-circle ${styles.close}`}></i>
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
                        </div>
                    </div> : null
            }
            <GoogleMap
                zoom={15}
                defaultCenter={{lat: 18.562339, lng: -68.410725}}
            >
                <DirectionsRenderer
                    directions={state.directions}
                    options={{
                        preserveViewport: true
                    }}
                />
                <Driver
                    icon={car}
                    position={driverLocation}
                >
                    {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
                        Driver
                    </InfoWindow>}
                </Driver>
            </GoogleMap>
        </div>
    )
});

const Map = compose(withLiveLocation)((props) => {
    return (
        <>
        <MapWithAMakredInfoWindow
            coordinates={props.coordinates}
            counter={props.counter}
            containerElement={<div style={{height: `calc(100vh - 120px)`}}/>}
            mapElement={<div style={{height: `100%`}}/>}
        />
        </>
    )
});
export default Map;