import React ,{ useState, useContext, useEffect } from 'react';
import { 
    Grid, 
    List, 
    ListItem,
    Typography, 
    ListItemText,
    Fab,
    LinearProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import API from '../../utils/API';
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
          content:{
              color:theme.palette.primary.main,
              textAlign: 'center'
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

const PurchasesList = ({purchases}) => {
    return purchases.map( p => {
        return (
        <ListItem alignItems="flex-start" className={classes.listItem}>
            <ListItemText
            primary={p.title}
            secondary={
                <React.Fragment>
                <Typography
                    component="span"
                    variant="body2"
                    className={ classes.inline }
                    color="textPrimary"
                >
                    {p.description}
                </Typography>
                </React.Fragment>
            }
            />
        </ListItem>)
    });
}

const ViewExpenses = () => {
    let [state, dispatch] = useContext(AppContext);
    let [isMounted, handleMounted]  = useState(false)
    let [availableUsers, handleAvailableUsers]  = useState(null)
    let [purchases, handleAvailablePurchases]  = useState(null)
    
    useEffect(()=> {
        Promise.all( [ API.fetchUsers(), API.fetchPurchases() ] )
        .then( values => {
            console.log(values);
            let [users, purchases] = values;
            console.log(users, purchases);
            handleMounted(true)
            if(users.success){
                handleAvailableUsers(users.data);
            }
            if(purchases.success){
                handleAvailablePurchases(purchases.data);
            }
        })
        .catch(error => {
            console.error(error);
        });
    },[]);

    const classes = useStyles();

    const handleAddSpend =  () => {
        AppActions.handleModal(dispatch, true, <AddSpendContent/>);
    }

    if(!isMounted){
        return (
        <Grid 
        container
        direction="row"
        justify="center"
        alignItems="center" >
            <LinearProgress/>
        </Grid>)
    }

    return (
        <React.Fragment>
            <Grid 
            container
            direction="row"
            justify="center"
            alignItems="center" >
                <Fab variant="extended" aria-label="add" className={classes.fab} onClick={ handleAddSpend }>
                    Agregar compra
                </Fab>
            </Grid>
            <List className={classes.root}>
                { 
                    !purchases || purchases.length == 0 
                    ?
                    <Typography variant='body1' className={classes.content}> No hay ninguna compra</Typography>
                    :
                    <PurchaseList purchases={purchases} />
                }
            </List>
        </React.Fragment>
    )
};

export default ViewExpenses;