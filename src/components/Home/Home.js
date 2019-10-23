import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import Login from '../Login';

const Home = (  ) => {
    const [ state, dispatch ] = useContext(AppContext);
    console.log(state, dispatch)
    useEffect(() => {
        console.log('Just One');
    }, [])
    return <Login/>      
}
export default Home;
