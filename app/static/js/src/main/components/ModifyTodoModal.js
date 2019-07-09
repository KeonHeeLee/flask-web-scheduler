import { Button, Modal, ButtonGroup, Form } from 'react-bootstrap';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Axios from 'axios';

class ModifyTodoModal extends Component {

    constructor(props, context){
        super(props, context);

        this.defaultProps = {
            no: '',
            title: '',
            startDate: '',
            content: '',
            level: ''
        }

        this.state = {
            show: false,
            title: this.props.title,
            startDate: this.startDate,
            content: this.props.content,
            level: this.props.level
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleToggleChange = this.handleToggleChange.bind(this);
        this.submitModifyingTodoForm = this.submitModifyingTodoForm.bind(this);
    }

    handleClose(){
        this.setState({ show: false });
    }

    handleShow(){
        this.setState({ show: true });
    }

    handleTitleChange(event){
        this.setState({ title: event.target.value });
    }

    handleDateChange(date) {
        this.setState({ startDate: date });
    }

    handleContentChange(event){
        this.setState({ content: event.target.value });
    }

    handleToggleChange(event){
        this.setState({ level: event.target.value });
    }

    submitModifyingTodoForm(){
        const thisDate = new Date(this.state.startDate);

        const date_y = Number(thisDate.getFullYear());
        const date_m = Number(thisDate.getMonth() + 1);
        const date_d = Number(thisDate.getDate());

        const title = this.state.title;
        const body = this.state.content;
        const level = Number(this.state.level);

        Axios.post('http://localhost:13609/todo/modify', {
            no: this.props.no,
            title: title,
            date_y: date_y,
            date_m: date_m,
            date_d: date_d,
            body: body,
            level: level
        }).then((response)=>{
            alert(response.data.message);
            this.handleClose();
            location.reload();
        });
    }

    render(){
        return (
            <div>
                <Button variant="primary" onClick={this.handleShow}>수정</Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Todo#{this.props.no} 수정하기</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>제목</Form.Label>
                            <Form.Control type="text" placeholder="제목을 작성해주세요." onChange={this.handleTitleChange} value={this.props.title}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>일정</Form.Label>
                            <p>
                                <DatePicker
                                    dateFormat="yyyy.MM.dd"
                                    selected={this.state.startDate}
                                    onChange={this.handleDateChange}
                                    isClearable={true}
                                    value={this.props.startDate}
                                    placeholderText="Click to select a date"/>   
                            </p>                        
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>내용</Form.Label>
                            <Form.Control as="textarea" rows="5" onChange={this.handleContentChange} value={this.props.content}/>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlButtonGroup">
                            <Form.Label>작업 우선순위</Form.Label>
                            <p>
                                <ButtonGroup aria-label="Basic example">
                                    <Button variant="danger" value='1' onClick={this.handleToggleChange}>1</Button>
                                    <Button variant="warning" value='2' onClick={this.handleToggleChange}>2</Button>
                                    <Button variant="success" value='3' onClick={this.handleToggleChange}>3</Button>
                                    <Button variant="info" value='4' onClick={this.handleToggleChange}>4</Button>
                                    <Button variant="secondary" value='5' onClick={this.handleToggleChange}>5</Button>
                                </ButtonGroup>
                            </p>
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={this.submitModifyingTodoForm}>
                            작성완료
                        </Button>
                        <Button variant="secondary" onClick={this.handleClose}>
                            취소
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ModifyTodoModal;