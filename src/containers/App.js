import React, {Component} from 'react';
import Snake from '../components/Snake';
import Food from '../components/Food';
import Score from '../components/Score';

let genRandCoords = () => {

  const minVal = 1;
  const maxVal = 98;

  let x = Math.floor((Math.random()*(maxVal-minVal+1)+minVal)/2)*2;
  let y = Math.floor((Math.random()*(maxVal-minVal+1)+minVal)/2)*2;

  return [x,y];
}

let movement;

class App extends Component {

  state = {
    food : genRandCoords(),
    speed : 120,
    score : 0,
    direction : 'RIGHT',
    snakeCharacter: [
      [50,40],
      [52,40]   
    ],
    startSnakeGame: false
  }

  componentDidUpdate(){

    this.checkSnakeBorder();
    this.snakeCollapse();
    this.snakeEat();
    
  }

onkeydown = (e) => {
     e = e || window.event;
     
     switch (e.keyCode) {
       case 37:
         this.setState({direction: 'LEFT'});
         break;
       case 38:
         this.setState({direction: 'UP'});
         break;
       case 39:
         this.setState({direction: 'RIGHT'});
         break;
       case 40:
         this.setState({direction: 'DOWN'});
         break;
       default:
        console.log('Do Nothing');
        break;
     }
  }

  startGame = () => {

    movement = setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onkeydown;
    this.setState({
        startSnakeGame: true
    });
  }

  moveSnake = () => {
    
    let snake = [...this.state.snakeCharacter];
    let head = snake[snake.length - 1];

    switch (this.state.direction){
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0],head[1] + 2];
        break;
      case 'UP':
        head = [head[0],head[1] - 2];
        break;
      default:
        console.log('Wrong Direction');
        break;
    }
    snake.push(head);
    console.log(snake);
    snake.shift();
    
    this.setState({
      snakeCharacter : snake
    })
  }

  checkSnakeBorder() {
    let head = this.state.snakeCharacter[this.state.snakeCharacter.length - 1];

    if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0){
      this.GameOver();
    }
  }

  GameOver(){
    alert(`Game Over!!! Score is ${this.state.score}`);
    clearInterval(movement);
    this.setState({
      food : genRandCoords(),
      score : 0,
      speed : 200,
      direction : 'RIGHT',
      snakeCharacter: [
      [50,40],
      [52,42]
    ],
    startSnakeGame: false,
    }
    )
  }

  snakeCollapse(){
    let snake = [...this.state.snakeCharacter];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if(head[0] === dot[0] && head[1] === dot[1]){
        this.GameOver();
      }
    })
  }

  snakeEat(){
    let head = this.state.snakeCharacter[this.state.snakeCharacter.length - 1];
    let food = this.state.food;
    if(head[0] === food[0] && head[1] === food[1]){
      this.makeSnakeLarge();
      this.setState({
        food: genRandCoords(),
        score: this.state.score + 10
      });
    }
  }

  makeSnakeLarge() {
    let largeSnake = [...this.state.snakeCharacter];
    largeSnake.unshift([]);
    this.setState({
      snakeCharacter: largeSnake     
    });
  }


  render (){
  return (
    (this.state.startSnakeGame)
    ? <div> 
      <Score score = {this.state.score}/>
    <div className = 'game-ground'>
      <Snake snakeChars = {this.state.snakeCharacter} />
      <Food food = {this.state.food} />
    </div>
    </div>
    : <button onClick={this.startGame}>Start Game</button>
  );
}
}
export default App;