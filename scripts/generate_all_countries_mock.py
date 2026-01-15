#!/usr/bin/env python3
"""
Generate mock-api-data.json with all countries from owid-covid-data.csv
"""

import csv
import json
from collections import defaultdict

# Paths
OWID_CSV_PATH = "../app/src/utils/owid-covid-data.csv"
MOCK_DATA_PATH = "../client/public/data/mock-api-data.json"

# Continent mapping to region
CONTINENT_TO_REGION = {
    "Africa": "Africa",
    "Asia": "Asia", 
    "Europe": "Europe",
    "North America": "North America",
    "South America": "South America",
    "Oceania": "Oceania",
}

def parse_owid_csv():
    """Parse OWID CSV and get latest data for each country."""
    countries_data = {}
    
    with open(OWID_CSV_PATH, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            iso = row['iso_code']
            
            # Skip aggregate entries (OWID_*)
            if iso.startswith('OWID_'):
                continue
            
            location = row['location']
            continent = row['continent']
            
            # Skip entries without continent (aggregates)
            if not continent:
                continue
            
            # Parse numeric values safely
            def safe_float(val, default=0):
                try:
                    return float(val) if val else default
                except ValueError:
                    return default
            
            def safe_int(val, default=0):
                try:
                    return int(float(val)) if val else default
                except ValueError:
                    return default
            
            # Get current data for this row
            total_cases = safe_int(row.get('total_cases', 0))
            total_deaths = safe_int(row.get('total_deaths', 0))
            new_cases = safe_int(row.get('new_cases', 0))
            new_deaths = safe_int(row.get('new_deaths', 0))
            population = safe_int(row.get('population', 0))
            
            # Only update if this has newer/better data
            if iso not in countries_data or total_cases > countries_data[iso].get('total_cases', 0):
                countries_data[iso] = {
                    'iso': iso,
                    'location': location,
                    'continent': continent,
                    'total_cases': total_cases,
                    'total_deaths': total_deaths,
                    'new_cases': new_cases,
                    'new_deaths': new_deaths,
                    'population': population,
                }
    
    return countries_data

def build_country_entry(data):
    """Build a country entry in the format expected by the app."""
    total_cases = data['total_cases']
    total_deaths = data['total_deaths']
    population = data['population']
    
    # Calculate derived values
    total_recovered = max(0, total_cases - total_deaths)  # Simplified
    
    infection_risk = "0"
    if population > 0:
        infection_risk = f"{(total_cases / population) * 100:.1f}"
    
    case_fatality_rate = "0"
    if total_cases > 0:
        case_fatality_rate = f"{(total_deaths / total_cases) * 100:.1f}"
    
    recovery_proportion = "100"
    if total_cases > 0:
        recovery_proportion = f"{(total_recovered / total_cases) * 100:.1f}"
    
    return {
        "Country": data['location'],
        "ThreeLetterSymbol": data['iso'],
        "TotalCases": total_cases,
        "TotalDeaths": total_deaths,
        "TotalRecovered": total_recovered,
        "ActiveCases": 0,
        "Serious_Critical": 0,
        "NewCases": data['new_cases'],
        "NewDeaths": data['new_deaths'],
        "TotalTests": 0,
        "Infection_Risk": infection_risk,
        "Case_Fatality_Rate": case_fatality_rate,
        "Test_Percentage": "0",
        "Recovery_Proporation": recovery_proportion,
        "Population": population,
        # Additional fields used by some components
        "country": data['location'],
        "iso": data['iso'],
        "cases": total_cases,
        "deaths": total_deaths,
        "recovered": total_recovered,
        "active": 0,
        "critical": 0,
        "todayCases": data['new_cases'],
        "todayDeaths": data['new_deaths'],
        "continent": data['continent'],
    }

def main():
    # Load existing mock data
    with open(MOCK_DATA_PATH, 'r', encoding='utf-8') as f:
        mock_data = json.load(f)
    
    print(f"Current countries count: {len(mock_data.get('countries', []))}")
    
    # Parse OWID data
    owid_data = parse_owid_csv()
    print(f"Countries in OWID: {len(owid_data)}")
    
    # Build new countries list
    countries = []
    for iso, data in owid_data.items():
        entry = build_country_entry(data)
        countries.append(entry)
    
    # Sort by total cases descending
    countries.sort(key=lambda x: x['TotalCases'], reverse=True)
    
    # Calculate world totals
    total_cases = sum(c['TotalCases'] for c in countries)
    total_deaths = sum(c['TotalDeaths'] for c in countries)
    total_recovered = sum(c['TotalRecovered'] for c in countries)
    
    # Update mock data
    mock_data['countries'] = countries
    mock_data['world'] = {
        "TotalCases": total_cases,
        "TotalDeaths": total_deaths,
        "TotalRecovered": total_recovered,
        "ActiveCases": 0,
        "Serious_Critical": 0,
        "NewCases": sum(c['NewCases'] for c in countries),
        "NewDeaths": sum(c['NewDeaths'] for c in countries),
        "NewRecovered": 0,
        "AffectedCountries": len(countries),
        "dataDate": "2023-02-14",
        "updated": "2023-02-14T00:00:00.000Z"
    }
    
    # Write updated mock data
    with open(MOCK_DATA_PATH, 'w', encoding='utf-8') as f:
        json.dump(mock_data, f, indent=2)
    
    print(f"Updated mock data with {len(countries)} countries")
    print(f"World totals: {total_cases:,} cases, {total_deaths:,} deaths")

if __name__ == "__main__":
    main()
