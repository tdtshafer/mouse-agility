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
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}

const decoys = []

class Decoy extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      targetText: props.targetText,
      text: props.text
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(){
    this.setState({
      text: "clicked"
    })

  }

  render(){
    return (
        <button onClick={this.handleClick}>
          {this.state.text}
        </button>
    )
  }
}


class Decoys extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      decoyList: [1,2,3,4,5],
    };
  };

  render(){
    let listOfDecoys = []

    for (const [index, value] of this.state.decoyList.entries()) {
      listOfDecoys.push(<Decoy text="decoy"/>)
    }
    
    return (
        <div>
          {listOfDecoys}
        </div>
      );
  };

  }


ReactDOM.render(
  <div>
    <Clock/>
    <Decoys/>
  </div>,
  
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
