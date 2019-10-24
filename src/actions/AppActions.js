const AppActions = {
    updateMounted: (dispatch, status) => {
        console.log('Update mounted', userData);
        dispatch( {type:'updateMounted', payload: { status: status } } );
    },
    updateUserData: ( dispatch, userData ) => {
        console.log('Update userData', userData);
        dispatch( {type:'updateUserData', payload: { userData: userData } } );
    },
    updateAuthState: ( dispatch, isAuth ) => {
        console.log('Update AuthState', isAuth);
        dispatch( {type:'updateAuthState', payload: { isAuth: isAuth } } );
    },
    updateSpendingList: ( dispatch, spendingList ) => {
        console.log('Update Spending List', spendingList);
        dispatch( {type:'updateSpendingList', payload: { spendingList: spendingList } } );
    },
    addSpendingItem: ( dispatch, spendingItem ) => {
        console.log('Add Spending Item', spendingItem);
        dispatch( {type:'addSpendingItem', payload: { spendingItem: spendingItem } } );
    },
    removeSpendingItem: ( dispatch, spendingItemId ) => {
        console.log('Remove Spending Item', spendingItemId );
        dispatch( {type:'removeSpendingItem', payload: { spendingItemID: spendingItemId } } );
    },updateMounted: ( dispatch, status) => {
        console.log('App is Mounted');
        dispatch( {type: 'updateMounted', payload:{ status } } );
    },
    redirectTo: (dispatch, redirect, pathToRedirect) => {
        console.log('Redirect To', pathToRedirect, redirect);
        setTimeout( () => {
            dispatch({ type:'redirectTo', payload:{ pathToRedirect:pathToRedirect, redirect:redirect } });
        } , 300);
    }
};


export default AppActions;