import React, { Component} from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import {getAllUsers, searchUser, updateQuote} from '../userservice.js'

import {withRouter} from '../Util/withRouter.js'

class About extends Component {
    state = {
        person: {
            picture: ''
        }
    }

    componentDidMount() {
        let state = this.props.router.location.state
        this.setState(state)

        searchUser(state.name).then(result => {
            this.setState({
                person: result[0]
            })
        })
    }

    renderItem(key, object) {
        let item = object[key]
        if(key == 'id' || key == 'picture'){
            return (<div></div>)
        }
        return (
            <div style={this.styles.row}>
                <div style={this.styles.subrow}>
                    {key}
                </div>
                <div style={this.styles.subrow}>
                    {item}
                </div>
            </div>
        );
    }

    changeQuote(){
        if(!this.state.name)
            return
        let quote = window.prompt("Enter a new quote","")
        updateQuote(this.state.name, quote)

        searchUser(this.state.name).then(result => {
            this.setState({
                person: result[0]
            })
        })
    }

    render() {
        return (
            <div style={this.styles.outer}>
                <div style={this.styles.title}>About page for {this.state.name}</div>
                <img src={this.state.person.picture} style={this.styles.img}/>
                {Object.keys(this.state.person).map(key => {
                    return this.renderItem(key, this.state.person)
                })}
                <Button variant="primary" onClick={() => {
                    this.changeQuote()
                }}>Change Quote</Button>
            </div>
        );
    }

    styles = {
        img: {
            overflow: 'hidden',
            maxHeight: '13rem',
            width: '20rem',
            objectFit: 'cover'
        },
        subrow: {
            display: 'flex',
            flex: 1,
            justifyContent: 'left',
            alignItems: 'left',
            width: '100%',
            flexWrap: 'wrap',
            flexShrink: 1
        },
        row: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            flexWrap: 'wrap',
            flexShrink: 1
        },
        outer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            width: '100%'
        },
        title: {
            fontSize: '3em'
        }
    }
}

export default withRouter(About)