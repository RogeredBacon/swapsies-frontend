import React from 'react';
import { Segment, Button } from 'semantic-ui-react';

const ShowItem = (props) => {
	const { item, trader, startTrade } = props;
	// const location = this.props.trader.location.split(', ');
	return (
		<div>
			<Segment>
				<div
					className={'item'}
					style={{ backgroundImage: `url(${item.image})` }}>
					<div className='itemText'>
						<h3>{item.title}</h3>
						<h4>{item.subtitle}</h4>
					</div>
				</div>
			</Segment>
			<Segment>
				<div>
					<p>{item.description}</p>
					<div>Worth Rating:{item.worth_rating}</div>
					{item.amount ? (
						<h4>Amount: {item.amount}</h4>
					) : (
						<h4>Session Time: {item.session_time}</h4>
					)}
				</div>
			</Segment>
			<Button onClick={startTrade}>Start Trade</Button>
			<Segment>
				<div>
					<h1>Trader</h1>
					<h2>{trader.first_name}</h2>
					<h2>{trader.last_name}</h2>
					{/* <h3>{trader.location}</h3> */}
					{/* <div>
						<GMap lat={lat} long={long} />
					</div> */}
				</div>
			</Segment>
		</div>
	);
};

export default ShowItem;
