import React, { useState, useEffect } from 'react';

const initialModel = {
    userId:null,
    name: null,
    refreshToken: null,
    lastLogin: null,
}

const useAuthenticator = ( dispatch , handleMounted,  ) => {
    const [authState, setValues ] = useState(initialModel);

    console.log('Use Auth');
}

export default useAuthenticator;