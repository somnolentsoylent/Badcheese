import React from 'react';
import { hashHistory } from 'react-router';

export default class Landing extends React.Component {
  constructor(props) {
    super(props)
  }

  newBoard() {
    fetch('http://localhost:3000/board')
    .then(response => response.json())
    .then( data => {
      console.log(data)
      hashHistory.push('/'+data);
    })
  }

  render() {
    return <button onClick={e => this.newBoard()}>New Board</button>
  }
}
