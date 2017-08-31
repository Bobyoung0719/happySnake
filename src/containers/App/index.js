import React, {Component} from 'react';
import CanvasArea from '../components/CanvasArea';
import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTatrt: false,
      direction: null,
      over: false,
      period: 1000,
      chooseArr: [0, 0, 0, 0],
      snake: [{x: 6, y: 8}, {x: 5, y: 8}, {x: 4, y: 8}],
      food: {x: 19, y: 12}
    }

    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.foodPos = this.foodPos.bind(this);
    this.chooseSpeed = this.chooseSpeed.bind(this);
    this.handleMoveUp = this.handleMoveUp.bind(this);
    this.handleMoveRight = this.handleMoveRight.bind(this);
    this.handleMoveDown = this.handleMoveDown.bind(this);
    this.handleMoveLeft = this.handleMoveLeft.bind(this);
    this.handleResume = this.handleResume.bind(this);
  }

  // 开始
  start() {
    const { snake, food, direction, isTatrt, period } = this.state;
    this.setState({ isTatrt: true });
    clearInterval(this.timer);

    /**
     * 这里的代码 可以通过snake的长度自动设置速度
     */
    // const snakeLength = snake.length;
    // let period = 1000;
    // if (snakeLength >10 && snakeLength <= 20) {
    //   period = 800;
    // } else if (snakeLength >20 && snakeLength <= 30) {
    //   period = 500;
    // } else if (snakeLength >30 && snakeLength <= 50) {
    //   period = 300;
    // }

    this.timer = setInterval(() => {
      const snakeHeadX = snake[0].x, snakeHeadY = snake[0].y;
      
      if(snakeHeadX <= 0 || snakeHeadX >= 59 || snakeHeadY <= 0 || snakeHeadY >= 39 ) {
        this.setState({ over: true });
        clearInterval(this.timer);
        alert('你的蛇阵亡啦！请重新开始游戏~');
        return;
      }

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
    }, period);
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

  // 重新开始
  handleResume() {
    this.setState({
      isTatrt: false,
      direction: null,
      over: false,
      period: 1000,
      chooseArr: [0, 0, 0, 0],
      snake: [{x: 6, y: 8}, {x: 5, y: 8}, {x: 4, y: 8}],
      food: {x: 19, y: 12}
    }, () => clearInterval(this.timer));
  }

  // 选择难度

  chooseSpeed(speed) {
    const { isTatrt } = this.state;
    if (isTatrt) {
      console.log(`游戏中不能更换'交通工具'哦～`);
      return;
    }
    let count = 0;
    switch (speed) {
      case 800:
        count = 0;
        break;
      case 600:
        count = 1;
        break;
      case 400:
        count = 2;
        break;
      case 200:
        count = 3;
        break;
    }

    this.setState({ period: speed, chooseArr: [0, 0, 0, 0] }, () => {
      const newArr = [0, 0, 0, 0];
      newArr[count] = 1;
      this.setState({ chooseArr: newArr });
    });
  }

  render() {
    const { chooseArr } = this.state;

    return (
      <div className="app-container">
      <div className="app-header">愤怒的贪吃蛇，biubiubiu～～～</div>
      <CanvasArea {...this.state} />
      <div className="control-area">
        <div className="other-handle">
          <button className="start" onClick={this.start}>开始游戏</button>
          <button className="pause" onClick={this.pause}>暂停按钮</button>
          <button className="restart" onClick={this.handleResume}>复位按钮</button>
        </div>
        <div className="difficulty">
          <div className="choose">选择难度</div>
          <div className="btn">
            <button onClick={() => this.chooseSpeed(800)} className={chooseArr[0] ? "actived" : null}>我要步行</button>
            <button onClick={() => this.chooseSpeed(600)} className={chooseArr[1] ? "actived" : null}>自行车</button>
            <button onClick={() => this.chooseSpeed(400)} className={chooseArr[2] ? "actived" : null}>我要汽车</button>
            <button onClick={() => this.chooseSpeed(200)} className={chooseArr[3] ? "actived" : null}>我要上天</button>
          </div>
        </div>
        <div className="direction">
          <button onClick={() => this.handleMoveUp('up')}>向上</button>
          <button onClick={() => this.handleMoveLeft('left')}>向左</button>
          <button onClick={() => this.handleMoveDown('down')}>向下</button>
          <button onClick={() => this.handleMoveRight('right')}>向右</button>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
