import React ,{ useEffect, useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { makeStyles } from '@material-ui/core/styles';

import AddSpendForm from './AddSpendForm';

import API from '../../utils/API';

const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 2),
      flexGrow:1,
      display:'flex',
      flexDirection:'column',
      minWidth:'50%'
    }
  }));

import { 
    Paper,
    Grid, 
    Button, 
    Form,
    Typography
} from '@material-ui/core';
import { mergeClasses } from '@material-ui/styles';

const AddSpendContent = ( { availableUsers } ) => {
    let [state, dispatch] = useContext(AppContext);
    const classes = useStyles();
    return (
        <Paper className={classes.paper} >
          <Grid container direction="column" alignItems="center" justify="center">
            <Typography variant='h6' gutterBottom >Agregar compra</Typography>
            <Typography variant='subtitle2' gutterBottom >Ingresa la información referente a la compra</Typography>
            <AddSpendForm availableUsers={availableUsers}/>
          </Grid>
        </Paper>
    )
}

export default AddSpendContent;