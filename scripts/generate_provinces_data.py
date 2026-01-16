#!/usr/bin/env python3
"""
Generate province/state COVID-19 data for countries based on population distributions.
Data is distributed proportionally from national totals.
"""

import json
import os

# Province/state data for each country with approximate population percentages
COUNTRY_PROVINCES = {
    "USA": {
        "total_cases": 111820082,
        "total_deaths": 1219487,
        "total_recovered": 109814428,
        "cfr": 1.1,
        "provinces": [
            {"province": "California", "pop_pct": 11.8},
            {"province": "Texas", "pop_pct": 8.8},
            {"province": "Florida", "pop_pct": 6.5},
            {"province": "New York", "pop_pct": 5.9},
            {"province": "Pennsylvania", "pop_pct": 3.9},
            {"province": "Illinois", "pop_pct": 3.8},
            {"province": "Ohio", "pop_pct": 3.5},
            {"province": "Georgia", "pop_pct": 3.2},
            {"province": "North Carolina", "pop_pct": 3.2},
            {"province": "Michigan", "pop_pct": 3.0},
            {"province": "New Jersey", "pop_pct": 2.8},
            {"province": "Virginia", "pop_pct": 2.6},
            {"province": "Washington", "pop_pct": 2.3},
            {"province": "Arizona", "pop_pct": 2.2},
            {"province": "Massachusetts", "pop_pct": 2.1},
            {"province": "Tennessee", "pop_pct": 2.1},
            {"province": "Indiana", "pop_pct": 2.0},
            {"province": "Maryland", "pop_pct": 1.8},
            {"province": "Missouri", "pop_pct": 1.8},
            {"province": "Wisconsin", "pop_pct": 1.8},
            {"province": "Colorado", "pop_pct": 1.7},
            {"province": "Minnesota", "pop_pct": 1.7},
            {"province": "South Carolina", "pop_pct": 1.5},
            {"province": "Alabama", "pop_pct": 1.5},
            {"province": "Louisiana", "pop_pct": 1.4},
            {"province": "Kentucky", "pop_pct": 1.4},
            {"province": "Oregon", "pop_pct": 1.3},
            {"province": "Oklahoma", "pop_pct": 1.2},
            {"province": "Connecticut", "pop_pct": 1.1},
            {"province": "Utah", "pop_pct": 1.0},
            {"province": "Iowa", "pop_pct": 1.0},
            {"province": "Nevada", "pop_pct": 0.9},
            {"province": "Arkansas", "pop_pct": 0.9},
            {"province": "Mississippi", "pop_pct": 0.9},
            {"province": "Kansas", "pop_pct": 0.9},
            {"province": "New Mexico", "pop_pct": 0.6},
            {"province": "Nebraska", "pop_pct": 0.6},
            {"province": "Idaho", "pop_pct": 0.6},
            {"province": "West Virginia", "pop_pct": 0.5},
            {"province": "Hawaii", "pop_pct": 0.4},
            {"province": "New Hampshire", "pop_pct": 0.4},
            {"province": "Maine", "pop_pct": 0.4},
            {"province": "Montana", "pop_pct": 0.3},
            {"province": "Rhode Island", "pop_pct": 0.3},
            {"province": "Delaware", "pop_pct": 0.3},
            {"province": "South Dakota", "pop_pct": 0.3},
            {"province": "North Dakota", "pop_pct": 0.2},
            {"province": "Alaska", "pop_pct": 0.2},
            {"province": "Vermont", "pop_pct": 0.2},
            {"province": "Wyoming", "pop_pct": 0.2},
            {"province": "District of Columbia", "pop_pct": 0.2},
        ]
    },
    "CAN": {
        "total_cases": 4946090,
        "total_deaths": 59034,
        "total_recovered": 4881312,
        "cfr": 1.2,
        "provinces": [
            {"province": "Ontario", "pop_pct": 38.8},
            {"province": "Quebec", "pop_pct": 22.5},
            {"province": "British Columbia", "pop_pct": 13.5},
            {"province": "Alberta", "pop_pct": 11.7},
            {"province": "Manitoba", "pop_pct": 3.6},
            {"province": "Saskatchewan", "pop_pct": 3.1},
            {"province": "Nova Scotia", "pop_pct": 2.6},
            {"province": "New Brunswick", "pop_pct": 2.1},
            {"province": "Newfoundland and Labrador", "pop_pct": 1.4},
            {"province": "Prince Edward Island", "pop_pct": 0.4},
            {"province": "Northwest Territories", "pop_pct": 0.1},
            {"province": "Yukon", "pop_pct": 0.1},
            {"province": "Nunavut", "pop_pct": 0.1},
        ]
    },
    "IND": {
        "total_cases": 45035393,
        "total_deaths": 533570,
        "total_recovered": 44501823,
        "cfr": 1.2,
        "provinces": [
            {"province": "Maharashtra", "pop_pct": 16.5},
            {"province": "Kerala", "pop_pct": 15.2},
            {"province": "Karnataka", "pop_pct": 9.0},
            {"province": "Tamil Nadu", "pop_pct": 8.5},
            {"province": "Andhra Pradesh", "pop_pct": 5.7},
            {"province": "Uttar Pradesh", "pop_pct": 5.0},
            {"province": "West Bengal", "pop_pct": 4.8},
            {"province": "Delhi", "pop_pct": 4.5},
            {"province": "Rajasthan", "pop_pct": 3.0},
            {"province": "Gujarat", "pop_pct": 2.9},
            {"province": "Odisha", "pop_pct": 2.9},
            {"province": "Haryana", "pop_pct": 2.6},
            {"province": "Madhya Pradesh", "pop_pct": 2.3},
            {"province": "Telangana", "pop_pct": 1.9},
            {"province": "Bihar", "pop_pct": 1.8},
            {"province": "Chhattisgarh", "pop_pct": 1.5},
            {"province": "Assam", "pop_pct": 1.5},
            {"province": "Punjab", "pop_pct": 1.5},
            {"province": "Jharkhand", "pop_pct": 1.1},
            {"province": "Uttarakhand", "pop_pct": 1.0},
            {"province": "Himachal Pradesh", "pop_pct": 0.8},
            {"province": "Goa", "pop_pct": 0.6},
            {"province": "Jammu and Kashmir", "pop_pct": 0.6},
            {"province": "Puducherry", "pop_pct": 0.4},
            {"province": "Tripura", "pop_pct": 0.3},
            {"province": "Meghalaya", "pop_pct": 0.2},
            {"province": "Manipur", "pop_pct": 0.2},
            {"province": "Chandigarh", "pop_pct": 0.2},
            {"province": "Arunachal Pradesh", "pop_pct": 0.1},
            {"province": "Nagaland", "pop_pct": 0.1},
            {"province": "Mizoram", "pop_pct": 0.1},
            {"province": "Sikkim", "pop_pct": 0.1},
            {"province": "Andaman and Nicobar", "pop_pct": 0.05},
            {"province": "Ladakh", "pop_pct": 0.05},
            {"province": "Dadra and Nagar Haveli", "pop_pct": 0.03},
            {"province": "Lakshadweep", "pop_pct": 0.02},
        ]
    },
    "AUS": {
        "total_cases": 11853144,
        "total_deaths": 24414,
        "total_recovered": 11820014,
        "cfr": 0.2,
        "provinces": [
            {"province": "New South Wales", "pop_pct": 31.8},
            {"province": "Victoria", "pop_pct": 26.0},
            {"province": "Queensland", "pop_pct": 20.3},
            {"province": "Western Australia", "pop_pct": 10.5},
            {"province": "South Australia", "pop_pct": 7.0},
            {"province": "Tasmania", "pop_pct": 2.2},
            {"province": "Australian Capital Territory", "pop_pct": 1.7},
            {"province": "Northern Territory", "pop_pct": 0.5},
        ]
    },
    "BRA": {
        "total_cases": 38743918,
        "total_deaths": 711380,
        "total_recovered": 36249161,
        "cfr": 1.8,
        "provinces": [
            {"province": "São Paulo", "pop_pct": 21.9},
            {"province": "Minas Gerais", "pop_pct": 9.8},
            {"province": "Rio de Janeiro", "pop_pct": 8.0},
            {"province": "Bahia", "pop_pct": 7.0},
            {"province": "Paraná", "pop_pct": 5.5},
            {"province": "Rio Grande do Sul", "pop_pct": 5.3},
            {"province": "Pernambuco", "pop_pct": 4.5},
            {"province": "Ceará", "pop_pct": 4.3},
            {"province": "Pará", "pop_pct": 4.0},
            {"province": "Santa Catarina", "pop_pct": 3.5},
            {"province": "Goiás", "pop_pct": 3.4},
            {"province": "Maranhão", "pop_pct": 3.3},
            {"province": "Amazonas", "pop_pct": 2.0},
            {"province": "Espírito Santo", "pop_pct": 2.0},
            {"province": "Paraíba", "pop_pct": 1.9},
            {"province": "Mato Grosso", "pop_pct": 1.7},
            {"province": "Rio Grande do Norte", "pop_pct": 1.7},
            {"province": "Piauí", "pop_pct": 1.5},
            {"province": "Alagoas", "pop_pct": 1.5},
            {"province": "Distrito Federal", "pop_pct": 1.5},
            {"province": "Mato Grosso do Sul", "pop_pct": 1.4},
            {"province": "Sergipe", "pop_pct": 1.1},
            {"province": "Rondônia", "pop_pct": 0.9},
            {"province": "Tocantins", "pop_pct": 0.8},
            {"province": "Acre", "pop_pct": 0.4},
            {"province": "Amapá", "pop_pct": 0.4},
            {"province": "Roraima", "pop_pct": 0.3},
        ]
    },
    "JPN": {
        "total_cases": 33803572,
        "total_deaths": 74694,
        "total_recovered": 33728878,
        "cfr": 0.2,
        "provinces": [
            {"province": "Tokyo", "pop_pct": 11.1},
            {"province": "Osaka", "pop_pct": 7.0},
            {"province": "Kanagawa", "pop_pct": 7.3},
            {"province": "Aichi", "pop_pct": 6.0},
            {"province": "Saitama", "pop_pct": 5.8},
            {"province": "Chiba", "pop_pct": 5.0},
            {"province": "Hyogo", "pop_pct": 4.4},
            {"province": "Hokkaido", "pop_pct": 4.2},
            {"province": "Fukuoka", "pop_pct": 4.1},
            {"province": "Shizuoka", "pop_pct": 2.9},
            {"province": "Ibaraki", "pop_pct": 2.3},
            {"province": "Hiroshima", "pop_pct": 2.2},
            {"province": "Kyoto", "pop_pct": 2.1},
            {"province": "Niigata", "pop_pct": 1.8},
            {"province": "Miyagi", "pop_pct": 1.8},
            {"province": "Nagano", "pop_pct": 1.7},
            {"province": "Gifu", "pop_pct": 1.6},
            {"province": "Gunma", "pop_pct": 1.6},
            {"province": "Tochigi", "pop_pct": 1.5},
            {"province": "Okayama", "pop_pct": 1.5},
            {"province": "Fukushima", "pop_pct": 1.5},
            {"province": "Mie", "pop_pct": 1.4},
            {"province": "Kumamoto", "pop_pct": 1.4},
            {"province": "Kagoshima", "pop_pct": 1.3},
            {"province": "Okinawa", "pop_pct": 1.2},
            {"province": "Shiga", "pop_pct": 1.1},
            {"province": "Yamaguchi", "pop_pct": 1.1},
            {"province": "Nagasaki", "pop_pct": 1.1},
            {"province": "Ehime", "pop_pct": 1.1},
            {"province": "Nara", "pop_pct": 1.1},
            {"province": "Aomori", "pop_pct": 1.0},
            {"province": "Iwate", "pop_pct": 1.0},
            {"province": "Oita", "pop_pct": 0.9},
            {"province": "Ishikawa", "pop_pct": 0.9},
            {"province": "Yamagata", "pop_pct": 0.9},
            {"province": "Miyazaki", "pop_pct": 0.9},
            {"province": "Toyama", "pop_pct": 0.8},
            {"province": "Akita", "pop_pct": 0.8},
            {"province": "Kagawa", "pop_pct": 0.8},
            {"province": "Wakayama", "pop_pct": 0.8},
            {"province": "Saga", "pop_pct": 0.7},
            {"province": "Yamanashi", "pop_pct": 0.7},
            {"province": "Fukui", "pop_pct": 0.6},
            {"province": "Tokushima", "pop_pct": 0.6},
            {"province": "Kochi", "pop_pct": 0.6},
            {"province": "Shimane", "pop_pct": 0.5},
            {"province": "Tottori", "pop_pct": 0.5},
        ]
    },
    "DEU": {
        "total_cases": 38828995,
        "total_deaths": 183027,
        "total_recovered": 38240600,
        "cfr": 0.5,
        "provinces": [
            {"province": "North Rhine-Westphalia", "pop_pct": 21.6},
            {"province": "Bavaria", "pop_pct": 15.8},
            {"province": "Baden-Württemberg", "pop_pct": 13.4},
            {"province": "Lower Saxony", "pop_pct": 9.6},
            {"province": "Hesse", "pop_pct": 7.5},
            {"province": "Saxony", "pop_pct": 4.9},
            {"province": "Berlin", "pop_pct": 4.4},
            {"province": "Rhineland-Palatinate", "pop_pct": 4.9},
            {"province": "Schleswig-Holstein", "pop_pct": 3.5},
            {"province": "Brandenburg", "pop_pct": 3.0},
            {"province": "Saxony-Anhalt", "pop_pct": 2.6},
            {"province": "Thuringia", "pop_pct": 2.5},
            {"province": "Hamburg", "pop_pct": 2.2},
            {"province": "Mecklenburg-Vorpommern", "pop_pct": 1.9},
            {"province": "Saarland", "pop_pct": 1.2},
            {"province": "Bremen", "pop_pct": 0.8},
        ]
    },
    "FRA": {
        "total_cases": 40138560,
        "total_deaths": 167642,
        "total_recovered": 39970918,
        "cfr": 0.4,
        "provinces": [
            {"province": "Île-de-France", "pop_pct": 18.7},
            {"province": "Auvergne-Rhône-Alpes", "pop_pct": 12.2},
            {"province": "Hauts-de-France", "pop_pct": 9.0},
            {"province": "Nouvelle-Aquitaine", "pop_pct": 9.0},
            {"province": "Occitanie", "pop_pct": 9.0},
            {"province": "Grand Est", "pop_pct": 8.3},
            {"province": "Provence-Alpes-Côte d'Azur", "pop_pct": 7.6},
            {"province": "Pays de la Loire", "pop_pct": 5.7},
            {"province": "Normandie", "pop_pct": 5.0},
            {"province": "Brittany", "pop_pct": 5.0},
            {"province": "Bourgogne-Franche-Comté", "pop_pct": 4.2},
            {"province": "Centre-Val de Loire", "pop_pct": 3.9},
            {"province": "Corsica", "pop_pct": 0.5},
            {"province": "Guadeloupe", "pop_pct": 0.6},
            {"province": "Martinique", "pop_pct": 0.6},
            {"province": "French Guiana", "pop_pct": 0.4},
            {"province": "Réunion", "pop_pct": 1.3},
            {"province": "Mayotte", "pop_pct": 0.4},
        ]
    },
    "GBR": {
        "total_cases": 24910387,
        "total_deaths": 232112,
        "total_recovered": 24678275,
        "cfr": 0.9,
        "provinces": [
            {"province": "England", "pop_pct": 84.3},
            {"province": "Scotland", "pop_pct": 8.2},
            {"province": "Wales", "pop_pct": 4.7},
            {"province": "Northern Ireland", "pop_pct": 2.8},
        ]
    },
    "NLD": {
        "total_cases": 8635786,
        "total_deaths": 22992,
        "total_recovered": 8612599,
        "cfr": 0.3,
        "provinces": [
            {"province": "North Holland", "pop_pct": 16.6},
            {"province": "South Holland", "pop_pct": 21.4},
            {"province": "North Brabant", "pop_pct": 15.0},
            {"province": "Gelderland", "pop_pct": 12.2},
            {"province": "Utrecht", "pop_pct": 8.1},
            {"province": "Limburg", "pop_pct": 6.5},
            {"province": "Overijssel", "pop_pct": 6.8},
            {"province": "Friesland", "pop_pct": 3.8},
            {"province": "Groningen", "pop_pct": 3.5},
            {"province": "Drenthe", "pop_pct": 2.9},
            {"province": "Zeeland", "pop_pct": 2.2},
            {"province": "Flevoland", "pop_pct": 2.5},
        ]
    },
    "ITA": {
        "total_cases": 26723249,
        "total_deaths": 196487,
        "total_recovered": 26361218,
        "cfr": 0.7,
        "provinces": [
            {"province": "Lombardy", "pop_pct": 16.8},
            {"province": "Lazio", "pop_pct": 9.8},
            {"province": "Campania", "pop_pct": 9.5},
            {"province": "Sicily", "pop_pct": 8.3},
            {"province": "Veneto", "pop_pct": 8.2},
            {"province": "Emilia-Romagna", "pop_pct": 7.5},
            {"province": "Piedmont", "pop_pct": 7.2},
            {"province": "Apulia", "pop_pct": 6.7},
            {"province": "Tuscany", "pop_pct": 6.2},
            {"province": "Calabria", "pop_pct": 3.2},
            {"province": "Sardinia", "pop_pct": 2.7},
            {"province": "Liguria", "pop_pct": 2.6},
            {"province": "Marche", "pop_pct": 2.5},
            {"province": "Abruzzo", "pop_pct": 2.2},
            {"province": "Friuli Venezia Giulia", "pop_pct": 2.0},
            {"province": "Trentino-Alto Adige", "pop_pct": 1.8},
            {"province": "Umbria", "pop_pct": 1.5},
            {"province": "Basilicata", "pop_pct": 0.9},
            {"province": "Molise", "pop_pct": 0.5},
            {"province": "Aosta Valley", "pop_pct": 0.2},
        ]
    },
    "CHN": {
        "total_cases": 503302,
        "total_deaths": 5272,
        "total_recovered": 379053,
        "cfr": 1.0,
        "provinces": [
            {"province": "Hubei", "pop_pct": 35.0},  # Higher due to outbreak origin
            {"province": "Guangdong", "pop_pct": 10.0},
            {"province": "Henan", "pop_pct": 4.0},
            {"province": "Zhejiang", "pop_pct": 4.0},
            {"province": "Hunan", "pop_pct": 3.5},
            {"province": "Anhui", "pop_pct": 3.0},
            {"province": "Jiangxi", "pop_pct": 2.5},
            {"province": "Shandong", "pop_pct": 2.5},
            {"province": "Jiangsu", "pop_pct": 2.5},
            {"province": "Chongqing", "pop_pct": 2.0},
            {"province": "Sichuan", "pop_pct": 2.0},
            {"province": "Beijing", "pop_pct": 2.5},
            {"province": "Shanghai", "pop_pct": 5.0},
            {"province": "Heilongjiang", "pop_pct": 3.0},
            {"province": "Hebei", "pop_pct": 2.0},
            {"province": "Fujian", "pop_pct": 1.5},
            {"province": "Guangxi", "pop_pct": 1.0},
            {"province": "Shaanxi", "pop_pct": 1.0},
            {"province": "Yunnan", "pop_pct": 0.8},
            {"province": "Hainan", "pop_pct": 0.5},
            {"province": "Guizhou", "pop_pct": 0.5},
            {"province": "Tianjin", "pop_pct": 1.0},
            {"province": "Shanxi", "pop_pct": 0.5},
            {"province": "Liaoning", "pop_pct": 1.0},
            {"province": "Jilin", "pop_pct": 2.0},
            {"province": "Hong Kong", "pop_pct": 3.0},
            {"province": "Inner Mongolia", "pop_pct": 0.8},
            {"province": "Xinjiang", "pop_pct": 0.5},
            {"province": "Gansu", "pop_pct": 0.3},
            {"province": "Ningxia", "pop_pct": 0.2},
            {"province": "Macau", "pop_pct": 0.2},
            {"province": "Tibet", "pop_pct": 0.1},
            {"province": "Qinghai", "pop_pct": 0.1},
        ]
    },
    "CHL": {
        "total_cases": 5384853,
        "total_deaths": 64497,
        "total_recovered": 5252450,
        "cfr": 1.2,
        "provinces": [
            {"province": "Santiago Metropolitan", "pop_pct": 40.0},
            {"province": "Valparaíso", "pop_pct": 9.5},
            {"province": "Biobío", "pop_pct": 8.0},
            {"province": "Maule", "pop_pct": 5.5},
            {"province": "Araucanía", "pop_pct": 5.0},
            {"province": "O'Higgins", "pop_pct": 4.8},
            {"province": "Los Lagos", "pop_pct": 4.5},
            {"province": "Antofagasta", "pop_pct": 3.3},
            {"province": "Coquimbo", "pop_pct": 4.0},
            {"province": "Los Ríos", "pop_pct": 2.0},
            {"province": "Tarapacá", "pop_pct": 2.0},
            {"province": "Atacama", "pop_pct": 1.6},
            {"province": "Ñuble", "pop_pct": 2.5},
            {"province": "Magallanes", "pop_pct": 0.9},
            {"province": "Arica y Parinacota", "pop_pct": 1.3},
            {"province": "Aysén", "pop_pct": 0.6},
        ]
    },
    "COL": {
        "total_cases": 6400173,
        "total_deaths": 143200,
        "total_recovered": 6212152,
        "cfr": 2.2,
        "provinces": [
            {"province": "Bogotá", "pop_pct": 30.0},
            {"province": "Antioquia", "pop_pct": 15.0},
            {"province": "Valle del Cauca", "pop_pct": 10.0},
            {"province": "Cundinamarca", "pop_pct": 5.0},
            {"province": "Atlántico", "pop_pct": 6.0},
            {"province": "Santander", "pop_pct": 4.5},
            {"province": "Bolívar", "pop_pct": 3.5},
            {"province": "Córdoba", "pop_pct": 2.5},
            {"province": "Tolima", "pop_pct": 2.5},
            {"province": "Norte de Santander", "pop_pct": 2.5},
            {"province": "Nariño", "pop_pct": 2.5},
            {"province": "Boyacá", "pop_pct": 2.0},
            {"province": "Cauca", "pop_pct": 2.0},
            {"province": "Meta", "pop_pct": 1.5},
            {"province": "Risaralda", "pop_pct": 1.5},
            {"province": "Magdalena", "pop_pct": 1.5},
            {"province": "Caldas", "pop_pct": 1.5},
            {"province": "Huila", "pop_pct": 1.5},
            {"province": "Cesar", "pop_pct": 1.5},
            {"province": "Quindío", "pop_pct": 1.0},
            {"province": "Sucre", "pop_pct": 1.0},
            {"province": "La Guajira", "pop_pct": 0.8},
            {"province": "Casanare", "pop_pct": 0.5},
            {"province": "Caquetá", "pop_pct": 0.4},
            {"province": "Putumayo", "pop_pct": 0.3},
            {"province": "Chocó", "pop_pct": 0.3},
            {"province": "Arauca", "pop_pct": 0.2},
            {"province": "San Andrés", "pop_pct": 0.1},
            {"province": "Amazonas", "pop_pct": 0.1},
            {"province": "Guainía", "pop_pct": 0.05},
            {"province": "Vaupés", "pop_pct": 0.05},
            {"province": "Vichada", "pop_pct": 0.05},
            {"province": "Guaviare", "pop_pct": 0.05},
        ]
    },
    "DNK": {
        "total_cases": 3183756,
        "total_deaths": 8814,
        "total_recovered": 3174942,
        "cfr": 0.3,
        "provinces": [
            {"province": "Capital Region", "pop_pct": 31.5},
            {"province": "Central Denmark", "pop_pct": 22.6},
            {"province": "Southern Denmark", "pop_pct": 21.2},
            {"province": "North Denmark", "pop_pct": 10.1},
            {"province": "Zealand", "pop_pct": 14.6},
        ]
    },
    "MEX": {
        "total_cases": 7702809,
        "total_deaths": 334958,
        "total_recovered": 6899865,
        "cfr": 4.3,
        "provinces": [
            {"province": "Mexico City", "pop_pct": 20.0},
            {"province": "State of Mexico", "pop_pct": 12.0},
            {"province": "Nuevo León", "pop_pct": 5.5},
            {"province": "Jalisco", "pop_pct": 5.5},
            {"province": "Guanajuato", "pop_pct": 4.5},
            {"province": "Tabasco", "pop_pct": 4.0},
            {"province": "Puebla", "pop_pct": 4.0},
            {"province": "Veracruz", "pop_pct": 4.0},
            {"province": "Sonora", "pop_pct": 3.5},
            {"province": "San Luis Potosí", "pop_pct": 3.0},
            {"province": "Querétaro", "pop_pct": 2.5},
            {"province": "Coahuila", "pop_pct": 2.5},
            {"province": "Tamaulipas", "pop_pct": 2.5},
            {"province": "Sinaloa", "pop_pct": 2.5},
            {"province": "Baja California", "pop_pct": 2.5},
            {"province": "Chihuahua", "pop_pct": 2.5},
            {"province": "Yucatán", "pop_pct": 2.0},
            {"province": "Michoacán", "pop_pct": 2.0},
            {"province": "Hidalgo", "pop_pct": 2.0},
            {"province": "Oaxaca", "pop_pct": 1.5},
            {"province": "Guerrero", "pop_pct": 1.5},
            {"province": "Morelos", "pop_pct": 1.5},
            {"province": "Durango", "pop_pct": 1.2},
            {"province": "Aguascalientes", "pop_pct": 1.2},
            {"province": "Zacatecas", "pop_pct": 1.0},
            {"province": "Quintana Roo", "pop_pct": 1.0},
            {"province": "Chiapas", "pop_pct": 1.0},
            {"province": "Nayarit", "pop_pct": 0.8},
            {"province": "Tlaxcala", "pop_pct": 0.8},
            {"province": "Campeche", "pop_pct": 0.5},
            {"province": "Colima", "pop_pct": 0.5},
            {"province": "Baja California Sur", "pop_pct": 0.4},
        ]
    },
    "PAK": {
        "total_cases": 1581936,
        "total_deaths": 30664,
        "total_recovered": 1538689,
        "cfr": 1.9,
        "provinces": [
            {"province": "Sindh", "pop_pct": 30.0},
            {"province": "Punjab", "pop_pct": 35.0},
            {"province": "Khyber Pakhtunkhwa", "pop_pct": 12.0},
            {"province": "Islamabad", "pop_pct": 8.0},
            {"province": "Balochistan", "pop_pct": 5.0},
            {"province": "Azad Jammu and Kashmir", "pop_pct": 5.0},
            {"province": "Gilgit-Baltistan", "pop_pct": 5.0},
        ]
    },
    "PER": {
        "total_cases": 4572667,
        "total_deaths": 222161,
        "total_recovered": 4350506,
        "cfr": 4.9,
        "provinces": [
            {"province": "Lima", "pop_pct": 45.0},
            {"province": "Arequipa", "pop_pct": 6.0},
            {"province": "Callao", "pop_pct": 5.5},
            {"province": "La Libertad", "pop_pct": 5.0},
            {"province": "Piura", "pop_pct": 4.5},
            {"province": "Lambayeque", "pop_pct": 4.0},
            {"province": "Cusco", "pop_pct": 3.0},
            {"province": "Junín", "pop_pct": 3.0},
            {"province": "Áncash", "pop_pct": 2.5},
            {"province": "Ica", "pop_pct": 2.5},
            {"province": "Cajamarca", "pop_pct": 2.0},
            {"province": "Loreto", "pop_pct": 2.0},
            {"province": "Puno", "pop_pct": 2.0},
            {"province": "San Martín", "pop_pct": 2.0},
            {"province": "Tacna", "pop_pct": 1.5},
            {"province": "Ucayali", "pop_pct": 1.5},
            {"province": "Huánuco", "pop_pct": 1.5},
            {"province": "Moquegua", "pop_pct": 1.0},
            {"province": "Ayacucho", "pop_pct": 1.0},
            {"province": "Apurímac", "pop_pct": 0.8},
            {"province": "Amazonas", "pop_pct": 0.8},
            {"province": "Huancavelica", "pop_pct": 0.8},
            {"province": "Tumbes", "pop_pct": 0.8},
            {"province": "Pasco", "pop_pct": 0.6},
            {"province": "Madre de Dios", "pop_pct": 0.6},
        ]
    },
    "RUS": {
        "total_cases": 24124215,
        "total_deaths": 402756,
        "total_recovered": 23545818,
        "cfr": 1.7,
        "provinces": [
            {"province": "Moscow", "pop_pct": 18.0},
            {"province": "Moscow Oblast", "pop_pct": 8.0},
            {"province": "Saint Petersburg", "pop_pct": 7.5},
            {"province": "Nizhny Novgorod Oblast", "pop_pct": 3.0},
            {"province": "Sverdlovsk Oblast", "pop_pct": 3.5},
            {"province": "Samara Oblast", "pop_pct": 3.0},
            {"province": "Chelyabinsk Oblast", "pop_pct": 2.5},
            {"province": "Rostov Oblast", "pop_pct": 3.0},
            {"province": "Krasnodar Krai", "pop_pct": 3.5},
            {"province": "Tatarstan", "pop_pct": 3.0},
            {"province": "Bashkortostan", "pop_pct": 2.5},
            {"province": "Krasnoyarsk Krai", "pop_pct": 2.0},
            {"province": "Voronezh Oblast", "pop_pct": 2.0},
            {"province": "Perm Krai", "pop_pct": 2.0},
            {"province": "Irkutsk Oblast", "pop_pct": 1.8},
            {"province": "Volgograd Oblast", "pop_pct": 1.8},
            {"province": "Novosibirsk Oblast", "pop_pct": 2.0},
            {"province": "Saratov Oblast", "pop_pct": 1.8},
            {"province": "Leningrad Oblast", "pop_pct": 1.8},
            {"province": "Omsk Oblast", "pop_pct": 1.5},
            {"province": "Kemerovo Oblast", "pop_pct": 1.5},
            {"province": "Altai Krai", "pop_pct": 1.5},
            {"province": "Tyumen Oblast", "pop_pct": 1.5},
            {"province": "Stavropol Krai", "pop_pct": 1.5},
            {"province": "Orenburg Oblast", "pop_pct": 1.3},
            {"province": "Ulyanovsk Oblast", "pop_pct": 1.0},
            {"province": "Khanty-Mansi Autonomous Okrug", "pop_pct": 1.2},
            {"province": "Dagestan", "pop_pct": 1.3},
            {"province": "Primorsky Krai", "pop_pct": 1.3},
            {"province": "Tula Oblast", "pop_pct": 1.0},
            {"province": "Bryansk Oblast", "pop_pct": 0.8},
            {"province": "Yaroslavl Oblast", "pop_pct": 0.8},
            {"province": "Other Regions", "pop_pct": 10.0},
        ]
    },
    "ESP": {
        "total_cases": 13914811,
        "total_deaths": 121760,
        "total_recovered": 13762417,
        "cfr": 0.9,
        "provinces": [
            {"province": "Community of Madrid", "pop_pct": 18.0},
            {"province": "Catalonia", "pop_pct": 18.0},
            {"province": "Andalusia", "pop_pct": 13.0},
            {"province": "Valencian Community", "pop_pct": 10.0},
            {"province": "Castile and León", "pop_pct": 5.5},
            {"province": "Basque Country", "pop_pct": 6.5},
            {"province": "Galicia", "pop_pct": 5.0},
            {"province": "Castilla-La Mancha", "pop_pct": 4.5},
            {"province": "Canary Islands", "pop_pct": 4.0},
            {"province": "Aragon", "pop_pct": 3.5},
            {"province": "Murcia", "pop_pct": 3.0},
            {"province": "Balearic Islands", "pop_pct": 2.5},
            {"province": "Navarra", "pop_pct": 2.0},
            {"province": "Asturias", "pop_pct": 2.0},
            {"province": "Extremadura", "pop_pct": 1.5},
            {"province": "Cantabria", "pop_pct": 1.2},
            {"province": "La Rioja", "pop_pct": 0.8},
        ]
    },
    "SWE": {
        "total_cases": 2754129,
        "total_deaths": 27407,
        "total_recovered": 2726492,
        "cfr": 1.0,
        "provinces": [
            {"province": "Stockholm", "pop_pct": 26.0},
            {"province": "Västra Götaland", "pop_pct": 17.5},
            {"province": "Skåne", "pop_pct": 14.0},
            {"province": "Östergötland", "pop_pct": 4.6},
            {"province": "Uppsala", "pop_pct": 4.0},
            {"province": "Jönköping", "pop_pct": 3.7},
            {"province": "Halland", "pop_pct": 3.5},
            {"province": "Örebro", "pop_pct": 3.1},
            {"province": "Dalarna", "pop_pct": 2.9},
            {"province": "Gävleborg", "pop_pct": 2.9},
            {"province": "Värmland", "pop_pct": 2.8},
            {"province": "Södermanland", "pop_pct": 3.1},
            {"province": "Västmanland", "pop_pct": 2.8},
            {"province": "Västernorrland", "pop_pct": 2.5},
            {"province": "Norrbotten", "pop_pct": 2.5},
            {"province": "Kronoberg", "pop_pct": 2.0},
            {"province": "Kalmar", "pop_pct": 2.5},
            {"province": "Blekinge", "pop_pct": 1.6},
            {"province": "Västerbotten", "pop_pct": 2.8},
            {"province": "Jämtland", "pop_pct": 1.3},
            {"province": "Gotland", "pop_pct": 0.6},
        ]
    },
    "UKR": {
        "total_cases": 5557995,
        "total_deaths": 112418,
        "total_recovered": 5445577,
        "cfr": 2.0,
        "provinces": [
            {"province": "Kyiv City", "pop_pct": 15.0},
            {"province": "Kyiv Oblast", "pop_pct": 6.0},
            {"province": "Kharkiv Oblast", "pop_pct": 8.0},
            {"province": "Dnipropetrovsk Oblast", "pop_pct": 8.0},
            {"province": "Donetsk Oblast", "pop_pct": 6.0},
            {"province": "Odesa Oblast", "pop_pct": 6.0},
            {"province": "Zaporizhzhia Oblast", "pop_pct": 4.5},
            {"province": "Lviv Oblast", "pop_pct": 6.5},
            {"province": "Vinnytsia Oblast", "pop_pct": 4.0},
            {"province": "Poltava Oblast", "pop_pct": 3.5},
            {"province": "Chernihiv Oblast", "pop_pct": 2.5},
            {"province": "Zhytomyr Oblast", "pop_pct": 3.0},
            {"province": "Mykolaiv Oblast", "pop_pct": 2.8},
            {"province": "Khmelnytskyi Oblast", "pop_pct": 3.2},
            {"province": "Cherkasy Oblast", "pop_pct": 3.0},
            {"province": "Sumy Oblast", "pop_pct": 2.6},
            {"province": "Rivne Oblast", "pop_pct": 2.8},
            {"province": "Ivano-Frankivsk Oblast", "pop_pct": 3.3},
            {"province": "Volyn Oblast", "pop_pct": 2.5},
            {"province": "Ternopil Oblast", "pop_pct": 2.5},
            {"province": "Zakarpattia Oblast", "pop_pct": 3.0},
            {"province": "Kirovohrad Oblast", "pop_pct": 2.3},
            {"province": "Luhansk Oblast", "pop_pct": 2.0},
            {"province": "Chernivtsi Oblast", "pop_pct": 2.2},
        ]
    },
}


