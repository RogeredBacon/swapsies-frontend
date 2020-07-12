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
		sellArray,
		buyArray,
		changeAmount,
		usersDropdownValues,
		tradersDropdownValues,
	} = props;

	const row = (array) => {
		let test = array.map((element) => {
			return (
				<Grid.Row>
					<EditTradeItem item={element} changeAmount={changeAmount} />
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
						<EditItemDropdown
							options={usersOptions}
							tradeItem={sellItem}
							dropdownValues={usersDropdownValues}
						/>
					</Grid.Row>
					{row(sellArray)}
				</Grid.Column>
				<Grid.Column>
					<Grid.Row>
						<EditItemDropdown
							options={tradersOptions}
							tradeItem={buyItem}
							dropdownValues={tradersDropdownValues}
						/>
					</Grid.Row>
					{row(buyArray)}
				</Grid.Column>
			</Grid>

			<Divider vertical>Swapsies</Divider>
		</Segment>
	);
};
export default EditTradeTable;
