import React from 'react';
import Form from './Form';

class Settings extends React.Component {
    render() {
        return (
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
            <button onClick={()=>this.props.handleCloseSettingsClick()}>Close</button>
          </div>
        )
      }
  }

export default Settings;