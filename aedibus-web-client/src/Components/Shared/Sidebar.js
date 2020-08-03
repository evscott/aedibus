import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import PropTypes from "prop-types";
import SchoolIcon from '@material-ui/icons/School';
import AssignmentIcon from '@material-ui/icons/Assignment';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
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
}));

const Sidebar = (props) => {
    const { open, toggleOpen, isTeacher } = props;
    const classes = useStyles();
    const theme = useTheme();

    const handleSignOut = () => {
        localStorage.removeItem('aedibus-api-token');
    }

    const dashboard = () => {
        return (
            <ListItem key={"Dashboard"} button component={'button'} href="/home">
                <ListItemIcon><DashboardIcon/></ListItemIcon>
                <ListItemText primary={"Dashboard"} />
            </ListItem>
        )
    }

    const createCourse = () => {
        if (isTeacher)
            return (
                <List>
                    <ListItem key={"Create course"} button component={'button'} href="/courses/create">
                        <ListItemIcon><SchoolIcon/></ListItemIcon>
                        <ListItemText primary={"Create course"} />
                    </ListItem>
                </List>
            )
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={toggleOpen}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button key={"Sign out"} onClick={handleSignOut}>
                        <ListItemIcon><EmojiPeopleIcon/></ListItemIcon>
                        <ListItemText primary={"Sign out"} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {dashboard()}
                    {createCourse()}
                </List>
            </Drawer>
        </div>
    );
}

Sidebar.propTypes = {
    open: PropTypes.bool.isRequired,
    toggleOpen: PropTypes.func.isRequired,
    isTeacher: PropTypes.bool.isRequired,
}

export default Sidebar;
