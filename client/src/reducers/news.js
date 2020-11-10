import { CLEAR_DATA, GET_CORONAVIRUS_NEWS, GET_VACCINE_NEWS, GET_HEALTH_NEWS, NEWS_LOADING,GET_NEXT_CORONAVIRUS_NEWS,GET_PREVIOUS_CORONAVIRUS_NEWS,GET_NEXT_VACCINE_NEWS,GET_PREVIOUS_VACCINE_NEWS,GET_NEXT_HEALTH_NEWS,GET_PREVIOUS_HEALTH_NEWS} from '../actions/types';


const initialState = {
    news: {}, 
    newsLoading: false,

};

export function newsReducer (state = initialState, action) {
    switch (action.type) {
        case CLEAR_DATA:
        return {
            state : initialState,
        };
        // Loading
        case NEWS_LOADING:
            return {
                ...state,
                newsLoading: true,
            };
            // CORONAVIRUS
        case GET_CORONAVIRUS_NEWS:
            return {
                ...state,
                news: action.payload,
                newsLoading: false,
            };
        case GET_NEXT_CORONAVIRUS_NEWS:
            return {
                ...state,
                news: action.payload,
                newsLoading: false,
            };
        case GET_PREVIOUS_CORONAVIRUS_NEWS:
            return {
                ...state,
                news: action.payload,
                newsLoading: false,
            };

            // VACCINE
        case GET_VACCINE_NEWS:
            return {
                ...state,
                news: action.payload,
                newsLoading: false,
            };
        case GET_NEXT_VACCINE_NEWS:
            return {
                ...state,
                news: action.payload,
                newsLoading: false,
            };
        case GET_PREVIOUS_VACCINE_NEWS:
            return {
                ...state,
                news: action.payload,
                newsLoading: false,
            };
            
            // HEALTH
        case GET_HEALTH_NEWS:
            return {
                ...state,
                news: action.payload,
                newsLoading: false,
            };
        case GET_NEXT_HEALTH_NEWS:
            return {
                ...state,
                news: action.payload,
                newsLoading: false,
            };
        case GET_PREVIOUS_HEALTH_NEWS:
            return {
                ...state,
                news: action.payload,
                newsLoading: false,
            };
        default:
            return state;
    }
}