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



class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {timeRemaining: 30.0};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      100
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      timeRemaining: Math.round((this.state.timeRemaining-0.1)*10)/10,
    });
  }

  render() {
    let timeStatus;
    if (this.state.timeRemaining < 0){
      timeStatus = "Time is Up!"
    } else {
      timeStatus = "Time Remaining:" + this.state.timeRemaining + "s"
    }
    return (
      <div>
        <h2>{timeStatus}</h2>
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
    this.state = {
      successfulClicks: 0,
      decoysToAdd: 1,
      decoys: [],
      decoyText: "decoy",
      targetText: "target",
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
    })
  }

  handleDecoyClick(i){
    return;
  }

  render(){
    let splitIndex = Math.floor(Math.random()*this.state.decoys.length+1);

    return (
    <div>
      <h>Score: {this.state.successfulClicks}</h>
      <div>
        {this.state.decoys.slice(0, splitIndex)}
        <Button text={this.state.targetText} handleClick={(i) => this.handleTargetClick(i)} />
        {this.state.decoys.slice(splitIndex, this.state.decoys.length)}
      </div>
    </div>
    )
    
  }
}

ReactDOM.render(
  <div>
    <Clock/>
    <Game/>
  </div>,
  
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
