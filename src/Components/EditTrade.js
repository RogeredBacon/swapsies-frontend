import React from 'react';
import EditTradeTable from './EditTradeTable';
import { Segment, Button } from 'semantic-ui-react';

const EditTrade = (props) => {
	const {
		trader,
		tradersOptions,
		usersOptions,
		editBuyArray,
		editSellArray,
		buyItem,
		sellItem,
		cancelTrade,
		createTrade,
		editChangeAmount,
		usersDropdownValues,
		tradersDropdownValues,
		toggleCommitToTrade,
		currentTrade,
		currentUser,
		finalisingTrade,
	} = props;

	return (
		<div>
			<Segment>
				<EditTradeTable
					tradersOptions={tradersOptions}
					usersOptions={usersOptions}
					sellItem={sellItem}
					buyItem={buyItem}
					editSellArray={editSellArray}
					editBuyArray={editBuyArray}
					editChangeAmount={editChangeAmount}
					usersDropdownValues={usersDropdownValues}
					tradersDropdownValues={tradersDropdownValues}
					currentTrade={currentTrade}
				/>
			</Segment>
			{currentTrade.status === 'Committed' ? (
				<>
					<Button onClick={() => cancelTrade('home')}>Back</Button>
					<Button onClick={''}>Completed</Button>
				</>
			) : (
				<>
					<Button onClick={() => cancelTrade('home')}>Cancel</Button>
					<Button onClick={createTrade}>Accept!</Button>
				</>
			)}
			{currentTrade.receiver_complete && currentTrade.initiator_complete ? (
				finalisingTrade
			) : (
				<Button onClick={() => toggleCommitToTrade(currentUser.id)}>
					{currentTrade.receiving_user_id === currentUser.id
						? currentTrade.receiver_complete
							? 'Uncommit'
							: 'Commit'
						: currentTrade.initiator_complete
						? 'Uncommit'
						: 'Commit'}
				</Button>
			)}
			<Segment>
				<div>
					<h1>Trader Not working fix!</h1>
					<h2>{trader.first_name}</h2>
					<h2>{trader.last_name}</h2>
					{/* <h3>{trader.location}</h3> */}
				</div>
			</Segment>
		</div>
	);
};

export default EditTrade;
