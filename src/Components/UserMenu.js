import React from 'react';
import { Segment, Sidebar, Menu, Icon } from 'semantic-ui-react';

const UserMenu = (props) => {
	const { displayUserMenu, userMenuShown, setPage, openUserTrades } = props;
	return (
		<Sidebar
			as={Segment}
			animation='overlay'
			icon='labeled'
			inverted
			onHide={displayUserMenu}
			direction={'top'}
			visible={userMenuShown}
			width='thin'
			color='grey'>
			<Menu>
				<Menu.Item
					as='a'
					onClick={() => window.location.reload(false)}
					position='left'>
					<Icon name='log out' />
				</Menu.Item>
				<Menu.Item as='a' onClick={() => openUserTrades()}>
					<Icon name='shuffle' />
				</Menu.Item>
				<Menu.Item as='a'>
					<Icon name='edit' onClick={() => setPage('addItem')} />
				</Menu.Item>
				<Menu.Item as='a'>
					<Icon name='user circle' onClick={() => setPage('userPage')} />
				</Menu.Item>
				<Menu.Item as='a'>
					<Icon name='home' onClick={() => setPage('home')} />
				</Menu.Item>
			</Menu>
		</Sidebar>
	);
};

export default UserMenu;
