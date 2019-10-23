import React , { useContext, useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {AppContext} from '../../context/AppContext';
import Login from '../Login';

const PrivateRoute = ({ isAuth, component , ...options }) => {
    const [state, dispatch] = useContext(AppContext);
    let conditionalComponent = Login;
    console.log('privateRoute state',state);
    if( state.userData && state.isAuth ){
        conditionalComponent = component;
    }
    else {
        return <Redirect push to={{ pathname:'/ingresar' }}/>
    }    
    return <Route {...options} component={ conditionalComponent } />
}

export default PrivateRoute;