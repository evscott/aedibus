import React, {Component, Fragment} from 'react'
import clsx from 'clsx';
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import {Header, Sidebar} from "../Shared";
import { withStyles } from '@material-ui/core/styles';
import fetch from "cross-fetch";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import SchoolIcon from '@material-ui/icons/School';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import GroupWorkIcon from '@material-ui/icons/GroupWork';

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
    viewCoursePageMargins: {
        margin: 20,
    },
    title: {
        textAlign: 'center',
    }
});

class ViewCoursePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            courseId: this.props.match.params.cid,
            title: null,
            description: null,
            teacher: null,
            assignments: [],
        }

        this.toggleOpen = this.toggleOpen.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        setTimeout(() => {
            fetch(`http://127.0.0.1:2020/courses/${this.state.courseId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'aedibus-api-token': localStorage.getItem('aedibus-api-token')
                },
                method: 'GET',
            }).then((response) => response.json())
                .then(json => {
                    console.log('json: ', json);
                    this.setState({
                        title: json.title,
                        teacherName: json.teacherName,
                        description: json.description,
                        assignments: json.assignments,
                    })
                });
        }, 100);
    }

    toggleOpen() {
        this.setState({open: !this.state.open});
    };

    render() {
        const { classes } = this.props;

        const courseTitle = () => {
            return (
                <div className={classes.viewCoursePageMargins}>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h3" className={classes.title} color={'textPrimary'}>
                                {this.state.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="subtitle2" className={classes.title} color={'textSecondary'}>
                                Instructor: {this.state.teacherName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="subtitle1" className={classes.title} color={'textPrimary'}>
                                {this.state.description}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            )
        }

        const assignmentsHeader = () => {
            return (
                <div className={classes.viewCoursePageMargins}>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h4" className={classes.title} color={'textSecondary'}>
                                Assignments
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            )
        }

        const noAssignmentsMessage = () => {
            return (
                <Fragment>
                    <ListItem>
                        <ListItemText secondary={'No assignments yet.'}/>
                    </ListItem>
                    <ListItem button component={'button'} href={'/courses/assignments/create'}>
                        <ListItemText primary={'Create one?'}/>
                    </ListItem>
                </Fragment>
            )
        }

        const assignmentList = () => {
            return (
                <div className={classes.viewCoursePageMargins}>
                    <Grid container>
                        <Grid item md={2} lg={3}/>
                        <Grid item xs={12} md={8} lg={6}>
                            <Paper elevation={3}>
                                <List className={classes.courseList}>
                                    {this.state.assignments.length === 0 ? noAssignmentsMessage() : null}
                                    {this.state.assignments.map((assignment) => (
                                        <Fragment key={assignment.ID}>
                                            <ListItem key={assignment.ID} button>
                                                <ListItemIcon>
                                                    <GroupWorkIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={assignment.Title}/>
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

        const createAssignmentButton = () => {
            if (this.props.user && this.props.user.teacher)
                return (
                    <Button href='/courses/assignments/create'>
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
                    {courseTitle()}
                    {assignmentsHeader()}
                    {assignmentList()}
                    {createAssignmentButton()}
                </main>
            </div>
        )
    }
}

ViewCoursePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewCoursePage);