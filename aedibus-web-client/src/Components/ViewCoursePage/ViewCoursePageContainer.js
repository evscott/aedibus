import { connect } from 'react-redux'
import ViewCoursePage from "./ViewCoursePage";

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const ViewCoursePageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ViewCoursePage);

export default ViewCoursePageContainer;