import React from 'react';
import Form from './Form';

class Settings extends React.Component {
    render() {
        return (
            <div className="gameContainer">
                <div className="settingsContainer">
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
                    <input 
                        type="checkbox" 
                        id="decoysPersist" 
                        name="decoysPersist" 
                        checked={this.props.decoysPersist}
                        onChange={(e)=>this.props.handleDecoysPersistCheckboxChange(e)}
                        ></input>
                    <label> Decoys Persist</label>
                    <br></br>
                    <button onClick={()=>this.props.handleCloseSettingsClick()}>Close</button>
                </div>
          </div>
        )
      }
  }

export default Settings;