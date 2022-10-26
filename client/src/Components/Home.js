import React, { Component} from 'react';

import {useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import {getAllUsers, searchUser, updateQuote} from '../userservice.js'
import {withRouter} from '../Util/withRouter.js'

class Home extends Component {
    state = {
        data: [],
        offset: 0
    }

    componentDidMount(){
        getAllUsers().then(
          result => {
            console.log('result', result)
            this.setState({
              data: result
            })
          }
        )
    }

    nextPath(path, name) {
        this.props.router.navigate(path, {state: {name}});
    }

    renderItem(item){
        return (
            <Card style={this.styles.card}>
                <Card.Img variant="top" src={item.picture} style={this.styles.img}/>
                <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                    {item.quote}
                </Card.Text>
                <Button variant="primary" onClick={() => {
                    this.nextPath('/about', item.name)
                }}>View Profile</Button>
                </Card.Body>
            </Card>
        );
    }

    prev10(){
        let newOffset = this.state.offset - 10

        newOffset = Math.max(newOffset, 0)

        getAllUsers(newOffset).then(
            result => {
              console.log('result', result)
              this.setState({
                data: result,
                offset: newOffset
              })
            }
          )
    }

    next10(){
        getAllUsers(this.state.offset + 10).then(
            result => {
              console.log('result', result)
              this.setState({
                data: result,
                offset: this.state.offset + 10
              })
            }
          )
    }

    render() {
        return (
          <div style={this.styles.list}>
          {this.state.data.map(this.renderItem, this)}
          <br></br>
          <Button variant="primary" onClick={() => {
                this.prev10()
            }}>Prev</Button>
          <Button variant="primary" onClick={() => {
                this.next10()
            }}>Next</Button>
          </div>
        );
    }

    styles = {
        list: {
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center'
        },
        card: {
          width: '18rem',
          margin: '2rem'
        },
        img: {
          overflow: 'hidden',
          maxHeight: '13rem',
          objectFit: 'cover'
        }
      }
}

export default withRouter(Home)