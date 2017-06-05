import React, { Component } from 'react';
import { Header, Segment, Image, Item, Comment, Form, Button, Modal, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import AppBar from '../components/AppBar';
import config from '../config/config';

const majalah = require('../assets/majalah.jpg');
const furirin = require('../assets/furirin.jpg');
const suwawa = require('../assets/suwawa.jpg');
const rikyako = require('../assets/rikyako.jpg');
const items = ['Item 1', 'Item 2', 'Item 3'];

class Post extends Component {

    state = {
        picture: majalah,
        price: '',
        description: '',
        title: '',
        sold: false,
        creator: {
            firstname: '',
            lastname: '',
            email: ''
        }
    }

    componentWillMount() {
        this.getPostDetail();
    }

    getPostDetail() {
        console.log(this.props)
        fetch(config.SERVER_IP + '/api/post-detail', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': this.props.token
            },
            body: JSON.stringify({
                _id: this.props.postId
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            let price;
            responseJson.price = responseJson.price / 1000;
            price = responseJson.price+'.000';
            this.setState({
                price: price,
                description: responseJson.description,
                title: responseJson.title,
                sold: responseJson.sold,
                creator: responseJson._creator
            });
        })
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
                    <div style={styles.contentContainer}>
                        <div style={styles.title}>
                            <Header size='huge' dividing>{this.state.title}</Header>
                        </div>
                        <div style={styles.content}>
                            <div style={styles.left}>
                                <Segment attached>
                                    <Image src={majalah} />
                                </Segment>
                                <Segment attached>
                                    <Header as='h3'>Posted by</Header>
                                    <div style={styles.profile}>
                                        <div style={styles.sellerPicture}>
                                            <Image src={furirin} shape='circular' />
                                        </div>
                                        <div style={styles.sellerDetail}>
                                            <Header as='h4'>
                                                {this.state.creator.firstname+" "+this.state.creator.lastname}
                                            </Header>
                                            {this.state.creator.email}
                                        </div>
                                    </div>
                                </Segment>
                                <Segment attached='bottom'>
                                    <Modal trigger = {<Button primary fluid>Contact seller</Button>}>
                                        <Modal.Header>
                                            Message User
                                        </Modal.Header>
                                        <Modal.Content>
                                            <Form>
                                                <Form.TextArea />
                                            </Form>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button color='green'>
                                                <Icon name='send' /> Send
                                            </Button>
                                            <Button color='red' onClick={() => this.setState({ messageModalOpened: false })}>
                                                <Icon name='ban' /> Cancel
                                            </Button>
                                        </Modal.Actions>
                                    </Modal>
                                </Segment>
                            </div>
                            <div style={styles.right}>
                                <Segment>
                                    <Header dividing as='h1'>
                                        Rp. {this.state.price}
                                    </Header>
                                    <div style={styles.description}>
                                        Description: <br />
                                        {this.state.description}
                                    </div>
                                </Segment>
                                <div style={styles.comments}>
                                    <Comment.Group style={styles.commentGroup}>
                                        <Header as='h3' dividing>Comments</Header>
                                        <Comment>
                                            <Comment.Avatar src={rikyako} />
                                            <Comment.Content>
                                                <Comment.Author as='a'>Aida Rikako</Comment.Author>
                                                <Comment.Metadata>
                                                    <div>Today at 5:42PM</div>
                                                </Comment.Metadata>
                                                <Comment.Text>Wow! Finally this came out!</Comment.Text>
                                                <Comment.Actions>
                                                    <Comment.Action>Reply</Comment.Action>
                                                </Comment.Actions>
                                            </Comment.Content>
                                        </Comment>
                                        <Comment>
                                            <Comment.Avatar src={suwawa} />
                                            <Comment.Content>
                                                <Comment.Author as='a'>Suwa Nanaka</Comment.Author>
                                                <Comment.Metadata>
                                                    <div>Yesterday at 12:30AM</div>
                                                </Comment.Metadata>
                                                <Comment.Text>
                                                    <p>Thanks man! It arrived safely</p>
                                                </Comment.Text>
                                                <Comment.Actions>
                                                    <Comment.Action>Reply</Comment.Action>
                                                </Comment.Actions>
                                            </Comment.Content>
                                        </Comment>
                                        <Form reply>
                                            <Form.TextArea />
                                            <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                                        </Form>
                                    </Comment.Group>
                                </div>
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

    contentContainer: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        maxWidth: '80%'
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
    },

    profile: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row'
    },

    sellerPicture: {
        flex: 1
    },

    sellerDetail: {
        flexDirection: 'column',
        display: 'flex',
        flex: 3,
        justifyContent: 'center',
        marginLeft: 20
    },

    description: {
        marginTop: 20
    },

    comments: {
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
        marginTop: 20,
    },

    commentGroup: {
        width: '100%'
    }
}

const mapStateToProps = (state) => {
    return {
        postId: state.postId,
        token: state.token
    }
}

export default connect(mapStateToProps)(Post);