import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const EditItemDropdown = (props) => {
	const { options, tradeItem, dropdownValues } = props;

	// const values = (itemArray, options) => {
	// 	console.log('options:', options);
	// 	console.log('itemArray:', itemArray);
	// 	let arr = [];
	// 	itemArray.forEach((item) => {
	// 		arr.push(options.find((option) => option.text === item.title).value);
	// 	});
	// 	console.log('arr results:', arr);
	// 	return arr;
	// };

	return (
		<Dropdown
			placeholder='Skills'
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
