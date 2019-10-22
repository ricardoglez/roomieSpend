import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

const Home = (  ) => {
    const [ state, dispatch ] = useContext(AppContext);
    console.log(state, dispatch)
    useEffect(() => {
        console.log('Just One');
    }, [])
    return <div>Home</div>      
}
export default Home;
