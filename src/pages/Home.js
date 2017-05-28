import React, { Component } from 'react';
import AppBar from '../components/AppBar';
import { Segment, Header, Input, Button, Divider, Modal, Form, Icon, Image, Dimmer, Loader } from 'semantic-ui-react';
import '../App.css';
import { Link } from 'react-router-dom';
import config from '../config/config';

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

export default class Home extends Component {

    state = {
        isRegistering: false
    }

    register() {
        this.setState({ isRegistering: true });
        return fetch('http://192.168.88.21:8000/register', {
            method: 'POST',
            body: JSON.stringify({
                firstname: this.firstname.value,
                lastname: this.lastname.value,
                username: this.username.value,
                email: this.email.value,
                password: this.password.value
            })
        }).then((response) => {
            if (response.status == 200){
                this.setState = ({isRegistering: false})
            } else {
                console.log(response.status);
            }
        })
    }

    render() {
        return (
            <div>
                <div>
                    <AppBar
                        menus={items}
                    />
                </div>
                <div style={styles.container}>
                    <div style={styles.content}>
                        <div style={styles.left}>
                            <div style={styles.logo}>
                                <Image src={logo} />
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
                                Login
                            </Header>
                            <Segment attached color='red'>
                                <Input icon='user' iconPosition='left' fluid placeholder='Username' />
                                <br />
                                <Input icon='privacy' iconPosition='left' fluid placeholder='Password' type='password' />
                                <br />
                                <Link to='/profile'><Button primary fluid>Login</Button></Link>
                                <Divider horizontal>OR</Divider>
                                <Modal trigger={<Button secondary fluid>Register</Button>}>
                                    <Modal.Header>
                                        Register
                                    </Modal.Header>
                                    <Modal.Content>
                                        <Dimmer active={this.state.isRegistering}>
                                            <Loader>Registering</Loader>
                                        </Dimmer>
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