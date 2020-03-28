import React from 'react'

import './styles.css'

export default ({message})=>{
    const buttons = [];

    if(typeof message == "object"){
        message.buttons && message.buttons.forEach(button=>{
            buttons.push(<button onClick={button.click}>{button.text}</button>)
        })
        message = message.message
    }

    return message && 
    (<div className="notify-body">
        <div className="notify-container">
            <p>{message}</p>
            <div className="buttons">{buttons}</div>
        </div>
     </div>)
}
