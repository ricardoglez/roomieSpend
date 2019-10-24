import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, BottomNavigationAction, BottomNavigation } from '@material-ui/core';
import { AppContext } from '../../context/AppContext';
import AppActions from '../../actions/AppActions';
import API from '../../utils/API';

const useStyles= makeStyles({ 
    root: { flexGrow: 1},
});

const NavigationBar = () => {
    const [state, dispatch] = useContext(AppContext);
    const classes = useStyles();
    const [ value, setValue ] = useState(0);

    const logout = () => {
        API.logOut()
        .then( response => {
            console.log(response);
           AppActions.updateAuthState(dispatch , false);
           AppActions.updateUserData(dispatch , null);
           AppActions.redirectTo(dispatch, true , '/');
        } )
        .catch( error => {
            console.error(error);
        } );
    }


    if( !state.isMounted){
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
                        label="Espera un momento"
                    />
            </BottomNavigation>
        )
    }
    else if( !state.isAuth ){
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
                        label="Inicio"
                    />
                    <BottomNavigationAction
                        component={Link}
                        to='/ingresar'
                        label="Ingresar"
                    />
                    <BottomNavigationAction
                        component={Link}
                        to='/crear_cuenta'
                        label="Crear Cuenta"
                    />
            </BottomNavigation>
        )
    }

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
                    label="Inicio"
                />
                <BottomNavigationAction
                    component={Link}
                    to='/viewExpenses'
                    label="Lista de gastos"
                />
                <BottomNavigationAction
                    onClick={ logout }
                    label="Cerrar sesión"
                />
                
        </BottomNavigation>
    )
}

export default NavigationBar;
