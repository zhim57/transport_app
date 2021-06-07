import React, {Component, useEffect, useState} from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';


const MapContainer = (props) => {

    const mapStyles = {
        width: '70%',
        height: '70%'
    };

    const [state, setState] =useState({
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {},
        loaded:false,
        coordinates : { lat: "", lng: ""},
        receivingLocation: null
    });

    const onSuccess = location => {
        setState({
            loaded:true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            }
        });
    };
    const onError = error => {
        setState({
            loaded:true,
            error,
        });
    };
    useEffect(() =>{
        if( !("geolocation" in navigator)){
            alert("Navigator is not available here");
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }, [])


    const distancecalculate = (lat, lng) => {
        const distance = lng-lat;
        return distance;
    }
    const finalpoint = distancecalculate(31.4961, 74,264)
    console.log(finalpoint.toFixed(2))


    const timecalculate =(Speed, distance) =>{
        const time = Speed/distance;
        return time;
        console.log(distance)
    }
    const result = timecalculate(60, 42)
    console.log(result.toFixed(0))

   const onMarkerClick = (props, marker, e) =>{
        setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    };

    const onClose = props => {
        if (state.showingInfoWindow) {
            setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
        return (
            <>
            <Map
                className="mt-5 ml-5"
                google={props.google}
                zoom={10}
                style={mapStyles}
                initialCenter={
                    {
                        lat: 31.4961,
                        lng: 74.264
                    }
                }
            >

                        <Marker
                            onClick={onMarkerClick}
                            name={'Current'}
                            position={
                                {
                                    lat: 31.6211,
                                    lng: 74.2824
                                }
                            }
                        />
                <Marker
                    onClick={onMarkerClick}
                    name={'Dispatcher'}
                    position={
                        {
                            lat: 31.4961,
                            lng: 74.264
                        }
                    }
                />
                <Marker
                    onClick={onMarkerClick}
                    name={'Driver'}
                    position={
                        {
                            lat: 31.3862,
                            lng: 74.3661
                        }
                    }
                />
                <InfoWindow
                    marker={state.activeMarker}
                    visible={state.showingInfoWindow}
                    onClose={onClose}
                >
                    <div>
                        {
                            state.selectedPlace ?

                        <h4>{state.selectedPlace.name} ( {state.selectedPlace.position ? state.selectedPlace.position.lat + ' , ' + state.selectedPlace.position.lng:""})</h4>
                        : ''}
                        </div>
                </InfoWindow>

            </Map>
        <div className="m-5">
            <span> Duration : <bold>{result.toFixed(2)} mins.</bold></span>
            <br/>
            <span> Distance : <bold>{finalpoint.toFixed(2)} km.</bold></span>
        </div>
            </>
        );
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC5LqGDvUU893C_dwX4Df6wzc4n3vwmrsM'
})(MapContainer);
