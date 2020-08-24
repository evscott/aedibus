import { connect } from 'react-redux'
import ExampleAnnotations from "./ExampleAnnotations";

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

const ExampleAnnotationsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ExampleAnnotations);

export default ExampleAnnotationsContainer;