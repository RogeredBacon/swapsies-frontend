import React from 'react';
import CurrentItems from './CurrentItems';
import PastTrades from './PastTrades';
import { Segment, Image, Dropdown, Button } from 'semantic-ui-react';

class UserPage extends React.Component {
	state = {
		currentUser: this.props.currentUser,
		segment: this.props.segment,
		userItems: this.props.userItems,
	};

	renderSegment = () => {
		switch (this.state.segment) {
			case '': {
			}
			case 'items': {
				return <CurrentItems userItems={this.state.userItems} />;
			}
			case 'pastTrades': {
				return <PastTrades />;
			}
			default: {
				return;
			}
		}
	};
	render() {
		const { getCurrentItems } = this.props;
		return (
			<div>
				<Segment>
					<Image
						src='https://react.semantic-ui.com/images/wireframe/square-image.png'
						size='medium'
						circular
					/>
					<h1>{`${this.state.currentUser.first_name} ${this.state.currentUser.last_name}`}</h1>
					<h2>{`${this.state.currentUser.email}`}</h2>
					<h3>{`Location: ${this.state.currentUser.location}`}</h3>
				</Segment>
				{/* <Dropdown /> */}
				<Button onClick={() => getCurrentItems()}>Items</Button>
				<Segment>{this.renderSegment()}</Segment>
			</div>
		);
	}
}

export default UserPage;
