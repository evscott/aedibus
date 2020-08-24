import { connect } from 'react-redux'
import ViewSubmissionPage from "./ViewSubmissionPage";

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const ViewSubmissionPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ViewSubmissionPage);

export default ViewSubmissionPageContainer;