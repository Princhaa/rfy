import React, { Component } from 'react';
import { Header, Menu, Label } from 'semantic-ui-react';

import AppBar from '../components/AppBar';
import PendingPosts from '../components/PendingPosts';
import UsersList from '../components/UsersList';

const items = ['Item 1', 'Item 2', 'Item 3'];
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
        flex: 3,
    },

    right: {
        flex: 9,
        marginLeft: 20,
        width: '100%'
    }
}

export default class Dashboard extends Component {

    state = {
        activeItem: 'posts'
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    getContent() {
        switch (this.state.activeItem) {
            case 'posts': return <PendingPosts style={styles.right} />
            case 'users': return <UsersList style={styles.right} />
        }
    }

    render() {
        const { activeItem } = this.state;
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
                            <Header size='huge' dividing>Dashboard</Header>
                        </div>
                        <div style={styles.content}>
                            <div style={styles.left}>
                                <Menu vertical fluid pointing>
                                    <Menu.Item name='posts' active={activeItem === 'posts'} onClick={this.handleItemClick}>
                                        Pending posts
                                    </Menu.Item>
                                    <Menu.Item name='users' active={activeItem === 'users'} onClick={this.handleItemClick}>
                                        Users list
                                    </Menu.Item>
                                </Menu>
                            </div>
                            {this.getContent()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}