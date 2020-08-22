import React from 'react';
import EditItemDropdown from './EditItemDropdown';
import EditTradeItem from './EditTradeItem';
import { Divider, Grid, Segment } from 'semantic-ui-react';

const EditTradeTable = (props) => {
	const {
		usersOptions,
		sellItem,
		tradersOptions,
		buyItem,
		editSellArray,
		editBuyArray,
		editChangeAmount,
		usersDropdownValues,
		tradersDropdownValues,
		currentTrade,
	} = props;

	const row = (array) => {
		let test = array.map((element) => {
			return (
				<Grid.Row>
					<EditTradeItem item={element} editChangeAmount={editChangeAmount} />
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
						{currentTrade.receiver_complete &&
						currentTrade.initiator_complete ? (
							''
						) : (
							<EditItemDropdown
								options={usersOptions}
								tradeItem={sellItem}
								dropdownValues={usersDropdownValues}
							/>
						)}
					</Grid.Row>
					{row(editSellArray)}
				</Grid.Column>
				<Grid.Column>
					<Grid.Row>
						{currentTrade.receiver_complete &&
						currentTrade.initiator_complete ? (
							''
						) : (
							<EditItemDropdown
								options={tradersOptions}
								tradeItem={buyItem}
								dropdownValues={tradersDropdownValues}
							/>
						)}
					</Grid.Row>
					{row(editBuyArray)}
				</Grid.Column>
			</Grid>

			<Divider vertical>Swapsies</Divider>
		</Segment>
	);
};
export default EditTradeTable;
