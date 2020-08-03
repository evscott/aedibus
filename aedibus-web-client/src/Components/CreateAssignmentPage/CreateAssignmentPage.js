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
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools"

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
});

class CreateAssignmentPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            Assignments: [],
            readmeValue: "Include some instructions in **markdown** format",
            readmeTab: "write",
            testSuiteValue: "public class TestSuite {\n    public static void main(String []args) {\n\n    }\n}",
            enrollmentList: [],
            inviteValue: '',
        }

        this.toggleOpen = this.toggleOpen.bind(this);
        this.handleReadmeChange = this.handleReadmeChange.bind(this);
        this.toggleReadmeTab = this.toggleReadmeTab.bind(this);
        this.handleTestSuiteChange = this.handleTestSuiteChange.bind(this);
        this.handleInvite = this.handleInvite.bind(this);
        this.handleInviteChange = this.handleInviteChange.bind(this);
    }

    toggleOpen() {
        this.setState({open: !this.state.open});
    };

    handleReadmeChange(newValue) {
        this.setState({readmeValue: newValue})
    }

    toggleReadmeTab() {
        this.setState({
            readmeTab: this.state.readmeTab === "write" ? "preview" : "write",
        })
    }

    handleTestSuiteChange(newValue) {
        this.setState({testSuiteValue: newValue});
    }

    handleInvite(newInvite) {
        let updatedList = this.state.enrollmentList;
        updatedList.push(newInvite)
        this.setState({enrollmentList: updatedList, inviteValue: ''})
    }

    handleInviteChange(newValue) {
        this.setState({inviteValue: newValue.target.value});
    }

    render() {
        const { classes } = this.props;

        const converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true
        });

        const readmeEditor = () => {
            return (
                <Grid container>
                    <Grid item md={1} lg={1}/>
                    <Grid item xs={12} md={10} lg={10}>
                        <Typography variant="h6" className={classes.readmeTitle}>README.md</Typography>
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
                    <Grid item md={1} lg={1}/>
                </Grid>
            );
        }

        const testSuiteEditor = () => {
            return (
                <Grid container>
                    <Grid item md={1} lg={1}/>
                    <Grid item xs={12} md={10} lg={10}>
                        <Typography variant="h6" className={classes.testSuiteTitle}>TestSuite.java</Typography>
                        <Paper elevation={3}>
                            <AceEditor
                                mode="java"
                                theme="github"
                                onChange={this.handleTestSuiteChange}
                                name="testSuiteEditor"
                                fontSize={14}
                                value={this.state.testSuiteValue}
                                editorProps={{ $blockScrolling: true }}
                                width={'100%'}
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
                    <Grid item md={1} lg={1}/>
                </Grid>
            );
        }

        const createAssignmentButton = () => {
            return (
                <Button onClick={this.createAssignment}>
                    <Fab className={classes.fab} color="primary">
                        <CheckIcon />
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
                    {readmeEditor()}
                    {testSuiteEditor()}
                    {createAssignmentButton()}
                </main>
            </div>
        )
    }
}

CreateAssignmentPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateAssignmentPage);