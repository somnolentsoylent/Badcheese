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

const messageStyles ={
  singleMessage: {
    fontFamily: 'sans-serif',
    margin: 5,
    padding: 5,
    backgroundColor: '#dee4ed'
  },
  singleMessageMe: {
    fontFamily: 'sans-serif',
    margin: 5,
    padding: 5,
    backgroundColor: '#caf492'
  },
  messageUser: {
    margin: 0,
    fontWeight: 'bold'
  },
  messageTimestamp: {
    margin: 0,
    fontStyle: 'oblique'
  },
  messageText: {
    margin: 0
  }
}

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	rows: 1,
    	message: '',
      user: this.props.user.firstName + ' ' + this.props.user.lastName,
      userId: this.props.user._id,
      timestamp: null
    }
  }
  componentDidMount() {
  	const socket = this.props.socket;
  }
  sendMessage() {
    let formatDate = (dateObj) => {
      let hours = dateObj.getHours();
      let seconds = dateObj.getMinutes();
      let am = true;
      if (hours > 12) {
        hours = hours - 12;
        am = false;
      }
      if (seconds < 10){
        seconds = '0' + seconds
      }
      if (am){
        return hours + ':' + seconds + ' am';
      } else {
        return hours + ':' + seconds + ' pm';
      }
    }
    this.props.onMessageSend({
      user: this.state.user,
      userId: this.state.userId,
      text: this.state.message,
      timestamp: formatDate(new Date())
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
            <div style={message.userId === this.state.userId ? messageStyles.singleMessageMe : messageStyles.singleMessage} key={index}>
              <p style={messageStyles.messageUser}>{message.user}</p>
              <p style={messageStyles.messageTimestamp}>{message.timestamp}</p>
              <p style={messageStyles.messageText}>{message.text}</p>
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
