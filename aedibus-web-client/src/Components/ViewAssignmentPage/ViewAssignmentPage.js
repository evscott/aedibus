import React, {Component, Fragment} from 'react'
import clsx from 'clsx';
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import {Footer, Header, AuthenticatedSidebar} from "../Shared";
import { withStyles } from '@material-ui/core/styles';
import "react-mde/lib/styles/css/react-mde-all.css";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/snippets/java";
import ViewAssignmentPageTeacher from "./TeacherView";
import ViewAssignmentPageStudents from "./StudentView";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {getAssignment, getReadme} from "../../Services/AedibusAPI";

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
    viewAssignmentMargin: {
        margin: 20,
    },
    title: {
        textAlign: 'center',
    },
    replacementMarker: {
        position: 'absolute',
        backgroundColor: '#FFFF00'
    }
});

class ViewAssignmentPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            assignment: {
                id: "",
                title: "",
                description: "",
            },
            readmeValue: "",
        }

        this.toggleOpen = this.toggleOpen.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        setTimeout(async () => {
            let getAssignmentRes = await getAssignment(this.props.match.params.aid);
            this.setState({assignment: getAssignmentRes});

            let getReadmeRes = await getReadme(this.props.match.params.aid);
            this.setState({readmeValue: getReadmeRes});
        }, 100);
    }

    toggleOpen() {
        this.setState({open: !this.state.open});
    };

    render() {
        const { classes } = this.props;

        const assignmentHeader = () => {
            return (
                <div className={classes.viewAssignmentMargin}>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="h4" className={classes.title} color={'textPrimary'}>
                                {this.state.assignment.title}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            )
        }

        const userTypeContent = () => {
            if (this.props.user) {
                if (this.props.user.teacher)
                    return <ViewAssignmentPageTeacher
                                assignment={this.state.assignment}
                                readmeValue={this.state.readmeValue}
                                aid={this.props.match.params.aid}
                            />
                else return <ViewAssignmentPageStudents
                                assignment={this.state.assignment}
                                readmeValue={this.state.readmeValue}
                                aid={this.props.match.params.aid}
                            />
            }
        }

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Header open={this.state.open} toggleOpen={this.toggleOpen}/>
                <AuthenticatedSidebar open={this.state.open} toggleOpen={this.toggleOpen} isTeacher={this.props.user ? this.props.user.teacher : false}/>
                <main className={clsx(classes.content, {[classes.contentShift]: this.state.open})}>
                    <div className={classes.drawerHeader} />
                    {assignmentHeader()}
                    {userTypeContent()}
                </main>
            </div>
        )
    }
}

ViewAssignmentPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewAssignmentPage);