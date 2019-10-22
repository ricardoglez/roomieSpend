import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const AppReducer = ( action ) => {

    const [ state, dispatch ] = useContext( AppContext );

    console.log('App Reducer');
    console.log(state,action);
    switch( action.type ){
        case 'updateMounted':
            return {...state, isMounted: action.payload.status }
        case 'updateSpendingsList':
            return { ...state, spendingList: action.payload.updateSpendingsList }
        default: 
            return { ...state }
    }
}

export default AppReducer;
