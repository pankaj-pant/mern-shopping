import React, {useState, Fragment} from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
  } from 'reactstrap'
  import {connect} from 'react-redux'
  import PropTypes from 'prop-types'
  import RegisterModal from './auth/RegisterModal'
  import Login from './auth/Login'
  import Logout from './auth/Logout'

  const AppNavbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const authLinks = (
        <Fragment>
            <NavItem>
                <span className="navbar-text mr-3">
                    <strong>{props.auth.user ? `Welcome ${props.auth.user.name}` : ''}</strong>
                </span>
            </NavItem>
            <NavItem>
                <Logout />
            </NavItem>    
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <NavItem>
                <RegisterModal />
            </NavItem>
            <NavItem>
                <Login />
            </NavItem>
            <NavLink href="https://github.com/pankaj-pant/mern-shopping#mern-shopping" target="_blank">
                Help?
            </NavLink>
        </Fragment>
    )
    return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">Shopping List</NavbarBrand>
                    <NavbarToggler onClick={toggle}/>
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {props.auth.isAuthenticated ? authLinks : guestLinks}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
  }

  AppNavbar.propTypes = {
    auth: PropTypes.object.isRequired
}

  const mapStateToProps = state => ({
   auth: state.auth
})

export default connect(mapStateToProps, {})(AppNavbar)