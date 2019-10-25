import React , { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
     Form,
     FormGroup, 
     FormControl, 
     TextField, 
     Select, 
     MenuItem
    } from '@material-ui/core';  

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexGrow:1,
      width: '90%',
      flexDirection:'column'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      flexGrow: 1
    },
    dense: {
      marginTop: theme.spacing(2),
    }
  }));

const AddSpendForm = () => {
    const classes = useStyles();
    const [values, setValues] = useState({
        purchased_by: '',
        description: '',
        users_involved: 'Controlled',
        date:'',
        total_cost: 0,
      });

      const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
      };

    return (
        <form className={classes.container} noValidate >
            <TextField
                id="outlined-purchased_by"
                label="¿Quien pagó?"
                className={classes.textField}
                value={values.purchased_by}
                onChange={handleChange('purchased_by')}
                margin="normal"
                variant="outlined"
            /> 
            <TextField
                id="outlined-total-cost"
                label="¿Cuánto pagó?"
                className={classes.textField}
                value={values.total_cost}
                onChange={handleChange('total_cost')}
                margin="normal"
                variant="outlined"
            /> 
            <Select
                value={values.users_involved}
                placeholder='¿Quien participó?'
                onChange={handleChange('users_involved')}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </form>
    )
};

export default AddSpendForm;