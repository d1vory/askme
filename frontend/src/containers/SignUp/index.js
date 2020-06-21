import React from 'react';
import {Avatar,Button,CssBaseline,TextField,
        Link,Grid,Box,Typography,Container} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import {Link as RouterLink} from 'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import * as actions from '../../store/actions/auth'

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      username: '',
      email: '' ,
      password: '',
      repeatPassword:'',
      firstName: '',
      lastName: ''

    }
  }

  componentDidMount() {
       // custom rule will have name 'isPasswordMatch'
       ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
           if (value !== this.state.password) {
               return false;
           }
           return true;
       });
   }

   componentWillUnmount() {
        // remove rule when it is not needed
        ValidatorForm.removeValidationRule('isPasswordMatch');
    }

  handlePasswordChange = (event) => {
    const password = event.target.value;
    this.setState({password:password})
  }

  handleRepeatPasswordChange = (event) => {
    const repeatPassword = event.target.value;
    this.setState({repeatPassword:repeatPassword})
  }

  handleUsernameChange = (event) => {
    this.setState({username:event.target.value})
  }

  handleEmailChange = (event) => {
    this.setState({email:event.target.value})
  }

  handleFirstNameChange = (event) => {
    this.setState({firstName:event.target.value})
  }

  handleLastNameChange = (event) => {
    this.setState({lastName:event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.username,this.state.email,this.state.password,this.state.repeatPassword)
    console.log(this.state)
    //this.props.history.push('/wall')
  }


  render(){
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

            <ValidatorForm className={classes.form} onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value = {this.state.firstName}
                  onChange={this.handleFirstNameChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value = {this.state.lastName}
                  onChange={this.handleLastNameChange}
                />
              </Grid>
              <Grid item xs={12}>

                <TextValidator
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  id="email"
                  label="Email"
                  name="username"
                  value={this.state.email}
                  autoFocus
                  onChange={this.handleEmailChange}
                  validators={['required' , 'isEmail']}
                  errorMessages={['this field is required', 'email is not valid']}
                />

              </Grid>
              <Grid item xs={12}>

                <TextValidator
                    variant="outlined"
                    fullWidth
                    label="Password"
                    onChange={this.handlePasswordChange}
                    name="password"
                    type="password"
                    id="password1"

                    value={this.state.password}
                    validators={['matchRegexp:^(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,20})$', 'required']}
                    errorMessages={['password is too simple', 'this field is required']}
                />
              </Grid>

              <Grid item xs={12}>
                <TextValidator
                    variant="outlined"
                    required
                    fullWidth
                    label="Repeat password"
                    onChange={this.handleRepeatPasswordChange}
                    name="repeatPassword"
                    type="password"
                    id="repeatPassword"
                    validators={['isPasswordMatch', 'required']}
                    errorMessages={['password mismatch', 'this field is required']}
                    value={this.state.repeatPassword}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <RouterLink to="signin">
                <Link href="" variant="body2">
                  Already have an account? Sign in
                </Link>
              </RouterLink>
              </Grid>
            </Grid>
          </ValidatorForm>

        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

const wrappedSignUp =  withStyles(useStyles)(SignUp)

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username,email,password1,password2) => {
      console.log("posted values: ",username,email,password1,password2);
      dispatch(actions.authSignUp(username,email,password1,password2))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(wrappedSignUp)
