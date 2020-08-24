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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import {getResults, getSolution, getSubmissionByAssignmentId, submitAssignment} from "../../Services/AedibusAPI";

const styles = theme => ({
    root: {
        display: 'flex',
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

class StudentView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            solutionValue: "package assignment;\n\npublic class Solution {\n    public static String getHelloWorld() {\n\n    }\n\n    public static int getNumber10() {\n\n    }\n}",
            assignment: {
                id: "",
                title: "",
                description: "",
            },
            submission: {
                id: "",
                assignment_id: "",
                student_id: ""
            },
            results: [],
            submitted: false
        }

        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSolutionChange = this.handleSolutionChange.bind(this);
    }

    componentDidMount() {
        setTimeout(async () => {

            const getSubmissionResponse = await getSubmissionByAssignmentId(this.props.aid);

            // TODO handle errs
            if (getSubmissionResponse != null) {
                this.setState({submission: getSubmissionResponse, submitted: true})

                const getSolutionResponse = await getSolution(this.state.submission.id);
                // TODO handle errs
                this.setState({solutionValue: getSolutionResponse});

                const getResultsResponse = await getResults(this.state.submission.id);

                // TODO handle errs

                this.setState({results: getResultsResponse.testResults});
            }

        }, 100);
    }

    async handleSubmit() {
        let res = await submitAssignment(this.props.aid, this.state.solutionValue);
        console.log(res);
        this.setState({submission: res})
    }

    handleSolutionChange(newValue) {
        this.setState({solutionValue: newValue});
    }

    render() {
        const { classes } = this.props;

        const converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true
        });

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
                <Grid item xs={12} md={6} lg={6}>
                    <Typography variant="h4" className={classes.title} color={'textSecondary'}>
                        README.md
                    </Typography>
                    <Paper elevation={3}>
                        <ReactMde
                            value={this.props.readmeValue}
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
                <Grid item xs={12} md={6} lg={6}>
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
                            readOnly={this.state.submitted}
                        />
                    </Paper>
                </Grid>
            );
        }

        const submitSolutionButton = () => {
            if (this.state.submitted === false)
                return (
                    <Fab className={classes.fab} color="primary" onClick={this.handleSubmit}>
                        <SendIcon />
                    </Fab>
                )
        }

        return (
            <Grid container spacing={3}>
                {resultsViewer()}
                {solutionEditor()}
                {readmeViewer()}
                {submitSolutionButton()}
            </Grid>
        )
    }
}

StudentView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentView);