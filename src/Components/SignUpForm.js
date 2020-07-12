import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

const LoginForm = props => {
	const { signUpFunction } = props;
	let x = '';
	navigator.geolocation.getCurrentPosition(function(location) {
		x = `${location.coords.latitude}, ${location.coords.longitude}`;
	});
	return (
		<Segment>
			<Form
				onSubmit={e => {
					signUpFunction(
						e,
						e.target.first_name.value,
						e.target.last_name.value,
						e.target.email.value,
						e.target.password.value,
						x
					);
				}}>
				<Form.Group widths={2} className='login-form'>
					<Form.Input
						name='first_name'
						label='First Name'
						placeholder='First Name'
						type='text'
						required
					/>
					<Form.Input
						name='last_name'
						label='Last Name'
						placeholder='Last Name'
						type='text'
						required
					/>
					<Form.Input
						name='email'
						label='Email'
						placeholder='Email Address'
						type='email'
						required
					/>
					<Form.Input
						name='password'
						label='Password'
						placeholder='Password'
						type='password'
						required
					/>
				</Form.Group>

				<Button name='signup' type='submit'>
					SignUp
				</Button>
			</Form>
		</Segment>
	);
};

export default LoginForm;
