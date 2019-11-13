import React, { 
    useReducer,
    useState,
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
    Avatar,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavigationBar from '../components/NavigationBar';
import TransitionModal from '../components/TransitionModal';
import AppReducers from '../reducers/AppReducers';
import AppActions from '../actions/AppActions';
import API from '../utils/API';
import numeral from 'numeral';

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
                <NavigationBar/>
            </div>
        </AppContext.Provider>
    )
}

const AvatarUserInfo = ( ) => {
    const [state, dispatch] = useContext(AppContext);
    if( !state.isAuth ){ return null }
    const classes = appStyles()

    const [totalDebt , updateDebt] = useState( 0 );

    useEffect( () => {
        const totD =  Object.keys(state.userData.debt).reduce( ( acc, curr ) => {
                console.log( curr, acc, state.userData.debt[curr] );
                if(state.userData.debt[curr].payed ){
                    return acc
                }
                else {
                    return acc += state.userData.debt[curr].debtQnty 
                }
            } , 0)
        updateDebt( totD );
    }, [state.userData]);

    return ( 
        <Grid item xs={ 6 }>
            <Grid justify='flex-end' alignItems="center" container direction='row'>
                <Grid item>
                    <Avatar>{state.userData.displayName.slice(0,2)}</Avatar>
                </Grid>
                <Grid item className={classes.userData}>
                    <Grid container justify="center" direction='column'>
                        <Grid item>
                            <Typography> <strong>Deuda</strong> </Typography>
                        </Grid>
                        <Grid item>
                            <Typography> { numeral(totalDebt).format('$0,000.0') } </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

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
                <Grid item xs={12}>
                    <LinearProgress />
                </Grid>
                : 
                children
                }
            </Grid>
        )
    }
}
export { AppContext, AppContextProvider };


