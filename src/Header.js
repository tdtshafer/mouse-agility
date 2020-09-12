import React from 'react';
import Timer from './Timer';

function Header(props) {
    return (
      <div className='header'>
        <Timer tick={()=>props.tick()} timeStatus={props.timeStatus}/>
        <h2 id='score'>Score: {props.successfulClicks}</h2>
      </div>
    )
  }

export default Header;