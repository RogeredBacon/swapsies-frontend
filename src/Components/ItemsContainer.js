import React from 'react';
import Item from './Item';

const ItemsContainer = (props) => {
	const { items, seeItem } = props;

	const showItems = (items) =>
		items.map((item) => {
			if (Object.keys(item).includes('amount')) {
				return <Item item={item} key={`i${item.id}`} seeItem={seeItem} />;
			} else if (Object.keys(item).includes('session_time')) {
				return <Item item={item} key={`s${item.id}`} seeItem={seeItem} />;
			}
		});

	return (
		<div>
			<div id='itemsContainer'>{showItems(items)}</div>
		</div>
	);
};

export default ItemsContainer;
