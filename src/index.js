import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

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
  gameTime: 5, //time in seconds
  timeRemaining: 5.0,
  timeIsUp: false,
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

function Button(props){
  return <button onClick={props.handleClick}>{props.text}</button>
}

class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = INITIAL_CONFIG;
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

  
  handleTargetClick(i){
    
    let newDecoys = [];
    
    for (var i = 0; i <= this.state.decoysToAdd; i++){
      newDecoys.push(
        <Button 
          key={this.state.decoys.length + i} 
          text={this.state.decoyText} 
          handleClick={() => this.handleDecoyClick(i)} 
        />
      )
    }
    
    this.setState({
      decoys: this.state.decoys.concat(newDecoys),
      decoysToAdd: this.state.decoysToAdd+2,
      successfulClicks: this.state.successfulClicks+1,
      splitIndex: Math.floor(Math.random()*this.state.decoys.length+1),
      timerStarted: true,
    })

  }

  handleDecoyClick(){
    return;
  }

  render(){
    return (
      <div>
        <Timer tick={()=>this.tick()} timeStatus={this.state.timeStatus}/>
        <h>Score: {this.state.successfulClicks}</h>
        <div>
          {this.state.decoys.slice(0, this.state.splitIndex)}
          <Button text={this.state.targetText} handleClick={(i) => this.handleTargetClick(i)} />
          {this.state.decoys.slice(this.state.splitIndex, this.state.decoys.length)}
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
