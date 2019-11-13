import React, { useEffect,  useContext, useState } from 'react';
import {
    Grid,
    Paper,
    Button,
    Typography
} from '@material-ui/core';

import { appStyles } from '../../utils/styles';
import { AppContext } from '../../context/AppContext';

const MyDashboard = ( ) => {
    const [state, dispatch ] = useContext(AppContext);
    const classes = appStyles();

    return (
          <Paper className={`${classes.paper} ${classes.contentFlex}`}>
              <Grid container direction="column" xs={10} spacing={3}>
                <Grid item >
                    <Typography variant="h6">
                        My Dashboard
                    </Typography>    
                </Grid>
                <Grid container direction="row">
                    <Grid item xs={6} >
                        <Typography variant="subtitle1">Deudas:</Typography>
                        
                    </Grid>
                    <Grid item xs={6} >
                        <Typography variant="subtitle1">Gastos</Typography>                            
                    </Grid>
                </Grid>    
              </Grid>
          </Paper> 
        )
};

export default MyDashboard;