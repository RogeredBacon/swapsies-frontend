import React from 'react';
import TradeTable from './TradeTable';
import { Segment, Button } from 'semantic-ui-react';

const Trade = (props) => {
	const {
		trader,
		tradersOptions,
		usersOptions,
		buyArray,
		sellArray,
		buyItem,
		sellItem,
		cancelTrade,
		createTrade,
		changeAmount,
	} = props;

	return (
		<div>
			<Segment>
				<TradeTable
					tradersOptions={tradersOptions}
					usersOptions={usersOptions}
					sellItem={sellItem}
					buyItem={buyItem}
					sellArray={sellArray}
					buyArray={buyArray}
					changeAmount={changeAmount}
				/>
			</Segment>
			<Button onClick={() => cancelTrade('home')}>Cancel</Button>
			<Button onClick={createTrade}>Trade!</Button>
			<Segment>
				<div>
					<h1>Trader</h1>
					<h2>{trader.first_name}</h2>
					<h2>{trader.last_name}</h2>
					{/* <h3>{trader.location}</h3> */}
				</div>
			</Segment>
		</div>
	);
};

export default Trade;
