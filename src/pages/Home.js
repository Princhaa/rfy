import React, { Component } from 'react';
import { Segment, Header, Input, Button, Divider, Modal, Form, Icon, Image, Dimmer, Loader, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import config from '../config/config';
import AppBar from '../components/AppBar';
import '../App.css';
import store from '../service/store';
import { setLoginState } from '../service/action';

const furirin = require('../assets/furirin.jpg');
const items = ['Item 1', 'Item 2', 'Item 3'];
const logo = require('../assets/logo.png');

const styles = {
    container: {
        display: 'flex',
        flex: 1,
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    content: {
        display: 'flex',
        flex: '1',
        flexDirection: 'row',
        maxWidth: '80%'
    },

    left: {
        flex: 10,
        marginRight: 20,
    },

    logo: {
        marginBottom: 20,
        display: 'flex',
        width: '100%',
        flex: 1,
        justifyContent: 'center'
    },

    right: {
        flex: 3,
        marginLeft: 20
    }
}

class Home extends Component {

    state = {
        isRegistering: false,
        username: '',
        password: '',
        loginMessage: false
    }

    register() {
        this.setState({ isRegistering: true });
        fetch('http://192.168.88.21:8000/register', {
            method: 'POST',
            body: JSON.stringify({
                firstname: this.firstname.value,
                lastname: this.lastname.value,
                username: this.username.value,
                email: this.email.value,
                password: this.password.value
            })
        }).then((response) => {
            if (response.status == 200) {
                this.setState = ({ isRegistering: false })
            } else {
                console.log(response.status);
            }
        })
    }

    async login() {
        console.log(this.state)
        this.setState({ isRegistering: true });
        fetch('http://localhost:12345/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then((response) => {
                console.log(response.status);
                if (response.status == 200) return response.json();
            })
            .then((responseJson) => {
                if (responseJson != undefined) {
                    console.log(responseJson);
                    this.setState({ isRegistering: false });
                    store.dispatch(setLoginState('logged_in'));
                    this.props.history.push('/profile');
                }
                else {
                    this.setState({ isRegistering: false, loginMessage: true });
                }
            }).catch(console.log)
    }

    getHomeForm() {
        if (this.props.loginState == 'logged_in') {
            return (
                <Segment attached>
                    <Image src={furirin} size='medium' shape='circular' />
                    <Header as='h2'>Furihata Ai</Header>
                    <Button fluid primary>Edit profile</Button>
                </Segment>
            )
        } else {
            return (
                <Segment attached color='red'>
                    <Input icon='user' iconPosition='left' fluid placeholder='Username' onChange={(e) => this.setState({ username: e.target.value })} />
                    <br />
                    <Input icon='privacy' iconPosition='left' fluid placeholder='Password' type='password' onChange={(e) => this.setState({ password: e.target.value })} />
                    <br />
                    <Button primary fluid onClick={() => this.login()}>Login</Button>
                    <Message negative floating hidden={!this.state.loginMessage}>
                        <Message.Header>Login failed</Message.Header>
                        <p>Please check your username and password</p>
                    </Message>
                    <Divider horizontal>OR</Divider>
                    <Modal trigger={<Button secondary fluid>Register</Button>}>
                        <Modal.Header>
                            Register
                        </Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Field>
                                    <label>First Name</label>
                                    <input placeholder='First name' ref={(firstname) => this.firstname = firstname} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Last Name</label>
                                    <input placeholder='Last name' ref={(lastname) => this.lastname = lastname} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Username</label>
                                    <input placeholder='Username' ref={(username) => this.username = username} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Email</label>
                                    <input placeholder='Email' ref={(email) => this.email = email} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Password</label>
                                    <input placeholder='Password' type='password' ref={(password) => this.password = password} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Confirm password</label>
                                    <input placeholder='Confirm password' type='password' />
                                </Form.Field>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='green' onClick={() => this.register()}>
                                <Icon name='checkmark' /> Register
                                        </Button>
                            <Button color='red'>
                                <Icon name='ban' /> Cancel
                                         </Button>
                        </Modal.Actions>
                    </Modal>
                </Segment>
            )
        }
    }

    render() {
        return (
            <div>
                <div>
                    <AppBar
                        menus={items}
                        history={this.props.history}
                    />
                </div>
                <div style={styles.container}>
                    <Dimmer active={this.state.isRegistering}>
                        <Loader>Registering</Loader>
                    </Dimmer>
                    <div style={styles.content}>
                        <div style={styles.left}>
                            <div style={styles.logo}>
                                <div>
                                    <Image src={logo} />
                                </div>
                            </div>
                            <Input icon='search' fluid placeholder='Search' />
                            <Header dividing>
                                Featured Products
                            </Header>
                            <Segment color='red'>
                                Lorem ipsum dolor sit amet
                            </Segment>
                        </div>
                        <div style={styles.right}>
                            <Header as='h3' attached='top'>
                                {this.props.loginState == 'logged_in' ? 'Profile' : 'Login'}
                            </Header>
                            {this.getHomeForm()}
                            <Segment>
                                Lorem ipsum dolor sit amet
                            </Segment>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginState: state.loginState
    }
}

export default connect(mapStateToProps)(Home);