import React, {Component} from 'react'
import clsx from 'clsx';
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import {Header, AuthenticatedSidebar} from "../Shared";
import { withStyles } from '@material-ui/core/styles';
import {getCoursesForStudent, getCoursesForTeacher} from "../../Services/AedibusAPI";
import TaskListHeader from "./TaskListHeader";
import Grid from "@material-ui/core/Grid";
import CreateNote from "./CreateNote";
import CalendarIcon from "react-calendar-icon";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import TaskList from "./TaskList";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    main: {
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
    },
    taskListHeight: {
        height: 530,
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
                <AuthenticatedSidebar open={this.state.open} toggleOpen={this.toggleOpen} isTeacher={this.props.user ? this.props.user.teacher : false}/>
                <main className={clsx(classes.content, {[classes.contentShift]: this.state.open,})}>
                    <div className={classes.main} />
                    <Grid container spacing={1}>
                        <Grid item xs={1} sm={2} md={3} lg={4}/>
                        <Grid item xs={10} sm={8} md={6} lg={4}>
                            <CreateNote/>
                        </Grid>
                        <Grid item xs={1} sm={2} md={3} lg={4}/>
                        <Grid item xs={1} sm={2} md={3} lg={4}/>
                        <Grid item xs={10} sm={8} md={6} lg={4}>
                            <TaskListHeader/>
                        </Grid>
                        <Grid item xs={1} sm={2} md={3} lg={4}/>
                        <Grid item sm={1} md={2} lg={3}/>
                        <Grid item xs={12} sm={10} md={8} lg={6}>
                            <div className={classes.taskListHeight}>
                                <TaskList/>
                            </div>
                        </Grid>
                        <Grid item sm={1} md={2} lg={3}/>
                    </Grid>
                    {createCourseButton()}
                </main>
            </div>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);