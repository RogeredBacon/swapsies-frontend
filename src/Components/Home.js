import React from 'react';
import ItemsContainer from './ItemsContainer';
import ShowItem from './ShowItem';
import Trade from './Trade';
import EditTrade from './EditTrade';
import UserMenu from './UserMenu';
import MenuButton from './MenuButton';
import AddItem from './AddItem';
import UserTrades from './UserTrades';
import UserPage from './UserPage';
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
		sellArray: [],
		userTrades: [],
		userPartners: [],
		userItems: [],
		segment: '',
	};

	componentDidMount() {
		this.getAllItems();
	}

	getAllItems = () => {
		fetch('http://localhost:3000/items')
			.then((res) => res.json())
			.then((items) => this.setState({ items }));

		fetch('http://localhost:3000/skills')
			.then((res) => res.json())
			.then((skills) =>
				this.setState({
					items: this.state.items.concat(skills),
				})
			);
	};

	getItem = (index, skill) => {
		console.log(index, skill);
		if (skill) {
			return fetch(`http://localhost:3000/items/${index}`)
				.then((res) => res.json())
				.then((item) => item);
		} else {
			return fetch(`http://localhost:3000/skills/${index}`)
				.then((res) => res.json())
				.then((item) => item);
		}
	};

	getTrader = (id) => {
		return fetch(`http://localhost:3000/users/${id}`)
			.then((res) => res.json())
			.then((trader) => trader);
	};

	getTradersItems = (id) => {
		fetch(`http://localhost:3000/users/${id}/goods`)
			.then((res) => res.json())
			.then((tradersItems) => this.createOptions(tradersItems, true));
	};

	getUsersItems = (id) => {
		fetch(`http://localhost:3000/users/${id}/goods`)
			.then((res) => res.json())
			.then((usersItems) => this.createOptions(usersItems, false));
	};

	getCurrentItems = () => {
		fetch(`http://localhost:3000/users/${this.state.currentUser.id}/goods`)
			.then((res) => res.json())
			.then((userItems) => this.setState({ userItems, segment: 'items' }));
	};

	newTradeRequest = () => {
		const data = {
			initiating_user_id: this.state.currentUser.id,
			receiving_user_id: this.state.trader.id,
			status: 'open',
			initiator_complete: false,
			receiver_complete: false,
		};
		return fetch(`http://localhost:3000/trade_requests`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((tradeID) => tradeID)
			.catch(console.log);
	};

	itemsToTrade = (tradeRequestId) => {
		const items = this.state.buyArray.concat(this.state.sellArray);
		console.log('TradeID', tradeRequestId);
		items.forEach((element) => {
			if (!element.amount) {
				console.log('skill', element);
				const data = {
					trade_request_id: tradeRequestId,
					skill_id: element.id,
					locked: false,
					amount: element.total ? element.total : 1,
				};
				fetch(`http://localhost:3000/trade_request_skills`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						accept: 'application/json',
					},
					body: JSON.stringify(data),
				})
					.then((res) => res.json())
					.then((tradeID) => console.log(tradeID))
					.catch(console.log);
			} else {
				console.log('item', element);
				const data = {
					trade_request_id: tradeRequestId,
					item_id: element.id,
					locked: false,
					amount: element.total ? element.total : 1,
				};
				fetch(`http://localhost:3000/trade_request_items`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						accept: 'application/json',
					},
					body: JSON.stringify(data),
				})
					.then((res) => res.json())
					.then((tradeID) => console.log(tradeID))
					.catch(console.log);
			}
		});
	};

	setPage = (page) => {
		this.setState({
			currentPage: page,
		});
	};

	createOptions = (itemsList, trader) => {
		const x = itemsList.map((e) => {
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
		const buyArray = value.map((id) =>
			this.state.tradersItems.find((e) => e.id === id)
		);
		this.setState({ buyArray });
	};

	sellItem = (event, { value }) => {
		console.log(value);
		const sellArray = value.map((id) =>
			this.state.usersItems.find((e) => e.id === id)
		);
		this.setState({ sellArray });
	};

	seeItem = (index, userID, skill) => {
		this.getItem(index, skill).then((item) => this.setState({ item }));
		this.getTrader(userID)
			.then((trader) =>
				this.setState({
					trader,
					traderLat: trader.location.split(', ')[0],
					traderLong: trader.location.split(', ')[1],
				})
			)
			.then(this.setPage('show'));
	};

	startTrade = () => {
		this.getTradersItems(this.state.trader.id);
		this.getUsersItems(this.state.currentUser.id);

		this.setPage('trade');
	};

	getDealItems = (tradeRequestId) => {
		fetch(
			`http://localhost:3000/trade_requests/${tradeRequestId}/goods/${this.state.currentUser.id}`
		)
			.then((res) => res.json())
			.then((usersItems) =>
				this.setState({ sellArray: usersItems[0], buyArray: usersItems[1] })
			);
	};

	editTrade = (tradeRequestId, traderId) => {
		this.getTradersItems(traderId);
		this.getUsersItems(this.state.currentUser.id);
		this.getDealItems(tradeRequestId);
		console.log(this.state.sellArray, this.state.buyArray);
		this.setPage('editTrade');
	};

	openUserTrades = () => {
		this.getUsersTrades()
			.then(this.getUsersTradePartners())
			.then(this.setPage('userTrades'));
	};

	getUsersTradePartners = () => {
		return fetch(
			`http://localhost:3000/users_partners/${this.state.currentUser.id}`
		)
			.then((res) => res.json())
			.then((userPartners) => this.setState({ userPartners }));
	};

	getUsersTrades = () => {
		return fetch(
			`http://localhost:3000/trade_requests_user/${this.state.currentUser.id}`
		)
			.then((res) => res.json())
			.then((userTrades) => this.setState({ userTrades }));
	};

	createTrade = () => {
		this.newTradeRequest().then((tradeID) => this.itemsToTrade(tradeID.id));
		this.setPage('home');
	};

	cancelTrade = (page) => {
		this.setState({
			sellArray: [],
			buyArray: [],
		});
		this.setPage(page);
	};

	displayUserMenu = () => {
		this.setState({
			userMenuShown: !this.state.userMenuShown,
		});
	};

	changeAmount = (event, { value, itemID, skill }) => {
		console.log(value, itemID, skill);
		if (itemID.user_id === this.state.currentUser.id) {
			this.state.sellArray.map((e) => {
				if (e == itemID) e.total = value;
			});
		} else {
			this.state.buyArray.map((e) => {
				if (e == itemID) {
					e.total = value;
				}
			});
		}
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
				session_time: amount,
			};
			fetch(`http://localhost:3000/skills`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
				},
				body: JSON.stringify(data),
			})
				.then((res) => res.json())
				.then((data) => this.getAllItems())
				.catch(console.log);
		} else {
			const data = {
				user_id: this.state.currentUser.id,
				title,
				subtitle,
				description,
				worth_rating,
				amount,
			};
			fetch(`http://localhost:3000/items`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
				},
				body: JSON.stringify(data),
			})
				.then((res) => res.json())
				.then((data) => this.getAllItems())
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
			sellArray,
			userTrades,
			userPartners,
			userItems,
			segment,
			traderLat,
			traderLong,
		} = this.state;
		switch (currentPage) {
			case 'home': {
				return <ItemsContainer items={items} seeItem={this.seeItem} />;
			}
			case 'show': {
				return (
					<ShowItem
						item={item}
						trader={trader}
						startTrade={this.startTrade}
						// lat={traderLat}
						// long={traderLong}
					/>
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
						changeAmount={this.changeAmount}
					/>
				);
			}
			case 'editTrade': {
				return (
					<EditTrade
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
						changeAmount={this.changeAmount}
					/>
				);
			}
			case 'addItem': {
				return <AddItem addItem={this.addItem} />;
			}
			case 'userPage': {
				return (
					<UserPage
						currentUser={currentUser}
						userItems={userItems}
						getCurrentItems={this.getCurrentItems}
						segment={segment}
						seeItem={this.seeItem}
					/>
				);
			}
			case 'userTrades': {
				return (
					<UserTrades
						userTrades={userTrades}
						currentUser={currentUser}
						userPartners={userPartners}
						editTrade={this.editTrade}
					/>
				);
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
						openUserTrades={this.openUserTrades}
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
