import React ,{ useState, useContext, useEffect } from 'react';
import { Grid, List, ListItem,Typography, ListItemText , Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../../context/AppContext';
import AppActions from '../../actions/AppActions';
import AddSpendContent from '../AddSpendContent';

const useStyles = makeStyles(theme => {
    console.log(theme);
    return {
        root: {
            width: '100%',
            maxWidth: '80%',
            color:'#fff',
           
            marginTop: theme.spacing(2),
          },
          inline: {
            display: 'inline',
            color:'#fff'
          },
          listItem:{
              borderRadius:theme.shape.borderRadius,
              backgroundColor: theme.palette.primary.main,
              marginTop:theme.spacing(1),
              border: `1px solid #fff`
          },
          fab: {
            margin: theme.spacing(1),
          }
    }
});



const ViewExpenses = () => {
    let [state, dispatch] = useContext(AppContext);
    const classes = useStyles();

    const handleAddSpend =  () => {
        AppActions.handleModal(dispatch, true, <AddSpendContent/>);
    }

    return (
        <React.Fragment>
            <Grid 
            container
            direction="row"
            justify="center"
            alignItems="center" >
                <Fab variant="extended" aria-label="add" className={classes.fab} onClick={ handleAddSpend }>
                    Agregar gasto
                </Fab>
            </Grid>
            <List className={classes.root}>
                <ListItem alignItems="flex-start" className={classes.listItem}>
                    <ListItemText
                    primary="Alimentos"
                    secondary={
                        <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={ classes.inline }
                            color="textPrimary"
                        >
                            Elemento de la lista de gastos
                        </Typography>
                        </React.Fragment>
                    }
                    />
                </ListItem>
                <ListItem alignItems="flex-start" className={classes.listItem}>
                    <ListItemText
                    primary="Superama"
                    secondary={
                        <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={ classes.inline }
                            color="textPrimary"
                        >
                            Elemento de la lista de gastos
                        </Typography>
                        </React.Fragment>
                    }
                    />
                </ListItem>
            </List>
        </React.Fragment>
    )
};

export default ViewExpenses;