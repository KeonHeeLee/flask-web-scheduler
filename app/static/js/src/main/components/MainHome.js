import '@babel/polyfill';
import React, { Component } from 'react';
import axios from 'axios';
import { Map } from 'immutable';
import { Navbar, Nav, Spinner  } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as todoActions from '../../store/modules/reducers/TodoActions'
import { connect } from 'react-redux';
import LogoutBtn from './user/LogoutBtn';
import TodoHomeContainer from './TodoHome';
import GroupHome from './GroupHome';

class MainHome extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            selected: 'todo',
            onStart: false,
            data: Map({
                userId: '',
                userName: '',
                groupNum: 0,
                groupName: ''
            })
        }
    }

    handleOnStart = () => {
        this.setState({onStart: true});
    }

    handleOnUnstart = () => {
        this.setState({onStart: false});
    }

    onSelectedNavItem = (eventKey) => {
        this.setState({selected: eventKey});
    }

    setTodoTableInformation = async () => {
        const res = await axios.get('http://localhost:13609/user/whoami');
                
        const { user_id, user_name, group_num, group_name } = res.data;
        const { data } = this.state;

        this.setState({
            data: data.set('userId', user_id)
                    .set('userName', user_name)
                    .set('groupNum', group_num)
                    .set('groupName', group_name)
        });

        this.handleOnStart();
    }

    getSelectedView = () => {
        const { selected, data } = this.state;
        const userId = data.get('userId');
        const userName = data.get('userName');
        const groupNum = data.get('groupNum');
        const groupName = data.get('groupName');

        if(selected == "todo")
            return <TodoHomeContainer userId={userId} userName={userName} groupNum={groupNum}/>;
        else if(selected == "calendar")
            alert("개발 중입니다.");
        else if(selected == "groups")
            return <GroupHome user={userId} userName={userName} groupNum={groupNum} groupName={groupName}/>
        else // selectedItem == "myinfo"
            alert("개발 중입니다.");
    }

    getMainPage = () => {
        return (
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="/">Todo Scheduler</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link eventKey="todo" href="#todo" onSelect={this.onSelectedNavItem}>Todo List</Nav.Link>
                        <Nav.Link eventKey="calendar" href="#calendar" onSelect={this.onSelectedNavItem}>Calendar</Nav.Link>
                        <Nav.Link eventKey="groups" href="#groups" onSelect={this.onSelectedNavItem}>Groups</Nav.Link>
                        <Nav.Link eventKey="myinfo" href="#myinfo" onSelect={this.onSelectedNavItem}>My Info</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <LogoutBtn />
                    </Navbar.Collapse>
                </Navbar>

                {this.getSelectedView()}
            </div>
        );
    }

    componentDidMount = () => {
        this.setTodoTableInformation();
    }

    render = () => {
        const { onStart } = this.state;

        if(onStart) 
            return this.getMainPage();
        
        else 
            return <Spinner animation="border"/>;
    }
}

const MainHomeContainer = connect(
    (state) => ({

    }),
    (dispatch) => ({
        TodoActions: bindActionCreators(todoActions, dispatch)
    })
)(MainHome);

export default MainHomeContainer;