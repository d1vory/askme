import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField,
    TextareaAutosize
} from '@material-ui/core';
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
const useStyles = makeStyles(() => ({
    root: {}
}));

const AccountDetails = props => {
    const { className, ...rest } = props;

    const classes = useStyles();

    const [values, setValues] = useState({
        firstName: 'Shen',
        lastName: 'Zhi',
        email: 'shen.zhi@devias.io',
        phone: '',
        sex: 'female',
        country: 'USA',
        day:'12',
        month:'april',
        year:'2000',
        about_me:'fghjkl;juihy'
    });

    const handleChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const sex = [
        {
            value: 'male',
            label: 'чоловік'
        },
        {
            value: 'female',
            label: 'жінка'
        },

    ];
    const monthes = [
        {
            value: 'january',
            label: 'Січень'
        },
        {
            value: 'february',
            label: 'Лютий'
        },
        {
            value: 'march',
            label: 'Березень'
        },
        {
            value: 'april',
            label: 'Квітень'
        },
        {
            value: 'may',
            label: 'Травень'
        },
        {
            value: 'june',
            label: 'Червень'
        },
        {
            value: 'july',
            label: 'Серпень'
        },
        {
            value: 'august',
            label: 'Липень'
        },
        {
            value: 'september',
            label: 'Вересень'
        },
        {
            value: 'october',
            label: 'Жовтень'
        },
        {
            value: 'november',
            label: 'Листопат'
        },
        {
            value: 'december',
            label: 'Грудень'
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
                    title="Інформація користувача"
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
                                label="Ім'я"
                                margin="dense"
                                name="firstName"
                                onChange={handleChange}
                                required
                                value={"Анастасія"}
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
                                label="Прізвище"
                                margin="dense"
                                name="lastName"
                                onChange={handleChange}
                                required
                                value={"Місюра"}
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
                                label="Ім'я користувача"
                                margin="dense"
                                name="username"
                                onChange={handleChange}

                                value={"mimi"}
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
                                label="Ваша стать"
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
                            <TextField
                                fullWidth
                                label="Країна"
                                margin="dense"
                                name="country"
                                onChange={handleChange}
                                required
                                value={values.country}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="День"
                                margin="dense"
                                name="day"
                                onChange={handleChange}
                                type="number"
                                value={values.day}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Місяць"
                                margin="dense"
                                name="month"
                                onChange={handleChange}
                                required
                                select
                                // eslint-disable-next-line react/jsx-sort-props
                                SelectProps={{ native: true }}
                                value={values.month}
                                variant="outlined"
                            >
                                {monthes.map(option => (
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
                            md={4}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Рік"
                                margin="dense"
                                name="year"
                                onChange={handleChange}
                                type="number"
                                value={values.year}
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
                                multiline={true}
                                rows={3}
                                label="Про мене"
                                margin="dense"
                                name="about_me"
                                onChange={handleChange}
                                value={values.about_me}
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
                    >
                       Зберегти
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
};

AccountDetails.propTypes = {
    className: PropTypes.string
};

export default AccountDetails;