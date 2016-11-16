// SaveToRoomModal.js
import React from 'react';
import ReactDOM from 'react-dom';


export default class SaveToRoomModal extends React.Component {
	constructor(props) {
		super(props)
	}

	handleSubmit(e) {
		let name = ReactDOM.findDOMNode(this.refs.name).value;
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
				<h2>Save Board To Room</h2>
				<form onSubmit={e => this.handleSubmit(e)}>
					<input className='modalInput' type='text' autofocus='true' ref='name' placeholder="Enter Board Name... (Optional)"/>
					<button className='modalSubmit' onClick={e => this.handleSubmit(e)}>Submit</button> 
				</form>
			</div>
			</div>
			)
	}
}