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
    updatePurchasesList: ( dispatch, updatedPurchases ) => {
        dispatch( {type:'updatePurchasesList', payload: { updatedPurchases: updatedPurchases } } );
    },
    updateUserDebt : ( dispatch, purchaseItem, newPurchaseId, userData ) => {
        console.log(purchaseItem, newPurchaseId, userData );
        if( Object.keys(purchaseItem.involvedUsers).includes( userData.uid ) ){
            console.log('The current user appears in the new purchase', newPurchaseId );
            userData.debt[newPurchaseId] = { 
                debtQnty: purchaseItem.totalCost / Object.keys(purchaseItem.involvedUsers).length  , 
                debtTo: purchaseItem.purchasedBy, 
                payed: purchaseItem.purchasedBy === userData.uid,  
            }

            dispatch( {type:'updateUserData', payload: { userData: userData } } );
        }
    },addPurchaseItem: ( dispatch, purchaseItem ) => {
        dispatch( {type:'addPurchaseItem', payload: { purchaseItem: purchaseItem } } );
    },
    removeSpendingItem: ( dispatch, spendingItemId ) => {
        dispatch( {type:'removeSpendingItem', payload: { spendingItemID: spendingItemId } } );
    },
    updateMounted: ( dispatch, status) => {
        dispatch( {type: 'updateMounted', payload:{ status } } );
    },
    redirectTo: (dispatch, redirect, pathToRedirect) => {
        setTimeout( () => {
            dispatch({ type:'redirectTo', payload:{ pathToRedirect:pathToRedirect, redirect:redirect } });
        } , 300);
    }
};


export default AppActions;