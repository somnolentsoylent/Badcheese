//SignUp.js

import React from 'react';

export default class SignUp extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
				<div className='login'>
					<form>
						<input type='text' placeholder='First Name...' ref='fName'/>
						<input type='text' placeholder='Last Name...' ref='lName'/>
						<input type='text' placeholder='Enter Email...' ref='email'/>
						<input type='text' placeholder='Enter Password...' ref='password'/>
						<button type='submit'>Sign Up</button>
					</form>
	 			</div>
			)
	}
}