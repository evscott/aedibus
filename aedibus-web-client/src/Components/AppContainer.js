import { connect } from 'react-redux'
import App from "./App";

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

export default AppContainer;