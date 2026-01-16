#!/usr/bin/env python3
"""
Generate vaccine and treatment data from vaccine-data.csv
and update the mock-api-data.json file.
"""

import json
import csv
import os
import re
from datetime import datetime

def trim_string(s):
    """Convert string to URL-friendly format"""
    if not s:
        return ""
    s = re.sub(r'\s+', '-', s)
    s = re.sub(r'/', '', s)
    s = s.replace(',', '-')
    s = re.sub(r'-+', '-', s)
    s = re.sub(r';', '', s)
    s = s.replace("'", "")
    return s.lower().strip('-')

def parse_date(date_str):
    """Parse date string to ISO format"""
    if not date_str:
        return None
    try:
        # Try different date formats
        for fmt in ['%m/%d/%Y', '%Y-%m-%d', '%m/%d/%y', '%B %d, %Y']:
            try:
                dt = datetime.strptime(date_str.strip(), fmt)
                return dt.strftime('%Y-%m-%d')
            except ValueError:
                continue
        return date_str
    except:
        return date_str

def extract_urls(text):
    """Extract URLs from text"""
    if not text:
        return []
    url_pattern = r'https?://[^\s\)\]]+(?:\([^\)]*\))?[^\s\)\]]*'
    urls = re.findall(url_pattern, text)
    # Clean up URLs
    cleaned_urls = []
    for url in urls:
        # Remove trailing punctuation and parentheses
        url = re.sub(r'[\)\],;]+$', '', url)
        if url:
            cleaned_urls.append(url)
    return cleaned_urls

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    csv_path = os.path.join(project_root, 'app', 'src', 'utils', 'vaccine-data.csv')
    json_path = os.path.join(project_root, 'client', 'public', 'data', 'mock-api-data.json')
    
    # Load existing mock data
    with open(json_path, 'r') as f:
        mock_data = json.load(f)
    
    vaccines = []
    treatments = []
    
    # Read CSV file
    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        
        for row in reader:
            # Get the type (Treatment or Vaccine)
            item_type = row.get('Treatment vs. Vaccine', '').strip()
            
            # Extract data fields
            developer = row.get('Developer / Researcher', '').strip()
            category = row.get('Product Category', '').strip()
            stage = row.get('Stage of Development', '').strip()
            next_steps = row.get('Anticipated Next Steps', '').strip()
            description = row.get('Product Description', '').strip()
            clinical_trials = row.get('Clinical Trials for COVID-19', '').strip()
            funder = row.get('Funder', '').strip()
            published_results = row.get('Published Results', '').strip()
            related_use = row.get('Clinical Trials for Other Diseases (T only) / Related Use or Platform (V only)', '').strip()
            fda_approved = row.get('FDA-Approved Indications', '').strip()
            sources = row.get('Sources', '').strip()
            date_updated = row.get('Date Last Updated', '').strip()
            
            # Skip empty rows
            if not developer:
                continue
            
            # Determine phase based on stage
            phase = stage
            if 'pre-clinical' in stage.lower() or 'pre clinical' in stage.lower():
                phase = 'Pre-clinical'
            elif 'phase iv' in stage.lower() or 'phase 4' in stage.lower():
                phase = 'Phase IV'
            elif 'phase iii' in stage.lower() or 'phase 3' in stage.lower():
                phase = 'Phase III'
            elif 'phase ii' in stage.lower() or 'phase 2' in stage.lower():
                phase = 'Phase II'
            elif 'phase i' in stage.lower() or 'phase 1' in stage.lower():
                phase = 'Phase I'
            elif 'clinical' in stage.lower():
                phase = 'Clinical'
            elif 'approved' in stage.lower():
                phase = 'FDA Approved'
            
            # Extract URLs from published results
            result_urls = extract_urls(published_results)
            source_urls = extract_urls(sources)
            
            # Create item object with all required fields for frontend
            item = {
                'developerResearcher': developer,
                'category': category,
                'phase': phase,
                'clinical_stage': stage,
                'stage': stage,
                'description': description if description else 'No description available',
                'nextSteps': next_steps if next_steps else 'Information not available',
                'clinicalTrials': clinical_trials,
                'funder': funder if funder else 'Unknown',
                'publishedResults': published_results,
                'resultUrls': result_urls,
                'relatedUse': related_use,
                'FDAApproved': fda_approved if fda_approved and fda_approved != 'N/A' else 'Not Approved Yet',
                'fda_approved': fda_approved and fda_approved != 'N/A' and 'approved' in fda_approved.lower(),
                'sources': sources,
                'sourceUrls': source_urls,
                'lastUpdated': parse_date(date_updated),
                'trimedCategory': trim_string(category),
                'trimedName': trim_string(developer),
                'name': developer,
                'platform': category,
            }
            
            if item_type == 'Vaccine':
                vaccines.append(item)
            elif item_type == 'Treatment':
                treatments.append(item)
    
    # Update mock data
    mock_data['vaccines'] = vaccines
    mock_data['treatments'] = treatments
    
    # Save updated mock data
    with open(json_path, 'w') as f:
        json.dump(mock_data, f, indent=2)
    
    print(f"✅ Processed {len(vaccines)} vaccines and {len(treatments)} treatments")
    print(f"📁 Updated: {json_path}")
    
    # Show sample data
    if vaccines:
        print("\n📊 Sample vaccine:")
        sample = vaccines[0]
        print(f"  Developer: {sample['developerResearcher']}")
        print(f"  Category: {sample['category']}")
        print(f"  Phase: {sample['phase']}")
        print(f"  Description: {sample['description'][:100]}...")
    
    if treatments:
        print("\n💊 Sample treatment:")
        sample = treatments[0]
        print(f"  Developer: {sample['developerResearcher']}")
        print(f"  Category: {sample['category']}")
        print(f"  Phase: {sample['phase']}")
        print(f"  Description: {sample['description'][:100]}...")

if __name__ == '__main__':
    main()
