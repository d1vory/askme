import React from 'react';
import {Avatar,Button,CssBaseline, FormControlLabel,Checkbox,Link, Grid,Box,Typography,Container,CircularProgress, } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/auth'
import './styles.css'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        Wolves in Circus.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Loading(){
  return(

    <div className='loading-container' >
      <CircularProgress />
    </div>

  )
}

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});




class SignIn extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
      isRemember:false,
      errorMessage:''
    }

  }


  handleUsernameChange = (event) => {
    const username = event.target.value;
    this.setState({ username:username });
  }

  handlePasswordChange = (event) => {
    const password = event.target.value;
    this.setState({password:password})
  }

  handleRememberChange  = () => {
    const isRemember = !this.state.isRemember
    this.setState({isRemember:isRemember})
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onAuth(this.state.username, this.state.password)

    //this.props.history.push('/wall')
    // it redirects before auth is done
    // fix it
  }

  render() {
    const { username,password,isRemember } = this.state;
    const { classes } = this.props;
    const errorMessage = this.state.errorMessage && ( <Typography component="p" color='error' variant="body1">
      {this.state.errorMessage}
    </Typography>)

    return (
      <div style = {this.props.loading ? {'backdropFilter': 'blur(6px)'} : {}}>
        {
          this.props.loading && (  <Loading />)

        }
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

            <ValidatorForm className={classes.form}
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >

            <TextValidator
              variant="outlined"
              margin="normal"
              fullWidth
              required
              id="username"
              label="Username"
              name="username"
              value={username}
              autoComplete="username"
              autoFocus
              onChange={this.handleUsernameChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />

            <TextValidator
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={this.handlePasswordChange}
              autoComplete="current-password"
              validators={['required']}
              errorMessages={['this field is required']}
            />

            <FormControlLabel
              control={<Checkbox value={isRemember}  onChange={this.handleRememberChange} color="primary" />}
              label="Remember me"
            />

            {errorMessage}

            <Button

              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </ValidatorForm>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <RouterLink to="signup">
                <Typography  variant="body2">

                    {"Don't have an account? Sign Up"}

                  </Typography>
                </RouterLink>
              </Grid>
            </Grid>

        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      </div>
    );

  }
}


const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username,password) => {
      dispatch(actions.authLogin(username,password))
    }
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

const wrappedSignIn =  withStyles(useStyles)(SignIn)

export default connect(mapStateToProps,mapDispatchToProps)(wrappedSignIn)
