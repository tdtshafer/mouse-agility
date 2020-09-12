import React from 'react';
import Button from './Button';

class Game extends React.Component {
  
    constructor(props){
      super(props);
      this.gameArea = React.createRef();

      this.state = {
          decoysToAdd: 1,
          decoys: [],
          splitIndex: 0,
          targetLeft: 250,
          targetTop: 250,
      };
      
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
      let targetButton = (<Button 
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
          {targetAndDecoysDiv}
        </div>
      )
      
    }
  }

export default Game;