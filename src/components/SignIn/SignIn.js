import React, { useState, useEffect } from 'react';
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
import API from '../../utils/API';

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

const emailError = 'Ingresa un email válido'; 
const passwordError = 'La contraseña debe de tener al menos 6 caracteres (Solamente números y letras)'; 

const SignIn = () => {
    let [email, handleEmail] = useState(null);
    let [isEmailCorrect, handleEmailValidation] = useState(true);
    let [emailErrorMessage, handleEmailErrorMessage] = useState(emailError);
    let [password, handlePassword] = useState(null);
    let [isPasswordCorrect, handlePasswordValidation] = useState(true);
    let [passwordErrorMessage, handlePasswordErrorMessage] = useState(passwordError);
    let [isReadyToSubmit, handleIsReady] = useState(false) 

    const signInUser = () => {
        handleEmailErrorMessage(emailError);
        const signInObj = {
            email, password
        };

        API.signIn(signInObj)
        .then( response => {
            console.log(response);
        })
        .catch(error => {
            console.error('Error While SingIn');
            mapError(error);
        })
    };

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
                        Regístrate 
                    </FormLabel>
                    <FormGroup >
                        <FormControl>
                            <TextField
                                id="email"
                                error={ !isEmailCorrect }
                                name="email"
                                label="Correo electrónico"
                                defaultValue=""
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                onChange={( e ) => { handleEmail(e.target.value) } }
                            />
                            {
                                isEmailCorrect ? null :
                                <FormHelperText error > { emailErrorMessage } </FormHelperText>
                            }
                        </FormControl>
                        <FormControl>
                            <TextField
                                type='password'
                                id="password"
                                error={ !isPasswordCorrect }
                                name="password"
                                label="Contraseña"
                                defaultValue=""
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                onChange={( e ) => { handlePassword(e.target.value) } } 
                            />
                             {
                                isPasswordCorrect ? null :
                                <FormHelperText error > Tu contraseña debe de tener al menos 6 caracteres </FormHelperText>
                            }
                        </FormControl>
                    </FormGroup>
                    <Button 
                        variant="contained" 
                        disabled={ !isReadyToSubmit } 
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