import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '../Typography';
import ProductHeroLayout from '../StarLayout';
import Button from "@material-ui/core/Button";

const backgroundImage =
    'https://desseo.it/wp-content/uploads/2019/09/2414047-scaled.jpg';

const styles = (theme) => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        marginBottom:0,
        height: '100%'
    },
    button: {
        minWidth: 200,
        borderRadius: 0,
        marginBottom: theme.spacing(2),
        fontWeight: theme.typography.fontWeightMedium,
        fontFamily: theme.typography.fontFamilySecondary,
        padding: theme.spacing(2, 4),
        fontSize: theme.typography.pxToRem(14),
        boxShadow: 'none',
        '&:active, &:focus': {
            boxShadow: 'none',
        },
    },
    h5: {
        marginBottom: theme.spacing(5),
        marginTop: theme.spacing(11) ,
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(10),
        },

    },
    h2: {

        marginTop: theme.spacing(8) ,
        marginBottom: theme.spacing(8),

    },
    more: {
        marginTop: theme.spacing(),
    },
});

function ProductHero(props) {
    const { classes } = props;

    return (
        <ProductHeroLayout  backgroundClassName={classes.background}>

            <Typography color="inherit" align="center" variant="h2" marked="center" className={classes.h2}>
               Welcome to AskMe!
            </Typography>
            <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
                Learn new things about your friends and enjoy communication
            </Typography>
            <Button
                color="primary"
                variant="contained"

                className={classes.button}
                component="a"
                href="signup"
            >
                Register
            </Button>
            <Button
                color="primary"
                variant="contained"

                className={classes.button}
                component="a"
                href="signin"
            >
                Sign in
            </Button>

        </ProductHeroLayout>
    );
}

ProductHero.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
