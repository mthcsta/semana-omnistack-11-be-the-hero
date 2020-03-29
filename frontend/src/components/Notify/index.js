import React, { useState } from 'react'

import './styles.css'

export function useNotify(text=null){
    const [message, push] = useState(text)
    return {message, push}
}

export default ({message})=>{

    const buttons = [];

    if(typeof message == "object" && message != null){
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
