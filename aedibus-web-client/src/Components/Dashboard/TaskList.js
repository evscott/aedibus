import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import {Divider} from "@material-ui/core";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AssignmentIcon from '@material-ui/icons/Assignment';
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import {Reorder, Folder, FolderOpen } from "@material-ui/icons";
import ListSubheader from '@material-ui/core/ListSubheader';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import NoteIcon from '@material-ui/icons/Note';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 0,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        minHeight: 300,
        maxHeight: '80%',
    },
    tab: {
        minWidth: 100,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    listSubHeader: {
        background: theme.palette.background.paper,
    }
}));

export default function TaskList() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [checked, setChecked] = React.useState([1]);

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <Paper className={classes.root}>
            <List dense>
                <ListSubheader className={classes.listSubHeader}>Showing 20 items</ListSubheader>
                <ListItem button>
                    <ListItemAvatar>
                        <Avatar>
                            <NoteIcon fontSize={'small'}/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`Line item 0`} secondary="Jan 7, 2014"/>
                    <IconButton>
                        <Reorder fontSize={'small'} color={'action'}/>
                    </IconButton>
                </ListItem>
                {[0, 1, 2, 3].map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                        <div>
                            <ListItem key={value} button>
                                <ListItemAvatar>
                                    <Avatar>
                                        <CallToActionIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={`Line item ${value + 1}`} secondary="Jan 7, 2014 - Jane 10, 2014"/>
                                <IconButton>
                                    <Reorder fontSize={'small'} color={'action'}/>
                                </IconButton>
                            </ListItem>
                            <Divider/>
                        </div>
                    );
                })}
                <ListItem button>
                    <ListItemAvatar>
                        <Badge badgeContent={2} color="primary">
                            <Avatar>
                                <IconButton onClick={handleClick}>
                                    { open ? <FolderOpen fontSize={'small'} color={'action'}/> : <Folder fontSize={'small'} color={'action'}/>}
                                </IconButton>
                            </Avatar>
                        </Badge>
                    </ListItemAvatar>
                    <ListItemText primary={`Line item 5`} secondary="Jan 7, 2014 - Jane 10, 2014"/>
                    <IconButton>
                        <Reorder fontSize={'small'} color={'action'}/>
                    </IconButton>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <Avatar>
                                <AssignmentIcon fontSize={'small'}/>
                            </Avatar>
                            <ListItem key={value} button>
                                <ListItemText id={'checkbox-list-secondary-label-5'} primary={`Line item 5`} secondary="Jan 7, 2014 - Jane 10, 2014"/>
                            </ListItem>
                        </ListItem>
                    </List>
                </Collapse>
                {[5, 6, 7, 8].map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                        <div>
                            <ListItem key={value} button>
                                <ListItemAvatar>
                                    <Avatar>
                                        <CallToActionIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={`Line item ${value + 1}`} secondary="Jan 7, 2014 - Jane 10, 2014"/>
                                <IconButton>
                                    <Reorder fontSize={'small'} color={'action'}/>
                                </IconButton>
                            </ListItem>
                            <Divider/>
                        </div>
                    );
                })}
            </List>
        </Paper>
    );
}
