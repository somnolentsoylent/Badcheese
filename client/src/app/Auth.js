// Auth.js
import React from 'react';

export default class Auth extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (<h1 onClick={()=>this.props.login('token', {user: 'spenny'})}> THIS IS A LOGIN PAGE, CLICK ME </h1>)
	}
}