import React, { Component, PropTypes } from 'react';
import { Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { setLoginState } from '../service/action';
import store from '../service/store';

class AppBar extends Component {

    static propTypes = {
        menus: PropTypes.array
    }

    getContent() {
        return this.props.menus.map((menu, i) => {
            return (
                <a className='item' style={styles.menuItem} key={i} onClick={() => { alert(menu) }}>
                    {menu}
                </a>
            )  
            }   
        )
    }

    logout() {
        store.dispatch(setLoginState('logged_out'));
        this.props.history.push('/');
    }

    getButton(){
        if (this.props.loginState == 'logged_in'){
            return(
                <div>
                    <Link to='/dashboard'><Button color='orange'>Dashboard</Button></Link>
                    <Button negative onClick = {() => this.logout()}>Logout</Button>
                </div>
            )
        } else {
            return(
                null
            )
        }
    }

    render() {
        let date = new Date();
        return (
            <div style={styles.container}>
                <div headers style={styles.headers}>
                    <div style={styles.redBar} />
                    <div style={styles.menu}>
                        {this.getContent()}
                        <div style={styles.buttons}>
                            {this.getButton()}
                            {date.getDate()}-
                            {date.getMonth()}- 
                            {date.getFullYear()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const styles = {
    container: {
        position: 'absolute',
        top: 0,
        height: 50,
        width: '100%',
        backgroundColor: 'white'
    },

    redBar: {
        backgroundColor: '#ef5950',
        height: 5,
        position: 'absolute',
        width: '100%',
        top: 0,
    },

    headers: {
        height: 70,
        backgroundColor: '#F0F0F0',
        boxShadow: '0 4px 20px -7px gray'
    },

    menu: {
        display: 'flex',
        flex: 1,
        position: 'absolute',
        marginTop: -5,
        top: 0,
        height: 50,
        paddingLeft: 40,
        flexDirection: 'row',
        width: '100%'
    },

    menuItem: {
        color: 'black',
        marginLeft: 20,
        display: 'flex',
        width: 70,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        cursor: 'pointer'
    },

    buttons: {
        display: 'flex',
        width: '100%',
        height: 75,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 20,
        marginTop: 5
    },

    active: {
        background: 'linear-gradient(to bottom, rgba(120,120,120, 0.3) , transparent)'
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return{
        loginState: state.loginState
    }
}

export default connect(mapStateToProps)(AppBar);