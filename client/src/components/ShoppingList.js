import React, { useEffect } from 'react'

import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import {connect} from 'react-redux'
import {fetchItems, newItem, deleteItem} from '../actions/itemActions'
import PropTypes from 'prop-types'

const ShoppingList = (props) => {

useEffect(() => {
    props.fetchItems()
}, [])

return (
    <Container>
        <ListGroup>
            <TransitionGroup className="shopping-list">
                {props.items.items.map(item => (
                    <CSSTransition key={item._id} timeout={500} classNames="fade">
                        <ListGroupItem>
                            {props.isAuthenticated ? <Button 
                                className="remove-btn"
                                color="danger"
                                size="sm "
                                onClick={() => props.deleteItem(item._id)}
                            > 
                                Delete
                            </Button> : null}
                            
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
    newItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    items: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    items: state.items,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {fetchItems, newItem, deleteItem})(ShoppingList)