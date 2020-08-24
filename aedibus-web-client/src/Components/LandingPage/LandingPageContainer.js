import { connect } from 'react-redux'
import LandingPage from "./LandingPage";
import { signIn, signUp } from '../../Redux/Actions/authActions'


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isFetching: state.auth.isFetching,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (email, password) => {
            dispatch(signIn(email, password));
        },
        signUp: (name, email, password) => {
            dispatch(signUp(name, email, password));
        },
    };
};

const LandingPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LandingPage);

export default LandingPageContainer;