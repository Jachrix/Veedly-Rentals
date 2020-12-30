import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';


class RegisterForm extends Form {
    state = {
        data: { username: '', password: '', name: '' },
        errors: {}
    }
    
    schema = {
        username: Joi.string().required().email().label('Username'),
        password: Joi.string().min(5).required().label('Password'),
        name: Joi.string().min(3).required().label('Name')
    }
    
    doSubmit = () => {
         // call to the server
         console.log('form submitted ....');
    }
    
    render() { 
        return (
            <div>
                <h3>Register</h3>
                <form onSubmit={ this.handleSubmit } >
                    { this.renderInput("username", "Username")}
                    { this.renderInput("password", "Password", "password")}
                    { this.renderInput("name", "Name")}
                    { this.renderButton("Register") }                    
                </form>
            </div>
        );
    }
}
 
export default RegisterForm;