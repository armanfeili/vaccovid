#!/usr/bin/env python3
"""
Fix province data structure for map components.
The map components expect:
{
    TwoLetterSymbol: "CA",
    province: "California",
    reports: [{
        confirmed: 123456,
        deaths: 1234,
        active: 0,
        confirmed_diff: 0,
        deaths_diff: 0,
        fatality_rate: 0.01
    }]
}
"""

import json
import os

# State/Province codes for each country
USA_STATES = {
    "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA",
    "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE", "Florida": "FL", "Georgia": "GA",
    "Hawaii": "HI", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Iowa": "IA",
    "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD",
    "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS", "Missouri": "MO",
    "Montana": "MT", "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", "New Jersey": "NJ",
    "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH",
    "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC",
    "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Vermont": "VT",
    "Virginia": "VA", "Washington": "WA", "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY",
    "District of Columbia": "DC", "Puerto Rico": "PR", "Guam": "GU", "Virgin Islands": "VI"
}

CANADA_PROVINCES = {
    "Ontario": "ON", "Quebec": "QC", "British Columbia": "BC", "Alberta": "AB",
    "Manitoba": "MB", "Saskatchewan": "SK", "Nova Scotia": "NS", "New Brunswick": "NB",
    "Newfoundland and Labrador": "NL", "Prince Edward Island": "PE", 
    "Northwest Territories": "NT", "Yukon": "YT", "Nunavut": "NU"
}

BRAZIL_STATES = {
    "Acre": "AC", "Alagoas": "AL", "Amapa": "AP", "Amazonas": "AM", "Bahia": "BA",
    "Ceara": "CE", "Distrito Federal": "DF", "Espirito Santo": "ES", "Goias": "GO",
    "Maranhao": "MA", "Mato Grosso": "MT", "Mato Grosso do Sul": "MS", "Minas Gerais": "MG",
    "Para": "PA", "Paraiba": "PB", "Parana": "PR", "Pernambuco": "PE", "Piaui": "PI",
    "Rio de Janeiro": "RJ", "Rio Grande do Norte": "RN", "Rio Grande do Sul": "RS",
    "Rondonia": "RO", "Roraima": "RR", "Santa Catarina": "SC", "Sao Paulo": "SP",
    "Sergipe": "SE", "Tocantins": "TO",
    # Alternative names
    "São Paulo": "SP", "Pará": "PA", "Ceará": "CE", "Goiás": "GO", "Maranhão": "MA",
    "Paraná": "PR", "Piauí": "PI", "Rondônia": "RO", "Espírito Santo": "ES",
    "Amapá": "AP"
}

GERMANY_STATES = {
    "Baden-Wurttemberg": "BW", "Baden-Württemberg": "BW", "Bavaria": "BY", "Bayern": "BY", 
    "Berlin": "BE", "Brandenburg": "BB", "Bremen": "HB", "Hamburg": "HH", 
    "Hesse": "HE", "Hessen": "HE", "Lower Saxony": "NI", "Niedersachsen": "NI",
    "Mecklenburg-Vorpommern": "MV", "Mecklenburg-Western Pomerania": "MV",
    "North Rhine-Westphalia": "NW", "Nordrhein-Westfalen": "NW",
    "Rhineland-Palatinate": "RP", "Rheinland-Pfalz": "RP",
    "Saarland": "SL", "Saxony": "SN", "Sachsen": "SN",
    "Saxony-Anhalt": "ST", "Sachsen-Anhalt": "ST",
    "Schleswig-Holstein": "SH", "Thuringia": "TH", "Thüringen": "TH"
}

AUSTRALIA_STATES = {
    "New South Wales": "NS", "Victoria": "VI", "Queensland": "QL", "Western Australia": "WA",
    "South Australia": "SA", "Tasmania": "TA", "Australian Capital Territory": "AC",
    "Northern Territory": "NT"
}

# Country code mappings
COUNTRY_CODES = {
    "USA": USA_STATES,
    "CAN": CANADA_PROVINCES,
    "BRA": BRAZIL_STATES,
    "DEU": GERMANY_STATES,
    "AUS": AUSTRALIA_STATES
}

def normalize_name(name):
    """Normalize province name for matching."""
    import unicodedata
    # Remove accents
    normalized = unicodedata.normalize('NFKD', name).encode('ASCII', 'ignore').decode('ASCII')
    return normalized.lower().replace('-', ' ').replace('_', ' ').strip()

def fix_province_data(provinces, country_code):
    """Fix the province data structure for map components."""
    code_map = COUNTRY_CODES.get(country_code, {})
    # Create normalized lookup
    normalized_map = {normalize_name(k): v for k, v in code_map.items()}
    
    fixed_provinces = []
    
    for prov in provinces:
        province_name = prov.get('province', '')
        normalized_prov = normalize_name(province_name)
        
        # Try exact match first
        two_letter = code_map.get(province_name, '')
        
        if not two_letter:
            # Try normalized match
            two_letter = normalized_map.get(normalized_prov, '')
        
        if not two_letter:
            # Try fuzzy matching with normalized names
            for norm_name, code in normalized_map.items():
                if norm_name in normalized_prov or normalized_prov in norm_name:
                    two_letter = code
                    break
        
        if not two_letter:
            # Try partial word match
            prov_words = set(normalized_prov.split())
            for norm_name, code in normalized_map.items():
                name_words = set(norm_name.split())
                if prov_words & name_words:  # intersection
                    two_letter = code
                    break
        
        # Create the fixed province object
        fixed_prov = {
            'TwoLetterSymbol': two_letter,
            'province': province_name,
            'reports': [{
                'confirmed': prov.get('confirmed', 0),
                'deaths': prov.get('deaths', 0),
                'active': prov.get('active', 0),
                'confirmed_diff': prov.get('confirmed_diff', 0),
                'deaths_diff': prov.get('deaths_diff', 0),
                'fatality_rate': prov.get('Case_Fatality_Rate', 0),
                'recovered': prov.get('recovered', 0)
            }]
        }
        fixed_provinces.append(fixed_prov)
        
        if not two_letter:
            print(f"  ⚠️ No code found for: {province_name}")
    
    return fixed_provinces

def main():
    # Load mock data
    mock_data_path = os.path.join(os.path.dirname(__file__), '..', 'client', 'public', 'data', 'mock-api-data.json')
    
    with open(mock_data_path, 'r') as f:
        data = json.load(f)
    
    # Fix province data for map countries
    provinces = data.get('provinces', {})
    
    for country_code in ['USA', 'CAN', 'BRA', 'DEU', 'AUS']:
        if country_code in provinces:
            print(f"Fixing {country_code} provinces...")
            provinces[country_code] = fix_province_data(provinces[country_code], country_code)
            print(f"  Fixed {len(provinces[country_code])} provinces")
    
    # Save back
    data['provinces'] = provinces
    
    with open(mock_data_path, 'w') as f:
        json.dump(data, f)
    
    print("\n✅ Province data fixed successfully!")
    
    # Print sample
    usa_sample = provinces.get('USA', [])[:2]
    print("\nSample USA data:")
    print(json.dumps(usa_sample, indent=2))

if __name__ == '__main__':
    main()
