import React from 'react';
import ReactDOM from 'react-dom';

export default class Login extends React.Component {
	constructor(props) {
		super(props)
	}

	login() {
		var loginInfo = {
		  email: ReactDOM.findDOMNode(this.refs.email).value,
		  password: ReactDOM.findDOMNode(this.refs.password).value
		}
		fetch('http://localhost:3000/api/users/login',{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(loginInfo)
  	})
    .then(response => {
      return response.json()
    })
    .then( user => {
      var user = user || {email: 'null'};
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