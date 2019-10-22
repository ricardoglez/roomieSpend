import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import AppActions from '../../actions/AppActions';
import API from '../../utils/API'; 
import { AppContextProvider, AppContext } from '../../context/AppContext';
import Home from '../Home';
const App = () => {
    
    return (
        <Router basename='/'>
                <Switch>
                    <AppContextProvider>
                        <Route path='/addExpense' exact>
                            <div>Add Expense</div>
                        </Route>
                        <Route path='/removeExpense' exact>
                            <div>Remove Expense</div>
                        </Route>
                        <Route path='/viewExpenses'  exact>
                            <div>View Expenses</div>
                        </Route>
                        <Route path='/' component={Home} exact/>
                    </AppContextProvider>
                </Switch>
        </Router>
    )
}

export default App;