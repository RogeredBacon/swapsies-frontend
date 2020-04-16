import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React, { Component } from 'react';
export class GMap extends Component {
	render() {
		const mapStyles = {
			width: '100%',
			height: '70%',
		};
		return (
			<Map
				google={this.props.google}
				zoom={16}
				style={mapStyles}
				initialCenter={{
					lat: this.props.lat,
					lng: this.props.long,
				}}>
				<Marker
					position={{
						lat: this.props.lat,
						lng: this.props.long,
					}}
				/>
			</Map>
		);
	}
}
export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_API_KEY,
})(GMap);
