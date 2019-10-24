const AppReducer = ( state, action ) => {
    switch( action.type ){
        case 'updateMounted':
            return {...state, isMounted: action.payload.status }
        case 'updateSpendingsList':
            return { ...state, spendingList: action.payload.updateSpendingsList }
        case 'updateUserData':
                return { ...state, userData: action.payload.userData }
        case 'updateAuthState':
                return { ...state, isAuth: action.payload.isAuth }
        case 'redirectTo':
                return { ...state, pathToRedirect: action.payload.pathToRedirect, redirect: action.payload.redirect }
        default: 
            return { ...state }
    }
};

export default AppReducer;
