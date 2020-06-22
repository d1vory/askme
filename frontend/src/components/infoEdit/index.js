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
import axios from 'axios'
import ImageUpload from './ImageUpload'
// import InputLabel from "@material-ui/core/InputLabel";
// import Input from "@material-ui/core/Input";
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
        sex: '',
        image: null,
        about_me:''
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
            sex: res.data.gender
          })

        }).catch(error => (console.log(error)))
    }


    useEffect(() => {

      console.log("mounted ", props.token);
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
      form_data.append('first_name' , values.firstName)
      form_data.append('last_name' , values.lastName,)
      form_data.append('email', values.email,)
      form_data.append('gender',  values.sex)
      const postData = {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          gender: values.sex,
          avatar: values.image
      }
      const config = {
        headers: {
          'Authorization' : `Token ${props.token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.patch(`http://127.0.0.1:8000/api/account/settings/update/`,form_data,config)
        .then(res => {
            console.log("OOOOKKKK");
          })

        .catch(err => console.log(err))
    }

    const handleSubmit = event => {
        putChanges();
    }

    const sex = [
        {
            value: 'male',
            label: 'male'
        },
        {
            value: 'female',
            label: 'female'
        },

    ];
    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <form
                autoComplete="off"
                noValidate
            >
                <CardHeader
                   // subheader="The information can be edited"
                    title="User information"
                />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
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
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
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
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
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
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
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
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Sex"
                                margin="dense"
                                name="state"
                                onChange={handleChange}
                                required
                                select
                                // eslint-disable-next-line react/jsx-sort-props
                                SelectProps={{ native: true }}
                                value={values.sex}
                                variant="outlined"
                            >
                                {sex.map(option => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>


                        <Grid
                            item
                            md={6}
                            xs={12}
                        >

                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                multiline={true}
                                rows={3}
                                label="About yourself"
                                margin="dense"
                                name="about_me"
                                onChange={handleChange}
                                value={values.about_me}
                                variant="outlined"
                            />


                        </Grid>

                        <Grid item md={6} xs={12}>
                          <Typography>
                            Avatar
                          </Typography>
                          <input type="file"
                                id="image"
                                  accept="image/png, image/jpeg"  onChange={handleImageChange} required/>
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