def generate_province_data(country_data):
    """Generate province data based on population percentage distribution."""
    provinces = []
    total_cases = country_data["total_cases"]
    total_deaths = country_data["total_deaths"]
    total_recovered = country_data["total_recovered"]
    cfr = country_data["cfr"]
    
    for prov in country_data["provinces"]:
        pop_pct = prov["pop_pct"] / 100
        
        confirmed = int(total_cases * pop_pct)
        deaths = int(total_deaths * pop_pct)
        recovered = int(total_recovered * pop_pct)
        active = 0  # Set to 0 as per project requirements
        
        # Calculate rates
        recovery_rate = round((recovered / confirmed * 100), 1) if confirmed > 0 else 0
        case_fatality_rate = round((deaths / confirmed * 100), 1) if confirmed > 0 else cfr
        
        province_obj = {
            "province": prov["province"],
            "confirmed": confirmed,
            "confirmed_diff": 0,  # New cases set to 0
            "deaths": deaths,
            "deaths_diff": 0,  # New deaths set to 0
            "recovered": recovered,
            "active": active,
            "Case_Fatality_Rate": case_fatality_rate,
            "Recovery_Proporation": recovery_rate,
            "reports": True,
        }
        provinces.append(province_obj)
    
    # Sort by confirmed cases descending
    provinces.sort(key=lambda x: x["confirmed"], reverse=True)
    return provinces


