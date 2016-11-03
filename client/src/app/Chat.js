// Chat.js
import React from 'react';

const chat = {
      width: window.document.body.offsetWidth * .30,
      height: window.document.body.offsetHeight * .55 - 50,
      backgroundColor: 'white'
    }

const chatText = {
	width: chat.width - 5
}

const enter = {
	width: window.document.body.offsetWidth * .06
}

const chatMessageWindow = {
  height: window.document.body.offsetHeight * .55 - 84,
  overflow: 'scroll'
}

const singleMessage = {

}

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	rows: 1,
    	message: '',
      user: this.props.user.firstName + ' ' + this.props.user.lastName
    }
  }
  componentDidMount() {
  	const socket = this.props.socket;
  }
  sendMessage() {

    this.props.onMessageSend({
      user: this.state.user,
      text: this.state.message
    });
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
      <div style={chatMessageWindow}>
        {this.props.messages.map((message, index) => {
          return (
            <div style={singleMessage} key={index}>
              <h3>{message.user}</h3>
              <p>{message.text}</p>
            </div>
          )
        })}
      </div>
    	<form className='chat-input'>
    		<textarea onKeyPress={e => this.onEnter(e)} onChange={e => this.resizeTextArea(e)} style={chatText} rows={this.state.rows} value={this.state.message} placeholder='Type a message...' required/>
    	</form>
    </div>
  }
}
