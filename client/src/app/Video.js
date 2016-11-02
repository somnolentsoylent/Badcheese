// Video.js
import React from 'react';

  const video = {
      background:'black',
      color: 'white',
  	  width: window.document.body.offsetWidth * .30,
      height: window.document.body.offsetHeight * .45
    }

  const player = {
  	maxWidth: '100%',
  	width: video.width,
  	height: video.height,
  	maxHeight: '100%'
  }

let localStream;


export default class Video extends React.Component {
  constructor(props) {
    super(props)
    this.state = { alert: null, src: null };
  }

  componentDidMount () {
  	navigator.mediaDevices.getUserMedia({
  		audio: true,
  		video: true
  	})
  	.then(stream => this.renderVideo(stream))
  	.catch(e => this.setState({alert: 'The camera and microphone must be on in order to stream video'}))
  }

  renderVideo(stream) {
  	localStream = window.URL.createObjectURL(stream)
  	this.setState({src: localStream})
  }

  render() {
  	if (this.state.alert) {
  		return <div style={video}>{this.state.alert}</div>
  	} else {
    return <div style={video}>
    			<video style={player} src={this.state.src} autoPlay muted></video>
    		</div>
  	}
  }
}