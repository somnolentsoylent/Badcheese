import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Login extends React.Component {
	constructor(props) {
		super(props)
	}

	login() {
	  let loginEmail = ReactDOM.findDOMNode(this.refs.email).value;
	  let loginPassword = ReactDOM.findDOMNode(this.refs.password).value;

		axios.post('http://localhost:3000/api/users/login',{
			email: loginEmail,
			password: loginPassword
  	})
    .then( response => {
      var user = response.data || {email: 'null'};
			console.log(user);
      window.localStorage.setItem('user', user.email);
      this.props.login(user);
    })
    .catch( err => {
      console.log(err)
    })
	}

	render() {
		return (
			<div className='login'>
				<form>
					<input type='text' placeholder='Enter Email...' ref='email'/>
					<input type='password' placeholder='Enter Password...' ref='password'/>
					<button onClick={e => this.login()} type='submit'>Log In</button>
				</form>
 			</div>
			)
	}
}
