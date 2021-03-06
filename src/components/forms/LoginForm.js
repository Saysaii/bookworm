import React from 'react';
import { Form, Button } from "semantic-ui-react";
import Validator from "validator";
import InlineError from "../messages/InlineError";
import PropTypes from "prop-types"

class LoginForm extends React.Component {
    state = {
        data: {
            email: "",
            password: ""
        },
        loading: false,
        errors: {}
    };

    onChange = e => this.setState(
        { data: { ...this.state.data, [e.target.name]: e.target.value } }
    );
    onSubmit = () =>{
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0){
            this.props.submit(this.state.data);
        }
    }

    validate = (data )=>{
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "invalid email";
        if (!data.password) /*means its empty */ errors.password = "Can't be blank";  
        return errors;
    }

    render() {
        const { data, errors } = this.state; //deconstructs value. else i would need to write this.state.data.email into value
        return (                            
            <Form onSubmit={this.onSubmit}>
                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="yolo"
                        value={data.email}
                        onChange={this.onChange}
                    />
                    {errors.email && <InlineError text={errors.email}/>}
                </Form.Field>
                <Form.Field error={!!errors.password}>
                    <label htmlFor="email">email</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="death awaits"
                        value={data.password}
                        onChange={this.onChange}
                    />
                    {errors.password && <InlineError text={errors.password}/>}
                </Form.Field>
                <Button primary>Login  </Button>
            </Form>
        );


    }
}

LoginForm.protoTypes = {
    submit: PropTypes.func.isRequired
}

export default LoginForm