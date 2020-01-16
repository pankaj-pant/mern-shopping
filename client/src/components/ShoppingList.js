import React, { useState } from 'react'
import uuid from 'uuid'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ShoppingList = () => {
let initialItems = [
    {id: uuid(), name: 'Milk'},
    {id: uuid(), name: 'Cheese'},
    {id: uuid(), name: 'Eggs'},
    {id: uuid(), name: 'Bread'}
]

const [items, setItems] = useState(initialItems)

return (
    <Container>
        <Button 
            color="dark"
            style={{marginBottom: '2rem'}}
            onClick={() => {
                const name = prompt('Enter item')
                if (name) {
                    setItems([...items, {id: uuid(), name: name}])
                }
            }}>
            Add Item
        </Button>

        <ListGroup>
            <TransitionGroup className="shopping-list">
                {items.map(item => (
                    <CSSTransition key={item.id} timeout={500} classNames="fade">
                        <ListGroupItem>
                            <Button 
                                className="remove-btn"
                                color="danger"
                                size="sm "
                                onClick={() => {setItems(items.filter(i => i.id !== item.id))}}> 
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

export default ShoppingList