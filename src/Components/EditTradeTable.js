import React from 'react';
import ItemDropdown from './ItemDropdown';
import TradeItem from './TradeItem';
import { Divider, Grid, Segment } from 'semantic-ui-react';

const TradeTable = (props) => {
	const {
		usersOptions,
		sellItem,
		tradersOptions,
		buyItem,
		sellArray,
		buyArray,
		changeAmount,
	} = props;

	const row = (array) => {
		let test = array.map((element) => {
			return (
				<Grid.Row>
					<TradeItem item={element} changeAmount={changeAmount} />
				</Grid.Row>
			);
		});

		return test;
	};

	return (
		<Segment>
			<Grid columns={2} relaxed='very'>
				<Grid.Column>
					<Grid.Row>
						<ItemDropdown options={usersOptions} tradeItem={sellItem} />
					</Grid.Row>
					{row(sellArray)}
				</Grid.Column>
				<Grid.Column>
					<Grid.Row>
						<ItemDropdown options={tradersOptions} tradeItem={buyItem} />
					</Grid.Row>
					{row(buyArray)}
				</Grid.Column>
			</Grid>

			<Divider vertical>Swapsies</Divider>
		</Segment>
	);
};
export default TradeTable;
