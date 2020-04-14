import React from 'react';
import { Table, Segment } from 'semantic-ui-react';

const UserTrades = (props) => {
	const { userTrades, currentUser, userPartners, editTrade } = props;

	const row = (array) => {
		let test = array.map((element) => {
			if (element.initiating_user_id === currentUser.id) {
				return (
					<Table.Row>
						<Table.Cell
							onClick={() => editTrade(element.id, element.receiving_user_id)}>
							Your Trade With {userPartners[element.receiving_user_id]}
						</Table.Cell>
					</Table.Row>
				);
			} else {
				return (
					<Table.Row>
						<Table.Cell>{element.id} Trade With You</Table.Cell>
					</Table.Row>
				);
			}
		});

		return test;
	};

	return (
		<Segment>
			<Table celled>
				<Table.Body>{row(userTrades)}</Table.Body>
			</Table>
		</Segment>
	);
};
export default UserTrades;
