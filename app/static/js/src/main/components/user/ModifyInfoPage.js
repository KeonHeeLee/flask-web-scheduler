import React, { Component } from 'react';
import { Form, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';

import ModifyInfoForm from './ModifyInfo/ModifyInfoForm';

class ModifyInfoPage extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            visible: true,
            isAuth: false,
            password: ''
        }
    }

    showForms = () => {
        this.setState({visible: true});
    }

    loadingForms = () => {
        this.setState({visible: false});
    }

    setAuth = () => {
        this.setState({isAuth: true});
    }

    handleChangePwd = (e) => {
        this.setState({password: e.target.value});
    }

    onClickAuthBtn = async () => {
        const { password } = this.state;

        const response = await axios.post('http://localhost:13609/info/check', {
                                        password: password});

        const { code, message } = response.data;

        if(code == 200){
            this.setAuth();
            this.showForms();
        } 
        else {
            alert(message);
            this.showForms();
        }
    }

    drawAuthForm = () => {
        return (
            <div>
                <hr />
                <h4>비밀번호를 입력해주세요.</h4>
                <p>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>PW</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChangePwd}/>
                    </Form.Group>
                    <br/>
                    <Button variant="primary" onClick={this.onClickAuthBtn}>제출</Button>
                </p>
                <hr />
            </div>
        );
    }

    render = () => {
        const { isAuth, visible } = this.state;

        if(!visible)
            return <Spinner animation="border"/>;

        else {
            if(!isAuth)
                return this.drawAuthForm();
            
            else
                return <ModifyInfoForm userId={this.props.userId}/>;
        }
    }
}

export default ModifyInfoPage;