//SignUp.js

import React from 'react';
import ReactDOM from 'react-dom';

export default class SignUp extends React.Component {
	constructor(props) {
		super(props)
	}

	signUp() {
		var password = ReactDOM.findDOMNode(this.refs.password).value;
		var signUpInfo = {
		  firstName: ReactDOM.findDOMNode(this.refs.fName).value,
		  lastName: ReactDOM.findDOMNode(this.refs.lName).value,
		  email: ReactDOM.findDOMNode(this.refs.email).value,
		  password: password
		}
    console.log(signUpInfo)
		fetch('http://localhost:3000/api/users/signup',{
	       method: 'POST',
	       headers: { "Content-Type" : "application/json" },
	       body: JSON.stringify(signUpInfo)
	    })
	    .then(response => {
        console.log(response)
	      return response.text();
	    })
	    .then( email => {
        console.log(email)
	    	return fetch('http://localhost:3000/api/users/login',{
	        method: 'POST',
	        headers: { "Content-Type" : "application/json" },
	        body: JSON.stringify({email: email, password: password})
	    	})
	    })
      .then(response => {
        return response.json()
      })
      .then( user => {
        console.log(user)
        this.props.login(user);
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