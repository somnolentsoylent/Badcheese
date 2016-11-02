// Nav.js
import React from 'react'
import { Link } from 'react-router'


const Nav = () => (
	<div className='nav'>
	  <h2 className='title'>Drawmie</h2>
	  <li className='nav-items'><Link>Log Out</Link></li>
	  <li className='nav-items'><Link>Your Boards</Link></li>
	</div>
	)

export default Nav;

