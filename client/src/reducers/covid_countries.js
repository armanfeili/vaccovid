import { GET_WORLD_COVID_DATA, GET_ALL_COUNTRIES_COVID_DATA, GET_ASIA_COUNTRIES_COVID_DATA, GET_AFRICA_COUNTRIES_COVID_DATA, GET_EUROPE_COUNTRIES_COVID_DATA, GET_NORTH_AMERICA_COUNTRIES_COVID_DATA, GET_SOUTH_AMERICA_COUNTRIES_COVID_DATA, GET_AUSTRALIA_OCEANIA_COUNTRIES_COVID_DATA,GET_ALL_COUNTRIES_COVID_DATA_NAME_ORDERED, GET_COUNTRY_ISO_BASED_DATA,GET_OVID_DATA,
//   CLEAR_DATA, 
  CLEAR_WORLD_DATA, 
//   CLEAR_ALL_COUNTRIES_COVID_DATA_NAME_ORDERED_DATA, 
//   CLEAR_ALL_COUNTRIES_COVID_DATA,
   CLEAR_COUNTRY_ISO_BASED_DATA, 
   CLEAR_PROVINCE_ISO_REPORT_DATA, GET_PROVINCE_ISO_REPORT_DATA, 
//    CLEAR_COUNTRY_STATES_AND_CITIES_DATA, CLEAR_PROVINCE_ISO_REPORT_DATA, CLEAR_CITIES_ISO_REPORT_DATA, 
   CLEAR_OVID_DATA
} from '../actions/types';


const initialState = {
    countries: [], 
    // continentCountries: [], 
    ovidData: [], 
    countriesNameOrdered: [], 
    countryISOBased: [], 
    world:[],
    eachCountryProvinces: [],
    // newsLoading: false,

};

export function covidCountriesReducer (state = initialState, action) {
    switch (action.type) {
        // case CLEAR_DATA:
        // return {
        //     state : initialState,
        // };

        case CLEAR_PROVINCE_ISO_REPORT_DATA:
        return {
            ...state,
            eachCountryProvinces : [],
        };
        case GET_PROVINCE_ISO_REPORT_DATA:
        return {
            ...state,
            eachCountryProvinces: action.payload,
        };

        case CLEAR_WORLD_DATA:
        return {
            ...state,
            world : action.payload,
        };
        // case CLEAR_ALL_COUNTRIES_COVID_DATA_NAME_ORDERED_DATA:
        // return {
        //     countriesNameOrdered : [],
        // };
        case CLEAR_COUNTRY_ISO_BASED_DATA:
        return {
            ...state,
            countryISOBased : [],
        };
        case CLEAR_OVID_DATA:
        return {
            ...state,
            ovidData : [],
        };
        case GET_WORLD_COVID_DATA:
            return {
                ...state,
                world: action.payload,
            };

        case GET_ALL_COUNTRIES_COVID_DATA:
            return {
                ...state,
                countries: action.payload,
            };
            
        case GET_COUNTRY_ISO_BASED_DATA:
        return {
            ...state,
            countryISOBased: action.payload,
        };
           
        // case CLEAR_COUNTRY_ISO_BASED_DATA:
        // return {
        //     ...state,
        //     countryISOBased: [],
        // };
            
        case GET_ALL_COUNTRIES_COVID_DATA_NAME_ORDERED:
            return {
                ...state,
                countriesNameOrdered: action.payload,
            };
            
        case GET_ASIA_COUNTRIES_COVID_DATA:
            return {
                ...state,
                countries: action.payload,
            };
            
        case GET_AFRICA_COUNTRIES_COVID_DATA:
            return {
                ...state,
                countries: action.payload,
            };
            
        case GET_EUROPE_COUNTRIES_COVID_DATA:
            return {
                ...state,
                countries: action.payload,
            };
            
        case GET_NORTH_AMERICA_COUNTRIES_COVID_DATA:
            return {
                ...state,
                countries: action.payload,
            };
            
        case GET_SOUTH_AMERICA_COUNTRIES_COVID_DATA:
            return {
                ...state,
                countries: action.payload,
            };
            
        case GET_AUSTRALIA_OCEANIA_COUNTRIES_COVID_DATA:
            return {
                ...state,
                countries: action.payload,
            };   
            
        case GET_OVID_DATA:
            return {
                ...state,
                ovidData: action.payload,
            };
        // case CLEAR_DATA:
        //     return {
        //         initialState
        //     };           
        default:
            return state;
    }
}