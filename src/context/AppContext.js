import React, { 
    useReducer, 
    createContext, 
    useEffect, 
    useContext 
} from 'react';
import NavigationBar from '../components/NavigationBar';
import AppReducers from '../reducers/AppReducers';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { firebaseUtils } from '../utils/firebaseUtils';

import API from '../utils/API';

const initialState = {
    isMounted   : false,
    isAuth      : false,
    fingerprint : null,
    spendingList: false,
}

const useStyles = makeStyles( theme => ({
    root: {
      flexGrow: 1,
    }
}));

const AppContext =  createContext( initialState );

const AppContextProvider = ({ children }) => {
    const classes = useStyles();
    const value = useReducer(AppReducers, initialState);

    useEffect(() => {
       API.fetchPurchases()
       .then( response => {
           console.log(response);
       } )
       .catch( error => {
           console.error(error);
       })
    }, []);

    return (
        <AppContext.Provider value={ value } >
            <div className={ classes.root }>
                <NavigationBar/>
                <Container maxWidth='md'>
                    { children }
                </Container>
            </div>
        </AppContext.Provider>
    )
}


export { AppContext, AppContextProvider };
