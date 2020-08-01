import React, {Component, Fragment} from 'react'
import clsx from 'clsx';
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import {Header, Sidebar} from "../Shared";
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
}));

const Dashboard = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    };

    const [value, setValue] = React.useState("**Hello world!!!**");
    const [selectedTab, setSelectedTab] = React.useState("write");

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header open={open} toggleOpen={toggleOpen}/>
            <Sidebar open={open} toggleOpen={toggleOpen}/>
            <main className={clsx(classes.content, {[classes.contentShift]: open,})}>
                <div className={classes.drawerHeader} />
                <Grid container>

                </Grid>
            </main>
            <Button href='/challenge/create'>
                <Fab className={classes.fab} color="primary">
                    <AddIcon />
                </Fab>
            </Button>
        </div>
    )
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default Dashboard;