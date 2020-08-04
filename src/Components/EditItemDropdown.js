import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const EditItemDropdown = (props) => {
	const { options, tradeItem, dropdownValues } = props;

	return (
		<Dropdown
			placeholder='Tradeables'
			fluid
			multiple
			selection
			options={options}
			onChange={tradeItem}
			value={dropdownValues}
		/>
	);
};
export default EditItemDropdown;
