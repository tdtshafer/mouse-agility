import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { thisExpression } from '@babel/types';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

var INITIAL_CONFIG = {
  successfulClicks: 0, // user's score

  decoysToAdd: 1,
  decoys: [],
  splitIndex: 0,

  decoyText: "decoy",
  targetText: "target",

  timerStarted: false,
  gameTime: 30, //time in seconds
  timeRemaining: 30.0,
  timeIsUp: false,

  targetLeft: 250,
  targetTop: 250,

  randomMode: true,

  showSettings: false,
}

class Timer extends React.Component {

  componentDidMount() {
    this.timerID = setInterval(
      () => this.props.tick(),
      100 //one tenth of a second
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div>
        <h2>{this.props.timeStatus}</h2>
      </div>
    )
  }
}

class Form extends React.Component {
  render(){
    return (
      <form>
        <label>
          {this.props.label}:
          <input 
            value={this.props.value} 
            type={this.props.inputType} 
            name={this.props.inputName} 
            onChange={this.props.onChange}
          />
        </label>
      </form>
    )
  }
}

function Button(props){

  let positionDict = {
    position:"absolute", 
    top: props.top, 
    left: props.left,
  }

  return (
    <button 
      className="button" 
      onClick={props.handleClick}
      style={positionDict}
    >{props.text}</button>
  )
}

class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = INITIAL_CONFIG;
    this.gameArea = React.createRef()
  }

  tick() {
    if (this.state.timeRemaining < 0){
      this.state.timeStatus = "Time is Up!";
      alert("Score: " + this.state.successfulClicks);
      this.setState(INITIAL_CONFIG);
    } else {
      this.state.timeStatus = "Time Remaining: " + this.state.timeRemaining + "s";
      this.setState({
        timeRemaining: this.state.timerStarted ? Math.round((this.state.timeRemaining-0.1)*10)/10 : this.state.timeRemaining,
        timeIsUp: this.state.timeRemaining <= 0.0,
      });
    }
  }

  handleTargetClick(){
    
    let width = this.gameArea.current.offsetWidth*0.92; //to accommodate button width
    let height = this.gameArea.current.offsetHeight*0.95; //to accommodate button height

    let offsetLeft = this.gameArea.current.offsetLeft/2;
    let offsetTop = this.gameArea.current.offsetTop;

    let newDecoys = [];
    
    for (var i = 0; i <= this.state.decoysToAdd; i++){
      let randomTop = Math.floor(Math.random()*height) + offsetTop;
      let randomLeft = Math.floor(Math.random()*width) + offsetLeft;
      newDecoys.push(
        <Button 
          key={this.state.decoys.length + i} 
          text={this.state.decoyText} 
          handleClick={() => this.handleDecoyClick(i)}
          top={randomTop}
          left={randomLeft}
        />
      )
    }
    
    let target;

    this.setState({
      // decoys: this.state.decoys.concat(newDecoys), // for persistent decoys
      decoys: newDecoys, //for decoys that reset each time
      decoysToAdd: this.state.decoysToAdd+2,
      successfulClicks: this.state.successfulClicks+1,
      splitIndex: Math.floor(Math.random()*this.state.decoys.length+1),
      timerStarted: true,
      targetTop: Math.floor(Math.random()*height) + offsetTop,
      targetLeft: Math.floor(Math.random()*width) + offsetLeft,
    })

  }

  handleDecoyClick(){
    return;
  }

  handleSettingsClick(){
    this.setState({
      showSettings: true
    })
  }

  handleTargetTextChange(event) {
    console.log(event);
    this.setState({targetText: event.target.value});
  }

  handleDecoyTextChange(event) {
    this.setState({decoyText: event.target.value});
  }

  handleCloseSettingsClick() {
    this.setState({showSettings: false});
  }

  render(){
    if (this.state.showSettings){
      return (
      <div>
        <div ref={this.gameArea} class="gameContainer">
          <Form 
            label="Target Text" 
            inputType="text" 
            inputName="targetTextInput"
            value={this.state.targetText}
            onChange={(e)=>this.handleTargetTextChange(e)}>
          </Form>
          <Form 
            label="Decoy Text" 
            inputType="text" 
            inputName="decoyTextInput" 
            value={this.state.decoyText}
            onChange={(e)=>this.handleDecoyTextChange(e)}>  
          </Form>
        </div>
        <button onClick={()=>this.handleCloseSettingsClick()}>Close</button>
      </div>
      )
    }

    let targetButton = <Button 
                        text={this.state.targetText} 
                        handleClick={(i) => this.handleTargetClick(i)} 
                        top={this.state.targetTop}
                        left={this.state.targetLeft} 
                      />

    let targetAndDecoysDiv;
    if (this.state.randomMode){
      targetAndDecoysDiv = (
      <div>
        {this.state.decoys}
        {targetButton}
      </div>
      )
    } else {
      targetAndDecoysDiv = (
      <div>
        {this.state.decoys.slice(0, this.state.splitIndex)}
        {targetButton}
        {this.state.decoys.slice(this.state.splitIndex, this.state.decoys.length)}
      </div>
      )
    }

    return (
      <div>
        <button onClick={(i) => this.handleSettingsClick(i)} >Settings</button>
        <Timer tick={()=>this.tick()} timeStatus={this.state.timeStatus}/>
        <h2>Score: {this.state.successfulClicks}</h2>
        <div ref={this.gameArea} class="gameContainer">
          {targetAndDecoysDiv}
        </div>
      </div>
    )
    
  }
}


ReactDOM.render(
  <div>
    <Game/>
  </div>,
  
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
