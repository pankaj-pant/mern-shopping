import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap'
import {connect} from 'react-redux'
import {newItem} from '../actions/itemActions'
import uuid from 'uuid'

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
         
        const itemToAdd = {id: uuid(), name: item}

        props.newItem(itemToAdd)
        toggle()
    }

    return (
        <div>
            <Button 
                color="dark"
                style={{marginBottom: '2rem'}}
                onClick={toggle}
            >
                Add Item
            </Button>
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

const mapStateToProps = state => ({
    items: state.items
})

export default connect(mapStateToProps, {newItem})(ItemModal)