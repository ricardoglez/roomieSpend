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
import AppActions from '../actions/AppActions';
import API from '../utils/API';

const initialState = {
    isMounted   : false,
    isAuth      : false,
    fingerprint : null,
    userData    : null,
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
    const [state, dispatch] = useReducer(AppReducers, initialState);

    const updateUD = ( data ) => {
        AppActions.updateUserData( dispatch, data );
    }

    useEffect(() => {
        API.getUserData()
        .then( response => {
            console.log(response)
            if( response.success ){
                //AppActions.updateAuthState( dispatch, true );
            }
        })
        .catch(error => {
            console.error(error);
        })
    //    API.fetchPurchases()
    //    .then( response => {
    //        console.log(response);
    //    } )
    //    .catch( error => {
    //        console.error(error);
    //    })
    }, []);

    return (
        <AppContext.Provider value={ [state, dispatch] } >
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
