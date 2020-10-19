import { connect } from 'react-redux'
import LandingPage from "./LandingPage";
import { signIn, signUp } from '../../Redux/Actions/authActions'


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isFetching: state.auth.isFetching,
        error: state.error,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (email, password) => {
            dispatch(signIn(email, password));
        },
        signUp: (firstName, lastName, email, password, isTeacher) => {
            dispatch(signUp(firstName, lastName, email, password, isTeacher));
        },
    };
};

const LandingPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LandingPage);

export default LandingPageContainer;