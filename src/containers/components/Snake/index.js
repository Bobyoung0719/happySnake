import React from 'react';
import './snake.css';

const Snake = props => {
  const snakeBody = props.snake.map((item, i) => {
    const styles = { top: `${item.y * 10}px`, left: `${item.x * 10}px` };
    return <i key={i} style={styles} />
  });
  
  return <div className="snake-boay">{snakeBody}</div>
}

export default Snake;