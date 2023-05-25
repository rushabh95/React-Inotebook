import React from 'react'

export default function Alert(props) {
    const capitalize =(word)=>{
        if(word==="danger"){
            word = "error"
        }
        console.log(word.toLowerCase())
        const lower = word.toLowerCase()
        return  lower.charAt(0).toUpperCase() + lower.slice(1)
    }
    return (
        props.alert && <div className={`alert alert-${props.alert.type?props.alert.type:props.alert.msg.type} alert-dismissible fade show`} role="alert">
           <strong>{capitalize(props.alert.msg.type?props.alert.msg.type:props.alert.type)}</strong>: {props.alert.msg.msg?props.alert.msg.msg:props.alert.msg}
        </div>
    )
}