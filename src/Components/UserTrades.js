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
							<h4>
								Your Trade With {userPartners[element.receiving_user_id]}{' '}
							</h4>
						</Table.Cell>
						<Table.Cell>
							{element.receiver_complete
								? `${
										userPartners[element.receiving_user_id]
								  } has accepted your trade`
								: `Waiting for ${
										userPartners[element.receiving_user_id]
								  } to accept`}
						</Table.Cell>
					</Table.Row>
				);
			} else {
				return (
					<Table.Row>
						<Table.Cell
							onClick={() => editTrade(element.id, element.initiating_user_id)}>
							{userPartners[element.initiating_user_id]} Trade With You
						</Table.Cell>
						<Table.Cell>
							{element.receiver_complete
								? `You have accepted ${
										userPartners[element.initiating_user_id]
								  } trade`
								: `Waiting for you to accept ${
										userPartners[element.initiating_user_id]
								  } trade`}
						</Table.Cell>
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
