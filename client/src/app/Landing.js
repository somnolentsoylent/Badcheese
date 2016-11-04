import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';

export default class Landing extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 
      showBoardForm: false,
      invitedUsers: [],
      private: false,
      userToAdd: {}
    }
  }

  componentDidMount(){

  }


//ADD IMAGE URL
  newBoard() {

    var sessionName = ReactDOM.findDOMNode(this.refs.sessionName).value;

    var sessionObj = {
      invitedUsers: this.state.invitedUsers,
      name: sessionName,
      host: this.props.user._id,
      private: this.state.private
    }
    fetch('http://localhost:3000/api/sessions/addSession',{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(sessionObj)
    })
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then( sessionId => {
      fetch('http://localhost:3000/board/' + sessionId)
      .then(response => response.json())
      .then( data => {
        console.log(data)
        hashHistory.push('/'+data);
      })
    })
  }

  addUserToList(){
    var tempArr = this.state.invitedUsers.slice();
    var val = ReactDOM.findDOMNode(this.refs.userEmail).value;
    var perm = this.state.permission;
    var userToAdd = {
      email: val,
      permission: perm
    }
    var exists = false; 
    tempArr.forEach( (elem)=> {
      if(elem.email === val){
        exists = true
      }
    });
    if(!exists && val !== ''){
      tempArr.push(userToAdd);
      this.setState({ invitedUsers: tempArr});
    }
    setTimeout((()=>console.log(this.state.invitedUsers)), 500);
  }

  updatePermission(permType){
    this.setState({permission: permType});
  }

  updateAccess(accessType){
    this.setState({private: accessType});
  }

  render() {
    // console.log('Props:', this.props.user)
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
                Create New Room
                  <input type='text' placeholder='Enter Room Name...' ref='sessionName'/>
                  <input type="radio" name="viewablity" onClick={(e) => this.updateAccess(true)} value="private"></input><span>Private</span>
                  <input type='radio' name='viewablity' onClick={(e) => this.updateAccess(false)} value='public'></input><span>Public</span><br />
                  <input className='search-user-text' type='text' placeholder='Search for user email...' ref='userEmail'/>
                  <input className='search-user-radio' type='radio' onClick={(e) => this.updatePermission('read')} name='permission' value='read'></input><span>Read</span>
                  <input className='search-user-radio' type='radio' onClick={(e) => this.updatePermission('write')} name='permission' value='write'></input><span>Write</span>
                  <button onClick={e => this.addUserToList()}>Add User</button>
                  <button onClick={e => this.newBoard()}>Create Board</button>
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
