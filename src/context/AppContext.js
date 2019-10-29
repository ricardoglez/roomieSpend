import React, { 
    useReducer, 
    createContext, 
    useEffect,
    useContext 
} from 'react';
import { Redirect } from 'react-router-dom';
import { 
    Container, 
    Grid, 
    LinearProgress, 
    AppBar, 
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavigationBar from '../components/NavigationBar';
import TransitionModal from '../components/TransitionModal';
import AppReducers from '../reducers/AppReducers';
import AppActions from '../actions/AppActions';
import API from '../utils/API';
import { userModel } from '../utils/common';


const initialState = {
    isMounted   : false,
    showModal   : false,
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
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      appBar: {
        marginBottom: theme.spacing(2),
        textAlign: 'center'
      },
      mainHeader:{
          padding:theme.spacing(1)
      }
}));

const AppContext =  createContext( initialState );

const AppContextProvider = ({ children }) => {
    const classes = useStyles();
    const [state, dispatch] = useReducer(AppReducers, initialState); 
    return (
        <AppContext.Provider value={ [state, dispatch] } >
            <div className={ classes.root }>
                <AppBar position='static' className={classes.appBar}> 
                    <Typography className={classes.mainHeader}>Roomies Expenses</Typography> 
                </AppBar>
                <Container maxWidth='md'>
                    <AppBody>
                    { children }
                    </AppBody>
                </Container>
                <NavigationBar/>
            </div>
        </AppContext.Provider>
    )
}

const AppBody = ({ children, ...options }) => {
    let [state , dispatch] = useContext(AppContext);
    
    useEffect( () => {
        API.getUserData()
        .then( response => {
            const userObj = new userModel( response.data.uid, response.data.displayName, response.data.lastLogin, response.data.refreshToken );
            AppActions.updateUserData(dispatch, userObj);
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
            <Grid container justify='center' alignItems='center'>
                <TransitionModal content={ state.modalContent } />
                { !state.isMounted || state.isSubmitting 
                ? 
                <LinearProgress color="secondary" variant="query" />
                : 
                children
                }
            </Grid>
        )
    }
}
export { AppContext, AppContextProvider };
