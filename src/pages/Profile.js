import React, { Component } from 'react';
import AppBar from '../components/AppBar';
import { Segment, Header, Image, Button, Form, Card, Input, Item, Label, Modal, Icon } from 'semantic-ui-react';

const items = ['Item 1', 'Item 2', 'Item 3'];
const furirin = require('../assets/furirin.jpg');
const majalah = require('../assets/majalah.jpg')
const suwawa = require('../assets/suwawa.jpg');
const rikyako = require('../assets/rikyako.jpg');

export default class Profile extends Component {

    state = {
        isProfileEditable: false,
        firstName: 'Furihata'
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
                    <div style={styles.contentContainer}>
                        <div style={styles.title}>
                            <Header size='huge' dividing>Profile</Header>
                            Edit your profile
                        </div>
                        <div style={styles.content}>
                            <div style={styles.left}>
                                <Segment attached>
                                    <Image src={furirin} size='medium' shape='circular' />
                                    <Header as='h2'>Ai</Header>
                                    Furihata
                                </Segment>
                                <Segment attached='bottom'>
                                    <Modal trigger = {<Button primary fluid>Change profile picture</Button>}>
                                        <Modal.Header>
                                            Change profile picture
                                        </Modal.Header>
                                        <Modal.Content>
                                            <Button>Pick profile picture</Button>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button color='green'>
                                                <Icon name='checkmark' /> Upload
                                            </Button>
                                            <Button color='red'>
                                                <Icon name='ban' /> Cancel
                                            </Button>
                                    </Modal.Actions>
                                    </Modal>
                                </Segment>
                                <Header as = 'h4' attached = 'top'>
                                    Latest Messages
                                </Header>
                                <Segment attached>
                                    <Item.Group divided>
                                        <Item>
                                            <Item.Image size='tiny' src={rikyako} shape = 'circular'/>
                                            <Item.Content>
                                                <Item.Header>Aida Rikako</Item.Header>
                                                <Item.Meta>
                                                    <div>Young Weekly Jump</div>
                                                </Item.Meta>
                                                <Item.Description>Gan bisa kurang ga?</Item.Description>
                                            </Item.Content>
                                        </Item>
                                        <Item>
                                            <Item.Image size='tiny' src={suwawa} shape = 'circular'/>
                                            <Item.Content>
                                                <Item.Header>Suwa Nanaka</Item.Header>
                                                <Item.Meta>
                                                    <div>Young Weekly Jump Gold</div>
                                                </Item.Meta>
                                                <Item.Description>Gan pesen 10</Item.Description>
                                            </Item.Content>
                                        </Item>
                                    </Item.Group>
                                </Segment>
                            </div>
                            <div style={styles.right}>
                                <Header as='h2' attached='top'>Personal data</Header>
                                <Segment attached clearing>
                                    <Form>
                                        <Form.Field>
                                            <label>First Name</label>
                                            <input placeholder='First Name' defaultValue = {this.state.firstName} disabled = {!this.state.isProfileEditable} onChange = {(value) => this.setState({firstName: value})}/>
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Last Name</label>
                                            <input placeholder='Last Name' defaultValue='Ai' disabled = {!this.state.isProfileEditable} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Username</label>
                                            <input placeholder='Username' defaultValue='fururin' disabled = {!this.state.isProfileEditable} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Password</label>
                                            <input placeholder='Password' type='password' defaultValue='fururin123' disabled = {!this.state.isProfileEditable} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Phone Number</label>
                                            <input placeholder='Phone Number' defaultValue='+817739200492' disabled = {!this.state.isProfileEditable} />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Email</label>
                                            <input placeholder='Email' type='email' defaultValue='furihataai32@gmail.com' disabled = {!this.state.isProfileEditable} />
                                        </Form.Field>
                                    </Form>
                                    <div style={styles.buttonContainer}>
                                        {(this.state.isProfileEditable) ? 
                                            <div>
                                                <Button negative floated='right' onClick = {() => this.setState({isProfileEditable: !this.state.isProfileEditable})}>Cancel</Button> 
                                                <Button positive floated='right' onClick = {() => this.setState({isProfileEditable: !this.state.isProfileEditable})}>Save changes</Button>
                                            </div>
                                            : 
                                            <Button primary floated='right' onClick = {() => this.setState({isProfileEditable: !this.state.isProfileEditable})}>Edit profile</Button>}
                                    </div>
                                </Segment>
                                <Header as='h2' attached='top'>Post List</Header>
                                <Segment attached>
                                    <div style={{ marginBottom: 20 }}>
                                        <Input icon='search' fluid placeholder='Search' />
                                    </div>
                                    <div>
                                        <Card.Group>
                                            <Card>
                                                <Image src={majalah} />
                                                <Card.Content>
                                                    <Card.Header>
                                                        Young Weekly Jump
                                                    </Card.Header>
                                                    <Card.Meta>
                                                        <span className='date'>
                                                            Rp. 200.000,-
                                                        </span>
                                                    </Card.Meta>
                                                    <Card.Description>
                                                        Featuring Aqours voice actress
                                                    </Card.Description>
                                                </Card.Content>
                                            </Card>
                                            <Card>
                                                <Image src={majalah} />
                                                <Card.Content>
                                                    <Card.Header>
                                                        Young Weekly Jump Gold Edition
                                                    </Card.Header>
                                                    <Card.Meta>
                                                        <span className='date'>
                                                            Rp. 500.000,-
                                                        </span>
                                                    </Card.Meta>
                                                    <Card.Description>
                                                        Featuring Aqours voice actress and more
                                                    </Card.Description>
                                                </Card.Content>
                                            </Card>
                                            <Card>
                                                <Image src={majalah} />
                                                <Card.Content>
                                                    <Card.Header>
                                                        Young Weekly Jump
                                                    </Card.Header>
                                                    <Card.Meta>
                                                        <span className='date'>
                                                            Rp. 200.000,-
                                                        </span>
                                                    </Card.Meta>
                                                    <Card.Description>
                                                        Featuring Aqours voice actress
                                                    </Card.Description>
                                                </Card.Content>
                                            </Card>
                                            <Card>
                                                <Image src={majalah} />
                                                <Card.Content>
                                                    <Card.Header>
                                                        Young Weekly Jump Gold Edition
                                                    </Card.Header>
                                                    <Card.Meta>
                                                        <span className='date'>
                                                            Rp. 500.000,-
                                                        </span>
                                                    </Card.Meta>
                                                    <Card.Description>
                                                        Featuring Aqours voice actress and more
                                                    </Card.Description>
                                                </Card.Content>
                                            </Card>
                                            <Card>
                                                <Image src={majalah} />
                                                <Card.Content>
                                                    <Card.Header>
                                                        Young Weekly Jump
                                                    </Card.Header>
                                                    <Card.Meta>
                                                        <span className='date'>
                                                            Rp. 200.000,-
                                                        </span>
                                                    </Card.Meta>
                                                    <Card.Description>
                                                        Featuring Aqours voice actress
                                                    </Card.Description>
                                                </Card.Content>
                                            </Card>
                                            <Card>
                                                <Image src={majalah} />
                                                <Card.Content>
                                                    <Card.Header>
                                                        Young Weekly Jump Gold Edition
                                                    </Card.Header>
                                                    <Card.Meta>
                                                        <span className='date'>
                                                            Rp. 500.000,-
                                                        </span>
                                                    </Card.Meta>
                                                    <Card.Description>
                                                        Featuring Aqours voice actress and more
                                                    </Card.Description>
                                                </Card.Content>
                                            </Card>
                                            <Card>
                                                <Image src={majalah} />
                                                <Card.Content>
                                                    <Card.Header>
                                                        Young Weekly Jump
                                                    </Card.Header>
                                                    <Card.Meta>
                                                        <span className='date'>
                                                            Rp. 200.000,-
                                                        </span>
                                                    </Card.Meta>
                                                    <Card.Description>
                                                        Featuring Aqours voice actress
                                                    </Card.Description>
                                                </Card.Content>
                                            </Card>
                                            <Card>
                                                <Image src={majalah} />
                                                <Card.Content>
                                                    <Card.Header>
                                                        Young Weekly Jump Gold Edition
                                                    </Card.Header>
                                                    <Card.Meta>
                                                        <span className='date'>
                                                            Rp. 500.000,-
                                                        </span>
                                                    </Card.Meta>
                                                    <Card.Description>
                                                        Featuring Aqours voice actress and more
                                                    </Card.Description>
                                                </Card.Content>
                                            </Card>
                                        </Card.Group>
                                    </div>
                                </Segment>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        flex: 1,
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonContainer: {
        marginTop: 20
    },

    contentContainer: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        maxWidth: '80%'
    },

    title: {
        flex: 1,
        marginBottom: 20,
        paddingLeft: 10
    },

    content: {
        display: 'flex',
        flex: '1',
        flexDirection: 'row',
        padding: 20
    },

    left: {
        flex: 3
    },

    right: {
        flex: 9,
        marginLeft: 20,
        width: '100%'
    }
}