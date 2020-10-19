import { connect } from 'react-redux'
import AuthenticatedSidebar from "./AuthenticatedSidebar";
import {signOut} from "../../Redux/Actions/authActions";

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => {
            dispatch(signOut());
        },
    };
};

const AuthenticatedSidebarContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AuthenticatedSidebar);

export default AuthenticatedSidebarContainer;