import React, { useState, useEffect, useContext } from 'react';
import * as  firebaseui from 'firebaseui';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import { 
    FormGroup, 
    FormControl, 
    FormLabel, 
    TextField,
    Input,
    InputLabel,
    MenuItem,
    Select,
    CircularProgress,
    LinearProgress,
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
        marginTop:theme.spacing(1),
        padding: theme.spacing(1),
        textAlign: 'center',
        background:theme.palette.background.default,
        boxShadow: theme.shadows[3]
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
    },
    customSelect:{
        margin:theme.spacing(2)
    }
}
});


const renderAvailableTeams = (teams) => {
    if(!teams || teams.length == 0){
      return null
    }
    return teams.map( t => {
      return <MenuItem key={t.teamId} value={t.teamId}>{t.teamName}</MenuItem>
    } )
  };

const SignIn = () => {
    let [state, dispatch]  =useContext(AppContext);
    let [isMounted, handleMounted] = useState(false);

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
    let [teamName, handleTeamName] = useState('');
    let [isTeamNameCorrect, handleTeamNameValidation] = useState(true);
    let [teamNameErrorMessage, handleTeamNameErrorMessage] = useState('');
    let [teams, handleTeams] = useState( null )
    
    //Password props
    let [password, handlePassword] = useState(null);
    let [isPasswordCorrect, handlePasswordValidation] = useState(false);
    let [passwordErrorMessage, handlePasswordErrorMessage] = useState(passwordError);
    //FormState Props
    let [isReadyToSubmit, handleIsReady] = useState(false) 
    let [isSubmitting , handleSubmitting] = useState(false);

    useEffect( () => {
        API.fetchTeams()
        .then(response=> {
            console.log(response);
            handleMounted(true);
            handleTeams(response.data);
        })
        .catch(error=> {
            console.error(error);
        })
    }, []);

    const updateTeam = (e) => {
        let val = e.target.value;
        console.log(val);
        handleTeamName(val);
    }

    const signInUser = () => {
        handleEmailErrorMessage(emailError);
        handleSubmitting(true);
        handleTeamNameValidation(true);
        const signInObj = {
            email, password, username, teamId: teamName
        };
        console.log(signInObj);
        API.signIn( signInObj )
        .then( response => {
            console.log(response);
            handleSubmitting(false);
            if(!response.success){
                handleSubmitting(false);
                mapError(response.error);    
            } else {
                console.log(response.data);
                AppActions.updateUserData(dispatch, response.data.user);
                AppActions.updateAuthState(dispatch, true);
                AppActions.redirectTo(dispatch, true, '/viewExpenses');
            }
        })
        .catch( error => {
            console.error('Error While SingIn');
            console.error(error);
            handleSubmitting(false);
            if( error.hasOwnProperty('type') && error.type == 'team-error' ){
                handleTeamNameErrorMessage(error.message);
                handleTeamNameValidation(false);
            }
            else{
                if( error.hasOwnProperty('error')){
                    mapError(error.error);                
                }
                else{
                    mapError(error);
                }
            }
            
        })
    };

    const checkAvailability = () => {

        if( !username || username.length < 4){ return }
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
    //Effect to validate team
    useEffect(() => {
        if( teamName === null ){ return }
        handleTeamNameValidation(true);
    }, [teamName]);
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
    } ,[ isPasswordCorrect, isEmailCorrect, isUsernameCorrect, isTeamNameCorrect])

    const classes = useStyles();
    
    if(!isMounted){
        return <LinearProgress/>
    }

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
                        <FormControl >
                            <InputLabel 
                                className={classes.textField}                            
                                htmlFor="team">
                                    Elige un equipo
                            </InputLabel>
                            <Select
                                className={classes.textField}
                                value={teamName}
                                onChange={updateTeam}
                            >
                                {renderAvailableTeams(teams) }
                            </Select>
                            {
                                 !isTeamNameCorrect ? 
                                <FormHelperText className={classes.textField} error > { teamNameErrorMessage } </FormHelperText>
                                :
                                null
                            }
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