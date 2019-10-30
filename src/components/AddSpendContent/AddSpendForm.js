import React , { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
     Form,
     FormGroup, 
     FormControl, 
     TextField, 
     Select, 
     MenuItem,
     Input,
     InputAdornment,
     InputLabel,
     Button
    } from '@material-ui/core';  
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import {purchaseModel} from '../../utils/common';
import API from '../../utils/API';
import AppActions from '../../actions/AppActions';
import { AppContext } from '../../context/AppContext';

const purchaseObj = new purchaseModel([],'','',null,'','');
const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexGrow:1,
      width: '90%',
      flexDirection:'column'
    },
    button:{
      margin:theme.spacing(1),

    },
    formControl: {
      
    },
    textField: {
      flexGrow: 1
    },
    dense: {
      marginTop: theme.spacing(2),
    }
  }));

  const renderAvailableUsers  =(users) => {
    if(!users || users.length == 0){
      return null
    }
    return users.map( u => {
      return <MenuItem key={u.userId} value={u.userId}>{u.displayName}</MenuItem>
    } )
  };

const AddSpendForm = () => {
    const [state, dispatch] = useContext(AppContext);
    const classes = useStyles();
    const [users, handleUsers ] = useState(null);

    const [values, setValues] = useState( purchaseObj );

    useEffect(()=>{
      API.fetchTeammates(state.userData.teamId)
      .then(response => {
        console.log(response);
        handleUsers(response.data);
      })
    },[]);

      const handleChange = (event, name) => {
        console.log('handleSelect');
        setValues({ ...values, [name]: event.target.value });
      };

      const handleInvolvedUsers = (event) => {
        let oldVals = values;
        let usersObject = users.filter( u => event.target.value.includes( u.userId ) );
        let obj = {}
        usersObject.forEach( u => {
          obj[u.userId] = u; 
        });
        oldVals.involvedUsers = obj;

        setValues({ ...oldVals });
      };

      const handleDate = (date) => {
        setValues({...values, date: date});
      };

      const addPurchase = ( )=> {
        API.postPurchase(values)
          .then(response => {
            console.log(response);
            AppActions.handleModal(dispatch , false);
          })
          .catch(error => {
            console.error(error);
          })
      }

    return (
        <form className={classes.container} noValidate >
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="title">¿Que se compró?</InputLabel>
            <Input
              id="title"
              value={values.title}
              onChange={(e) => { handleChange(e, 'title') }}
              variant='outlined'
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="purchasedBy">¿Quién hizó el pago?</InputLabel>
            <Select
                value={values.purchasedBy}
                onChange={(e) => {handleChange(e, 'purchasedBy')}}
                input={<Input id='purchasedBy'/>}
              >
                {renderAvailableUsers(users) }
            </Select>
          </FormControl> 
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="totalCost">¿Cánto pagó?</InputLabel>
            <Input
              id="totalCost"
              type='numeric'
              pattern='[0-9]'
              value={values.totalCost}
              onChange={(e) => { handleChange(e, 'totalCost') }}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              variant='outlined'
            />
          </FormControl> 
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="involvedUsers">¿Quiénes comparten la compra?</InputLabel>
            <Select
                value={ Object.keys(values.involvedUsers) }
                multiple
                onChange={(e) => { handleInvolvedUsers(e, 'involvedUsers')}}
                input={<Input id='involvedUsers'/>}
              >
                { renderAvailableUsers(users) }
            </Select>
          </FormControl> 
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="description">Agrega una descripción</InputLabel>
            <Input
              id="title"
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
                label="¿Cuándo se compró?"
                value={values.date}
                onChange={handleDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </FormControl>
          </MuiPickersUtilsProvider>
          <Button 
            onClick={addPurchase} 
            variant="contained" 
            color="primary" 
            className={classes.button} >
              Guardar
            </Button>
        </form>
    )
};

export default AddSpendForm;