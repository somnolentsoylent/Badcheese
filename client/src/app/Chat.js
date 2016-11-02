// Chat.js
import React from 'react';

const chat = {
      width: window.document.body.offsetWidth * .30,
      height: window.document.body.offsetHeight * .55 - 50,
      backgroundColor: 'white'
    }

const chatText = {
	width: window.document.body.offsetWidth * .30 - 3
}

const enter = {
	width: window.document.body.offsetWidth * .06
}

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	rows: 1,
    	message: ''
    }
  }

  sendMessage() {
  	this.setState({message: ''});
  }
  resizeTextArea(e) {
  	const rows = Math.floor(this.state.message.length / 60) + 1;
  	if (rows !== this.state.rows) {
  		this.setState({message: e.target.value, rows: rows})
  	} else {
  		this.setState({message: e.target.value});
  	}
  }

  onEnter(e) {
  	if (e.charCode === 13) {
  		this.sendMessage();
  		this.setState({rows: 1})
  		e.preventDefault();
  	}
  }  
  /*TODO add chat message rendering */
  render() {
    return <div style={chat}>
    	<form className='chat-input'>
    		<textarea onKeyPress={e => this.onEnter(e)} onChange={e => this.resizeTextArea(e)} style={chatText} rows={this.state.rows} value={this.state.message} placeholder='Type a message...' required/>
    	</form>  	
    </div>
  }
}