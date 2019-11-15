import React , { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
     Grid,
     Chip,
     FormControl, 
     Select, 
     MenuItem,
     Input,
     InputAdornment,
     InputLabel,
     ListItemText,
     Checkbox,
     Button,
     CircularProgress,
     FormHelperText
    } 
from '@material-ui/core';  

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import {purchaseModel} from '../../utils/common';
import API from '../../utils/API';
import AppActions from '../../actions/AppActions';
import { AppContext } from '../../context/AppContext';
import validations from '../../utils/validations';

import useValidateAddForm from '../../hooks/useValidateAddForm';

const purchaseObj = new purchaseModel( null, null, null, null, null, null, null );
const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexGrow:1,
      width: '100%',
      flexDirection:'column'
    },
    button:{
      margin:theme.spacing(1),
    },
    chip:{
      margin:2,
    },
    textField: {
      flexGrow: 1
    },
    dense: {
      marginTop: theme.spacing(2),
    }
  }));

const renderAvailableUsers  = ( users , involvedUsers ) => {
  if(!users || users.length == 0){
    return null
  }
  return users.map( u => {
    return (
      <MenuItem key={u.userId} value={u.userId}>
        <ListItemText primary={u.displayName}/>
        { involvedUsers 
          ? 
          <Checkbox checked={ u.isSelected }/>
          :
          null
        }
      </MenuItem>
    )
  } )
};

const AddSpendForm = () => {
    const [ state, dispatch ] = useContext(AppContext);
    const classes = useStyles();
    const [ users, handleUsers ] = useState(null);
    const [ isMounted, handleMounted ] = useState(false);
    const [ values, setValues ] = useState( purchaseObj );
    const [ isReadyToSubmit, errorsForm ] = useValidateAddForm( values );

    console.log(errorsForm);
    useEffect(()=>{
      API.fetchTeammates(state.userData.teamId)
      .then(response => {
        console.log(response);
        handleUsers(  
          response.data.map( u => {
            let modU = u;
            modU.isSelected = false;
            return modU
          })
        );
        handleMounted(true);
      })
    },[]);

    useEffect( () => {
      if( !users ){ return }
        const v = users.filter( u => u.isSelected ) 
    },[ values ]);

      const handleChange = (event, name) => {
        setValues({ ...values, [name]: event.target.value, createdBy: state.userData.uid });
      };

      const handleInvolvedUsers = (event) => {
        let oldVals = values;
        let usersObject = users.filter( u => event.target.value.includes( u.userId ) );
        let obj = {}
        usersObject.forEach( u => {
          obj[u.userId] = u; 
        });
        oldVals.involvedUsers = obj;

        handleUsers(
          users.map( u => {
            if( event.target.value.includes( u.userId )){
              u.isSelected = true;
            } else {
              u.isSelected =false;
            }
            return u
          } )
        );
        setValues({ ...oldVals });
      };

      const handleDate = (date) => {
        setValues({...values, date: date});
      };

      const renderUsersSelected = (  ) => {
         const u = users;  
        console.log(u);
          return u.filter( user => user.isSelected)
          .map( user => {
            //console.log(user);
            return (
              <Chip key={user.userId} label={user.displayName} className={classes.chip} />
            )
          });
      }

      const addPurchase = ( )=> {
        API.postPurchase(values)
          .then(response => {
            console.log(response);
            AppActions.addPurchaseItem( dispatch , values );
            AppActions.handleModal( dispatch , false );
          })
          .catch(error => {
            console.error(error);
          })
      }

    if(!isMounted){ return <Grid container justify="center"> <CircularProgress/> </Grid> }

    return (
        <form className={classes.container} noValidate >
          <FormControl className={classes.formControl}>
            <InputLabel error={values.title!= null && errorsForm.hasOwnProperty('title')} htmlFor="title">¿Que se compró?</InputLabel>
            <Input
              error={ values.title!= null && errorsForm.hasOwnProperty('title')}
              id="title"
              value={values.title}
              onChange={(e) => { handleChange(e, 'title') }}
              variant='outlined'
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel error={ values.purchasedBy != null && errorsForm.hasOwnProperty('purchasedBy')} htmlFor="purchasedBy">¿Quién hizó el pago?</InputLabel>
            <Select
                error={ values.purchasedBy != null && errorsForm.hasOwnProperty('purchasedBy')}
                value={values.purchasedBy}
                onChange={(e) => {handleChange(e, 'purchasedBy')}}
                input={<Input id='purchasedBy'/>}
              >
                { renderAvailableUsers( users ) }
            </Select>
          </FormControl> 
          <FormControl className={classes.formControl}>
            <InputLabel error={ values.totalCost!= null && errorsForm.hasOwnProperty('totalCost')} htmlFor="totalCost">¿Cánto pagó?</InputLabel>
            <Input
              id="totalCost"
              type='numeric'
              error={ values.totalCost!= null && errorsForm.hasOwnProperty('totalCost')}
              pattern='[0-9]'
              value={values.totalCost}
              onChange={(e) => { handleChange(e, 'totalCost') }}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              variant='outlined'
            />
          </FormControl> 
          <FormControl className={classes.formControl}>
            <InputLabel error={ values.involvedUsers != null && errorsForm.hasOwnProperty('involvedUsers')} htmlFor="involvedUsers">¿Quiénes comparten la compra?</InputLabel>
            <Select
                labelId='involvedUsersLabel'
                id='involvedUsers'
                multiple
                error={ values.involvedUsers != null && errorsForm.hasOwnProperty('involvedUsers')}
                renderValue={ renderUsersSelected }
                value={ !users ? [] : users.filter( u => u.isSelected).map( u => u.userId )  }
                onChange={(e) => { handleInvolvedUsers(e, 'involvedUsers')}}
                input={<Input id='involvedUsers'/>}
              >
                { renderAvailableUsers( users, values.involvedUsers ) }
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel error={ values.description!= null && errorsForm.hasOwnProperty('description')} htmlFor="description">Agrega una descripción</InputLabel>
            <Input
              id="title"
              error={ values.description!= null && errorsForm.hasOwnProperty('description')}
              value={values.description}
              max={100}
              onChange={(e) => { handleChange(e, 'description') }}
              variant='outlined'
            />
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <FormControl className={classes.formControl}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                error={  errorsForm.hasOwnProperty('date') && errorsForm._original != null}
                label="¿Cuándo se compró?"
                value={values.date}
                onChange={handleDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            <FormHelperText>{ errorsForm.hasOwnProperty('date') && errorsForm._original != null ? 'La fecha debe ser menor o igual al día acutal' : '' }</FormHelperText>
            </FormControl>
          </MuiPickersUtilsProvider>
          <Button 
            onClick={addPurchase} 
            variant="contained" 
            disabled={ !isReadyToSubmit }
            color="primary" 
            className={classes.button} 
          >
              Guardar
            </Button>
        </form>
    )
};

export default AddSpendForm;