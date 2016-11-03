import React from 'react';
import { hashHistory } from 'react-router';

export default class Landing extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 
      showBoardForm: false
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
      <div className='landing-page'>
        
        <div className='profile-container'>
          <div className='profile-section'>
            <img className='profile-pic' src={this.props.user.photo}></img>
            <p>{this.props.user.firstName} {this.props.user.lastName}</p>
          </div>
        </div>

        <div className='rightside-container'>
          
          <div className='right-section'>
            
            {this.state.showBoardForm ? 
              <div className='build-new-board'>
                CREATE NEW Rooms
                <form>
                  <input type='text' placeholder='Enter Room Name...'/>
                  <input type="radio" name="viewablity" value="private">Private</input>
                  <input type='radio' name='viewablity' value='public'>Public</input><br />
                  <input className='search-user' type='text' placeholder='Search for user email...'/>
                  <input type='radio' name='permission' value='read'>Read</input><br />
                  <input type='radio' name='permission' value='write'>Write</input><br />
                  <button className='search-user'>Add User</button>
                  <button onClick={e => this.newBoard()}>Create Board</button>
                </form>
              </div> 
              : <div></div>}

            {!this.state.showBoardForm ? 
              <div className='my-sessions'>
                <button onClick={e => this.setState({showBoardForm: true}) }>Create New Room</button>
              </div> 
              : <div></div>}
          </div>

        </div>

      </div>
    )
  }
}
