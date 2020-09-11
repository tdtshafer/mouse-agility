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

  timerStarted: false,
  gameTime: 30, //time in seconds
  timeRemaining: 30.0,
  timeIsUp: false,

  randomMode: true,

  showSettings: false,

  targetText: "target",
  decoyText: "decoy",
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
        <h2 id="timer">{this.props.timeStatus}</h2>
    )
  }
}

function Header(props) {
  return (
    <div className='header'>
      <Timer tick={()=>props.tick()} timeStatus={props.timeStatus}/>
      <h2 id='score'>Score: {props.successfulClicks}</h2>
      <button id='settingsButton' onClick={(i) => props.handleSettingsClick(i)} >Settings</button>
    </div>
  )
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


class Screen extends React.Component {
  constructor(props){
    super(props);
    this.state = INITIAL_CONFIG;
    this.gameArea = React.createRef()
  }

  handleSettingsClick(){
    this.setState({
      showSettings: true
    })
  }

  handleTargetTextChange(event) {
    console.log(event);
    this.setState({targetText: event.target.value});
    INITIAL_CONFIG.targetText = event.target.value;
  }

  handleDecoyTextChange(event) {
    this.setState({decoyText: event.target.value});
    INITIAL_CONFIG.decoyText = event.target.value;
  }

  handleCloseSettingsClick() {
    this.setState({showSettings: false});
  }

  handleTargetClickParent(){
    this.setState({
      timerStarted: true,
      successfulClicks: this.state.successfulClicks+1,
    })
  }

  tick() {
    if (this.state.timeRemaining < 0){
      this.state.timeStatus = "Time is Up!";
      alert("Score: " + this.state.successfulClicks);
      this.setState(INITIAL_CONFIG);
    } else {
      this.state.timeStatus = "Time Remaining: " + this.state.timeRemaining + "s";
      this.setState({
        timeRemaining: this.state.timerStarted ? 
                          Math.round((this.state.timeRemaining-0.1)*10)/10 : 
                          this.state.timeRemaining,
        timeIsUp: this.state.timeRemaining <= 0.0,
      });
    }
  }


  render() {
    let gameArea;
    if (this.state.showSettings){
      gameArea = (
        <Settings
          handleCloseSettingsClick={()=>this.handleCloseSettingsClick()}
          handleTargetTextChange={(e)=>this.handleTargetTextChange(e)}
          handleDecoyTextChange={(e)=>this.handleDecoyTextChange(e)}
          targetText={this.state.targetText}
          decoyText={this.state.decoyText}
          randomMode={this.state.randomMode}
        />
      )
    } else {
      gameArea = (
        <Game
          handleTargetClickParent={()=>this.handleTargetClickParent()}
          targetText={this.state.targetText}
          decoyText={this.state.decoyText}
          successfulClicks={this.state.successfulClicks}
          randomMode={this.state.randomMode}
        />
      )
    }

    return (
      <div>
        <Header 
          tick={() => this.tick()}
          successfulClicks={this.state.successfulClicks}
          timeStatus={this.state.timeStatus}
          handleSettingsClick={()=>this.handleSettingsClick()}
        />
        {gameArea}
      </div>
    )
  }
}

class Settings extends React.Component {
  render() {
      return (
        <div>
          <div ref={this.gameArea} className="gameContainer">
            <Form 
              label="Target Text" 
              inputType="text" 
              inputName="targetTextInput"
              value={this.props.targetText}
              onChange={(e)=>this.props.handleTargetTextChange(e)}>
            </Form>
            <Form 
              label="Decoy Text" 
              inputType="text" 
              inputName="decoyTextInput" 
              value={this.props.decoyText}
              onChange={(e)=>this.props.handleDecoyTextChange(e)}>  
            </Form>
          </div>
          <button onClick={()=>this.props.handleCloseSettingsClick()}>Close</button>
        </div>
      )
    }
}

class Game extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
        decoysToAdd: 1,
        decoys: [],
        splitIndex: 0,
        targetLeft: 250,
        targetTop: 250,
    };
    this.gameArea = React.createRef()
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
      let key = this.props.successfulClicks.toString() + "." + i.toString(); // unique id
      newDecoys.push(
        <Button
          key={key} 
          text={this.props.decoyText} 
          handleClick={() => this.handleDecoyClick(key)}
          top={randomTop}
          left={randomLeft}
        />
      )
    }
    
    this.props.handleTargetClickParent();

    this.setState({
      // decoys: this.state.decoys.concat(newDecoys), // for persistent decoys
      decoys: newDecoys, //for decoys that reset each time
      decoysToAdd: this.state.decoysToAdd+2,
      splitIndex: Math.floor(Math.random()*this.state.decoys.length+1),
      targetTop: Math.floor(Math.random()*height) + offsetTop,
      targetLeft: Math.floor(Math.random()*width) + offsetLeft,
    })
  }

  removeDecoy(decoy){
    console.log(decoy);
    console.log(this); // the key
    return decoy.key !== this;
  }

  handleDecoyClick(key){
    this.setState({
      decoys: this.state.decoys.filter(this.removeDecoy, key)
    })
    return;
  }

  render(){
    let targetButton = <Button 
                        text={this.props.targetText} 
                        handleClick={(i) => this.handleTargetClick(i)} 
                        top={this.state.targetTop}
                        left={this.state.targetLeft} 
                      />

    let targetAndDecoysDiv;
    if (this.props.randomMode){
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
      <div ref={this.gameArea} className="gameContainer">
        {targetAndDecoysDiv}
      </div>
    )
    
  }
}

ReactDOM.render(
  <div>
    <Screen/>
  </div>,
  
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
