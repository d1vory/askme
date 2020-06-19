import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";

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
