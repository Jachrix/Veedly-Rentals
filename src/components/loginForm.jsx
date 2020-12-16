import React, { Component } from 'react';
import Input from './common/input';

class LoginForm extends Component {
    state = {
        account: { username: '', password: '' },
        error: {}
    };
    //username = React.createRef();
    
    // componentDidMount(){
    //     this.username.current.focus();
    // }
    
    validate = () => {
        return { username: 'Username id required.....'};
    }
    
    handleSubmit = e => {
        e.preventDefault();
        
        //const username = this.username.current.value;
        // ref ={this.username} as attribute in specified element
        
        const errors = this.validate();
        this.setState({ errors });
        if (errors) return;
        
        // call to the server
        console.log('form submitted ....');
    }
    
    handleChange = ({ currentTarget: input }) => {
        const account = {...this.state.account};
        account[input.name] = input.value;
        this.setState({ account });
    }
    
    render() {
        const { account } = this.state;
        
        return (
            <div>
                <h3>Login Form</h3>
                <form onSubmit={ this.handleSubmit } >
                    <Input 
                        name="username" 
                        value={ account.username } 
                        label="Username" 
                        onChange={ this.handleChange } 
                    />
                    <Input 
                        name="password" 
                        value={ account.password } 
                        label="Password" 
                        onChange={ this.handleChange } 
                    />
                    
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;