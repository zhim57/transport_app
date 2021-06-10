import React, {Component} from 'react';

const withLiveLocation = (WrappedComponent) => {
    class WithLiveLocation extends Component {
        constructor(props) {
            super(props);
            this.state = {
                coordinates: null,
                counter: 0
            }
        }

        componentDidMount() {
            if (!("geolocation" in navigator)) {
                alert("Navigator is not available here");
            } else {
                this.timeInterval = setInterval(() => {
                    navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError)
                }, 10000);
            }
        }

        componentWillUnmount() {
            if (this.timeInterval) {
                clearInterval(this.timeInterval);
            }
        }

        onSuccess = location => {
            this.setState({
                coordinates: {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude,
                },
                counter: this.state.counter + 1
            });
        };
        onError = error => {
            console.log("error");
            this.setState({
                error
            });
        };

        render() {
            return (
                <WrappedComponent
                    coordinates={this.state.coordinates}
                    counter={this.state.counter}
                />
            )
        }
    }
    return (WithLiveLocation)
}



export default withLiveLocation;