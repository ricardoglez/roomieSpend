import React ,{ useState, useContext, useEffect } from 'react';
import { 
    Grid, 
    List, 
    ListItem,
    Typography, 
    ListItemText,
    Box,
    Chip,
    Fab,
    LinearProgress
} from '@material-ui/core';
import numeral from 'numeral';
import { makeStyles } from '@material-ui/core/styles';

import API from '../../utils/API';
import { AppContext } from '../../context/AppContext';
import AppActions from '../../actions/AppActions';
import AddSpendContent from '../AddSpendContent';

const useStyles = makeStyles(theme => {
    return {
        root: {
            minWidth: '95%',
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
              border: `1px solid #fff`,
              display:'flex',
              flexDirection:'column'
          },
          contentFlex:{
              display:'flex',
              flexGrow:1,
              flexDirection:'row',
              alignItems:'center',
              width:'100%',
          },
          chipContainer:{
            display:'flex',
            width:'auto',
            marginRight:theme.spacing(.5),
          },
          alignStart:{
            alignItems: 'start',
          },
          numberData:{
            marginLeft:theme.spacing(.5),
            fontWeight: 'bolder',
            textAlign: 'end',
          },
          labelData:{
            textAlign:'end',
            fontWeight:'light'
          },
          flexRow:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'end'
          },
          fab: {
            margin: theme.spacing(1),
          }
    }
});

const InvolvedUsers = ({users, purchase}) => {
    const classes = useStyles();

    const usersName = Object.keys(users).map( usersKeys => {
        const user = users[usersKeys];
        return (
            <Box key={user.userId} m='1' className={classes.chipContainer}>
                <Chip label={ user.displayName } color={ purchase.purchasedBy === user.userId ? 'secondary':'default' }/>
            </Box>
        )
    });

    return (
        <Box className={classes.contentFlex}>
            {usersName}
        </Box>
    )
}

const PurchaseList = ({users, purchases}) => {
    console.log( purchases );
    const classes = useStyles();

    return purchases.map( p => {
        return (
        <ListItem key={p.purchaseId} alignItems="flex-start" className={classes.listItem}>
            <div className={`${classes.contentFlex}  ${classes.alignStart}`}>
                <Grid container direction='column' >
                    <Typography component="strong" variant='h6'>{p.title}</Typography>
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
                </Grid>
                <Grid container direction='column' alignItems='end'>
                    <Grid item className={ classes.flexRow }>
                        <Typography className={classes.labelData}>Total:</Typography>
                        <Typography className={classes.numberData}>  {numeral(p.totalCost).format('$0,000.0')}</Typography>
                    </Grid>
                    <Grid item className={ classes.flexRow }>
                        <Typography className={classes.labelData}>Dividido:</Typography>
                        <Typography className={classes.numberData}> {numeral(p.totalCost/Object.keys(p.involvedUsers).length).format('$0,000.0')}</Typography>
                    </Grid>
                    <Grid item className={ classes.flexRow }>
                        <Typography className={classes.labelData}>Fecha: </Typography>
                        <Typography className={classes.numberData}> 05/10/2020 </Typography>
                    </Grid>
                </Grid>
            </div>
            
            <div className={classes.contentFlex}>
                <Typography variant='caption'>Compartido con:</Typography>
            </div>
            <div className={classes.contentFlex}>
                <InvolvedUsers users={ p.involvedUsers } purchase={p}/>
            </div>
            
        </ListItem>)
    });
}

const ViewExpenses = () => {
    let [state, dispatch] = useContext(AppContext);
    let [isMounted, handleMounted]  = useState(false)
    
    useEffect(()=> {
        API.fetchPurchases()
            .then( purchases => {
                handleMounted(true);
                if(purchases.success){
                    AppActions.updatePurchasesList(dispatch , purchases.data);
      //              handleAvailablePurchases(purchases.data);
                }
            })
            .catch(error => { 
                handleMounted(true);
                console.error(error);
            })
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
          alignItems="center" 
        >
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
                    !state.purchasesList || state.purchasesList.length == 0 
                    ?
                    <Typography variant='body1' className={classes.content}> No hay ninguna compra</Typography>
                    :
                    <PurchaseList purchases={ state.purchasesList } />
                }
            </List>
        </React.Fragment>
    )
};

export default ViewExpenses;