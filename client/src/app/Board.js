import React from 'react';
import ToolBar from './Toolbar.js';
import Render from '../../render.js';
import initDrawer from '../../drawer.js';
import Video from './Video';
import Chat from './Chat';
import { hashHistory } from 'react-router';

  var peer;
  var socket;


    const container = {
      display: 'block',
      float: 'left',
      position: 'relative',
      zIndex: 0
    };
    const tools = {
      listStyleType: 'none',
      backgroundColor: 'white',
      position: 'relative',
      marginTop: '0px',
      float: 'left',
      width: window.document.body.offsetWidth * .10,
      height: window.document.body.offsetHeight * .92 - 50,
      zIndex: 2,
      boxShadow: '2px 2px 3px 0px rgba(0, 0, 0, 0.16)'
    };
    const boardStyle  = {
      float: 'left',
      position: 'relative',
      zIndex: 2
    }

    const boardWidth = document.body.offsetWidth * .60;
    const topBar = {
      height: window.document.body.offsetHeight * .08,
      width: tools.width + boardWidth,
      background: 'white',
      position:'relative',
      zIndex: 1,
      boxShadow: '0 2px 3px 0px rgba(0, 0, 0, 0.16)'
    }
    const comm = {
      float: 'right',
      position: 'relative',
      zIndex: 2,
      boxShadow: '-2px 0 3px 0px rgba(0, 0, 0, 0.16)'
    }


    const drawTitle = {
      width: window.document.body.offsetWidth * .70,
      height: topBar.height,
      position: 'relative',
      float: 'left'
    }


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draw: null,
      localStream: null,
      streams: [],
      chatMessages: []
    };
  }
  // when component mounts board gets created and drawer gets initiated and set to state
  componentDidMount() {
    this.updateCanvas();
    const currentRoom = window.location.hash.slice(2);
    fetch('http://localhost:3000/api/sessions/getSession',{
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({sessionId: currentRoom})
    })
    .then( response => response.json())
    .then( session => {
    var permission = false;

    if (session.private) {
      for (var i = 0; i < session.invites.length; i++) {
        if (session.invites[i].user === this.props.user._id) {
          permission = session.invites[i].permission;
          break;
        }
      }
    } else {
      permission = 'write';
    }

    if (!permission) {
      hashHistory.push('/')
    }
    //Socket Rooms
    socket = io();
    socket.emit('addMeToRoom', session._id);
    // Add peer video connection
    peer = new Peer(this.props.user._id, {
      key: 'r2jzzf71zn9izfr',
      config: {'iceServers': [
        { url: 'stun:stun.l.google.com:19302' },
        { url: 'stun:stun1.l.google.com:19302' }]
      }
    });
    peer.on('open', function(id) {
      socket.emit('peerId', id);
    });

    var context = this;

    socket.on('fetchMessages', messages => {
      this.setState({chatMessages: messages});
    })
    //Call into the stream
    socket.on('peers', peers => {
      let you = peers.indexOf(this.props.user._id)
      if (you !== -1) {
       peers.splice(you, 1);
      }
      console.log(peers);
      this.setState({peers: peers})
      for (var i = 0; i < peers.length; i++) {
        let thisCall = peer.call(peers[i], this.state.localStream)
        thisCall.on('stream', theirStream => {
          console.log('Their stream ', theirStream);
          let streams = context.state.streams;
          streams.push(URL.createObjectURL(theirStream))
          context.setState({streams: streams});
        })
      }
    })

    //Receive any stream data
    peer.on('call', incomingCall => {
      incomingCall.answer(this.state.localStream);
      incomingCall.on('stream', function (theirStream) {
        console.log('Their stream ', theirStream);
        let streams = context.state.streams;
        streams.push(URL.createObjectURL(theirStream))
        context.setState({streams: streams})
      });
    });


    //Draw and render
    const drawer = initDrawer(permission);
    this.setState({ draw: drawer });
    const render = Render('draw-canvas', drawer);

    var loadChange = function loadChange(serverData) {
      if (serverData.color) {
        drawer.data.color = serverData.color;
      }

      if (serverData.shapes) {
        for (var key in serverData.shapes) {
          var serverShape = serverData.shapes[key];
          drawer.data.shapes[key] = serverShape;
          drawer.data.remoteShapes = drawer.data.remoteShapes.filter(function(remoteShape) {
            return remoteShape.guid !== serverShape.guid;
          });
          if (serverShape.done) {
            drawer.data.updates ? 0 : drawer.data.updates = [];
            if (drawer.data.currentShape && (serverShape.guid === drawer.data.currentShape.guid)) {
              drawer.data.currentShape = null;
              serverShape.done = undefined;
              drawer.data.updates.push(serverShape);
            }
            if (drawer.data.modifiedShape && (serverShape.guid === drawer.data.modifiedShape.guid)) {
              drawer.data.modifiedShape = null;
              serverShape.done = undefined;
              drawer.data.updates.push(serverShape);
            }
          }
        }
      }

      if (serverData.currentShape) {
        if (!drawer.data.currentShape || (serverData.currentShape.guid !== drawer.data.currentShape.guid)) {
          drawer.data.remoteShapes = drawer.data.remoteShapes.filter(function (remoteShape) {
            return remoteShape.guid !== serverData.currentShape.guid;
          });
          var async = false;
          for (var key in drawer.data.shapes) {
            var shape = drawer.data.shapes[key];
            if (shape.guid === serverData.currentShape.guid) {
              // console.log('async detected');
              async = true;
            }
            drawer.data.remoteShapes = drawer.data.remoteShapes.filter(function (remoteShape) {
              return remoteShape.guid !== shape.guid;
            });
          }
          if (async === false) {
            drawer.data.remoteShapes.push(serverData.currentShape);
          }
          async = false;
        }
      }
    };
    //Tick to send drawer data (I think?)
    var tick = function tick() {
      var shapes = {};

      if (drawer.data.modifiedShape) {
        shapes[drawer.data.modifiedShape.id] = drawer.data.modifiedShape;
      }
      if (drawer.data.updates) {

        drawer.data.updates.forEach(function(update) {
          shapes[update.id] = update;
        });


        drawer.data.updates = [];
      }
      //defaults
      var myDraw = {
        color: 'aliceBlue',
        newShapes: drawer.data.newShapes,
        currentShape: drawer.data.currentShape,
        shapes: shapes
      };

      if (drawer.data.newShapes.length > 0) {
        drawer.data.newShapes = [];
      }

      socket.emit('clientDrawing', myDraw);
    };

    socket.on('renderme', (serverData) => {
      loadChange(serverData);
    });

    setInterval(tick, 100);
    window.requestAnimationFrame(render);

    })
  }

  handleMessageSend (newMessage) {
    socket.emit('sendMessage', newMessage);
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, 750, 1000);
  }

  setLocalStream(stream) {
    this.setState({localStream: stream});
  }
  render() {

    return (
        <div>
          <div style={boardStyle}>
            <div style={topBar}>
                <div style={drawTitle}> Drawmie {window.location.hash}</div>
            </div>
            {/* this tag takes you back to the landing page */}
            <div style={tools}>
              <ToolBar draw={ this.state.draw } />
            </div>
            <div style={container} >
              <canvas id="draw-canvas" ref="canvas" width={boardWidth} height={window.document.body.offsetHeight * .92 - 50} />
            </div>
          </div>
          <div style={comm}>
            <Video streams={this.state.streams} setStream={this.setLocalStream.bind(this)}/>
            <Chat user={this.props.user} messages={this.state.chatMessages} onMessageSend={this.handleMessageSend.bind(this)}/>
          </div>
        </div>
    );
  }
}

export default Board;
