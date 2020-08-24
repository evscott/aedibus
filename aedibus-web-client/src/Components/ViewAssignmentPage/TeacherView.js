import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/snippets/java";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import PersonIcon from '@material-ui/icons/Person';
import ReactMde from "react-mde";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import {getParticipationList, getTestSuite} from "../../Services/AedibusAPI";

const styles = theme => ({
    fab: {
        position: "fixed",
        right: 20,
        bottom: 20
    },
    title: {
        textAlign: 'center',
    },
    iconButton: {
        padding: 10,
    },
    viewAssignmentMargin: {
        margin: 20,
    },
});

class TeacherView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            readmeValue: this.props.readmeValue,
            readmeTab: "preview",
            testSuiteValue: "public class TestSuite {\n    public static void main(String []args) {\n\n    }\n}",
            participationList: [],
            assignment: this.props.assignment,
        }

        console.log('this readme value?', this.props);

        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        setTimeout(async () => {
            let getTestSuiteRes = await getTestSuite(this.props.aid);
            // TODO handle errs
            this.setState({testSuiteValue: getTestSuiteRes})

            let getParticipationListRes = await getParticipationList(this.props.aid);
            // TODO handle errs
            this.setState({participationList: getParticipationListRes})
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

        const participationList = () => {
            return (
                <Grid item xs={12} md={12} lg={12}>
                    <Typography variant="h4" className={classes.title} color={'textSecondary'}>
                        Student participation
                    </Typography>
                    <Paper elevation={3}>
                        <List className={classes.courseList}>
                            {this.state.participationList.map((participation, i) => (
                                <Fragment key={i}>
                                    <ListItem key={i}>
                                        <ListItemIcon>
                                            <PersonIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={participation.Name} secondary={participation.Submitted ? "submitted" : "not yet submitted"}/>
                                        {
                                            participation.Submitted ?
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="delete"
                                                                href={`/courses/submissions/view/${participation.SubmissionId}`}>
                                                        <ArrowRightAltIcon/>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                                : null
                                        }
                                    </ListItem>
                                    <Divider light/>
                                </Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            );
        }

        const readmeEditor = () => {
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

        const testSuiteViewer = () => {
            return (
                <Grid item xs={12} md={6} lg={6}>
                    <Typography variant="h4" className={classes.title} color={'textSecondary'}>
                        TestSuite.java
                    </Typography>
                    <Paper elevation={3}>
                        <AceEditor
                            mode="java"
                            theme="tomorrow"
                            name="testSuiteEditor"
                            fontSize={14}
                            value={this.state.testSuiteValue}
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
            <div>
                <div className={classes.viewAssignmentMargin}>
                    <Grid container spacing={2}>
                        {participationList()}
                        {testSuiteViewer()}
                        {readmeEditor()}
                    </Grid>
                </div>
            </div>
        )
    }
}

TeacherView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeacherView);