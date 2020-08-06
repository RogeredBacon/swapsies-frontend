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
							onClick={() => editTrade(element, element.receiving_user_id)}>
							<h4>
								Your Trade With {userPartners[element.receiving_user_id]}{' '}
							</h4>
						</Table.Cell>
						<Table.Cell>
							{element.status === 'Awaiting receiver'
								? `Waiting for ${
										userPartners[element.receiving_user_id]
								  } to edit trade`
								: `${
										userPartners[element.receiving_user_id]
								  } is waiting for you to edit trade`}
						</Table.Cell>
					</Table.Row>
				);
			} else {
				return (
					<Table.Row>
						<Table.Cell
							onClick={() => editTrade(element, element.initiating_user_id)}>
							{userPartners[element.initiating_user_id]} Trade With You
						</Table.Cell>
						<Table.Cell>
							{element.status === 'Awaiting initiator'
								? `Waiting for ${
										userPartners[element.initiating_user_id]
								  } to edit trade`
								: `${
										userPartners[element.initiating_user_id]
								  } is waiting for you to edit trade`}
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
