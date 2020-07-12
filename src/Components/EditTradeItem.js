import _ from 'lodash';
import React from 'react';
import { Image, Dropdown } from 'semantic-ui-react';

const EditTradeItem = (props) => {
	const { item, changeAmount } = props;

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
				<Dropdown
					itemID={item}
					skill='true'
					placeholder='Sessions'
					selection
					defaultValue={item.total}
					options={getOptions(6, '')}
					onChange={changeAmount}
				/>
			</div>
		);
	} else {
		return (
			<div>
				{item.title}
				<Image src={item.image} className={'tradeItem'} />
				<Dropdown
					itemID={item}
					skill='false'
					placeholder='Amount'
					selection
					defaultValue={item.total}
					options={getOptions(item.amount, '')}
					onChange={changeAmount}
				/>
			</div>
		);
	}
};

export default EditTradeItem;
