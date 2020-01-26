import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink } from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const RegisterModal = (props) => {
    const [state, setState] = useState({
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    })

    const toggle = () => {
        setState({modal: !state.modal})
    }

    const handleChange = (event) => {
        setState({[event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
         

        toggle()
    }

    return (
        <div>
            <NavLink onClick={toggle} href="#">
                Register
            </NavLink>
            <Modal
                isOpen={state.modal}
                toggle={toggle}
            >
                <ModalHeader toggle={toggle}>Register</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name= "name" id="name" placeholder="Name" onChange={handleChange} className="mb-3"></Input>

                            <Label for="email">Email</Label>
                            <Input type="email" name= "email" id="email" placeholder="Email" onChange={handleChange} className="mb-3"></Input>

                            <Label for="password">Password</Label>
                            <Input type="password" name= "password" id="password" placeholder="Password" onChange={handleChange} className="mb-3"></Input>

                            <Button color="dark" style={{marginTop: '2rem'}} block>Register</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

RegisterModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, {})(RegisterModal)