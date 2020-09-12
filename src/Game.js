import React from 'react';
import GameButton from './GameButton';
import Header from './Header';

class Game extends React.Component {
  
    constructor(props){
      super(props);
      this.buttonLeftAdjust = 91;
      this.buttonTopAdjust = 95;
      this.state = {
          decoysToAdd: 1,
          decoys: [],
          splitIndex: 0,
          targetLeft: "44vw",
          targetTop: "49vh",
      };
      
    }
  
    handleTargetClick(){
  
      let newDecoys = [];
      for (var i = 0; i <= this.state.decoysToAdd; i++){
        let key = this.props.successfulClicks.toString() + "." + i.toString(); // unique id
        newDecoys.push(
          <GameButton
            key={key} 
            text={this.props.decoyText} 
            handleClick={() => this.handleDecoyClick(key)}
            top={(Math.random()*this.buttonTopAdjust).toString() + "vh"}
            left={(Math.random()*this.buttonLeftAdjust).toString() + "vw"}
          />
        )
      }
      
      this.props.handleTargetClickParent();
  
      this.setState({
        // decoys: this.state.decoys.concat(newDecoys), // for persistent decoys
        decoys: newDecoys, //for decoys that reset each time
        decoysToAdd: this.state.decoysToAdd+2,
        splitIndex: Math.floor(Math.random()*this.state.decoys.length+1),
        targetTop:(Math.random()*this.buttonTopAdjust).toString() + "vh",
        targetLeft: (Math.random()*this.buttonLeftAdjust).toString() + "vw",
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
      let targetButton = (<GameButton 
                          text={this.props.targetText} 
                          handleClick={(i) => this.handleTargetClick(i)}
                          top={this.state.targetTop}
                          left={this.state.targetLeft}
                        />)
  
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
          <Header 
            tick={() => this.props.tick()}
            successfulClicks={this.props.successfulClicks}
            timeStatus={this.props.timeStatus}
            handleSettingsClick={()=>this.handleSettingsClick()}
          />
          {targetAndDecoysDiv}
        </div>
      )
      
    }
  }

export default Game;