import React, { useState, useEffect  } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField,Typography

} from '@material-ui/core';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios'



const useStyles = makeStyles(() => ({
    root: {}
}));

const AccountDetails = props => {
    const { className, ...rest } = props;

    const classes = useStyles();

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        image: null,
        selfDescription:'',
        birthday:(new Date())
    });

    const fetchValues = () => {
      let url ='http://127.0.0.1:8000/api/account/info/'
      axios.get(url,{
          headers: {
            'Authorization' : `Token ${props.token}`
          }
      }).then(res => {
          //console.log("FETCHED   " ,res.data);
          setValues({
            ...values,
            firstName: res.data.first_name,
            lastName: res.data.last_name,
            username: res.data.username,
            email: res.data.email,
            selfDescription:res.data.selfDescription,
            birthday: new Date(res.data.DateOfBirth.replace('T', ' '))
          })

        }).catch(error => (console.log(error)))
    }


    useEffect(() => {
      if( props.token){
        fetchValues();
      }

    }, [props.token])


    const handleChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleDateChange = (date) => {
      setValues({
        ...values,
        birthday:date
      })
    };

    const handleImageChange = event => {
          setValues({
            ...values,
            image: event.target.files[0]
          })
    }

    const putChanges = () => {
      let form_data = new FormData();
      if(values.image){
          form_data.append('avatar',values.image, values.image.name );
      }

      if(values.selfDescription){
        form_data.append('selfDescription',values.selfDescription)
      }
      const transformedDate = values.birthday.toISOString().substring(0,10)

      if(values.username){
        form_data.append('username',values.username)
      }
      form_data.append('DateOfBirth',transformedDate )
      form_data.append('first_name' , values.firstName)
      form_data.append('last_name' , values.lastName,)
      form_data.append('email', values.email,)


      const config = {
        headers: {
          'Authorization' : `Token ${props.token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.patch(`http://127.0.0.1:8000/api/account/settings/update/`,form_data,config)
        .then(res => {
            props.openInfo('Settings updated','success')
          })
        //  props.openInfo(err.response.data.message, 'error')
        .catch(err =>{
          //console.log(err.response);
          let temp = err.response.data
          if(typeof temp === 'object' && temp !== null){
            temp = Object.values(temp)
          }
          props.openInfo(temp[0], 'error')

        } )
    }

    const handleSubmit = event => {
        putChanges();
    }


    return (
        <Card {...rest} className={clsx(classes.root, className)} >
            <form autoComplete="off" noValidate >
                <CardHeader title="User information"/>
                <Divider />
                <CardContent>
                    <Grid  container  spacing={3} >
                        <Grid item md={6} xs={12} >
                            <TextField
                                fullWidth
                                label="first name"
                                margin="dense"
                                name="firstName"
                                onChange={handleChange}
                                required
                                value={values.firstName}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                label="last name"
                                margin="dense"
                                name="lastName"
                                onChange={handleChange}
                                required
                                value={values.lastName}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12} >
                            <TextField
                                fullWidth
                                label="Email"
                                margin="dense"
                                name="email"
                                onChange={handleChange}
                                required
                                value={values.email}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12} >
                            <TextField
                                fullWidth
                                label="username"
                                margin="dense"
                                name="username"
                                onChange={handleChange}
                                required
                                value={values.username}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              margin="normal"
                              id="date-picker-dialog"
                              label="Birthday"
                              format="MM/dd/yyyy"
                              value={values.birthday}
                              onChange={handleDateChange}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <Typography>
                            Avatar
                          </Typography>
                          <input type="file"
                                id="image"
                                  accept="image/png, image/jpeg"  onChange={handleImageChange} required/>
                        </Grid>

                        <Grid item md={6} xs={12} >
                            <TextField
                                fullWidth
                                multiline={true}
                                rows={3}
                                label="About yourself"
                                margin="dense"
                                name="selfDescription"
                                onChange={handleChange}
                                value={values.selfDescription}
                                variant="outlined"
                            />


                        </Grid>

                    </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSubmit}
                    >
                       Save
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
};

AccountDetails.propTypes = {
    className: PropTypes.string
};




const mapStateToProps = state => {
  return {
    token: state.token
  }
}



export default connect(mapStateToProps)(AccountDetails)
