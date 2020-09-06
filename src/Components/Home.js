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
		editBuyArray: [],
		editSellArray: [],
		currentTrade: [],
		oldItems: [],
	};

	componentDidMount() {
		this.getAllItems();
	}

	// Should change the way trade request items and skills are returned
	// so that we have access to their specific id. May mess up how we deal with
	// displaying them in the trade window

	//Fetchs
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
			status: 'Awaiting receiver',
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
	// Don't really like this way of doing it but can't figure out how to not get values from database
	// as when I try to set the value within getDealItems the state changes to reflect changes the user
	// makes even though I'm not telling it to. Annoying!
	getDealChangedItems = (tradeRequestId) => {
		fetch(
			`http://localhost:3000/trade_requests/${tradeRequestId}/goods/${this.state.currentUser.id}`
		)
			.then((res) => res.json())
			.then((tradeItems) =>
				this.setState({ oldItems: tradeItems[0].concat(tradeItems[1]) })
			);
	};

	editItemsToTrade = (tradeRequestId) => {
		const oldItems = this.state.oldItems;

		const newItems = this.state.editBuyArray.concat(this.state.editSellArray);
		let filteredOldItems = [];
		let filteredNewItems = [];
		let duplicatesArray = [];

		newItems.forEach((newItem) => {
			if (!newItem.total) {
				newItem.total = 1;
			}
		});

		newItems.forEach((newItem) => {
			if (
				oldItems.find(
					(oldItem) =>
						oldItem.id === newItem.id && oldItem.total === newItem.total
				)
			) {
				duplicatesArray.push(
					oldItems.find((oldItem) => oldItem.id === newItem.id)
				);
			}
		});

		filteredOldItems = oldItems.filter((item) => {
			if (
				!duplicatesArray.find(
					(dupe) => dupe.id === item.id && dupe.total === item.total
				)
			) {
				return item;
			}
		});
		filteredNewItems = newItems.filter((item) => {
			if (
				!duplicatesArray.find(
					(dupe) => dupe.id === item.id && dupe.total === item.total
				)
			) {
				return item;
			}
		});

		if (filteredNewItems.length != 0 || filteredOldItems.length != 0) {
			this.toggleCommitToTrade(
				this.state.currentTrade.receiving_user_id != this.state.currentUser.id
					? this.state.currentTrade.receiving_user_id
					: this.state.currentTrade.initiating_user_id,
				false
			);
		}

		console.log('oldItems:', oldItems);
		console.log('newItems:', newItems);
		console.log('filteredOldItems:', filteredOldItems);
		console.log('filteredNewItems:', filteredNewItems);
		console.log('duplicatesArray:', duplicatesArray);

		filteredNewItems.forEach((element) => {
			if (filteredOldItems.find((oldItem) => oldItem.id === element.id)) {
				if (!element.amount) {
					console.log('skill', element);
					const data = {
						trade_request_id: tradeRequestId,
						skill_id: element.id,
						locked: false,
						amount: element.total ? element.total : 1,
					};
					fetch(`http://localhost:3000/trade_request_skills`, {
						method: 'PATCH',
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
						method: 'PATCH',
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
			} else {
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
			}
		});
		filteredOldItems.forEach((element) => {
			if (!filteredNewItems.find((newItem) => newItem.id === element.id)) {
				if (!element.amount) {
					console.log('skill', element);
					fetch(
						`http://localhost:3000/trade_request_skills/${element.id}/${tradeRequestId}`,
						{
							method: 'DELETE',
							headers: {
								'Content-Type': 'application/json',
								accept: 'application/json',
							},
						}
					)
						.then((res) => res.json())
						.then((tradeID) => console.log(tradeID))
						.catch(console.log);
				} else {
					fetch(
						`http://localhost:3000/trade_request_items/${element.id}/${tradeRequestId}`,
						{
							method: 'DELETE',
							headers: {
								'Content-Type': 'application/json',
								accept: 'application/json',
							},
						}
					)
						.then((res) => res.json())
						.then((data) => console.log(data))
						.catch(console.log);
				}
			}
		});
		console.log('TradeID', tradeRequestId);
	};

	getDealItems = (tradeRequestId) => {
		fetch(
			`http://localhost:3000/trade_requests/${tradeRequestId}/goods/${this.state.currentUser.id}`
		)
			.then((res) => res.json())
			.then((usersItems) => {
				this.setState({
					editSellArray: usersItems[0],
					editBuyArray: usersItems[1],
				});
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

	editTradeStatus = (tradeID, userID) => {
		console.log('edit trade status:', tradeID, userID);
		fetch(`http://localhost:3000/trade_requests/${tradeID}/status/${userID}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json',
			},
		})
			.then((res) => res.json())
			.then((tradeID) => tradeID)
			.catch(console.log);
	};

	toggleCommitToTrade = (userID, toggle = true) => {
		console.log(
			'Toggle trade commit - ',
			'Current Trade: ',
			this.state.currentTrade,
			'UserID: ',
			userID
		);
		fetch(
			`http://localhost:3000/trade_requests/${this.state.currentTrade.id}/commit/${userID}/${toggle}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
				},
			}
		)
			.then((res) => res.json())
			.then((currentTrade) => this.setState({ currentTrade }))
			.catch(console.log);
	};

	finalisingTrade = () => {
		//make this work in backend then make sure the accept and back buttons work for committed; then make finalised page with needed functions
		//Then sort out current trades window and completed trades. Then styling!!!
		if (this.state.currentTrade.status != 'Committed') {
			console.log('commit trade status:', this.state.currentTrade.id);
			fetch(
				`http://localhost:3000/trade_requests/${this.state.currentTrade.id}/status-committed/`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						accept: 'application/json',
					},
				}
			)
				.then((res) => res.json())
				.then((currentTrade) => this.setState({ currentTrade }))
				.catch(console.log);
		}
	};

	// Set page function
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

	setDropdownValues = (itemArray, options) => {
		let arr = [];
		itemArray.forEach((item) => {
			arr.push(options.find((option) => option.text === item.title).value);
		});
		return arr;
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

	editBuyItem = (event, { value }) => {
		console.log(value);
		let editBuyArray = value.map((id) =>
			this.state.tradersItems.find((e) => e.id === id)
		);
		editBuyArray.forEach((item) => {
			// item.total = 1;
			delete item['created_at'];
			delete item['description'];
			delete item['subtitle'];
			delete item['updated_at'];
			delete item['worth_rating'];
		});
		this.setState({ editBuyArray });
		console.log(editBuyArray);
	};

	editSellItem = (event, { value }) => {
		console.log('value:', value);
		let editSellArray = value.map((id) =>
			this.state.usersItems.find((e) => e.id === id)
		);
		editSellArray.forEach((item) => {
			// item.total = 1;
			delete item['created_at'];
			delete item['description'];
			delete item['subtitle'];
			delete item['updated_at'];
			delete item['worth_rating'];
		});
		this.setState({ editSellArray });
		console.log(editSellArray);
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

	editTrade = (tradeRequest, traderId) => {
		this.setState({ currentTrade: tradeRequest });
		this.getTradersItems(traderId);
		this.getUsersItems(this.state.currentUser.id);
		this.getDealItems(tradeRequest.id);
		this.getDealChangedItems(tradeRequest.id);
		this.setPage('editTrade');
	};

	openUserTrades = () => {
		this.getUsersTrades()
			.then(this.getUsersTradePartners())
			.then(this.setPage('userTrades'));
	};

	createTrade = () => {
		this.newTradeRequest().then((tradeID) => this.itemsToTrade(tradeID.id));
		this.setPage('home');
	};

	editCreateTrade = () => {
		console.log('tradeID:', this.state.currentTrade.id);
		this.editItemsToTrade(this.state.currentTrade.id);
		this.editTradeStatus(this.state.currentTrade.id, this.state.currentUser.id);
		this.setPage('home');
	};

	cancelTrade = (page) => {
		this.setState({
			sellArray: [],
			buyArray: [],
			editSellArray: [],
			editBuyArray: [],
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
				if (e === itemID) e.total = value;
			});
		} else {
			this.state.buyArray.map((e) => {
				if (e === itemID) {
					e.total = value;
				}
			});
		}
	};

	editChangeAmount = (event, { value, itemID, skill }) => {
		console.log(value, itemID, skill);
		if (itemID.user_id === this.state.currentUser.id) {
			this.state.editSellArray.map((e) => {
				if (e === itemID) e.total = value;
			});
		} else {
			this.state.editBuyArray.map((e) => {
				if (e === itemID) {
					e.total = value;
				}
			});
		}
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
			editBuyArray,
			editSellArray,
			currentTrade,
			finalisingTrade,
		} = this.state;

		//Switch for pages(Remove for react router later)

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
						editBuyArray={editBuyArray}
						editSellArray={editSellArray}
						buyItem={this.editBuyItem}
						sellItem={this.editSellItem}
						cancelTrade={this.cancelTrade}
						createTrade={this.editCreateTrade}
						editChangeAmount={this.editChangeAmount}
						usersDropdownValues={this.setDropdownValues(
							this.state.editSellArray,
							this.state.usersOptions
						)}
						tradersDropdownValues={this.setDropdownValues(
							this.state.editBuyArray,
							this.state.tradersOptions
						)}
						toggleCommitToTrade={this.toggleCommitToTrade}
						currentTrade={currentTrade}
						currentUser={currentUser}
						finalisingTrade={finalisingTrade}
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
