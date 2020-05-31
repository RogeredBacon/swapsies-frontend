import React from 'react';
import CurrentItems from './CurrentItems';
import PastTrades from './PastTrades';
import { Segment, Image, Dropdown, Button } from 'semantic-ui-react';

const UserPage = (props) => {
	const { currentUser, segment, userItems, getCurrentItems, seeItem } = props;

	const renderSegment = () => {
		switch (segment) {
			case '': {
			}
			case 'items': {
				return <CurrentItems userItems={userItems} seeItem={seeItem} />;
			}
			case 'pastTrades': {
				return <PastTrades />;
			}
			default: {
				return;
			}
		}
	};

	return (
		<div>
			<Segment>
				<Image
					src='https://react.semantic-ui.com/images/wireframe/square-image.png'
					size='medium'
					circular
				/>
				<h1>{`${currentUser.first_name} ${currentUser.last_name}`}</h1>
				<h2>{`${currentUser.email}`}</h2>
				<h3>{`Location: ${currentUser.location}`}</h3>
			</Segment>
			{/* <Dropdown /> */}
			<Button onClick={() => getCurrentItems()}>Items</Button>
			<Segment>{renderSegment()}</Segment>
		</div>
	);
};

export default UserPage;
