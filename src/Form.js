import React from 'react';

function Form(props) {
    return (
    <form>
        <label>
        {props.label}:
        <input
            value={props.value} 
            type={props.inputType} 
            name={props.inputName} 
            onChange={props.onChange}
        />
        </label>
    </form>
    )
}

export default Form;