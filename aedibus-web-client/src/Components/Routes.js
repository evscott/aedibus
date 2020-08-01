import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom';
import ChallengeViewer from './ChallengeViewer/ChallengeViewer'
import ChallengeCreator from './ChallengeCreator/ChallengeCreator'
import LandingPageContainer from './LandingPage/LandingPageContainer'
import DashboardContainer from './Dashboard/DashboardContainer';

const AuthenticatedRoute = ({ component: Component, ...rest}) => {
    return <Route
        {...rest}
        render={props => localStorage.getItem("ac-token") ? <Component {...props}/> : <Redirect to={'/'}/>}
    />
};

export default () => (
    <Switch>
        <Route exact path={'/'} component={LandingPageContainer} />
        <AuthenticatedRoute exact path={'/home'} component={DashboardContainer} />
        <AuthenticatedRoute exact path={'/challenge'} component={ChallengeViewer} />
        <AuthenticatedRoute exact path={'/challenge/create'} component={ChallengeCreator} />
    </Switch>
)
