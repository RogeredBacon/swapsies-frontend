import React from 'react';
import { Table, Segment } from 'semantic-ui-react';

const PastTrades = (props) => {
	const { userTrades } = props;

	const row = (array) => {
		let test = array.map((element) => {
			return (
				<Table.Row>
					<Table.Cell onClick>{element.title}</Table.Cell>
				</Table.Row>
			);
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
export default PastTrades;
