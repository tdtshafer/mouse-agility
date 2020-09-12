import React from 'react';

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

export default Timer;