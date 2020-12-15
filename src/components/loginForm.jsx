import React, { Component } from 'react';

class LoginForm extends Component {
    state = {
        account: { username: '', password: '' }
    };
    //username = React.createRef();
    
    // componentDidMount(){
    //     this.username.current.focus();
    // }
    
    handleSubmit = e => {
        e.preventDefault();
        
        //const username = this.username.current.value;
        // ref ={this.username} as attribute in specified element
        
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
                <form onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input                              
                            autoFocus 
                            id="username"
                            name="username"
                            value={ account.username } 
                            type="text" 
                            className="form-control"
                            onChange={ this.handleChange }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            id="password"
                            name="password"
                            value={ account.password } 
                            type="text" 
                            className="form-control"
                            onChange={ this.handleChange }
                        />
                    </div>
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;