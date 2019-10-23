import React, { 
    useReducer, 
    createContext, 
    useEffect, 
    useContext 
} from 'react';
import { Redirect } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import AppReducers from '../reducers/AppReducers';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppActions from '../actions/AppActions';
import API from '../utils/API';

const initialState = {
    isMounted   : false,
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
    
    if(state.redirect && state.pathToRedirect){
        console.log(state.redirect, state.pathToRedirect);
        AppActions.redirectTo( dispatch, false ,null);
        return <Redirect push to={{ pathname: state.pathToRedirect }}/>
    } 
    else {
        return (children)
    }
}
export { AppContext, AppContextProvider };
