import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap'
import {connect} from 'react-redux'
import {newItem} from '../actions/itemActions'
import PropTypes from 'prop-types'

const ItemModal = (props) => {
    const [modal, setModal] = useState(false)
    const [item, setItem] = useState('')

    const toggle = () => {
        setModal(!modal)
    }

    const handleChange = (event) => {
        setItem(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
         
        const itemToAdd = {name: item}

        props.newItem(itemToAdd)
        toggle()
    }

    return (
        <div>
            {props.isAuthenticated ? <Button 
                color="dark"
                style={{marginBottom: '2rem'}}
                onClick={toggle}
            >
                Add Item
            </Button> : <h4 className="mb-3 ml-4">Please log in to add new items or delete items from the list.</h4>}
            
            <Modal
                isOpen={modal}
                toggle={toggle}
            >
                <ModalHeader toggle={toggle}>Add to Shopping List</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="item">Item</Label>
                            <Input type="text" name= "name" id="item" placeholder="Add an item" onChange={handleChange}></Input>
                            <Button color="dark" style={{marginTop: '2rem'}} block>Add Item</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

ItemModal.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    items: state.items,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {newItem})(ItemModal)