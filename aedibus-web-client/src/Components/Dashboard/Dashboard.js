import React, {Component, Fragment} from 'react'
import clsx from 'clsx';
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import {Footer, Header, Sidebar} from "../Shared";
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import SchoolIcon from '@material-ui/icons/School';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import {getCoursesForStudent, getCoursesForTeacher} from "../../Services/AedibusAPI";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    fab: {
        position: "fixed",
        right: 20,
        bottom: 20
    },
    courseList: {
        display: 'block',
    },
    courseListTitle: {
        margin: theme.spacing(4, 0, 2),
    },
    dashboardMargins: {
        margin: -0,
    },
    title: {
        textAlign: 'center',
    }
});

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            courseList: [],
        }

        this.toggleOpen = this.toggleOpen.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        setTimeout(async () => {
            if (this.props.user) {
                let courseList;

                if (this.props.user.teacher) {
                    courseList = await getCoursesForTeacher();
                } else {
                    courseList = await getCoursesForStudent()
                }
                this.setState({courseList: courseList.courses})
            }
        }, 100);
    }

    toggleOpen() {
        this.setState({open: !this.state.open});
    };

    render() {
        const { classes } = this.props;

        const dashboardHeader = () => {
            return (
                <div className={classes.dashboardMargins}>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h3" className={classes.title} color={'textPrimary'}>
                                Dashboard
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            )
        }

        const coursesHeader = () => {
            return (
                <div className={classes.dashboardMargins}>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h4" className={classes.title} color={'textSecondary'}>
                                Course List
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            )
        }

        const courseList = () => {
            return (
                <div className={classes.dashboardMargins}>
                    <Grid container>
                        <Grid item md={2} lg={3}/>
                        <Grid item xs={12} md={8} lg={6}>
                            <Paper elevation={3}>
                                <List className={classes.courseList}>
                                    {this.state.courseList.map((course) => (
                                        <Fragment key={course.ID}>
                                            <ListItem key={course.ID} button component={'button'} href={`/courses/view/${course.ID}`}>
                                                <ListItemIcon>
                                                    <SchoolIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={course.Title} secondary={course.Description}/>
                                            </ListItem>
                                            <Divider light/>
                                        </Fragment>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item md={2} lg={3}/>
                    </Grid>
                </div>
            );
        }

        const createCourseButton = () => {
            if (this.props.user && this.props.user.teacher)
                return (
                    <Button href='/courses/create'>
                        <Fab className={classes.fab} color="primary">
                            <AddIcon />
                        </Fab>
                    </Button>
                )
        }

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Header open={this.state.open} toggleOpen={this.toggleOpen}/>
                <Sidebar open={this.state.open} toggleOpen={this.toggleOpen} isTeacher={this.props.user ? this.props.user.teacher : false}/>
                <main className={clsx(classes.content, {[classes.contentShift]: this.state.open,})}>
                    <div className={classes.drawerHeader} />
                    {dashboardHeader()}
                    {coursesHeader()}
                    {courseList()}
                    {createCourseButton()}
                </main>
                {/*<Footer/>*/}
            </div>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);