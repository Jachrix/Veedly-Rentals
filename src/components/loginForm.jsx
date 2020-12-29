import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class LoginForm extends Form {
    state = {
        data: { username: '', password: '' },
        errors: { }
    };
    //username = React.createRef();
    
    // componentDidMount(){
    //     this.username.current.focus();
    // }
    
    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }
        
    doSubmit = () => {
         // call to the server
         console.log('form submitted ....');
    }
    
    render() {        
        return (
            <div>
                <h3>Login Form</h3>
                <form onSubmit={ this.handleSubmit } >
                    { this.renderInput("username", "Username")}
                    { this.renderInput("password", "Password", "password")}
                    { this.renderButton("Login") }                    
                </form>
            </div>
        );
    }
}

export default LoginForm;