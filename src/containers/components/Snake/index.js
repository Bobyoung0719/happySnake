import React, { Component } from 'react';
import './snake.css';

class Snake extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  
  render() {
    const { snake, snakeHeadPos } = this.props;

    const snakeBody = snake.map((item, i) => {
      const styles = {
        top: `${item.y * 10}px`,
        left: `${item.x * 10}px`
      }
      return <i key={i} style={styles} />
    });
    
    return (
      <div className="snake-boay">
        {snakeBody}
      </div>
    );
  }
}

export default Snake;