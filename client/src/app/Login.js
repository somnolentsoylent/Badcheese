import React from 'react';

export default class Login extends React.Component {
	constructor(props) {
		super(props)
	}

	login() {
		this.props.login('yo', 'yo')
	}

	render() {
		return (
			<div className='login'>
				<form>
					<input type='text' placeholder='Enter Email...' ref='email'/>
					<input type='text' placeholder='Enter Password...' ref='password'/>
					<button onClick={e => this.login()} type='submit'>Log In</button>
				</form>
 			</div>
			)
	}
}