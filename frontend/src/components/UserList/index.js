import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from "@material-ui/core/Button";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import {Box} from "@material-ui/core";



const UsersTable = props => {
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];


        const classes = useStyles();

        return (
        <Box boxShadow={3}>
            <List className={classes.root}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar scr={''}>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="misiura" secondary="@mimi" />
                    <ListItemSecondaryAction>
                        <Button variant="contained" color="primary">
                            Запитати
                        </Button>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemAvatar>
                        <Avatar scr={''}>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="misiura" secondary="@mimi" />
                    <ListItemSecondaryAction>
                        <Button variant="contained" color="primary">
                            Запитати
                        </Button>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
</Box>

    );
};



export default UsersTable;