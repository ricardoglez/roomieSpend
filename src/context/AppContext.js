import React, { 
    useReducer, 
    createContext, 
    useEffect,
    useState,
    useContext 
} from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Redirect } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import AppReducers from '../reducers/AppReducers';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppActions from '../actions/AppActions';
import API from '../utils/API';
import { userModel } from '../utils/common';


const initialState = {
    isMounted   : false,
    isSubmitting: false,
    isAuth      : false,
    fingerprint : null,
    userData    : null,
    redirect    : false,
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
    return (
        <AppContext.Provider value={ [state, dispatch] } >
            <div className={ classes.root }>
                <NavigationBar/>
                <Container maxWidth='md'>
                    <AppBody>
                    { children }
                    </AppBody>
                </Container>
            </div>
        </AppContext.Provider>
    )
}

const AppBody = ({ children }) => {
    let [state , dispatch] = useContext(AppContext);
    
    useEffect( () => {
        console.log('User State');
        API.getUserData()
        .then( response => {
            console.log(response);
            const userObj = new userModel( response.data.uid, response.data.displayName, response.data.lastLogin, response.data.refreshToken );
            AppActions.updateUserData(dispatch, userObj);
            AppActions.updateAuthState(dispatch, true);
            AppActions.updateMounted(dispatch, true);
        })
        .catch( error => {
            console.error(error);
            AppActions.updateMounted(dispatch, true);
        })
    },[])

    if(state.redirect && state.pathToRedirect){
        console.log(state.redirect, state.pathToRedirect);
        AppActions.redirectTo( dispatch, false ,null);
        return <Redirect push to={{ pathname: state.pathToRedirect }}/>
    } 
    else if( state.isMounted && !state.isSubmitting ) {
        return (children)
    }
    else {
        return (<LinearProgress color="secondary" variant="query" />)
    }
}
export { AppContext, AppContextProvider };
