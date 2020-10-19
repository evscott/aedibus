import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import CssBaseline from "@material-ui/core/CssBaseline";
import {Header, UnauthenticatedSidebar, Footer} from "../Shared";
import {withStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import Alert from "@material-ui/lab/Alert";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    fab: {
        position: "fixed",
        right: 20,
        bottom: 20
    },
    courseList: {
        display: 'block',
    },
    courseListTitle: {
        margin: theme.spacing(4, 0, 2),
    },
    dashboardMargins: {
        margin: -0,
    },
    title: {
        textAlign: 'center',
    },
});

class LandingPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            signUp: false,
        }

        this.toggleSignUp = this.toggleSignUp.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this);
    }

    toggleSignUp = () => {
        this.setState({ signUp: !this.state.signUp })
    }

    toggleOpen() {
        this.setState({open: !this.state.open});
    };

    AuthenticationForm() {
        if (this.state.signUp) {
            return <SignUpForm toggleSignUp={this.toggleSignUp} signUp={this.props.signUp} error={this.props.error}/>;
        } else {
            return <SignInForm toggleSignUp={this.toggleSignUp} signIn={this.props.signIn} error={this.props.error}/>;
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                { this.AuthenticationForm() }
            </div>
        )
    }
}

LandingPage.propTypes = {
    signIn: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LandingPage);