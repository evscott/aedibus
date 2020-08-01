import { connect } from 'react-redux'
import Dashboard from "./Dashboard";
import { GetCourses } from '../../Redux/Actions/courseActions'


const mapStateToProps = (state) => {
    return {
        received: state.courses.list,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getChallenges: () => {
            dispatch(GetCourses());
        },
    };
};

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dashboard);

export default DashboardContainer;