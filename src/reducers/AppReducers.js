const AppReducer = ( state, action ) => {
    switch( action.type ){
        case 'handleModal':
            return {...state, showModal: action.payload.status, modalContent: action.payload.modalContent }
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
        case 'updatePurchasesList':
                return { ...state, purchasesList: action.payload.updatedPurchases }
        case 'addPurchaseItem':
            const newList =[ action.payload.purchaseItem , ...state.purchasesList ] 
                return { ...state, purchasesList: newList }
        default: 
            return { ...state }
    }
};

export default AppReducer;
