//SignUp.js

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class SignUp extends React.Component {
	constructor(props) {
		super(props)
	}

	signUp() {
	  let signupFirstName = ReactDOM.findDOMNode(this.refs.fName).value;
	  let signupLastName = ReactDOM.findDOMNode(this.refs.lName).value;
	  let signupEmail = ReactDOM.findDOMNode(this.refs.email).value;
		let signupPassword = ReactDOM.findDOMNode(this.refs.password).value;

		axios.post('http://localhost:3000/api/users/signup',{
				firstName: signupFirstName,
				lastName: signupLastName,
				email: signupEmail,
				password: signupPassword
	    })
	    .then( response => {
				let user = response.data;
        console.log(user);
				this.props.login(user);
	    })
			.catch( err => {
				conole.error(err);
			})
	}

	render() {
		return (
				<div className='login'>
					<form>
						<input type='text' placeholder='First Name...' ref='fName'/>
						<input type='text' placeholder='Last Name...' ref='lName'/>
						<input type='text' placeholder='Enter Email...' ref='email'/>
						<input type='password' placeholder='Enter Password...' ref='password'/>
						<button onClick={e => this.signUp()} type='submit'>Sign Up</button>
					</form>
	 			</div>
			)
	}
}
