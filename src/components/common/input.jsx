import React from 'react';

const Input = ({name, label, value, onChange }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{ label }</label>
            <input
                id={name}
                name={name}
                value={ value } 
                type="text" 
                className="form-control"
                onChange={ onChange }
            />
        </div>);
}
 
export default Input;