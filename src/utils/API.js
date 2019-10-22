import firebaseUtils from './firebaseUtils';

const API = {
    fetchPurchases: () => {
        console.log('Fetch purchases');
        return new Promise( (res, rej) => {
            try{
                let purchases = [];
                firebaseUtils.collection('purchase')
                    .onSnapshot( ( snapshot) => {
                    snapshot.forEach( doc => { 
                        purchases.push( doc.data());
                    });
                    res( {success: true , data: purchases} );

                } );
            }
            catch(error){
                rej({success: false, error:error, data:null})
            }
        } );    
    },
    addSpent: async () => {
        console.log('Add Spent');
    },
    removeSpent: async () => {
        console.log('Remove Spent');
    }
};

export default API;