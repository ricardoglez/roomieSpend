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

import API from '../../utils/API';

const useStyles = makeStyles(theme => { 
    console.log(theme)
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

const SignIn = () => {
    let [username, handleUsername] = useState('');
    let [email, handleEmail] = useState('');
    let [isEmailCorrect, handleEmailError] = useState(true);
    let [password, handlePassword] = useState('');
    let [isPasswordCorrect, handlePasswordError] = useState(true);
    let [passwordConfirmation, handlePasswordConfirmation] = useState('');
    let [isReadyToSubmit, handleIsReady] = useState(false) 
    let [error, handleError] = useState(null);

    const signInUser = () => {
        const signInObj = {
            email, password
        };

        API.signIn(signInObj)
        .then( response => {
            console.log(response);
        })
        .catch(error => {
            console.error('Error While SingIn');
            console.error(error);
            mapError(error);
        })
    };

    const mapError = ( error )=> {
        
        switch( error.code ){
            case 'auth/email-already-in-use':
                break;
            case 'auth/invalid-email':
                break;
            case 'auth/operation-not-allowed':
                break;
            case 'auth/weak-password':
                break;
        }
    }

    useEffect( () => {
        if( password && email && isPasswordCorrect && isEmailCorrect ){
            handleIsReady(true);
        }
        else {
            handleIsReady(false);
        }
    } ,[ email, password])

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