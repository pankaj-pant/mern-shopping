import React, { useEffect } from 'react'
import uuid from 'uuid'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import {connect} from 'react-redux'
import {fetchItems} from '../actions/itemActions'
import PropTypes from 'prop-types'

const ShoppingList = (props) => {

useEffect(() => {
    props.fetchItems()
}, [])

return (
    <Container>
        <Button 
            color="dark"
            style={{marginBottom: '2rem'}}
            /* onClick={() => {
                const name = prompt('Enter item')
                if (name) {
                    setItems([...items, {id: uuid(), name: name}])
                }
            }} */>
            Add Item
        </Button>

        <ListGroup>
            <TransitionGroup className="shopping-list">
                {props.items.items.map(item => (
                    <CSSTransition key={item.id} timeout={500} classNames="fade">
                        <ListGroupItem>
                            <Button 
                                className="remove-btn"
                                color="danger"
                                size="sm "
                                /* onClick={() => {setItems(items.filter(i => i.id !== item.id))}} */> 
                                Delete
                            </Button>
                            {item.name}
                        </ListGroupItem>
                    </CSSTransition>
               ))}
            </TransitionGroup>
        </ListGroup>
    </Container>
   
)
}

ShoppingList.propTypes = {
    fetchItems: PropTypes.func.isRequired,
    items: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    items: state.items
})

export default connect(mapStateToProps, {fetchItems})(ShoppingList)