// Video.js
import React from 'react';

  const video = {
      background:'black',
      color: 'white',
      position: 'relative',
  	  width: window.document.body.offsetWidth * .30,
      height: window.document.body.offsetHeight * .45
    }

  const player = {
  	maxWidth: '100%',
  	width: video.width,
  	height: video.height,
  	maxHeight: '100%',
    zIndex: 3
  }

let localStream;

var pc;

var pcConfig = {
  'iceServers': [{
    'url': 'stun:stun.l.google.com:19302'
  }]
};

// Set up audio and video regardless of what devices are present.
var sdpConstraints = {
  'mandatory': {
    'OfferToReceiveAudio': true,
    'OfferToReceiveVideo': true
  }
};


export default class Video extends React.Component {
  constructor(props) {
    super(props)
    this.state = { alert: null, src: null , streams: []};
  }

  componentDidMount () {
  	navigator.mediaDevices.getUserMedia({
  		audio: true,
  		video: true
  	})
  	.then(stream => this.setStream(stream))
  	.catch(e => this.setState({alert: 'The camera and microphone must be on in order to stream video'}))
  }

  setStream(stream) {
    localStream = stream;
    this.renderVideo(stream);
    this.props.setStream(stream)
  }

  createPeerConnection() {
	  try {
	    pc = new RTCPeerConnection(null);
	    pc.onicecandidate = this.handleIceCandidate;
	    pc.onaddstream = this.handleRemoteStreamAdded;
	    pc.onremovestream = this.handleRemoteStreamRemoved;
	    console.log('Created RTCPeerConnnection');
	  } catch (e) {
	    console.log('Failed to create PeerConnection, exception: ' + e.message);
	    alert('Cannot create RTCPeerConnection object.');
	    return;
	  }
	}

  handleIceCandidate(event) {
    console.log('icecandidate event: ', event);
    if (event.candidate) {
      sendMessage({
        type: 'candidate',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate
      });
    } else {
      console.log('End of candidates.');
    }
  }

  handleRemoteStreamAdded(event) {
    console.log('Remote stream added.');
    // remoteVideo.src = window.URL.createObjectURL(event.stream);
    remoteStream = event.stream;
  }	

  handleRemoteStreamRemoved(event) {
    console.log('Remote stream removed. Event: ', event);
  }

  renderVideo(stream) {
  	localStream = window.URL.createObjectURL(stream)
  	this.setState({src: localStream})
  }
  getVideos() {
    if (this.props.streams.length < 2 ) {
      return (<div className='videos'>
                <video className='mini' src={localStream} autoPlay muted></video>
              </div>)
    } else {
        return     ( <div className='videos'>
                <video className='mini' src={localStream} autoPlay muted></video>
                {this.props.streams.filter((stream, index) => (index && index < 3)).map( (stream, index) => {
                   return <video className='mini'src={stream} autoPlay></video>})}
              </div>)
    }
  }
  render() {
  	if (this.state.alert) {
  		return <div style={video}>{this.state.alert}</div>
  	} else {
    return <div style={video}>
    			<video style={player} src={this.props.streams[0]} autoPlay></video>
          {this.getVideos()}
    		</div>
  	}
  }
}