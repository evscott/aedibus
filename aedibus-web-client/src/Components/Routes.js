import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom';
import LandingPageContainer from './LandingPage/LandingPageContainer'
import DashboardContainer from './Dashboard/DashboardContainer';
import CreateCoursePageContainer from "./CreateCoursePage/CreateCoursePageContainer";
import CreateAssignmentPageContainer from "./CreateAssignmentPage/CreateAssignmentPageContainer";
import ViewCoursePageContainer from "./ViewCoursePage/ViewCoursePageContainer";

const AuthenticatedRoute = ({ component: Component, ...rest}) => {
    return <Route
        {...rest}
        render={props => localStorage.getItem("aedibus-api-token") ? <Component {...props}/> : <Redirect to={'/'}/>}
    />
};

const UnauthenticatedRoute = ({ component: Component, ...rest}) => {
    return <Route
        {...rest}
        render={props => localStorage.getItem("aedibus-api-token") ? <Redirect to={'/home'}/> : <Component {...props}/> }
    />
};

export default () => (
    <Switch>
        <UnauthenticatedRoute exact path={'/'} component={LandingPageContainer} />
        <AuthenticatedRoute exact path={'/home'} component={DashboardContainer} />
        <AuthenticatedRoute exact path={'/courses/view/:cid'} component={ViewCoursePageContainer} />
        <AuthenticatedRoute exact path={'/courses/create'} component={CreateCoursePageContainer} />
        <AuthenticatedRoute exact path={'/courses/assignments/create'} component={CreateAssignmentPageContainer} />
    </Switch>
)
