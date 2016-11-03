import React from 'react';
import Auth from './Auth';
import Nav from './Nav';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: null}
  }
  login(user) {
    this.setState({user: user});
    console.log(user);
    var user = user || {email: 'null'};
    window.localStorage.setItem('user', user.email);
  }
  componentDidMount() {
    this.checkAuth()
  }
  componentWillReceiveProps() {
    this.checkAuth()
  }
  checkAuth() {
    var userName = window.localStorage.getItem('user');
    if (!userName || userName == null) {
      this.setState({user: null});
    }
  }
  render() {
    if (!this.state.user) {
      return <Auth login={this.login.bind(this)}/>
    } else {
      return (<div>
            <Nav signOut={this.login.bind(this)}/>
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



