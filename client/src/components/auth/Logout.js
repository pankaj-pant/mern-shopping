import React from 'react';
import {connect} from 'react-redux'
import {  NavLink } from 'reactstrap'
import PropTypes from 'prop-types'
import {logout} from '../../actions/authActions'

const Logout = (props) => {
    return (
        <div>
            <NavLink onClick={props.logout} href="#">
                Logout
            </NavLink>
        </div>
    )
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired
}

export default connect(null, {logout})(Logout)