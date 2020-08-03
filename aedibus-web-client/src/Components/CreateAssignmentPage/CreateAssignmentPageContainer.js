import { connect } from 'react-redux'
import CreateAssignmentPage from "./CreateAssignmentPage";

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const CreateAssignmentPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateAssignmentPage);

export default CreateAssignmentPageContainer;