import React from 'react';
import { Image } from 'semantic-ui-react';

const Item = props => {
	const { item } = props;

	return (
		<div>
			<Image src={item.image} className={'tradeItem'} />
		</div>
	);
};

export default Item;
