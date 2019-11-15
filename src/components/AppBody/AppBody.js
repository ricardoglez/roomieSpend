import React, { useEffect, useContext } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { Redirect } from 'react-router-dom';


import TransitionModal from '../TransitionModal';
import API from '../../utils/API';
import { appStyles } from '../../utils/styles';
import AppActions from '../../actions/AppActions';
import { AppContext } from '../../context/AppContext';

const AppBody = ({ children, ...options }) => {
    const [state , dispatch] = useContext(AppContext);
    const classes = appStyles();
    useEffect( () => {
        API.getUserData()
        .then( response => {
            AppActions.updateUserData(dispatch, response.data);
            AppActions.updateAuthState(dispatch, true);
            AppActions.updateMounted(dispatch, true);
        })
        .catch( error => {
            console.error(error);
            AppActions.updateMounted(dispatch, true);
        })
    },[]);

    if(state.redirect && state.pathToRedirect){
        console.log(state.redirect, state.pathToRedirect);
        AppActions.redirectTo( dispatch, false ,null);
        return <Redirect push to={{ pathname: state.pathToRedirect }}/>
    } else {
        return ( 
            <Grid className={classes.pageContent} container justify='center' alignItems='center'>
                <TransitionModal content={ state.modalContent } />
                { !state.isMounted || state.isSubmitting 
                ? 
                <Grid container justify="center" alignItems="center">
                    <CircularProgress />
                </Grid>
                : 
                children
                }
            </Grid>
        )
    }
}

export default AppBody;