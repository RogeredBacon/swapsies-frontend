import React from 'react';
import LoginForm from '../Components/LoginForm';
import SignUpForm from '../Components/SignUpForm';
import Home from '../Components/Home';

class SignIn extends React.Component {
	state = {
		loginShown: true,
		signUpShown: false,
		currentUser: null
	};

	componentDidMount() {}

	showSignUp = () => {
		this.setState({
			loginShown: false,
			signUpShown: true
		});
	};

	setUser = data => {
		if (data.message) {
			console.log(data.message);
		} else {
			this.setState({
				currentUser: data,
				loginShown: false
			});
		}
	};

	loginFunction = (e, email, password) => {
		e.preventDefault();
		const data = { email, password };
		fetch(`http://localhost:3000/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(user => {
				this.setUser(user);
			})
			.catch(console.log);
	};

	signUpFunction = (e, first_name, last_name, email, password, location) => {
		e.preventDefault();
		const data = { first_name, last_name, email, password, location };
		console.log(location);
		fetch(`http://localhost:3000/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then(user => {
				this.setUser(user);
			})
			.catch(console.log);
	};

	render() {
		const { signUpShown, loginShown, currentUser } = this.state;

		if (!currentUser && loginShown) {
			return (
				<LoginForm
					loginFunction={this.loginFunction}
					showSignUp={this.showSignUp}
				/>
			);
		} else if (!currentUser && signUpShown) {
			return <SignUpForm signUpFunction={this.signUpFunction} />;
		} else if (currentUser) {
			return <Home currentUser={currentUser} />;
		}
	}
}
export default SignIn;
