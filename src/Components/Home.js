import React from 'react';
import ItemsContainer from './ItemsContainer';
import ShowItem from './ShowItem';
import Trade from './Trade';
import UserMenu from './UserMenu';
import MenuButton from './MenuButton';
import AddItem from './AddItem';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class Home extends React.Component {
	state = {
		currentUser: this.props.currentUser,
		currentPage: '',
		userMenuShown: false,
		items: [],
		item: [],
		trader: [],
		tradersItems: [],
		usersItems: [],
		tradersOptions: [],
		usersOptions: [],
		buyArray: [],
		sellArray: []
	};

	componentDidMount() {
		this.getAllItems();
	}

	getAllItems = () => {
		fetch('http://localhost:3000/items')
			.then(res => res.json())
			.then(items => this.setState({ items }));

		fetch('http://localhost:3000/skills')
			.then(res => res.json())
			.then(skills =>
				this.setState({
					items: this.state.items.concat(skills)
				})
			);
	};

	getItem = (index, skill) => {
		console.log(index, skill);
		if (skill) {
			return fetch(`http://localhost:3000/items/${index}`)
				.then(res => res.json())
				.then(item => item);
		} else {
			return fetch(`http://localhost:3000/skills/${index}`)
				.then(res => res.json())
				.then(item => item);
		}
	};

	getTrader = id => {
		return fetch(`http://localhost:3000/users/${id}`)
			.then(res => res.json())
			.then(trader => trader);
	};

	getTradersItems = id => {
		fetch(`http://localhost:3000/users/${id}/goods`)
			.then(res => res.json())
			.then(tradersItems => this.createOptions(tradersItems, true));
	};

	getUsersItems = id => {
		fetch(`http://localhost:3000/users/${id}/goods`)
			.then(res => res.json())
			.then(usersItems => this.createOptions(usersItems, false));
	};

	newTradeRequest = () => {
		const data = { status: 'open' };
		return fetch(`http://localhost:3000/trade_requests`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(tradeID => tradeID)
			.catch(console.log);
	};

	itemsToTrade = tradeRequestId => {
		const items = this.state.buyArray.concat(this.state.sellArray);
		items.forEach(element => {
			const data = {
				trade_request_id: tradeRequestId,
				goods_and_service_id: element.id
			};
			fetch(`http://localhost:3000/trade_request_items`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json'
				},
				body: JSON.stringify(data)
			})
				.then(res => res.json())
				.then(tradeID => tradeID)
				.catch(console.log);
		});
	};

	setPage = page => {
		this.setState({
			currentPage: page
		});
	};

	createOptions = (itemsList, trader) => {
		const x = itemsList.map(e => {
			let x = {};
			x.key = e.title;
			x.text = e.title;
			x.value = e.id;
			return x;
		});
		if (trader) {
			this.setState({ tradersOptions: x, tradersItems: itemsList });
		} else {
			this.setState({ usersOptions: x, usersItems: itemsList });
		}
	};

	buyItem = (event, { value }) => {
		console.log(value);
		const buyArray = value.map(id =>
			this.state.tradersItems.find(e => e.id === id)
		);
		this.setState({ buyArray });
	};

	sellItem = (event, { value }) => {
		console.log(value);
		const sellArray = value.map(id =>
			this.state.usersItems.find(e => e.id === id)
		);
		this.setState({ sellArray });
	};

	seeItem = (index, userID, skill) => {
		this.getItem(index, skill).then(item => this.setState({ item }));
		this.getTrader(userID)
			.then(trader => this.setState({ trader }))
			.then(this.setPage('show'));
	};

	startTrade = () => {
		this.getTradersItems(this.state.trader.id);
		this.getUsersItems(this.state.currentUser.id);

		this.setPage('trade');
	};

	createTrade = () => {
		this.newTradeRequest().then(tradeID => this.itemsToTrade(tradeID.id));
		this.setPage('home');
	};

	cancelTrade = page => {
		this.setState({
			sellArray: [],
			buyArray: []
		});
		this.setPage(page);
	};

	displayUserMenu = () => {
		this.setState({
			userMenuShown: !this.state.userMenuShown
		});
	};

	addItem = (e, title, subtitle, description, worth_rating, skill, amount) => {
		e.preventDefault();
		if (skill) {
			const data = {
				user_id: this.state.currentUser.id,
				title,
				subtitle,
				description,
				worth_rating,
				session_time: amount
			};
			fetch(`http://localhost:3000/skills`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json'
				},
				body: JSON.stringify(data)
			})
				.then(res => res.json())
				.then(data => this.getAllItems())
				.catch(console.log);
		} else {
			const data = {
				user_id: this.state.currentUser.id,
				title,
				subtitle,
				description,
				worth_rating,
				amount
			};
			fetch(`http://localhost:3000/items`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json'
				},
				body: JSON.stringify(data)
			})
				.then(res => res.json())
				.then(data => this.getAllItems())
				.catch(console.log);
		}
		this.getAllItems();
		this.setPage('home');
	};

	renderComponents = () => {
		const {
			currentPage,
			items,
			item,
			trader,
			currentUser,
			tradersOptions,
			usersOptions,
			buyArray,
			sellArray
		} = this.state;
		switch (currentPage) {
			case 'home': {
				return <ItemsContainer items={items} seeItem={this.seeItem} />;
			}
			case 'show': {
				return (
					<ShowItem item={item} trader={trader} startTrade={this.startTrade} />
				);
			}
			case 'trade': {
				return (
					<Trade
						item={item}
						trader={trader}
						currentUser={currentUser}
						tradersOptions={tradersOptions}
						usersOptions={usersOptions}
						buyArray={buyArray}
						sellArray={sellArray}
						buyItem={this.buyItem}
						sellItem={this.sellItem}
						cancelTrade={this.cancelTrade}
						createTrade={this.createTrade}
					/>
				);
			}
			case 'addItem': {
				return <AddItem addItem={this.addItem} />;
			}
			default: {
				return <ItemsContainer items={items} seeItem={this.seeItem} />;
			}
		}
	};

	render() {
		return (
			<Container className='main'>
				<nav>
					<UserMenu
						setPage={this.setPage}
						displayUserMenu={this.displayUserMenu}
						userMenuShown={this.state.userMenuShown}
						currentUser={this.state.currentUser}
					/>
					<div>
						<MenuButton displayUserMenu={this.displayUserMenu} />
					</div>
				</nav>

				{this.renderComponents()}
			</Container>
		);
	}
}

export default Home;
