import { connect } from 'react-redux'
import CreateCoursePage from "./CreateCoursePage";

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const CreateCoursePageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateCoursePage);

export default CreateCoursePageContainer;