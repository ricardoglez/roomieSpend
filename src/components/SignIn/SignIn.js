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
    CircularProgress,
    FormHelperText,
    Grid, 
    Paper,
    Typography,
    Button
} from '@material-ui/core';
import Joi from '@hapi/joi';
import API from '../../utils/API';
import { emailError, passwordError } from '../../utils/common';  
import { userModel } from '../../utils/common';
import AppActions from '../../actions/AppActions';
import {AppContext} from '../../context/AppContext';
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
    inputFlex:{
        flexGrow:1,
        display:'flex',

    },
    inputIcon:{
        width:'20%'
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

const SignIn = () => {
    let [state, dispatch]  =useContext(AppContext);
    //Email props
    let [email, handleEmail] = useState(null);
    let [isEmailCorrect, handleEmailValidation] = useState(true);
    let [emailErrorMessage, handleEmailErrorMessage] = useState(emailError);
    //Username props
    let [username, handleUsername] = useState(null);
    let [isSearchingUsername, handleSearchUsername] = useState(false);
    let [isUsernameCorrect, handleUsernameValidation] = useState(true);
    let [usernameErrorMessage, handleUsernameErrorMessage] = useState('');
    //TeamID props
    let [teamname, handleTeamname] = useState(null);
    let [isTeamnameCorrect, handleTeamValidation] = useState(true);
    let [teamnameErrorMessage, handleTeamnameErrorMessage] = useState('');
    //Password props
    let [password, handlePassword] = useState(null);
    let [isPasswordCorrect, handlePasswordValidation] = useState(false);
    let [passwordErrorMessage, handlePasswordErrorMessage] = useState(passwordError);
    //FormState Props
    let [isReadyToSubmit, handleIsReady] = useState(false) 
    let [isSubmitting , handleSubmitting] = useState(false);

    const signInUser = () => {
        handleEmailErrorMessage(emailError);
        handleSubmitting(true);
        const signInObj = {
            email, password, username
        };

        API.signIn(signInObj)
        .then( response => {
            handleSubmitting(false);
            console.log(response);
            const userObj = new userModel( 
                response.user.uid, 
                username, 
                response.user.metadata.lastSignInTime, 
                response.user.refreshToken,
            );

            AppActions.updateUserData(dispatch, userObj);
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

    const checkAvailability = () => {

        if( username.length < 4){ return }
        handleSearchUsername(true);
        API.checkUsernameAvailability( username )
        .then( response => {
            console.log(response);
            if(response.success && response.isAvailable){
                handleSearchUsername(false);        
                handleUsernameValidation(true);
                handleUsernameErrorMessage(null);
            } else {
                handleSearchUsername(false);
                handleUsernameValidation(false);
                handleUsernameErrorMessage('Este apodo ya esta ocupado')
            }
        } )
        .catch( error => {

        });
    }

    const mapError = ( error )=> {
        console.log(error.code);
        switch( error.code ){
            case 'auth/email-already-in-use':
                handleEmailValidation(false);
                handleEmailErrorMessage(error.message);
                break;
            case 'auth/invalid-email':
                handleEmailValidation(false);
                handleEmailErrorMessage(error.message);
                break;
            case 'auth/operation-not-allowed':
                break;
            case 'auth/weak-password':
                handlePasswordValidation(false);
                handlePasswordErrorMessage(error.message);
                break;
        }
    }

    //Effect to validate username
    useEffect(() => {
        if( username === null ){ return}
        let usernameSchema = Joi.string().min(4).required();
        let validUsername = usernameSchema.validate(username);
        if( validUsername.hasOwnProperty('error') ){
            handleUsernameValidation(false);
            handleUsernameErrorMessage('El apodo debe de tener un mínimo de 4 carácteres');
        }
        else {
            handleUsernameValidation(true);
        }
    }, [username]);
    //Effect to validate email
    useEffect(() => {
        if( email === null ){ return}
        let emailSchema = Joi.string().email().required();
        let validEmail = emailSchema.validate(email);
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
        let passwordSchema = Joi.string().alphanum().min(6).required();
        let validPass = passwordSchema.validate(password);
        if(validPass.hasOwnProperty('error') ){
            handlePasswordValidation(false);
            handlePasswordErrorMessage(passwordError);
        }
        else {
            handlePasswordValidation(true);
        }
    }, [password]);

    useEffect( () => {
        if( isPasswordCorrect && isEmailCorrect && isUsernameCorrect ){
            handleIsReady(true);
        }
        else {
            handleIsReady(false);
        }
    } ,[ isPasswordCorrect, isEmailCorrect, isUsernameCorrect])

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
                        Regístrate 
                    </FormLabel>
                    <FormGroup >
                        <FormControl>
                        <Grid container alignItems="center">
                            <Grid item xs={isSearchingUsername ? 9 : 12} className={classes.textField}>
                                <TextField
                                    id="username"
                                    error={ username != null && !isUsernameCorrect }
                                    name="username"
                                    label="Apodo"
                                    defaultValue=""
                                    className={ classes.inputFlex } 
                                    margin="normal"
                                    variant="outlined"
                                    onBlur={checkAvailability}
                                    onChange={( e ) => { handleUsername(e.target.value) } }
                                />
                                {
                                    username  === null 
                                    ? null 
                                    : isUsernameCorrect ? 
                                    <FormHelperText success > Este apodo esta disponible </FormHelperText>
                                    :
                                    <FormHelperText error > { usernameErrorMessage } </FormHelperText>
                                }
                            </Grid>
                            {
                                isSearchingUsername
                                ?
                                <Grid item xs='2'>
                                   <CircularProgress />
                                </Grid>
                                :
                                null
                            }
                        </Grid>
                        </FormControl>
                        <FormControl>
                            <TextField
                                id="email"
                                error={ email != null && !isEmailCorrect }
                                name="email"
                                label="Correo electrónico"
                                defaultValue=""
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                onChange={( e ) => { handleEmail(e.target.value) } }
                            />
                            {
                                email  === null|| isEmailCorrect ? null :
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
                        onClick={signInUser}
                        >
                        Regístrame
                    </Button>
                </Grid>
                <Grid container direction='column' justify='center'>
                    <Typography>
                        ó si ya tienes una cuenta <Link to='/ingresar'> Ingresa </Link> a la palicación
                    </Typography>
                </Grid> 
            </Paper>   
         </Grid>
    </Grid>
    )
}

export default SignIn;