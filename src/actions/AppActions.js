const AppActions = {
    handleModal: (dispatch , status, modalContent) => {
        dispatch( {type:'handleModal', payload: { status: status, modalContent: modalContent } } );
    },
    updateMounted: (dispatch, status) => {
        dispatch( {type:'updateMounted', payload: { status: status } } );
    },
    updateUserData: ( dispatch, userData ) => {
        dispatch( {type:'updateUserData', payload: { userData: userData } } );
    },
    updateAuthState: ( dispatch, isAuth ) => {
        dispatch( {type:'updateAuthState', payload: { isAuth: isAuth } } );
    },
    updateSpendingList: ( dispatch, spendingList ) => {
        dispatch( {type:'updateSpendingList', payload: { spendingList: spendingList } } );
    },
    addSpendingItem: ( dispatch, spendingItem ) => {
        dispatch( {type:'addSpendingItem', payload: { spendingItem: spendingItem } } );
    },
    removeSpendingItem: ( dispatch, spendingItemId ) => {
        dispatch( {type:'removeSpendingItem', payload: { spendingItemID: spendingItemId } } );
    },updateMounted: ( dispatch, status) => {
        dispatch( {type: 'updateMounted', payload:{ status } } );
    },
    redirectTo: (dispatch, redirect, pathToRedirect) => {
        setTimeout( () => {
            dispatch({ type:'redirectTo', payload:{ pathToRedirect:pathToRedirect, redirect:redirect } });
        } , 300);
    }
};


export default AppActions;