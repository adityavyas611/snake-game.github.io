import React, {Component} from 'react';
import Snake from './Snake';
import Food from './Food';
import Score from './Score';

let genRandCoords = () => {

  const minVal = 1;
  const maxVal = 98;

  let x = Math.floor((Math.random()*(maxVal-minVal+1)+minVal)/2)*2;
  let y = Math.floor((Math.random()*(maxVal-minVal+1)+minVal)/2)*2;

  return [x,y];
}

class App extends Component {

  state = {
    food : genRandCoords(),
    speed : 150,
    score : 0,
    direction : 'RIGHT',
    snakeCharacter: [
      [50,40],
      [52,40]   
    ]
  }

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onkeydown;
    
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
    snake.shift();
    
    this.setState({
      snakeCharacter : snake
    })
    console.log(`sanke :${snake}, H:${head}`)
  }

  checkSnakeBorder() {
    let head = this.state.snakeCharacter[this.state.snakeCharacter.length - 1];

    if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0){
      this.GameOver();
    }
  }

  GameOver(){
    alert(`Game Over!!!`);
    this.setState({
      food : genRandCoords(),
      score : 0,
      speed : 200,
      direction : 'RIGHT',
      snakeCharacter: [
      [50,40],
      [52,42]
    ]
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
      this.countScore();
      this.setState({
        food: genRandCoords(),
      });
    }
  }

  makeSnakeLarge() {
    console.log(`snk:${[...this.state.snakeCharacter]}`)
    let largeSnake = [...this.state.snakeCharacter];
     console.log(`aa ${largeSnake.unshift([])}`)

     //  let newl=largeSnake.unshift([])
    console.log(`qq ${largeSnake}`)
    this.setState({
      snakeCharacter: largeSnake     
    });
  }

  countScore(){
    let newScore = this.state.snakeCharacter.length * 10 - 10;
    this.setState({
      score : newScore
    })
  }


  render (){
  return (
    <div> 
      <Score score = {this.state.score}/>
    <div className = 'game-ground'>
      <Snake snakeChars = {this.state.snakeCharacter} />
      <Food food = {this.state.food} />
    </div>
    </div>
  );
}
}
export default App;
