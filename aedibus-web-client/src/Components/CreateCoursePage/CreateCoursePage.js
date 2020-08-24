import React, {Component, Fragment} from 'react'
import clsx from 'clsx';
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import Fab from "@material-ui/core/Fab";
import {Footer, Header, Sidebar} from "../Shared";
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import SendIcon from '@material-ui/icons/Send';
import TextField from "@material-ui/core/TextField";
import DoneIcon from '@material-ui/icons/Done';
import {createCourse} from "../../Services/AedibusAPI";

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
    readmeTitle: {
        margin: theme.spacing(4, 0, 2),
    },
    testSuiteTitle: {
        margin: theme.spacing(4, 0, 2),
    },
    studentListTitle: {
        margin: theme.spacing(4, 0, 2),
    },
    enrollmentInputRoot: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        marginBottom: '5px'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    margin: {
        width: '100%',
        margin: theme.spacing(1),
    },
    inputField: {
        width: '100%'
    },
    createCourseFormMargin: {
        margin: 20,
    },
    title: {
        textAlign: 'center',
    }
});

class CreateCoursePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            title: "",
            description: "",
            studentList: [],
            enrollmentValue: "",
        }

        this.toggleOpen = this.toggleOpen.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleInviteChange = this.handleInviteChange.bind(this);
        this.removeEnrollment = this.removeEnrollment.bind(this);
        this.addEnrollment = this.addEnrollment.bind(this);
        this.createCourse = this.createCourse.bind(this);
    }

    toggleOpen() {
        this.setState({open: !this.state.open});
    };

    handleTitleChange(title) {
        this.setState({title: title.target.value});
    }

    handleDescriptionChange(description) {
        this.setState({description: description.target.value});
    }

    handleInviteChange(email) {
        this.setState({
            enrollmentValue: email.target.value,
        });
    }

    removeEnrollment(email) {
        this.setState({
            studentList: this.state.studentList.filter(e => e !== email)
        });
    }

    addEnrollment() {
        if (!this.state.studentList.includes(this.state.enrollmentValue))
            this.setState( {
                studentList: this.state.studentList.concat(this.state.enrollmentValue),
                enrollmentValue: "",
            })
    }

    async createCourse() {
        await createCourse(this.state.title, this.state.description, this.state.studentList)
        this.props.history.push('/home');
    }

    render() {
        const { classes } = this.props;

        const createCourseHeader = () => {
            return (
                <div className={classes.createCourseFormMargin}>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h3" className={classes.title} color={'textPrimary'}>
                                Create Course
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            )
        }

        const titleForm = () => {
            return (
                <div className={classes.createCourseFormMargin}>
                    <Grid container>
                        <Grid item md={2} lg={3}/>
                        <Grid item xs={12} md={8} lg={6}>
                            <TextField
                                id="standard-basic"
                                label="Course title"
                                fullWidth={true}
                                placeholder={'Distributed Systems'}
                                variant={'outlined'}
                                onChange={this.handleTitleChange}
                            />
                        </Grid>
                        <Grid item md={2} lg={3}/>
                    </Grid>
                </div>
            )
        }

        const detailsForm = () => {
            return (
                <div className={classes.createCourseFormMargin}>
                    <Grid container>
                        <Grid item md={2} lg={3}/>
                        <Grid item xs={12} md={8} lg={6}>
                            <TextField
                                fullWidth={true}
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={4}
                                placeholder="The course introduces the main principles underlying distributed systems: processes, communication, naming, synchronization, consistency, fault tolerance, and security."
                                value={this.state.description}
                                variant="outlined"
                                onChange={this.handleDescriptionChange}
                            />
                        </Grid>
                        <Grid item md={2} lg={3}/>
                    </Grid>
                </div>
            )
        }

        const enrollmentHeader = () => {
            return (
                <div className={classes.createCourseFormMargin}>
                    <Grid container>
                        <Grid item md={2} lg={3}/>
                        <Grid item xs={12} md={8} lg={6}>
                            <Typography variant="h4" className={classes.title} color={'textSecondary'}>
                                Enrollment List
                            </Typography>
                        </Grid>
                        <Grid item md={2} lg={3}/>
                    </Grid>
                </div>
                );
        }

        const enrollmentInviteForm = () => {
            return (
                <div className={classes.createCourseFormMargin}>
                    <Grid container>
                        <Grid item md={2} lg={3}/>
                        <Grid item md={8} lg={6} >
                            <FormControl className={classes.margin} onChange={this.handleInviteChange}>
                                <InputLabel htmlFor="input-with-icon-adornment">Invite student</InputLabel>
                                <Input
                                    value={this.state.enrollmentValue}
                                    fullWidth={true}
                                    placeholder={'student@email.com'}
                                    id="input-with-icon-adornment"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton onClick={this.addEnrollment} color="primary" className={classes.iconButton} aria-label="directions">
                                                <SendIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={2} lg={3}/>
                    </Grid>
                </div>
            )
        }

        const studentList = () => {
            return (
                <div className={classes.createCourseFormMargin}>
                    <Grid container>
                        <Grid item md={2} lg={3}/>
                        <Grid item xs={12} md={8} lg={6}>
                            <Paper elevation={3}>
                                <List>
                                    {this.state.studentList.map((email, i) => (
                                        <Fragment key={i}>
                                            { i > 0 ? <Divider/> : null }
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <PersonIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={email}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton onClick={() => this.removeEnrollment(email)} edge="end" aria-label="delete">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
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
            return (
                <Fab className={classes.fab} color="primary" onClick={this.createCourse}>
                    <DoneIcon />
                </Fab>
            )
        }

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Header open={this.state.open} toggleOpen={this.toggleOpen}/>
                <Sidebar open={this.state.open} toggleOpen={this.toggleOpen} isTeacher={this.props.user ? this.props.user.teacher : false}/>
                <main className={clsx(classes.content, {[classes.contentShift]: this.state.open,})}>
                    <div className={classes.drawerHeader} />
                    {createCourseHeader()}
                    {titleForm()}
                    {detailsForm()}
                    {enrollmentHeader()}
                    {enrollmentInviteForm()}
                    {studentList()}
                    {createCourseButton()}
                </main>
                <Footer/>
            </div>
        )
    }
}

CreateCoursePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateCoursePage);