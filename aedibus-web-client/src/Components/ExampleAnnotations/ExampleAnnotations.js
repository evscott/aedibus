import React, {Component, Fragment} from 'react'
import clsx from 'clsx';
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import CheckIcon from '@material-ui/icons/Check';
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import {Header, Sidebar} from "../Shared";
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
import fetch from "cross-fetch";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

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

class ExampleAnnotations extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            readmeValue: "Include some instructions in **markdown** format",
            readmeTab: "write",
            testSuiteValue: "package assignment;\n\npublic class Solution {\n\n    public static String getHelloWorld(){\n        return \"hello world\";\n    }\n\n    public static int getNumber10(){\n        return -1;\n    }\n}",
            courses: [],
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
        this.handleTestSuiteChange = this.handleTestSuiteChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        setTimeout(() => {
            fetch('http://127.0.0.1:2020/courses/taught', {
                headers: {
                    'Content-Type': 'application/json',
                    'aedibus-api-token': localStorage.getItem('aedibus-api-token')
                },
                method: 'GET',
            }).then((response) => response.json())
                .then(json => {
                    this.setState({courses: json.courses})
                });
        }, 100);
    }

    handleCourseChange(course) {
        this.setState({selectedCourse: course.target.value})
    }


    toggleOpen() {
        this.setState({open: !this.state.open});
    };

    handleTestSuiteChange(newValue) {
        this.setState({testSuiteValue: newValue});
    }

    render() {
        const { classes } = this.props;

        const createAssignmentHeader = () => {
            return (
                <div className={classes.createAssignmentMargin}>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h3" className={classes.title} color={'textPrimary'}>
                                Example annotations
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

        const annotations = [
            {
                row: 0,
                column: 4,
                text: "Generally, it is good practice to document your code with authorship and a date.\nIdeally, this is done above any import statements. Consider this for next time.",
                type: "warning"
            },
            {
                row: 5,
                column: 4,
                text: "This is good! You are returning the correct value.",
                type: "info"
            },
            {
                row: 9,
                column: 4,
                text: "Think about why this might be going wrong. Why are you returning -1?",
                type: "error"
            },
        ];

        let markers = [
            {startRow: 0, startCol: 0, endRow: 0, endCol: 50, className: classes.replacementMarker, type: 'text' },
            {startRow: 5, startCol: 0, endRow: 5, endCol: 50, className: classes.replacementMarker, type: 'text' },
            {startRow: 9, startCol: 0, endRow: 9, endCol: 50, className: classes.replacementMarker, type: 'text' }
        ];

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
                                    annotations={annotations}
                                    markers={markers}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            );
        }

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Header open={this.state.open} toggleOpen={this.toggleOpen}/>
                <Sidebar open={this.state.open} toggleOpen={this.toggleOpen} isTeacher={this.props.user ? this.props.user.teacher : false}/>
                <main className={clsx(classes.content, {[classes.contentShift]: this.state.open,})}>
                    <div className={classes.drawerHeader} />
                    {createAssignmentHeader()}
                    {testSuiteHeader()}
                    {testSuiteEditor()}
                </main>
            </div>
        )
    }
}

ExampleAnnotations.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExampleAnnotations);