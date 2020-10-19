import React, {Component, Fragment} from 'react'
import clsx from 'clsx';
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import CheckIcon from '@material-ui/icons/Check';
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import {Footer, Header, AuthenticatedSidebar} from "../Shared";
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/snippets/java";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {createAssignment, getCoursesForTeacher} from "../../Services/AedibusAPI";

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
    enrollmentListTitle: {
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
    createAssignmentMargin: {
        margin: 20,
    },
    title: {
        textAlign: 'center',
    },
    replacementMarker: {
        position: 'absolute',
        backgroundColor: '#FFFF00'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
});

class CreateAssignmentPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            readmeValue: "Include some instructions in **markdown** format",
            readmeTab: "write",
            testSuiteValue: "public class TestSuite {\n    public static void main(String []args) {\n\n    }\n}",
            courseList: [],
            selectedCourse: {
                ID: "",
                TeacherID: "",
                Title: "",
                Description: "",
            },
            title: "",
        }

        this.handleCourseChange = this.handleCourseChange.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.toggleReadmeTab = this.toggleReadmeTab.bind(this);
        this.handleReadmeChange = this.handleReadmeChange.bind(this);
        this.handleTestSuiteChange = this.handleTestSuiteChange.bind(this);
        this.handleCreation = this.handleCreation.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        setTimeout(async () => {
            let courseList = await getCoursesForTeacher();
            // TODO handle err
            // TODO update getCoursesForTeacher endpoint to just return the list
            this.setState({courseList: courseList.courses})
        }, 100);
    }

    handleCourseChange(course) {
        this.setState({selectedCourse: course.target.value})
    }


    toggleOpen() {
        this.setState({open: !this.state.open});
    };

    handleTitleChange(title) {
        this.setState({title: title.target.value});
    }

    toggleReadmeTab() {
        this.setState({
            readmeTab: this.state.readmeTab === "write" ? "preview" : "write",
        })
    }

    handleReadmeChange(newValue) {
        this.setState({readmeValue: newValue})
    }

    handleTestSuiteChange(newValue) {
        this.setState({testSuiteValue: newValue});
    }

    async handleCreation() {
        let res = await createAssignment(this.state.selectedCourse.ID, this.state.title, this.state.testSuiteValue, this.state.readmeValue);
        this.props.history.push(`/courses/assignments/view/${res.ID}`);
    }

    render() {
        const { classes } = this.props;

        const converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true
        });

        const titleForm = () => {
            return (
                <div className={classes.createCourseFormMargin}>
                    <Grid container>
                        <Grid item md={2} lg={3}/>
                        <Grid item xs={12} md={8} lg={6}>
                            <TextField
                                id="standard-basic"
                                label="Assignment title"
                                fullWidth={true}
                                placeholder={'Assignment 1: Alternative Representation of Numbers'}
                                variant={'outlined'}
                                onChange={this.handleTitleChange}
                            />
                        </Grid>
                        <Grid item md={2} lg={3}/>
                    </Grid>
                </div>
            )
        }

        const courseSelect = () => {
            return (
                <div className={classes.createCourseFormMargin}>
                    <Grid container>
                        <Grid item md={3} lg={4}/>
                        <Grid item xs={12} md={6} lg={4}>
                            <FormControl className={classes.formControl} fullWidth={true}>
                                <InputLabel id="demo-simple-select-label">Course</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.selectedCourse}
                                    onChange={this.handleCourseChange}
                                >
                                    {displayCourseList()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={3} lg={4}/>
                    </Grid>
                </div>
            )
        }

        const displayCourseList = () => {
            if (this.state.courseList.length > 0) {
                return this.state.courseList.map((course, i) => <MenuItem key={i} value={course}>{course.Title}</MenuItem>);
            } else
                return null;
        }

        const createAssignmentHeader = () => {
            return (
                <div className={classes.createAssignmentMargin}>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h3" className={classes.title} color={'textPrimary'}>
                                Create Assignment
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            )
        }

        const readmeHeader = () => {
            return (
                <div className={classes.createAssignmentMargin}>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h4" className={classes.title} color={'textSecondary'}>
                                README.md
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            )
        }

        const testSuiteHeader = () => {
            return (
                <div className={classes.createAssignmentMargin}>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h4" className={classes.title} color={'textSecondary'}>
                                TestSuite.java
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            )
        }

        const readmeEditor = () => {
            return (
                <div className={classes.createAssignmentMargin}>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper elevation={3}>
                                <ReactMde
                                    value={this.state.readmeValue}
                                    onChange={this.handleReadmeChange}
                                    selectedTab={this.state.readmeTab}
                                    onTabChange={this.toggleReadmeTab}
                                    generateMarkdownPreview={markdown =>
                                        Promise.resolve(converter.makeHtml(markdown))
                                    }
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            );
        }

        const testSuiteEditor = () => {
            return (
                <div className={classes.createAssignmentMargin}>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper elevation={3}>
                                <AceEditor
                                    mode="java"
                                    theme="tomorrow"
                                    onChange={this.handleTestSuiteChange}
                                    name="testSuiteEditor"
                                    fontSize={14}
                                    value={this.state.testSuiteValue}
                                    editorProps={{ $blockScrolling: true }}
                                    width={'100%'}
                                    height={'650px'}
                                    setOptions={{
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        enableSnippets: true,
                                        showLineNumbers: true,
                                        tabSize: 4,
                                    }}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            );
        }

        const createAssignmentButton = () => {
            return (
                <Fab className={classes.fab} color="primary" onClick={this.handleCreation}>
                    <CheckIcon />
                </Fab>
            )
        }

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Header open={this.state.open} toggleOpen={this.toggleOpen}/>
                <AuthenticatedSidebar open={this.state.open} toggleOpen={this.toggleOpen} isTeacher={this.props.user ? this.props.user.teacher : false}/>
                <main className={clsx(classes.content, {[classes.contentShift]: this.state.open,})}>
                    <div className={classes.drawerHeader} />
                    {createAssignmentHeader()}
                    {courseSelect()}
                    {titleForm()}
                    {readmeHeader()}
                    {readmeEditor()}
                    {testSuiteHeader()}
                    {testSuiteEditor()}
                    {createAssignmentButton()}
                </main>
                {/*<Footer/>*/}
            </div>
        )
    }
}

CreateAssignmentPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateAssignmentPage);