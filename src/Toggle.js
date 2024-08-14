
import React, { useState } from 'react';


export default function  Toggle(){
    const [isOn,SetIsOn]=useState(false);

    
    
    return (
        <button onClick={() => isOn ? SetIsOn(false) : SetIsOn(true)}>
      <div> {isOn ? "On" : "Off"}</div>
      </button>
    )
}