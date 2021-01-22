import React from 'react'

const Button = props =>  { 
    return(        
        <button id={props.id} onClick={props.btnFunk}>{props.btnName}</button>
        
    )          
}

export default Button