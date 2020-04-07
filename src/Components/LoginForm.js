import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

const LoginForm = props => {
	const { loginFunction, showSignUp } = props;
	return (
		<Segment>
			<Form
				className='login-form'
				onSubmit={e => {
					loginFunction(e, e.target.email.value, e.target.password.value);
				}}>
				<Form.Group widths={2}>
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

				<Button type='submit'>LogIn</Button>
				<Button type='submit' onClick={showSignUp} secondary>
					Sign Up
				</Button>
			</Form>
		</Segment>
	);
};

export default LoginForm;
