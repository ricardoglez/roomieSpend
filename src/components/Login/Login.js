import React, { useState, useEffect, useContext } from 'react';
import * as  firebaseui from 'firebaseui';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import { 
    FormGroup, 
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    TextField,
    FormHelperText,
    Grid, 
    Paper,
    Typography,
    Button
} from '@material-ui/core';
import Joi from '@hapi/joi';
import validations from '../../utils/validations';
import API from '../../utils/API';
import { emailError, passwordError } from '../../utils/common';  
import AppActions from '../../actions/AppActions';
import { AppContext } from '../../context/AppContext';
import { userModel } from '../../utils/common';
const useStyles = makeStyles(theme => { 
    return {
    root:{
        flexGrow: 1
    },
    formWrap:{
        marginTop:theme.spacing(5),
        padding: theme.spacing(2),
        textAlign: 'center',
        background:theme.palette.background.default,
        boxShadow: theme.shadows[4]
    },
    formGroup:{
        display:'flex',
        flexDirection:'column',
        width:'80%',
        alignItems:'center'
    },
    textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
      },
      button: {
          margin: theme.spacing(2)
      }
}
});

const Login = () => {
    let [state, dispatch]  =useContext(AppContext);
    let [email, handleEmail] = useState(null);
    let [isEmailCorrect, handleEmailValidation] = useState(false);
    let [emailErrorMessage, handleEmailErrorMessage] = useState(emailError);
    let [password, handlePassword] = useState(null);
    let [isPasswordCorrect, handlePasswordValidation] = useState(false);
    let [passwordErrorMessage, handlePasswordErrorMessage] = useState(passwordError);
    let [isReadyToSubmit, handleIsReady] = useState(false);
    let [isSubmitting , handleSubmitting] = useState(false);
    
    const logInUser = ( ) => {
        handleEmailErrorMessage(emailError);
        handleSubmitting(true);
        const signInObj = {
            email, password
        };

        API.logIn(signInObj)
        .then( response => {
            console.log(response);
            handleSubmitting(false);
            AppActions.updateUserData(dispatch, response.data);
            AppActions.updateAuthState(dispatch, true);
            AppActions.redirectTo(dispatch, true, '/viewExpenses');
        })
        .catch(error => {
            console.error('Error While SingIn');
            console.error(error);
            handleSubmitting(false);            
            mapError(error);
        })
    };

    const mapError = ( error )=> {
        console.log(error.code);
        switch( error.code ){
            case 'auth/invalid-email':
                handleEmailValidation(false);
                handleEmailErrorMessage(error.message);
                break;
            case 'auth/user-disabled':
                handleEmailValidation(false);
                handleEmailErrorMessage(error.message);
                break;
            case 'auth/user-not-found':
                handleEmailValidation(false);
                handleEmailErrorMessage(error.message);    
                break;
            case 'auth/wrong-password':
                handlePasswordValidation(false);
                handlePasswordErrorMessage(error.message);
                break;
        }
    }

    //Effect to validate email
    useEffect(() => {
        if( email === null ){ return}
        let validEmail = validations.emailRequired.validate(email);
        if( validEmail.hasOwnProperty('error') ){
            handleEmailValidation(false);
            handleEmailErrorMessage(emailError);
        }
        else {
            handleEmailValidation(true);
        }
    }, [email]);
    //Effect to validate password
    useEffect(() => {
        if(password === null){ return }
        let validPass = validations.passwordRequired.validate(password);
        if(validPass.hasOwnProperty('error') ){
            handlePasswordValidation(false);
            handlePasswordErrorMessage(passwordError);
        }
        else {
            handlePasswordValidation(true);
        }
    }, [password]);

    useEffect( () => {
        if( isPasswordCorrect && isEmailCorrect ){
            handleIsReady(true);
        }
        else {
            handleIsReady(false);
        }
    } ,[ isPasswordCorrect, isEmailCorrect])

    const classes = useStyles();
    return (
    <Grid 
        container
        direction='row'
        justify='center'
        alignItems='center'
     >
         <Grid item xs={12} lg={8}>
            <Paper className={classes.formWrap} square={false}>
                <Grid container direction='column' justify='center'>
                    <FormLabel>
                        Ingresa 
                    </FormLabel>
                    <FormGroup >
                        <FormControl>
                            <TextField
                                id="email"
                                name="email"
                                error={ email != null && !isEmailCorrect }
                                label="Correo electrónico"
                                defaultValue=""
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                onChange={( e ) => { handleEmail(e.target.value) } }
                            />
                             {
                                email === null || isEmailCorrect ? null :
                                <FormHelperText error > { emailErrorMessage } </FormHelperText>
                            }
                        </FormControl>
                        <FormControl>
                            <TextField
                                type='password'
                                id="password"
                                error={ password != null && !isPasswordCorrect }
                                name="password"
                                label="Contraseña"
                                defaultValue=""
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                onChange={( e ) => { handlePassword(e.target.value) } } 
                            />
                            {
                                password === null || isPasswordCorrect ? null :
                                <FormHelperText error > {passwordErrorMessage} </FormHelperText>
                            }
                        </FormControl>
                    </FormGroup>
                    <Button 
                        variant="contained" 
                        disabled={ !isReadyToSubmit || isSubmitting } 
                        component="span" 
                        className={classes.button}
                        onClick={ logInUser }
                        >
                        Ingresar
                    </Button>
                </Grid>
                <Grid container direction='column' justify='center'>
                    <Typography>
                        ó <Link to='/crear_cuenta'> crea una cuenta </Link>
                    </Typography>
                </Grid> 
            </Paper>   
         </Grid>
    </Grid>
    )
}

export default Login;