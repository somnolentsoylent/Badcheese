// Nav.js
import React from 'react'
import { Link } from 'react-router'


export default class Nav extends React.Component {
	constructor(props)  {
		super(props)
	}
	render() {
		return (
			<div className='nav'>
			  <h2 className='title'>Drawmie</h2>
			  <li onClick={e => this.props.signOut(null)} className='nav-items'>Log Out</li>
			  <li className='nav-items'><Link>Your Boards</Link></li>
			</div>
			)
	}

}

