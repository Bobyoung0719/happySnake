import React, {Component} from 'react';
import CanvasArea from '../components/CanvasArea';
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnText: '开始',
      isTatrt: false,
      direction: null,
      over: false,
      snake: [{x: 6, y: 8}, {x: 5, y: 8}, {x: 4, y: 8}],
      food: {x: 19, y: 12}
    }

    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.foodPos = this.foodPos.bind(this);
    this.handleMoveUp = this.handleMoveUp.bind(this);
    this.handleMoveRight = this.handleMoveRight.bind(this);
    this.handleMoveDown = this.handleMoveDown.bind(this);
    this.handleMoveLeft = this.handleMoveLeft.bind(this);
    this.handleResume = this.handleResume.bind(this);
  }

  // 开始
  start() {
    const { btnText, snake, food, direction, isTatrt } = this.state;

    this.setState({ isTatrt: true });

    this.timer = setInterval(() => {
      const snakeHeadX = snake[0].x, snakeHeadY = snake[0].y;

      if(snakeHeadX <= 0 || snakeHeadX >= 59 || snakeHeadY <= 0 || snakeHeadY >= 39) {
        this.setState({ over: true });
        alert('死了');
        clearInterval(this.timer);
      } else {
        if (direction === 'right' || direction === null) {
          snake.unshift({x: snakeHeadX + 1, y: snakeHeadY});
        } else if (direction === 'left') {
          snake.unshift({x: snakeHeadX - 1, y: snakeHeadY});
        } else if (direction === 'up') {
          snake.unshift({x: snakeHeadX, y: snakeHeadY - 1});
        } else if (direction === 'down') {
          snake.unshift({x: snakeHeadX, y: snakeHeadY + 1});
        }
        (snakeHeadX === food.x && snakeHeadY === food.y) ? this.foodPos() : snake.pop();
        this.setState({ snake });
        // let indexs = snake.find(val => val.x ===  snakeHeadX);
        // // console.log(indexs, 2);
      }
      
    }, 500);
  }

  pause() {
    this.setState({ isTatrt: false }, () => clearInterval(this.timer));
  }

  // 食物的随机位置
  foodPos() {
    const xPos = Math.floor(Math.random()*60),
      yPos = Math.floor(Math.random()*40);
    
    this.setState({ food: {x: xPos, y: yPos }});
  }

  // 向上
  handleMoveUp(changeDirection) {
    const { over, direction, isTatrt } = this.state;
    if (direction === 'down') {
      console.log('不能直接回头');
      return;
    }
    if (!over && isTatrt ) {
      this.setState({ direction: changeDirection }, () => this.start());
    }
  }

  // 向右
  handleMoveRight(changeDirection) {
    const { over, direction, isTatrt } = this.state;
    if (direction === 'left') {
      console.log('不能直接回头');
      return;
    }
    if (!over && isTatrt ) {
      this.setState({ direction: changeDirection }, () => this.start());
    }
  }

  // 向下

  handleMoveDown(changeDirection) {
    const { over, direction, isTatrt } = this.state;
    if (direction === 'up') {
      console.log('不能直接回头');
      return;
    }
    if (!over && isTatrt ) {
      this.setState({ direction: changeDirection }, () => this.start());
    }
  }

  // 向左
  handleMoveLeft(changeDirection) {
    const { over, direction, isTatrt } = this.state;
    if (direction === 'right') {
      console.log('不能直接回头');
      return;
    }
    if (!over && isTatrt ) {
      this.setState({ direction: changeDirection }, () => this.start());
    }
  }

  handleResume() {
    this.setState({
      btnText: '开始',
      direction: null,
      snake: [{x: 6, y: 8}, {x: 5, y: 8}, {x: 4, y: 8}],
      food: {x: 10, y: 8}
    }, () => clearInterval(this.timer));
  }
  
  render() {
    const { state } = this;

    return (
      <div className="app-container">
      <div className="app-header">愤怒的贪吃蛇，biubiubiu～～～</div>
      <CanvasArea {...state} />
      <button onClick={this.start}>开始</button>
      <button onClick={this.pause}>暂停</button>
      <button onClick={() => this.handleMoveUp('up')}>上</button>
      <button onClick={() => this.handleMoveRight('right')}>右</button>
      <button onClick={() => this.handleMoveDown('down')}>下</button>
      <button onClick={() => this.handleMoveLeft('left')}>左</button>
      <button onClick={this.handleResume}>重新开始</button>
    </div>
    );
  }
}

export default App;
