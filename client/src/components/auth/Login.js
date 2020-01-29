import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../../actions/authActions'
import {clearErrors} from '../../actions/errorActions'

const Login = (props) => {
    const [state, setState] = useState({
        modal: false,
        email: '',
        password: '',
        msg: null
    })

    useEffect(() => {
        //Check for login error
        if(props.error.id === 'LOGIN_FAIL') {
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
        const user = {
            email: state.email,
            password: state.password
        }

        props.login(user)
    }

    return (
        <div>
            <NavLink onClick={toggle} href="#">
                Login
            </NavLink>
            <Modal
                isOpen={state.modal}
                toggle={toggle}
            >
                <ModalHeader toggle={toggle}>Login</ModalHeader>
                <ModalBody>
                    {state.msg ? (<Alert color='danger'>{state.msg}</Alert>) : null}
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name= "email" id="email" placeholder="Email" onChange={handleChange} className="mb-3"></Input>

                            <Label for="password">Password</Label>
                            <Input type="password" name= "password" id="password" placeholder="Password" onChange={handleChange} className="mb-3"></Input>

                            <Button color="dark" style={{marginTop: '2rem'}} block>Login</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, {login, clearErrors})(Login)