import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';

const mapStyles = {
    width: '70%',
    height: '70%'
};

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


export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
    };

    onMarkerClick = (props, marker, e) =>{
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        }
        )
    console.log(props)
    };

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
    render() {
        return (
            <>
            <Map
                className="mt-5 ml-5"
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={
                    {
                        lat: 31.4961,
                        lng: 74.264
                    }
                }
            >
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Darbar'}
                    slug={'Darbar'}
                    key={1}
                    position={
                        {
                            lat: 31.5789,
                            lng: 74.3044
                        }
                    }
                />
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Chungi'}
                    position={
                        {
                            lat: 31.4961,
                            lng: 74.264
                        }
                    }
                />
                <Marker
                    onClick={this.onMarkerClick}
                    name={'gajumata'}
                    position={
                        {
                            lat: 31.3862,
                            lng: 74.3661
                        }
                    }
                />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name} ( {this.state.selectedPlace.position ? this.state.selectedPlace.position.lat + ' , ' + this.state.selectedPlace.position.lng:""})</h4>
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
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC5LqGDvUU893C_dwX4Df6wzc4n3vwmrsM'
})(MapContainer);