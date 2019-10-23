import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import Login from '../Login';

const Home = (  ) => {
    const [ state, dispatch ] = useContext(AppContext);
    
    return <div>Home</div>      
}
export default Home;
