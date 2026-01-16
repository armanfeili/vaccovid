#!/usr/bin/env python3
"""
Generate province data for map components with proper structure.
"""

import json
import os
import random

# State/Province codes and populations for each country
USA_STATES = {
    "California": ("CA", 39512223), "Texas": ("TX", 28995881), "Florida": ("FL", 21477737),
    "New York": ("NY", 19453561), "Pennsylvania": ("PA", 12801989), "Illinois": ("IL", 12671821),
    "Ohio": ("OH", 11689100), "Georgia": ("GA", 10617423), "North Carolina": ("NC", 10488084),
    "Michigan": ("MI", 9986857), "New Jersey": ("NJ", 8882190), "Virginia": ("VA", 8535519),
    "Washington": ("WA", 7614893), "Arizona": ("AZ", 7278717), "Massachusetts": ("MA", 6892503),
    "Tennessee": ("TN", 6829174), "Indiana": ("IN", 6732219), "Missouri": ("MO", 6137428),
    "Maryland": ("MD", 6045680), "Wisconsin": ("WI", 5822434), "Colorado": ("CO", 5758736),
    "Minnesota": ("MN", 5639632), "South Carolina": ("SC", 5148714), "Alabama": ("AL", 4903185),
    "Louisiana": ("LA", 4648794), "Kentucky": ("KY", 4467673), "Oregon": ("OR", 4217737),
    "Oklahoma": ("OK", 3956971), "Connecticut": ("CT", 3565287), "Utah": ("UT", 3205958),
    "Iowa": ("IA", 3155070), "Nevada": ("NV", 3080156), "Arkansas": ("AR", 3017804),
    "Mississippi": ("MS", 2976149), "Kansas": ("KS", 2913314), "New Mexico": ("NM", 2096829),
    "Nebraska": ("NE", 1934408), "Idaho": ("ID", 1787065), "West Virginia": ("WV", 1792147),
    "Hawaii": ("HI", 1415872), "New Hampshire": ("NH", 1359711), "Maine": ("ME", 1344212),
    "Montana": ("MT", 1068778), "Rhode Island": ("RI", 1059361), "Delaware": ("DE", 973764),
    "South Dakota": ("SD", 884659), "North Dakota": ("ND", 762062), "Alaska": ("AK", 731545),
    "Vermont": ("VT", 623989), "Wyoming": ("WY", 578759), "District of Columbia": ("DC", 705749)
}

CANADA_PROVINCES = {
    "Ontario": ("ON", 14734014), "Quebec": ("QC", 8574571), "British Columbia": ("BC", 5147712),
    "Alberta": ("AB", 4421876), "Manitoba": ("MB", 1379263), "Saskatchewan": ("SK", 1178681),
    "Nova Scotia": ("NS", 979351), "New Brunswick": ("NB", 781476),
    "Newfoundland and Labrador": ("NL", 521542), "Prince Edward Island": ("PE", 159625),
    "Northwest Territories": ("NT", 45161), "Yukon": ("YT", 42052), "Nunavut": ("NU", 39353)
}

BRAZIL_STATES = {
    "Sao Paulo": ("SP", 46289333), "Rio de Janeiro": ("RJ", 17366189), "Minas Gerais": ("MG", 21292666),
    "Bahia": ("BA", 14930634), "Parana": ("PR", 11516840), "Rio Grande do Sul": ("RS", 11422973),
    "Pernambuco": ("PE", 9616621), "Ceara": ("CE", 9187103), "Para": ("PA", 8690745),
    "Santa Catarina": ("SC", 7252502), "Goias": ("GO", 7113540), "Maranhao": ("MA", 7114598),
    "Paraiba": ("PB", 4039277), "Amazonas": ("AM", 4207714), "Espirito Santo": ("ES", 4064052),
    "Rio Grande do Norte": ("RN", 3534165), "Mato Grosso": ("MT", 3526220), "Alagoas": ("AL", 3351543),
    "Piaui": ("PI", 3273227), "Distrito Federal": ("DF", 3055149), "Mato Grosso do Sul": ("MS", 2809394),
    "Sergipe": ("SE", 2318822), "Rondonia": ("RO", 1796460), "Tocantins": ("TO", 1590248),
    "Acre": ("AC", 894470), "Amapa": ("AP", 861773), "Roraima": ("RR", 631181)
}

GERMANY_STATES = {
    "North Rhine-Westphalia": ("NW", 17932651), "Bavaria": ("BY", 13124737), "Baden-Wurttemberg": ("BW", 11100394),
    "Lower Saxony": ("NI", 7993608), "Hesse": ("HE", 6288080), "Saxony": ("SN", 4071971),
    "Rhineland-Palatinate": ("RP", 4093903), "Berlin": ("BE", 3644826), "Schleswig-Holstein": ("SH", 2903773),
    "Brandenburg": ("BB", 2521893), "Saxony-Anhalt": ("ST", 2194782), "Thuringia": ("TH", 2133378),
    "Hamburg": ("HH", 1852478), "Mecklenburg-Vorpommern": ("MV", 1608138), "Saarland": ("SL", 986887),
    "Bremen": ("HB", 681202)
}

