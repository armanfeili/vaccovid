import { GET_ERRORS, 
    GET_ALL_VACCINES,GET_ALL_VACCINES_PRE_CLINICAL,GET_ALL_VACCINES_PHASE_ONE,GET_ALL_VACCINES_PHASE_TWO,GET_ALL_VACCINES_PHASE_THREE,GET_ALL_VACCINES_PHASE_FOUR,GET_FDA_APPROVED_VACCINES,GET_VACCINES_CATEGORY_BASED,
    GET_ALL_TREATMENTS,GET_ALL_TREATMENTS_PRE_CLINICAL,GET_ALL_TREATMENTS_CLINICAL,GET_ALL_TREATMENTS_FDA_APPROVED,GET_TREATMENTS_CATEGORY_BASED,
    CLEAR_VACCINE_DATA, CLEAR_EACH_VACCINE, CLEAR_TREATMENT_DATA,
    GET_EACH
} from '../actions/types';


const initialState = {
    vaccines: [], 
    treatments: [],
    eachVacItem:[],
    errors: []
    // newsLoading: false,

};

export function vaccineReducer (state = initialState, action) {
    switch (action.type) {     
        // error
        case GET_ERRORS:
        return {
            ...state,
            errors : [],
        };
        // clear data
        case CLEAR_VACCINE_DATA:
        return {
            ...state,
            vaccines : [],
        };
        case CLEAR_TREATMENT_DATA:
        return {
            ...state,
            treatments : [],
        };
        case CLEAR_EACH_VACCINE:
        return {
            ...state,
            eachVaccine : [],
        };
        // vaccine
        case GET_ALL_VACCINES:
        return {
            ...state,
            vaccines: action.payload,
        };

        case GET_ALL_VACCINES_PRE_CLINICAL:
        return {
            ...state,
            vaccines : action.payload,
        };
        
        case GET_ALL_VACCINES_PHASE_ONE:
        return {
            ...state,
            vaccines : action.payload,
        };
          
        case GET_ALL_VACCINES_PHASE_TWO:
        return {
            ...state,
            vaccines : action.payload,
        };
          
        case GET_ALL_VACCINES_PHASE_THREE:
        return {
            ...state,
            vaccines : action.payload,
        };
           
        case GET_ALL_VACCINES_PHASE_FOUR:
        return {
            ...state,
            vaccines : action.payload,
        };
            
        case GET_FDA_APPROVED_VACCINES:
        return {
            ...state,
            vaccines : action.payload,
        };
          
        case GET_VACCINES_CATEGORY_BASED:
        return {
            ...state,
            vaccines : action.payload,
        };
        // treatment
        case GET_ALL_TREATMENTS:
        return {
            ...state,
            treatments : action.payload,
        };
           
        case GET_ALL_TREATMENTS_PRE_CLINICAL:
        return {
            ...state,
            treatments : action.payload,
        };
          
        case GET_ALL_TREATMENTS_CLINICAL:
        return {
            ...state,
            treatments : action.payload,
        };
          
        case GET_ALL_TREATMENTS_FDA_APPROVED:
        return {
            ...state,
            treatments : action.payload,
        };
          
        case GET_TREATMENTS_CATEGORY_BASED:
        return {
            ...state,
            treatments : action.payload,
        };

        case GET_EACH:
        return {
            ...state,
            eachVacItem : action.payload,
        };
          
        default:
            return state;
    }
}