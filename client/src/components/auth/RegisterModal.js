import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {register} from '../../actions/authActions'
import {clearErrors} from '../../actions/errorActions'

const RegisterModal = (props) => {
    const [state, setState] = useState({
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    })

    useEffect(() => {
        //Check for register error
        if(props.error.id === 'REGISTER_FAIL') {
            setState({...state, msg: props.error.msg.message})
        } else {
            setState({...state, msg: null})
        }

        //Close modal if authenticated
          if(state.modal && props.isAuthenticated) {
            toggle()
        }

    }, [props.error, props.isAuthenticated])

    const toggle = () => {
        props.clearErrors()
        setState({...state, modal: !state.modal})
    }

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {   
        event.preventDefault()
        const newUser = {
            name: state.name,
            email: state.email,
            password: state.password
        }
        props.register(newUser) 
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
                    {state.msg ? (<Alert color='danger'>{state.msg}</Alert>) : null}
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
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, {register, clearErrors})(RegisterModal)