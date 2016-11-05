// Auth.js
import React from 'react';
import Login from './Login';
import SignUp from './SignUp';

export default class Auth extends React.Component {
	constructor(props) {
		super(props)
		this.state = {page: 'login'}
	}

	getPage() {
		if (this.state.page === 'login') {
			return <Login login={this.props.login}/>
		} else {
			return <SignUp login={this.props.login}/>
		}
	}

	render() {
		return (
			<div className='auth'>
				<h1 className='auth-title'>Drawmie</h1>
				<h2 className='auth-desc'>The hottest app in the history of everything #DOPE</h2>
				<div className='auth-container'>
				{this.getPage()}
				<div className='auth-choices'>
					<button onClick = {e => this.setState({page: 'login'})}>Log In</button>
					<button onClick = {e => this.setState({page: 'signup'})}>Sign Up</button>
				</div>
				</div>
			</div>
			)
	}
}