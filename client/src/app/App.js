import React from 'react';
import Auth from './Auth';
import Nav from './Nav';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {token: null}
  }
  login(token, user) {
    this.setState({token: token, user: user});
  }
  componentDidMount() {
    this.handleToken()
  }
  componentDidUpdate() {
    this.handleToken()
  }
  handleToken() {
    //HANDLE AUTH
      //Check local storage for Token
        //If token, grab user info and set token
  }
  getChildren() {
  }
  render() {
    if (!this.state.token) {
      return <Auth login={this.login.bind(this)}/>
    } else {
      return (<div>
            <Nav/>
            <div>
              {this.props.children &&  React.cloneElement(this.props.children, {
                user: this.state.user
              })}
            </div>
          </div>
        )
    }
  }
}



