import _ from 'lodash';
import React from 'react';
import { Image, Dropdown } from 'semantic-ui-react';

const EditTradeItem = (props) => {
	const { item, editChangeAmount, currentTrade } = props;

	const getOptions = (number, prefix = 'Choice ') =>
		_.drop(
			_.times(number, (index) => ({
				key: index,
				text: `${prefix}${index}`,
				value: index,
			})),
			1
		);

	if (!item.amount) {
		return (
			<div>
				{item.title}
				<Image src={item.image} className={'tradeItem'} />
				{currentTrade.receiver_complete && currentTrade.initiator_complete ? (
					<Dropdown
						itemID={item}
						skill='true'
						placeholder='Sessions'
						selection
						defaultValue={item.total}
						options={[
							{ key: item.total, text: `${item.total}`, value: item.total },
						]}
						onChange={''}
					/>
				) : (
					<Dropdown
						itemID={item}
						skill='true'
						placeholder='Sessions'
						selection
						defaultValue={item.total ? item.total : 1}
						options={getOptions(6, '')}
						onChange={editChangeAmount}
					/>
				)}
			</div>
		);
	} else {
		return (
			<div>
				{item.title}
				<Image src={item.image} className={'tradeItem'} />
				{currentTrade.receiver_complete && currentTrade.initiator_complete ? (
					<Dropdown
						itemID={item}
						skill='false'
						placeholder='Amount'
						selection
						defaultValue={item.total}
						options={[
							{ key: item.total, text: `${item.total}`, value: item.total },
						]}
						onChange={''}
					/>
				) : (
					<Dropdown
						itemID={item}
						skill='false'
						placeholder='Amount'
						selection
						defaultValue={item.total ? item.total : 1}
						options={getOptions(item.amount, '')}
						onChange={editChangeAmount}
					/>
				)}
			</div>
		);
	}
};

export default EditTradeItem;