AUSTRALIA_STATES = {
    "New South Wales": ("NS", 8166369), "Victoria": ("VI", 6681386), "Queensland": ("QL", 5184847),
    "Western Australia": ("WA", 2667130), "South Australia": ("SA", 1771703),
    "Tasmania": ("TA", 541071), "Australian Capital Territory": ("AC", 431215),
    "Northern Territory": ("NT", 246143)
}

# Country total cases from Worldometers
COUNTRY_TOTALS = {
    "USA": {"cases": 111820082, "deaths": 1219487, "recovered": 109814428},
    "CAN": {"cases": 4757155, "deaths": 54242, "recovered": 4657671},
    "BRA": {"cases": 38012993, "deaths": 711985, "recovered": 37100520},
    "DEU": {"cases": 38828995, "deaths": 175298, "recovered": 37926700},
    "AUS": {"cases": 11769820, "deaths": 24918, "recovered": 11511804}
}

def generate_province_data(provinces_with_pop, country_code):
    """Generate province data distributing country totals by population."""
    totals = COUNTRY_TOTALS.get(country_code, {"cases": 1000000, "deaths": 10000, "recovered": 980000})
    
    # Calculate total population
    total_pop = sum(pop for _, (_, pop) in provinces_with_pop.items())
    
    result = []
    for name, (code, pop) in provinces_with_pop.items():
        # Distribute cases proportionally to population with some randomness
        pop_ratio = pop / total_pop
        variance = random.uniform(0.8, 1.2)  # +/- 20% variance
        
        confirmed = int(totals["cases"] * pop_ratio * variance)
        deaths = int(totals["deaths"] * pop_ratio * variance)
        recovered = int(totals["recovered"] * pop_ratio * variance)
        
        # Calculate fatality rate
        fatality_rate = round((deaths / confirmed * 100) if confirmed > 0 else 0, 2)
        
        province = {
            "TwoLetterSymbol": code,
            "province": name,
            "reports": [{
                "confirmed": confirmed,
                "deaths": deaths,
                "active": 0,  # Set to 0 as per previous requirements
                "confirmed_diff": 0,
                "deaths_diff": 0,
                "fatality_rate": fatality_rate,
                "recovered": recovered
            }]
        }
        result.append(province)
    
    # Sort by confirmed cases descending
    result.sort(key=lambda x: x["reports"][0]["confirmed"], reverse=True)
    return result

def main():
    mock_data_path = os.path.join(os.path.dirname(__file__), '..', 'client', 'public', 'data', 'mock-api-data.json')
    
    # Load existing mock data
    with open(mock_data_path, 'r') as f:
        data = json.load(f)
    
    # Generate province data for map countries
    provinces = data.get('provinces', {})
    
    # Generate new province data with proper structure
    provinces['USA'] = generate_province_data(USA_STATES, 'USA')
    provinces['CAN'] = generate_province_data(CANADA_PROVINCES, 'CAN')
    provinces['BRA'] = generate_province_data(BRAZIL_STATES, 'BRA')
    provinces['DEU'] = generate_province_data(GERMANY_STATES, 'DEU')
    provinces['AUS'] = generate_province_data(AUSTRALIA_STATES, 'AUS')
    
    print(f"Generated USA: {len(provinces['USA'])} states")
    print(f"Generated CAN: {len(provinces['CAN'])} provinces")
    print(f"Generated BRA: {len(provinces['BRA'])} states")
    print(f"Generated DEU: {len(provinces['DEU'])} states")
    print(f"Generated AUS: {len(provinces['AUS'])} states")
    
    # Save back
    data['provinces'] = provinces
    
    with open(mock_data_path, 'w') as f:
        json.dump(data, f)
    
    print("\n✅ Province data generated successfully!")
    
    # Print sample
    print("\nSample USA data:")
    print(json.dumps(provinces['USA'][:2], indent=2))
    
    # Print all codes for verification
    print("\nUSA codes:", [p['TwoLetterSymbol'] for p in provinces['USA'][:10]])
    print("CAN codes:", [p['TwoLetterSymbol'] for p in provinces['CAN']])
    print("BRA codes:", [p['TwoLetterSymbol'] for p in provinces['BRA'][:10]])
    print("DEU codes:", [p['TwoLetterSymbol'] for p in provinces['DEU']])
    print("AUS codes:", [p['TwoLetterSymbol'] for p in provinces['AUS']])

if __name__ == '__main__':
    main()
