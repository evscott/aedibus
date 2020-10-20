import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
}));

export default function CreateNote() {
    const classes = useStyles();

    const test = () => {
        console.log("test")
    }

    return (
        <form noValidate autoComplete="off">
            <TextField
                id="outlined-secondary"
                label="What do you need to work on?"
                variant="outlined"
                color="secondary"
                onClick={test}
                fullWidth
                size={'small'}
            />
        </form>
    );
}