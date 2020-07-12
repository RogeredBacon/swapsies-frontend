import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const MenuButton = props => {
	const { displayUserMenu } = props;

	return (
		<div>
			<Button
				color='grey'
				floated='right'
				animated='horizontaly'
				onClick={displayUserMenu}>
				<Button.Content visible>
					<Icon name='bars' />
				</Button.Content>
				<Button.Content hidden>Menu</Button.Content>
			</Button>
		</div>
	);
};
export default MenuButton;
