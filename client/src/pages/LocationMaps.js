/* eslint-disable no-undef */
// import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import React, { Component } from 'react';
export class LocationMaps extends Component {

    render() {
        const google = window.google;
        const myLatLng = { lat: 0.0, lng: 0.0 };
        const mapOptions = {

            center: myLatLng,
            zoom: 1,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
document.getElementById("output").style.display = "none";
        const map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
const directionsService = new google.maps.DirectionsService();
        const directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        function calcRoute() {
            //create request
            const request = {
                origin: document.getElementById("location-1").value,
                destination: document.getElementById("location-2").value,
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC
            }
                directionsService.route(request, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {

                    $("#output").html("<div class='result-table'> Driving distance: " + result.routes[0].legs[0].distance.text + ".<br />Duration: " + result.routes[0].legs[0].duration.text + ".</div>");
                    document.getElementById("output").style.display = "block";
                    directionsDisplay.setDirections(result);
                } else {
                    directionsDisplay.setDirections({ routes: [] });
                    map.setCenter(myLatLng);
    alert("Can't find road! Please try again!");
                    clearRoute();
                }
            });

        }
        function clearRoute(){
            document.getElementById("output").style.display = "none";
            document.getElementById("location-1").value = "";
            document.getElementById("location-2").value = "";
            directionsDisplay.setDirections({ routes: [] });

        }
const options = {
            types: ['(cities)']
        }
        const input1 = document.getElementById("location-1");
        const autocomplete1 = new google.maps.places.Autocomplete(input1, options);

        const input2 = document.getElementById("location-2");
        const autocomplete2 = new google.maps.places.Autocomplete(input2, options);

        return(
            <>
            <div class="header">
                <div class="row">
                    <h1>Calculate driving distance between two cities</h1>
                </div>
            </div>

            <div class="container">
                <form>
                    <div class="row">
                        <div class="location-label">
                            <label>Origin: </label>
                        </div>
                        <div class="location-input">
                            <input type="text" id="location-1" name="origin" placeholder="Enter a start location..."/>
                        </div>
                    </div>

                    <div class="row">
                        <div class="location-label">
                            <label>Destination: </label>
                        </div>
                        <div class="location-input">
                            <input type="text" id="location-2" name="destination" placeholder="Enter a last location..."/>
                        </div>
                    </div>

                    <div class="row">
                        <button class="button" type="button" onclick="clearRoute();">Clear</button>
                        <button class="button" type="button" onclick="calcRoute();">Submit</button>
                    </div>

                    <div id="output" class="result-table"></div>
                </form>

                <div class="container-map" id="google-map"></div>
            </div>
            </>
        )
    }
}
export default LocationMaps;
