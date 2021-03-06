import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const ItemDropdown = (props) => {
	const { options, tradeItem } = props;

	return (
		<Dropdown
			placeholder='Tradeables'
			fluid
			multiple
			selection
			options={options}
			onChange={tradeItem}
		/>
	);
};
export default ItemDropdown;
