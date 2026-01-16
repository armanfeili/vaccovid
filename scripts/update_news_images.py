#!/usr/bin/env python3
"""
Update news images with valid URLs.
Using placeholder images that are guaranteed to work.
"""

import json
import os

# Valid working image URLs for different categories
# Using picsum.photos (Lorem Picsum) which provides reliable placeholder images
VACCINE_IMAGES = [
    "https://picsum.photos/seed/vaccine1/400/200",
    "https://picsum.photos/seed/vaccine2/400/200",
    "https://picsum.photos/seed/vaccine3/400/200",
    "https://picsum.photos/seed/vaccine4/400/200",
    "https://picsum.photos/seed/vaccine5/400/200",
    "https://picsum.photos/seed/vaccine6/400/200",
    "https://picsum.photos/seed/vaccine7/400/200",
    "https://picsum.photos/seed/vaccine8/400/200",
    "https://picsum.photos/seed/vaccine9/400/200",
    "https://picsum.photos/seed/vaccine10/400/200",
]

CORONAVIRUS_IMAGES = [
    "https://picsum.photos/seed/covid1/400/200",
    "https://picsum.photos/seed/covid2/400/200",
    "https://picsum.photos/seed/covid3/400/200",
    "https://picsum.photos/seed/covid4/400/200",
    "https://picsum.photos/seed/covid5/400/200",
    "https://picsum.photos/seed/covid6/400/200",
    "https://picsum.photos/seed/covid7/400/200",
    "https://picsum.photos/seed/covid8/400/200",
    "https://picsum.photos/seed/covid9/400/200",
    "https://picsum.photos/seed/covid10/400/200",
]

HEALTH_IMAGES = [
    "https://picsum.photos/seed/health1/400/200",
    "https://picsum.photos/seed/health2/400/200",
    "https://picsum.photos/seed/health3/400/200",
    "https://picsum.photos/seed/health4/400/200",
    "https://picsum.photos/seed/health5/400/200",
    "https://picsum.photos/seed/health6/400/200",
    "https://picsum.photos/seed/health7/400/200",
    "https://picsum.photos/seed/health8/400/200",
    "https://picsum.photos/seed/health9/400/200",
    "https://picsum.photos/seed/health10/400/200",
]

def main():
    mock_data_path = os.path.join(os.path.dirname(__file__), '..', 'client', 'public', 'data', 'mock-api-data.json')
    
    with open(mock_data_path, 'r') as f:
        data = json.load(f)
    
    news = data.get('news', [])
    
    vaccine_idx = 0
    corona_idx = 0
    health_idx = 0
    
    for article in news:
        category = article.get('category', '').lower()
        
        if 'vaccine' in category:
            article['urlToImage'] = VACCINE_IMAGES[vaccine_idx % len(VACCINE_IMAGES)]
            vaccine_idx += 1
        elif 'coronavirus' in category or 'covid' in category:
            article['urlToImage'] = CORONAVIRUS_IMAGES[corona_idx % len(CORONAVIRUS_IMAGES)]
            corona_idx += 1
        else:
            article['urlToImage'] = HEALTH_IMAGES[health_idx % len(HEALTH_IMAGES)]
            health_idx += 1
    
    data['news'] = news
    
    with open(mock_data_path, 'w') as f:
        json.dump(data, f)
    
    print(f"✅ Updated {len(news)} news articles with valid image URLs")
    print(f"Sample news article:")
    print(json.dumps(news[0] if news else {}, indent=2))

if __name__ == '__main__':
    main()
