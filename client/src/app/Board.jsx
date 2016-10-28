import React from 'react';
import ToolBar from './ToolBar.jsx';
import Nav from './Nav.jsx';
import Render from '../../render.js';
import initDrawer from '../../drawer.js';


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draw: null
    }
  }

  componentDidMount() {
    this.updateCanvas();
    const currentRoom = window.location.hash.slice(1);
    const socket = io();
    socket.emit('addMeToRoom', currentRoom);

    const drawer = initDrawer();
    this.setState({ draw: drawer })
    const render = Render('draw-canvas', drawer);

    var loadChange = function loadChange(serverData) {
      if (serverData.color) {
        drawer.data.color = serverData.color;
      }

      if (serverData.shapes) {
        for (var key in serverData.shapes) {
          var serverShape = serverData.shapes[key];
          console.log("server shape: ", serverShape.guid);
          drawer.data.shapes[key] = serverData.shapes[key];
        }
      }

      if (serverData.currentShape) {
        drawer.data.remoteShape = serverData.currentShape;
      }
    };

    var tick = function tick() {

      var myDraw = {
        color: 'aliceBlue',
        newShapes: drawer.data.newShapes,
        currentShape: drawer.data.currentShape,
        shapes: drawer.data.modifiedShapes
      };

      if (drawer.data.newShapes.length > 0) {
        drawer.data.newShapes = [];
      }

      socket.emit('clientDrawing', myDraw);
    };

    socket.on('renderme', (serverData) => {
      loadChange(serverData);
    });

    setInterval(tick, 250);
    window.requestAnimationFrame(render);

    // socket.on('boardId', function (data) {
    //   console.log(data);
    //   socket.emit('clientDrawing', { clientSays: 'this message came through socket.io' });
    // });

  }
  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, 750, 1000);
  }
  render() {
    const container = {
      marginLeft: '30%',
      paddingLeft: 30,

      position: 'fixed'
    };
    const canvas = {
      border: '15px solid gray',
      borderRadius: '5px',
    };
    const tools = {
      listStyleType: 'none',
      marginTop: '85px',
      position: 'fixed'
    };
    const nav = {
      marginLeft: '-25px',
      color: 'red'
    };

    return (
      <div>
        <h1>Drawmie</h1>
        <div>
          <div className="container-fluid" style={tools}>
            <ToolBar draw={ this.state.draw } />
          </div>
            <Nav style={nav}/>
          <div className="container-fluid" style={container} >
            <canvas id="draw-canvas" style={canvas} ref="canvas" width={500} height={500} />
          </div>
        </div>
      </div>
    );
  }
}

export default Board;


          
