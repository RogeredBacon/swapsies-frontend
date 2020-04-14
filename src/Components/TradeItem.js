import _ from 'lodash';
import React from 'react';
import { Image, Dropdown } from 'semantic-ui-react';

const TradeItem = (props) => {
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
				<Image src={item.image} className={'tradeItem'} />
				<Dropdown
					itemID={item}
					skill='true'
					placeholder='Sessions'
					selection
					defaultValue={1}
					options={getOptions(6, '')}
					onChange={changeAmount}
				/>
			</div>
		);
	} else {
		return (
			<div>
				<Image src={item.image} className={'tradeItem'} />
				<Dropdown
					itemID={item}
					skill='false'
					placeholder='Amount'
					selection
					defaultValue={1}
					options={getOptions(item.amount, '')}
					onChange={changeAmount}
				/>
			</div>
		);
	}
};

export default TradeItem;
