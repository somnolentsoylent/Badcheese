// Video.js
import React from 'react';

  const video = {
      background:'black',
      width: window.document.body.offsetWidth * .30,
      height: window.document.body.offsetHeight * .45,
    }


export default class Video extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div style={video}></div>
  }
}