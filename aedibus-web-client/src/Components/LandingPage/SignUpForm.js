import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import smallLogo from '../../Assets/logo-small.png';
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export default function SignUpForm(props) {
    const { toggleSignUp, signUp, error } = props
    const classes = useStyles()
    const history = useHistory()

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [isTeacher, setIsTeacher] = React.useState(false);

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleIsTeacherChange = () => {
        setIsTeacher(!isTeacher);
    };

    const handleSignUp = () => {
        signUp(firstName, lastName, email, password, isTeacher);
        setTimeout(() => history.push('/'), 100 );
    }

    const signInError = () => {
        if (Date.now() - error.timestamp < 1000) {
            return <Alert severity="error">{error.message}</Alert>
        }
    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <img  src={smallLogo}/>
                <Grid container justify="center">
                    <Grid item>
                        <Typography paragraph>
                            Already have an account?
                            <Link onClick={toggleSignUp}> Sign in </Link>
                        </Typography>
                    </Grid>
                </Grid>
                {signInError()}
                <form className={classes.form} noValidate>
                    <Grid container spacing={2} alignItems="center" justify={'center'}>
                        <Grid item xs={12} md={6} lg={6}>
                            <TextField
                                autoComplete="name"
                                name="firstName"
                                variant="outlined"
                                required
                                id="name"
                                label="First name"
                                value={firstName}
                                onChange={handleFirstNameChange}
                                autoFocus
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <TextField
                                autoComplete="name"
                                name="lastName"
                                variant="outlined"
                                required
                                id="name"
                                label="Last name"
                                value={lastName}
                                onChange={handleLastNameChange}
                                autoFocus
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email address"
                                name="email"
                                value={email}
                                onChange={handleEmailChange}
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <FormControl variant="outlined" fullWidth required>
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Typography paragrap={'true'}>
                                Student
                                <Switch
                                    checked={isTeacher}
                                    onChange={handleIsTeacherChange}
                                    name="checkedB"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                Teacher
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleSignUp}
                            >
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}
