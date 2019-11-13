import React , { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
     Form,
     FormGroup, 
     Chip,
     FormControl, 
     TextField, 
     Select, 
     MenuItem,
     Input,
     InputAdornment,
     InputLabel,
     ListItemText,
     Checkbox,
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

const purchaseObj = new purchaseModel([],'','',null,'','','');
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
    const [state, dispatch] = useContext(AppContext);
    const classes = useStyles();
    const [users, handleUsers ] = useState(null);
    const [isMounted, handleMounted] = useState(false);

    const [values, setValues] = useState( purchaseObj );

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
        console.log(v);
        console.log(v.map( v1 => v1.userId ));
    },[ values ]);

      const handleChange = (event, name) => {
        console.log('handleSelect');
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
            console.log(user);
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

      if(!isMounted){ return null }

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
                { renderAvailableUsers( users ) }
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
                labelId='involvedUsersLabel'
                id='involvedUsers'
                multiple
                renderValue={ renderUsersSelected }
                value={ !users ? [] : users.filter( u => u.isSelected).map( u => u.userId )  }
                onChange={(e) => { handleInvolvedUsers(e, 'involvedUsers')}}
                input={<Input id='involvedUsers'/>}
              >
                { renderAvailableUsers( users, values.involvedUsers ) }
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