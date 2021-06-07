import React, {useEffect, useState} from 'react'
import data from '../utils/data';

const LocationSelector = (props) => {
    const {handleSelectZone, handleSetNearestZone, handleSetOtherZones} = props;
    const [state, setState] =useState({
        loaded:false,
        coordinates : { lat: "", lng: ""},
        receivingLocation: null
    });
    const [userLocation, setUserLocation] = useState(null);
    const toRad = (Value) => {
        return Value * Math.PI / 180;
    }
    const calcDistance = (pointA, pointB) => {
        let lat1 = pointA.lat;
        let lon1 = pointA.lng;
        let lat2 = pointB.lat;
        let lon2 = pointB.lng;
        const R = 6371; // km
        const dLat = toRad(lat2-lat1);
        const dLon = toRad(lon2-lon1);
        lat1 = toRad(lat1);
        lat2 = toRad(lat2);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const d = R * c;
        return c;
    }


    useEffect(() => {
        if (state.coordinates.lat) {
            // console.log(props)
            // alert(JSON.stringify(props))
            const distance = calcDistance(state.coordinates, props.selectedzone.location)
            setState({
                ...state,
                receivingLocation: {...props.selectedzone, distance}
            });
        }
    }, [props.selectedzone]);

    const getMinimumDistance = (point, data) => {
        let results = [];
        data.map(item => {
           results.push({
               ...item,
               distance: calcDistance(point, item.location)
           });
           return results;
        });
        results.sort((a, b) => {
           return a.distance - b.distance;
        });
        if (results.length && results.length > 5) {
            return results.slice(0, 5);
        }
        return results;
    }
    const onSuccess = location => {
        const receiving = getMinimumDistance({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        }, data);
        // handleSelectZone(receiving[0]);
        handleSetNearestZone(receiving.splice(0, 1)[0]);
        handleSetOtherZones(receiving);
        setState({
            loaded:true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
            receivingLocation: receiving
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
    return (
        <div className={'container mb-4'}>
            <h3>User Coordinates</h3>
            <p>Latitude: {state.coordinates.lat}</p>
            <p>Longitude: {state.coordinates.lng}</p>
        </div>
    )
}
export default LocationSelector
