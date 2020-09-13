import React from 'react';
import './App.css';

import Game from './Game';
import Settings from './Settings';
import Header from './Header';
import GameButton from './GameButton';


var INITIAL_CONFIG = {
  successfulClicks: 0, // user's score

  timerStarted: false,
  timeRemaining: 60, //time in seconds
  timeIsUp: false,

  randomMode: true,

  showSettings: false,
  showScore: true,

  targetText: "target",
  decoyText: "decoy",
  decoysPersist: false,
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = INITIAL_CONFIG;
    this.appArea = React.createRef()
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

  handleDecoysPersistCheckboxChange(event) {
    this.setState({decoysPersist: event.target.checked})
    INITIAL_CONFIG.decoysPersist = event.target.checked;
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
    INITIAL_CONFIG.showScore=false;
    this.setState(INITIAL_CONFIG);
  }

  tick() {
    if (this.state.timeRemaining < -2){
      this.setState({showScore: true})
      // this.setState(INITIAL_CONFIG);
    } else if (this.state.timeRemaining <= 0.0){
      this.setState({
        timeIsUp: true,
        timeRemaining: this.state.timerStarted ? 
                          Math.round((this.state.timeRemaining-0.1)*10)/10 : 
                          this.state.timeRemaining,
        timeStatus: "Time is up!",
      })
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
          handleDecoysPersistCheckboxChange={(e)=>this.handleDecoysPersistCheckboxChange(e)}
          targetText={this.state.targetText}
          decoyText={this.state.decoyText}
          decoysPersist={this.state.decoysPersist}
          randomMode={this.state.randomMode}
        />
      )
    } else if (this.state.showScore){
  
      let menuButtons = [];
      let labels = ["Instructions", "Play", "Settings"];
      var functions = [
        ()=>this.handleSettingsClick(), 
        ()=>this.handlePlayAgain(), 
        ()=>this.handleSettingsClick(),
      ];
      let tops = [49, 49, 49];
      let lefts = [26, 46, 66];
      
      for (var i=0; i<3; i++){

        menuButtons.push(
            <GameButton
              key={labels[i]} 
              text={labels[i]}
              className="button"
              handleClick={functions[i]}
              top={tops[i].toString() + 'vh'}
              left={lefts[i].toString() + 'vw'}
            />
        )
      }

      gameArea = (
        <div className="gameContainer">
          <Header 
            tick={() => this.tick()}
            successfulClicks={this.state.successfulClicks}
            timeStatus={this.state.timeStatus}
            handleSettingsClick={()=>this.handleSettingsClick()}
          />
          {menuButtons}
        </div>
      )
    } else {
      gameArea = (
        <Game
          handleTargetClickParent={()=>this.handleTargetClickParent()}
          targetText={this.state.targetText}
          decoyText={this.state.decoyText}
          decoysPersist={this.state.decoysPersist}
          successfulClicks={this.state.successfulClicks}
          randomMode={this.state.randomMode}
          tick={()=>this.tick()}
          timeStatus={this.state.timeStatus}
          timeRemaining={this.state.timeRemaining}
        />
      )
    }

    return (
      <div>
        {gameArea}
      </div>
    )
  }
}

export default App;
