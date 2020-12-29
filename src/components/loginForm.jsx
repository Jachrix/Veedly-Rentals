import React from 'react';
import Joi from 'joi-browser';
import Input from './common/input';
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
        const { data, errors } = this.state;
        
        return (
            <div>
                <h3>Login Form</h3>
                <form onSubmit={ this.handleSubmit } >
                    <Input 
                        name="username" 
                        value={ data.username } 
                        label="Username" 
                        onChange={ this.handleChange }
                        error={ errors.username } 
                    />
                    <Input 
                        name="password" 
                        value={ data.password } 
                        label="Password" 
                        onChange={ this.handleChange }
                        error={ errors.password } 
                    />
                    
                    <button disabled={ this.validate() } className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;