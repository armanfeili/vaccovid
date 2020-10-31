import { GET_USA_STATES_DATA,GET_CANADA_STATES_DATA, GET_BRAZIL_STATES_DATA, GET_GERMANY_STATES_DATA, GET_AUSTRALIA_STATES_DATA, GET_COUNTRY_STATES_AND_CITIES_DATA,GET_PROVINCE_ISO_REPORT_DATA, GET_CITIES_ISO_REPORT_DATA } from '../actions/types';


const initialState = {
    provinces: [],
    eachCountryProvinceAndCities: [],
    eachCountryProvinces: [],
    eachCountryCities: []
};

export function covidProvincesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRY_STATES_AND_CITIES_DATA:
            return {
                ...state,
                eachCountryProvinceAndCities: action.payload,
            };
            
        case GET_PROVINCE_ISO_REPORT_DATA:
        return {
            ...state,
            eachCountryProvinces: action.payload,
        };

        case GET_CITIES_ISO_REPORT_DATA:
        return {
            ...state,
            eachCountryCities: action.payload,
        };

        case GET_USA_STATES_DATA:
        return {
            ...state,
            provinces: action.payload,
        };

        case GET_CANADA_STATES_DATA:
        return {
            ...state,
            provinces: action.payload,
        };

        case GET_BRAZIL_STATES_DATA:
        return {
            ...state,
            provinces: action.payload,
        };
        
        case GET_GERMANY_STATES_DATA:
        return {
            ...state,
            provinces: action.payload,
        };
        
        case GET_AUSTRALIA_STATES_DATA:
        return {
            ...state,
            provinces: action.payload,
        };
        
        default:
            return state;
    }
}