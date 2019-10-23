import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import history from '../../utils/history';

import AppActions from '../../actions/AppActions';
import API from '../../utils/API'; 
import { AppContextProvider, AppContext } from '../../context/AppContext';
import Home from '../Home';
import Login from '../Login';
import SignIn from '../SignIn';
import PrivateRoute from '../PrivateRoute';

const App = () => {
    return (
        <Router history={ history } basename='/'>
                <Switch>
                    <AppContextProvider>
                        <PrivateRoute path='/addExpense' exact>
                            <div>Add Expense</div>
                        </PrivateRoute>
                        <PrivateRoute path='/removeExpense' exact>
                            <div>Remove Expense</div>
                        </PrivateRoute>
                        <PrivateRoute path='/viewExpenses' exact component={<div>View expenses</div>}/>
                        <Route path='/crear_cuenta' component={SignIn} exact/>
                        <Route path='/ingresar' component={Login} exact/>
                        <PrivateRoute path='/' component={Home} exact/>
                    </AppContextProvider>
                </Switch>
        </Router>
    )
}

export default App;