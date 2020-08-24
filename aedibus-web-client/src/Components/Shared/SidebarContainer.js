import { connect } from 'react-redux'
import Sidebar from "./Sidebar";
import {signOut} from "../../Redux/Actions/authActions";

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => {
            dispatch(signOut());
        },
    };
};

const SidebarContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Sidebar);

export default SidebarContainer;