def main():
    # Generate provinces data for all countries
    all_provinces = {}
    
    for iso, data in COUNTRY_PROVINCES.items():
        provinces = generate_province_data(data)
        all_provinces[iso] = provinces
        print(f"Generated {len(provinces)} provinces for {iso}")
    
    # Read the existing mock-api-data.json
    mock_data_path = os.path.join(
        os.path.dirname(__file__), 
        "..", "client", "public", "data", "mock-api-data.json"
    )
    
    with open(mock_data_path, 'r', encoding='utf-8') as f:
        mock_data = json.load(f)
    
    # Update provinces in the mock data
    mock_data["provinces"] = all_provinces
    
    # Write updated data back
    with open(mock_data_path, 'w', encoding='utf-8') as f:
        json.dump(mock_data, f, indent=2, ensure_ascii=False)
    
    print(f"\nUpdated {mock_data_path}")
    
    # Also output to a separate file for the server-side mockApi
    provinces_json_path = os.path.join(
        os.path.dirname(__file__), 
        "..", "provinces_data.json"
    )
    
    with open(provinces_json_path, 'w', encoding='utf-8') as f:
        json.dump(all_provinces, f, indent=2, ensure_ascii=False)
    
    print(f"Saved provinces data to {provinces_json_path}")
    
    # Print summary
    print("\n=== Summary ===")
    for iso, provinces in all_provinces.items():
        total_confirmed = sum(p["confirmed"] for p in provinces)
        print(f"{iso}: {len(provinces)} provinces, {total_confirmed:,} total cases")


if __name__ == "__main__":
    main()
