import React from 'react';
import { hashHistory } from 'react-router';

export default class Landing extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 
      showBoardForm: false;
    }
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
    console.log('Props:', this.props.user)
    return (
      <div>
        
        <div className='profile-section'>
          <img className='profile-pic' src={this.props.user.photo}></img>
          <p>{this.props.user.firstName} {this.props.user.lastName}</p>
        </div>

        <div className='right-section'>
          <div className='build-new-board'>
            CREATE NEW BOARD
          </div>

          <div className='my-sessions'>
            <div className='session-builder'>
              <button onClick={e => this.newBoard()}>New Board</button>
            </div>
              My Sessions
          </div>
        </div>

      </div>
    )
  }
}
