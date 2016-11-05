// ViewUserBoards.js
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

export default class ViewUserBoards extends React.Component {
	constructor(props) {
		super(props)
		this.state = {boards: []};
	}

	componentDidMount() {
		fetch('http://localhost:3000/api/boards/getUserBoards',{
		  method: 'POST',
		  headers: { "Content-Type" : "application/json" },
		  body: JSON.stringify({userId: this.props.user})
		})
		.then( response => response.json())
		.then( response => {
		  this.setState({boards: response})
		  console.log(response);
		})
	} 

	handleSubmit(e) {
		let name = ReactDOM;
		this.props.save(name);
		this.props.close();
		if (e) {
		  e.preventDefault();	
		}
	}

	render() {
		return (
			<div>
			<div onClick={e => this.props.close()} className='overlay'> </div>
			<div className='content'>
				<h2>Your Boards</h2>
				{this.state.boards.map(board => <p onClick={e => this.props.upload(board.shapes)}>{board.name}</p>)}
			</div>
			</div>
			)
	}
}