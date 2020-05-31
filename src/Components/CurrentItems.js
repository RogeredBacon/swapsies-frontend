import React from 'react';
import { Table, Segment } from 'semantic-ui-react';

const UserTrades = (props) => {
	const { userItems, seeItem } = props;

	const row = (array) => {
		let test = array.map((element) => {
			return (
				<Table.Row>
					<Table.Cell
						onClick={() => {
							seeItem(
								element.id,
								element.user_id,
								element.amount ? true : false
							);
						}}>
						{element.title}
					</Table.Cell>
				</Table.Row>
			);
		});

		return test;
	};

	return (
		<Segment>
			<Table celled>
				<Table.Body>{row(userItems)}</Table.Body>
			</Table>
		</Segment>
	);
};
export default UserTrades;
