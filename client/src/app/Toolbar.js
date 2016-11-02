import React from 'react';


var ToolBar = ({ draw }) => (
  <div>
    <div className="well">
      <h5>Fill Style</h5>
      <div>
        <div className='button-group'>
          <div className="tools"
            onClick={() => draw.toggleStrokeFill('stroke')}>Stroke</div>
          <div className="tools"
            onClick={() => draw.toggleStrokeFill('fill')}>Filled</div>
        </div>
        <br/>
        <h5>Shape</h5>
        <div className='div-group'>
          <div className="tools"
            onClick={() => draw.enableIsSelecting()}>Drag</div>
          <div className="tools"
            onClick={() => draw.changeShapeType(draw.ShapeTypes.rect)}>Rect</div>
          <div className="tools"
            onClick={() => draw.changeShapeType(draw.ShapeTypes.line)}>Line</div>
          <div className="tools"
            onClick={() => draw.changeShapeType(draw.ShapeTypes.circle)}>Circle</div>
          <div className="tools"
            onClick={() => draw.changeShapeType(draw.ShapeTypes.path)}>Draw</div>
        </div>
        <br />
        <h5>Color</h5>
        <div className='div-group color-picker'>
          <div className="tools div-black"
            onClick={() => draw.changeColor(draw.Colors.black)}></div>
          <div className="tools div-white"
            onClick={() => draw.changeColor(draw.Colors.white)}></div>
          <div className="tools div-red"
            onClick={() => draw.changeColor(draw.Colors.red)}></div>
          <div className="tools div-yellow"
            onClick={() => draw.changeColor(draw.Colors.yellow)}></div>
          <div className="tools div-green"
            onClick={() => draw.changeColor(draw.Colors.green)}></div>
          <div className="tools div-purple"
            onClick={() => draw.changeColor(draw.Colors.purple)}></div>
          <div className="tools div-blue"
            onClick={() => draw.changeColor(draw.Colors.blue)}></div>
        </div>
      </div>
    </div>
  </div>
);

export default ToolBar;
