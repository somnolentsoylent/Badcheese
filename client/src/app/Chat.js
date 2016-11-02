// Chat.js
import React from 'react';

const chat = {
      width: window.document.body.offsetWidth * .30,
      height: window.document.body.offsetHeight * .45 - 50,
      backgroundColor: 'white'
    }

export default class Chat extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div style={chat}></div>
  }
}