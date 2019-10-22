import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, BottomNavigationAction, BottomNavigation } from '@material-ui/core';

const useStyles= makeStyles({ 
    root: { flexGrow: 1},
});

const NavigationBar = () => {
    const classes = useStyles();
    const [ value, setValue ] = useState(0);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
            >
                <BottomNavigationAction
                    component={Link}
                    to='/'
                    label="Home"
                />
                <BottomNavigationAction
                    component={Link}
                    to='/viewExpenses'
                    label="View"
                />
                <BottomNavigationAction
                    component={Link}
                    to='/addExpense'
                    label="Add"
                />
                <BottomNavigationAction
                    component={Link}
                    to='/removeExpense'
                    label="Remove"
                />
                
        </BottomNavigation>
    )
}

export default NavigationBar;
