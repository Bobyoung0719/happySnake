import React, { Component } from 'react';
import Snake from '../Snake';
import './canvas.css';

class CanvasArea extends Component {
  // constructor(props) {
  //   super(props);
  // }
  
  render() {
    const{ props } = this;

    return (
      <div className="canvas-area">
        <Snake {...props}/>
        <Food {...props}/>
      </div>
    );
  }
}

const Food = (props) => {
 

  const { x, y } = props.food;
  const styles = {
    top: `${y * 10}px`,
    left: `${x * 10}px`
  }

  return <div style={styles} className="snake-food" />
}


export default CanvasArea;