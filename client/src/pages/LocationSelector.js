import React, {useEffect, useState} from 'react'

const LocationSelector = () => {

    const data = [
        {
            userZone: 'MAHER Terminals',
            corner1: {lat: 40.68604374016638, lng: -74.1600035521671},
            corner2: {lat: 40.68637933293578, lng: -74.15841836664153},
            corner3: {lat: 40.67371875383358, lng: -74.13722431929182},
            corner4: {lat: 40.668193429055904, lng: -74.14188063408808},
            pickupName: 'MAHER Terminals - Gate',
            location: {lat: 40.68514958056915, lng: -74.1605376470323}
        },
        {
            userZone: 'PNCT',
            corner1: {lat: 40.687847343274285, lng: -74.15737039190282},
            corner2: {lat: 40.688368005726474, lng: -74.15623313534371},
            corner3: {lat: 40.68104581637439, lng: -74.14479619673972},
            corner4: {lat: 40.68055764181563, lng: -74.14565450357678},
            pickupName: 'PNCT -Gate(visitors)',
            location: {lat: 40.68884900480794, lng: -74.14508453373219}
        },
        {
            userZone: 'APM terminals',
            corner1: {lat: 40.668242255726554, lng: -74.14638674653408},
            corner2: {lat: 40.66702157823555, lng: -74.1420952123487},
            corner3: {lat: 40.658687822913805, lng: -74.14842522572872},
            corner4: {lat: 40.66230141495819, lng: -74.1565791406809},
            pickupName: 'APM -Gate(visitors)',
            location: {lat: 40.669731960637655, lng: -74.1587000977387}
        },
        {
            userZone: 'Seamans Center',
            corner1: {lat: 40.68870053613662, lng: -74.1438319421205},
            corner2: {lat: 40.68853172889521, lng: -74.14333841568919},
            corner3: {lat: 40.68783718216544, lng: -74.1437427796183},
            corner4: {lat: 40.68803348942683, lng: -74.14414729176472},
            pickupName: 'Seamans Center- Front door',
            location: {lat: 40.6884625788174, lng: -74.14368710284174}
        },
        {
            userZone: 'Jersey Gardens',
            corner1: {lat: 40.66208365595145, lng: -74.17354743213156},
            corner2: {lat: 40.65953624837635, lng: -74.16704575784073},
            corner3: {lat: 40.65775092044418, lng: -74.16909753672196},
            corner4: {lat: 40.660203337324134, lng: -74.1751102602486},
            pickupName: 'Jersey Gardens Gate C - pick up/drop off',
            location: {lat: 40.66106328033149, lng: -74.17110796316805}
        },
        {
            userZone: 'Global Bayonne',
            corner1: {lat: 40.6730526332811, lng: -74.08557592304543},
            corner2: {lat: 40.674142357420514, lng: -74.08463887522308},
            corner3: {lat: 40.67062437956446, lng: -74.0757369209109},
            corner4: {lat: 40.66955828902361, lng: -74.07700193547106},
            pickupName: 'Global Bayonne -visitor gate',
            location: {lat: 40.67611442693582, lng: -74.08839520362037}
        },
    ]
    const [state, setState] =useState({
        loaded:false,
        coordinates : { lat: "", lng: ""},
        receivingLocation: null
    });
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
        return d;
    }
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
        return results[0];
    }
    const onSuccess = location => {
        const receiving = getMinimumDistance({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        }, data);
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
        <div className={'container mt-4'}>
            <h3>User Location</h3>
            <p>Latitude: {state.coordinates.lat}</p>
            <p>Longitude: {state.coordinates.lng}</p>

            <h5>Locaiton to Reach</h5>
            {
                state.receivingLocation ?
                    <>
                    <p>Zone: {state.receivingLocation.userZone}</p>
                    <p>Pickup location: {state.receivingLocation.pickupName}</p>
                    </>
                    : null
            }
        </div>
    )
}
export default LocationSelector
