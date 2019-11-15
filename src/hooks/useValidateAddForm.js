import {useEffect, useState} from 'react';
import validations from '../utils/validations';

const useValidateAddForm = ( values ) => {
    const [isValidForm, setValidForm]  = useState( false );
    const [errorsForm, setErrorsForm ] = useState({ });

    const handleError = ( value, type ) => {
        if( value.hasOwnProperty('error') ){
            const prevErrors = errorsForm;
            prevErrors[type] = value.error;
            setErrorsForm( prevErrors );   
        } else {
            const prevErrors = errorsForm;
            delete prevErrors[type];
            setErrorsForm( prevErrors );
        }
        return value
    }

    useEffect( () => {
        const titleVal = handleError( validations.stringRequired.validate( values.title ), 'title' );
        const purchasedByVal =handleError( validations.stringRequired.validate( values.purchasedBy ) , 'purchasedBy');
        const involvedUsersVal = handleError( validations.objectRequired.validate( values.involvedUsers ), 'involvedUsers');
        const totalCostVal = handleError( validations.numberRequired.validate( values.totalCost ), 'totalCost' );
        const descriptionVal = handleError( validations.stringRequired.validate( values.description ), 'description');
        const dateVal = handleError( validations.dateRequired.validate( values.date ), 'date' );
        
        if( Object.keys(errorsForm).length == 0 ){
            setValidForm(true);
        }
        else {
            setValidForm(false);
        }
    } );


    return [ isValidForm , errorsForm ]
};

export default useValidateAddForm;