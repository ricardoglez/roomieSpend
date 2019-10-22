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

const Login = () => {
    let [email, handleEmail] = useState('');
    let [password, handlePassword] = useState('');
    let [isReadyToSubmit, handleIsReady] = useState(false);
    
    useEffect( () => {
        if(email && password){
            handleIsReady(true);
        }
        else {
            handleIsReady(false);
        }
    } ,[ email, password ])

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
                                id="usuario"
                                name="usuario"
                                label="Usuario"
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
                    <Button variant="contained" disabled={ !isReadyToSubmit } component="span" className={classes.button}>
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