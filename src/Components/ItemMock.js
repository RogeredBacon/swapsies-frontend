import React from 'react';

const Item = props => {
	const { item } = props;

	return (
		<div
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
