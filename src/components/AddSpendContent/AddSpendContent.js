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
      padding: theme.spacing(2, 4, 3),
      flexGrow:1,
      display:'flex',
      flexDirection:'column',
      minWidth:'500px'
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

const AddSpendContent = ( ) => {
    let [state, dispatch] = useContext(AppContext);
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Typography variant='h5' gutterBottom >Agregar compra</Typography>
            <Typography variant='subtitle2' gutterBottom >Ingresa la información de la compra </Typography>
            <AddSpendForm/>
        </Paper>
    )
}

export default AddSpendContent;