import React from 'react';

const Item = (props) => {
	const { item, seeItem } = props;

	return (
		<div
			onClick={() => {
				seeItem(item.id, item.user_id, item.amount ? true : false);
			}}
			className={'goodItem'}
			style={{ backgroundImage: `url(${item.image})` }}>
			<div className='itemText'>
				<h3>{item.title}</h3>
				<h4>{item.subtitle}</h4>
			</div>
		</div>
	);
};

export default Item;
