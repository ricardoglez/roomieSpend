import React , { useContext, useState , useEffect} from 'react';
import { Grid, Typography, Avatar } from '@material-ui/core';
import numeral from 'numeral';

import { AppContext } from '../../context/AppContext';
import { appStyles } from '../../utils/styles';

const AvatarUserInfo = ( ) => {
    const [state, dispatch] = useContext(AppContext);
    const classes = appStyles()

    const [totalDebt , updateDebt] = useState( 0 );

    useEffect( () => {
        if( state.isAuth ){
            const totD =  Object.keys(state.userData.debt).reduce( ( acc, curr ) => {
                console.log( curr, acc, state.userData.debt[curr] );
                if(state.userData.debt[curr].payed ){
                    return acc
                }
                else {
                    return acc += state.userData.debt[curr].debtQnty 
                }
            } , 0);
            updateDebt( totD );
        }
    }  );

    if(!state.isAuth){
        return ( null )
    }
    else {
        return ( 
            <Grid item xs={ 6 }>
                <Grid justify='flex-end' alignItems="center" container direction='row'>
                    <Grid item>
                        <Avatar>{state.userData.displayName.slice(0,2)}</Avatar>
                    </Grid>
                    <Grid item className={classes.userData}>
                        <Grid container justify="center" direction='column'>
                            <Grid item>
                                <Typography> <strong>Deuda</strong> </Typography>
                            </Grid>
                            <Grid item>
                                <Typography> { numeral(totalDebt).format('$0,000.0') } </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
    
}

export default AvatarUserInfo;