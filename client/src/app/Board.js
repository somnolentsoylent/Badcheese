import React from 'react';
import ToolBar from './Toolbar.js';
import Render from '../../render.js';
import initDrawer from '../../drawer.js';
import Video from './Video';
import Chat from './Chat';

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
    const comm = {
      float: 'left',
      position: 'relative',
      zIndex: 2,
      boxShadow: '-2px 0 3px 0px rgba(0, 0, 0, 0.16)'
    }
    const video = {
      background:'black',
      width: window.document.body.offsetWidth * .30,
      height: window.document.body.offsetHeight * .45,
    }
    const chat = {
      width: window.document.body.offsetWidth * .30,
      height: window.document.body.offsetHeight * .55 - 50,
      backgroundColor: 'white'
    }
    const topBar = {
      height: window.document.body.offsetHeight * .08,
      width: window.document.body.offsetWidth * .70,
      background: 'white',
      position:'relative',
      zIndex: 1,
      boxShadow: '0 2px 3px 0px rgba(0, 0, 0, 0.16)'
    }

    const save = {
      width: tools.width,
      height: topBar.height,
      position: 'relative',
      float: 'left'
    }

    const drawTitle = {
      textAlign: 'center',
      paddingTop: '12px',
      fontSize: '24px'
    }


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draw: null
    };
  }
  // when component mounts board gets created and drawer gets initiated and set to state
  componentDidMount() {
    this.updateCanvas();
    const currentRoom = window.location.hash.slice(2);
    const socket = io();
    socket.emit('addMeToRoom', currentRoom);
    const drawer = initDrawer();
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

  }
  
  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, 750, 1000);
  }
  render() {

    return (
        <div>
          <div style={boardStyle}>
            <div style={topBar}>
                <div style={save}></div> 
                <div style={drawTitle}> Drawmie {window.location.hash}</div>
            </div>
            {/* this tag takes you back to the landing page */}
            <div className="container-fluid" style={tools}>
              <ToolBar draw={ this.state.draw } />
            </div>
            <div className="container-fluid" style={container} >
              <canvas id="draw-canvas" ref="canvas" width={window.document.body.offsetWidth * .60} height={window.document.body.offsetHeight * .92 - 50} />
            </div>
          </div>
          <div style={comm}>
            <Video style={video}/>
            <Chat style={chat}/>
          </div>
        </div>
    );
  }
}

export default Board;
