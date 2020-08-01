import { connect } from 'react-redux'
import LandingPage from "./LandingPage";
import { SignIn, SignUp } from '../../Redux/Actions/authActions'


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isFetching: state.auth.isFetching,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSignIn: (email, password) => {
            dispatch(SignIn(email, password));
        },
        handleSignUp: (name, email, password) => {
            dispatch(SignUp(name, email, password));
        },
    };
};

const LandingPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LandingPage);

export default LandingPageContainer;