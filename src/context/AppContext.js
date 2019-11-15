import React, { 
    useReducer,
    useState,
    createContext, 
    useEffect,
    useContext 
} from 'react';
import { 
    Grid, 
    AppBar, 
    Typography
} from '@material-ui/core';
import NavigationBar from '../components/NavigationBar';
import AppReducers from '../reducers/AppReducers';
import AvatarUserInfo from '../components/AvatarUserInfo';
import AppBody from '../components/AppBody';

import { appStyles } from '../utils/styles';
const initialState = {
    isMounted     : false,
    showModal     : false,
    isSubmitting  : false,
    isAuth        : false,
    fingerprint   : null,
    userData      : null,
    redirect      : false,
    spendingList  : false,
    purchasesList : []
}

const AppContext =  createContext( initialState );

const AppContextProvider = ({ children }) => {
    const classes = appStyles();
    const [state, dispatch] = useReducer(AppReducers, initialState); 
    return (
        <AppContext.Provider value={ [state, dispatch] } >
            <div className={ classes.appWrapper }>
                <AppBar position='static' className={classes.appBar}>
                    <Grid container alignItems='center' justify='center' >
                        <Grid item xs={state.isAuth ? 6 : 12}>
                            <Typography 
                                className={classes.mainHeader}>
                                Roomies Expenses 
                            </Typography>
                        </Grid>
                        <AvatarUserInfo/>
                    </Grid>
                </AppBar>
                <AppBody>
                    { children }
                </AppBody>
                <div className={classes.push}/>
                <NavigationBar/>
            </div>
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider };


