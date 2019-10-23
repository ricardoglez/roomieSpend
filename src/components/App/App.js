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

const ViewExpenses = () => {
    console.log('View Expenses');
    return <div>View Expenses</div>
}

const App = () => {
    return (
        <Router history={ history } basename='/'>
                <Switch>
                    <AppContextProvider>
                        <Route path='/ingresar' component={Login} exact/>
                        <Route path='/crear_cuenta' component={SignIn} exact/>
                        <PrivateRoute path='/viewExpenses' exact component={ ViewExpenses }/>
                        <PrivateRoute path='/' component={Home} exact/>
                        <PrivateRoute path='/addExpense' exact>
                            <div>Add Expense</div>
                        </PrivateRoute>
                        <PrivateRoute path='/removeExpense' exact>
                            <div>Remove Expense</div>
                        </PrivateRoute>
                    </AppContextProvider>
                </Switch>
        </Router>
    )
}

export default App;