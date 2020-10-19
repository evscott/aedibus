import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import Fab from "@material-ui/core/Fab";
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
import SendIcon from '@material-ui/icons/Send';
import fetch from "cross-fetch";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import CssBaseline from "@material-ui/core/CssBaseline";
import {Header, AuthenticatedSidebar} from "../Shared";
import clsx from "clsx";
import {getAssignment, getReadme, getResults, getSolution, getSubmissionForInstructor} from "../../Services/AedibusAPI";

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
    iconButton: {
        padding: 10,
    },
    results: {
        display: 'block',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    viewAssignmentMargin: {
        margin: 20,
    },
    title: {
        textAlign: 'center',
    },
});

class ViewSubmissionPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            solutionValue: "package assignment;\n\npublic class Solution {\n    public static String getHelloWorld() {\n\n    }\n\n    public static int getNumber10() {\n\n    }\n}",
            assignment: {
                id: "",
                title: "",
                description: "",
            },
            submission: {
                id: "",
                assignment_id: "",
                student_id: "",
                userId: "",
                userName: "",
            },
            results: [],
        }

        this.toggleOpen = this.toggleOpen.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    toggleOpen() {
        this.setState({open: !this.state.open});
    };

    componentDidMount() {
        setTimeout(async () => {

            const getSubmissionResponse = await getSubmissionForInstructor(this.props.match.params.sid);
            // TODO handle err
            this.setState({submission: getSubmissionResponse})

            const getAssignmentResponse = await getAssignment(this.state.submission.assignmentId);
            // TODO handle err
            this.setState({assignment: getAssignmentResponse});

            const getReadmeResponse = await getReadme(this.state.submission.assignmentId);
            // TODO handle err
            this.setState({readmeValue: getReadmeResponse});

            const getSolutionResponse = await getSolution(this.state.submission.id);
            // TODO handle err
            this.setState({solutionValue: getSolutionResponse});

            // Get results
            const getResultsResponse = await getResults(this.state.submission.id);
            // TODO handle err
            this.setState({results: getResultsResponse.testResults});
        }, 100);
    }

    render() {
        const { classes } = this.props;

        const converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true
        });

        const submissionHeader = () => {
            if (this.state.submission)
            return (
                <div className={classes.viewAssignmentMargin}>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h3" className={classes.title} color={'textSecondary'}>
                                View Submission {this.props.user && this.props.user.teacher ? "(teacher)" : "(student)"}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h4" className={classes.title} color={'textPrimary'}>
                                {this.state.assignment.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h5" className={classes.title} color={'textPrimary'}>
                                {this.state.submission.userName}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            )
        }

        const resultsViewer = () => {
            if (this.state.results && this.state.results.length > 0)
                return (
                    <Grid item xs={12} md={12} lg={12}>
                        <Typography variant="h4" className={classes.title} color={'textSecondary'}>
                            Test results
                        </Typography>
                        <Paper elevation={3}>
                            <List className={classes.results}>
                                {this.state.results.map((result) => (
                                    <Fragment key={result.ID}>
                                        <ListItem key={result.ID} button component={'button'} >
                                            <ListItemIcon >
                                                {result.Failure ? <SentimentVeryDissatisfiedIcon color={'error'}/> : <SentimentSatisfiedAltIcon color={'primary'} />}
                                            </ListItemIcon>
                                            <ListItemText primary={result.Name} secondary={getResultMessage(result)}/>
                                        </ListItem>
                                        <Divider light/>
                                    </Fragment>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                )
        }

        const getResultMessage = (result) => {
            if (result.Failure) {
                return "Completed in: " + result.Time + "s, Error message: " + result.Message;
            }
            return "Completed in: " + result.Time + "s";
        }

        const readmeViewer = () => {
            return (
                <Grid item xs={6} md={6} lg={6}>
                    <Typography variant="h4" className={classes.title} color={'textSecondary'}>
                        README.md
                    </Typography>
                    <Paper elevation={3}>
                        <ReactMde
                            value={this.state.readmeValue}
                            selectedTab={"preview"}
                            generateMarkdownPreview={markdown =>
                                Promise.resolve(converter.makeHtml(markdown))
                            }
                        />
                    </Paper>
                </Grid>
            );
        }

        const solutionEditor = () => {
            return (
                <Grid item xs={6} md={6} lg={6}>
                    <Typography variant="h4" className={classes.title} color={'textSecondary'}>
                        Solution.java
                    </Typography>
                    <Paper elevation={3}>
                        <AceEditor
                            mode="java"
                            theme="tomorrow"
                            onChange={this.handleSolutionChange}
                            name="testSuiteEditor"
                            fontSize={14}
                            value={this.state.solutionValue}
                            editorProps={{ $blockScrolling: true }}
                            width={'100%'}
                            height={'745px'}
                            setOptions={{
                                enableBasicAutocompletion: true,
                                enableLiveAutocompletion: true,
                                enableSnippets: true,
                                showLineNumbers: true,
                                tabSize: 4,
                            }}
                            readOnly={true}
                        />
                    </Paper>
                </Grid>
            );
        }

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Header open={this.state.open} toggleOpen={this.toggleOpen}/>
                <AuthenticatedSidebar open={this.state.open} toggleOpen={this.toggleOpen} isTeacher={this.props.user ? this.props.user.teacher : false}/>
                <main className={clsx(classes.content, {[classes.contentShift]: this.state.open})}>
                    <div className={classes.drawerHeader} />
                    {submissionHeader()}
                    <Grid container spacing={3}>
                        {resultsViewer()}
                        {solutionEditor()}
                        {readmeViewer()}
                    </Grid>
                </main>
            </div>
        )
    }
}

ViewSubmissionPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewSubmissionPage);