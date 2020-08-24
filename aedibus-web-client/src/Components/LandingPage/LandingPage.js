import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'


class LandingPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            signUp: false,
        }

        this.toggleSignUp = this.toggleSignUp.bind(this)
    }

    toggleSignUp = () => {
        this.setState({ signUp: !this.state.signUp })
    }



    render() {
        if (this.state.signUp)
            return <SignUpForm toggleSignUp={this.toggleSignUp} signUp={this.props.signUp}/>
        else return <SignInForm toggleSignUp={this.toggleSignUp} signIn={this.props.signIn} />
    }
}

LandingPage.propTypes = {
    signIn: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
}

export default (LandingPage)
