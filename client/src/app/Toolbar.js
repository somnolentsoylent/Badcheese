import React from 'react';


export default class ToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#4D4D4D',
      displayColorPicker: false
    }
  }

  handleColorChange(e) {
    var color = "rgba(" + e.target.value.match(/[A-Za-z0-9]{2}/g).map(function(v) { return parseInt(v, 16) }).join(",");
    this.setState({color: color})
    this.props.draw.changeColor(color)
  }
  handleClick() {
    this.setState({displayColorPicker: true})
  }
  handleClose() {
    this.setState({displayColorPicker: false})
  }
  handleTransparency(e) {
    this.props.draw.changeColor(this.props.draw.color, e.target.value)
  }
  strokeWidth(e) {
    this.props.draw.changeWidth(e.target.value);
  }
  render() {
    const colors = {
      position: 'relative',
      width: window.document.body.offsetWidth * .10
    }
    return (
      <div>
        <div className="well">
          <h5>Color</h5>
          <div className='select-group'>
          <input defaultValue={'#ff0000'} onChange={e => this.handleColorChange(e)} type='color' />
          </div>
          <div className='select-group'>
          <h5> Select Transparency </h5>
          <input min={0} max={1} step={.05} defaultValue={1} onChange={e => this.handleTransparency(e)} type='range' />
          </div>
          <div className='select-group'>
          <h5> Stroke width </h5>
          <input min={1} max={50} step={1} defaultValue={2} onChange={e => this.strokeWidth(e)} type='range' />
          </div>
          <br/>
          <h5>Shape Fill Style</h5>
          <div className='select-group'>
            <div className="tools"
              onClick={() => this.props.draw.toggleStrokeFill('stroke')}>No Fill</div>
            <div className="tools"
              onClick={() => this.props.draw.toggleStrokeFill('fill')}>Fill</div>
          </div>
          <br/>
          <h5>Shape</h5>
          <div className='select-group'>
            <div className="tools"
              onClick={() => this.props.draw.enableIsSelecting()}>Drag</div>
            <div className="tools"
              onClick={() => this.props.draw.changeShapeType(this.props.draw.ShapeTypes.rect)}>Rect</div>
            <div className="tools"
              onClick={() => this.props.draw.changeShapeType(this.props.draw.ShapeTypes.line)}>Line</div>
            <div className="tools"
              onClick={() => this.props.draw.changeShapeType(this.props.draw.ShapeTypes.circle)}>Circle</div>
            <div className="tools"
              onClick={() => this.props.draw.changeShapeType(this.props.draw.ShapeTypes.path)}>Draw</div>
          </div>
        </div>
      </div>
      )
  }
}

