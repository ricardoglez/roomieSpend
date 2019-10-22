const AppActions = {
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
    }
};


export default AppActions;