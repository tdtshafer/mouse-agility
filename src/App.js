import React from 'react';
import './App.css';

import Game from './Game';
import Settings from './Settings';
import Header from './Header';

var INITIAL_CONFIG = {
  successfulClicks: 0, // user's score

  timerStarted: false,
  gameTime: 5, //time in seconds
  timeRemaining: 5,
  timeIsUp: false,

  randomMode: true,

  showSettings: false,
  showScore: false,

  targetText: "target",
  decoyText: "decoy",
}

class App extends React.Component {
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

  handlePlayAgain(){
    this.setState(INITIAL_CONFIG);
  }

  tick() {
    if (this.state.timeRemaining < 0){
      this.setState({showScore: true})
      // this.setState(INITIAL_CONFIG);
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
    } else if (this.state.showScore){
      gameArea = (
        <div className="gameContainer">
          <button onClick={()=>this.handlePlayAgain()}>Play Again?</button>
        </div>
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

export default App;
