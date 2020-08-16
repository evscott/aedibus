import { connect } from 'react-redux'
import ViewAssignmentPage from "./ViewAssignmentPage";

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const ViewAssignmentPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ViewAssignmentPage);

export default ViewAssignmentPageContainer;