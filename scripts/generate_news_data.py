#!/usr/bin/env python3
"""
Generate news data for COVID-19, vaccine, and health categories.
Updates the mock-api-data.json file with realistic news articles.
"""

import json
import os
import random
from datetime import datetime, timedelta

# Available news sources (must match the images in news-logo-resized folder)
SOURCES = [
    'abc-news', 'abc-news-au', 'axios', 'bbc-news', 'bloomberg', 
    'cbc-news', 'cbs-news', 'cnn', 'fox-news', 'google-news',
    'google-news-au', 'google-news-ca', 'google-news-in', 'google-news-uk',
    'medical-news-today', 'national-geographic', 'nbc-news', 'new-scientist',
    'news24', 'next-big-future', 'the-times-of-india', 'the-wall-street-journal',
    'the-washington-post', 'the-washington-times', 'time', 'usa-today', 'who'
]

# News categories with realistic headlines and content
VACCINE_NEWS = [
    {
        "title": "New COVID-19 Vaccine Shows 95% Efficacy in Clinical Trials",
        "content": "A new coronavirus vaccine candidate has demonstrated remarkable efficacy in late-stage clinical trials, offering hope for broader protection against emerging variants. Researchers report that the vaccine triggers a strong immune response across all age groups tested.",
        "keywords": ["vaccine", "efficacy", "clinical trials", "COVID-19"]
    },
    {
        "title": "WHO Approves Emergency Use of Updated Booster Vaccine",
        "content": "The World Health Organization has granted emergency use listing to an updated booster vaccine designed to combat the latest SARS-CoV-2 variants. Health officials worldwide are preparing distribution strategies.",
        "keywords": ["WHO", "booster", "vaccine", "emergency use"]
    },
    {
        "title": "mRNA Vaccine Technology Advances Cancer Treatment Research",
        "content": "Scientists are leveraging the success of mRNA COVID-19 vaccines to develop new cancer treatments. Early trials show promising results in targeting tumor cells while minimizing side effects.",
        "keywords": ["mRNA", "vaccine", "cancer", "research"]
    },
    {
        "title": "Global Vaccination Campaign Reaches 5 Billion Doses Administered",
        "content": "The worldwide COVID-19 vaccination effort has achieved a significant milestone with over 5 billion doses administered globally. Health experts credit international cooperation and rapid vaccine development.",
        "keywords": ["vaccination", "global", "milestone", "COVID-19"]
    },
    {
        "title": "Pfizer and BioNTech Announce Next-Generation Vaccine Development",
        "content": "Pharmaceutical giants Pfizer and BioNTech have unveiled plans for a next-generation COVID-19 vaccine that targets multiple variants simultaneously. Clinical trials are expected to begin soon.",
        "keywords": ["Pfizer", "BioNTech", "vaccine", "variants"]
    },
    {
        "title": "Moderna Expands Manufacturing Capacity for Vaccine Production",
        "content": "Moderna has announced significant expansion of its manufacturing facilities to meet global demand for COVID-19 vaccines. The company aims to produce 3 billion doses annually by next year.",
        "keywords": ["Moderna", "manufacturing", "vaccine", "production"]
    },
    {
        "title": "New Study Confirms Long-Term Immunity from COVID Vaccines",
        "content": "Research published in a leading medical journal confirms that COVID-19 vaccines provide lasting immunity, with antibody levels remaining protective for at least 12 months after the second dose.",
        "keywords": ["immunity", "COVID", "vaccine", "study"]
    },
    {
        "title": "AstraZeneca Vaccine Proves Effective Against Delta Variant",
        "content": "New data shows the Oxford-AstraZeneca vaccine maintains high efficacy against the Delta variant of SARS-CoV-2, providing strong protection against severe illness and hospitalization.",
        "keywords": ["AstraZeneca", "Delta", "variant", "vaccine"]
    },
    {
        "title": "Johnson & Johnson Single-Dose Vaccine Gets FDA Full Approval",
        "content": "The FDA has granted full approval to the Johnson & Johnson single-dose COVID-19 vaccine, citing comprehensive data on safety and efficacy from ongoing studies.",
        "keywords": ["Johnson & Johnson", "FDA", "approval", "vaccine"]
    },
    {
        "title": "Novavax Protein-Based Vaccine Shows Promise in Trials",
        "content": "Novavax's protein-based COVID-19 vaccine has demonstrated strong efficacy in clinical trials, offering an alternative to mRNA vaccines for those with allergies or preferences.",
        "keywords": ["Novavax", "protein", "vaccine", "trials"]
    },
    {
        "title": "Sinovac Vaccine Receives WHO Emergency Approval",
        "content": "The World Health Organization has approved Sinovac's CoronaVac for emergency use, expanding vaccine options for developing countries in the global fight against COVID-19.",
        "keywords": ["Sinovac", "WHO", "approval", "vaccine"]
    },
    {
        "title": "Vaccine Hesitancy Decreases as Safety Data Accumulates",
        "content": "Public health surveys indicate that vaccine hesitancy is declining as more safety and efficacy data becomes available, with a growing majority expressing willingness to receive COVID-19 vaccines.",
        "keywords": ["vaccine hesitancy", "safety", "public health"]
    },
    {
        "title": "Researchers Develop Universal Coronavirus Vaccine Candidate",
        "content": "Scientists have made progress toward a universal coronavirus vaccine that could protect against multiple strains, including potential future variants and other coronaviruses.",
        "keywords": ["universal", "vaccine", "coronavirus", "research"]
    },
    {
        "title": "Pediatric COVID Vaccine Trials Show Excellent Safety Profile",
        "content": "Clinical trials of COVID-19 vaccines in children ages 5-11 have demonstrated excellent safety and immune response, paving the way for potential emergency authorization.",
        "keywords": ["pediatric", "vaccine", "children", "safety"]
    },
    {
        "title": "Vaccine Distribution Reaches Remote Communities Worldwide",
        "content": "International health organizations have successfully delivered COVID-19 vaccines to remote and underserved communities, using innovative cold-chain solutions and mobile vaccination units.",
        "keywords": ["distribution", "vaccine", "global", "communities"]
    },
]

COVID_NEWS = [
    {
        "title": "Global COVID-19 Cases Decline as Vaccination Rates Rise",
        "content": "World health officials report a significant decline in new COVID-19 cases globally, attributing the improvement to increased vaccination coverage and continued public health measures.",
        "keywords": ["COVID-19", "cases", "decline", "vaccination"]
    },
    {
        "title": "New Omicron Subvariant Detected in Multiple Countries",
        "content": "Health authorities are monitoring a new Omicron subvariant that has been detected in several countries. Early data suggests current vaccines remain effective at preventing severe disease.",
        "keywords": ["Omicron", "subvariant", "COVID-19", "monitoring"]
    },
    {
        "title": "Long COVID Research Reveals New Treatment Approaches",
        "content": "Scientists studying long COVID have identified potential treatment pathways that could help millions of patients experiencing persistent symptoms months after initial infection.",
        "keywords": ["long COVID", "research", "treatment", "symptoms"]
    },
    {
        "title": "CDC Updates COVID-19 Isolation Guidelines",
        "content": "The Centers for Disease Control and Prevention has updated its COVID-19 isolation and quarantine guidelines based on the latest scientific evidence about viral transmission.",
        "keywords": ["CDC", "guidelines", "isolation", "COVID-19"]
    },
    {
        "title": "Antiviral Pill Shows Promise in Treating COVID-19",
        "content": "A new oral antiviral medication has shown significant promise in reducing hospitalization and death among COVID-19 patients when taken early after symptom onset.",
        "keywords": ["antiviral", "pill", "treatment", "COVID-19"]
    },
    {
        "title": "Pandemic Response Lessons Shape Future Preparedness Plans",
        "content": "Global health experts are incorporating lessons learned from the COVID-19 pandemic into new preparedness frameworks to better respond to future health emergencies.",
        "keywords": ["pandemic", "preparedness", "response", "lessons"]
    },
    {
        "title": "COVID-19 Hospitalizations Drop to Lowest Level Since 2020",
        "content": "Hospitals across the nation are reporting the lowest COVID-19 patient numbers since the early days of the pandemic, reflecting the success of vaccination efforts.",
        "keywords": ["hospitalization", "COVID-19", "decline", "hospitals"]
    },
    {
        "title": "Scientists Map Complete Genetic Sequence of SARS-CoV-2 Variants",
        "content": "Researchers have completed comprehensive genetic mapping of all known SARS-CoV-2 variants, providing crucial information for vaccine development and treatment strategies.",
        "keywords": ["genetic", "SARS-CoV-2", "variants", "research"]
    },
    {
        "title": "Economic Recovery Accelerates as COVID Restrictions Ease",
        "content": "Global economic indicators show strong recovery as countries gradually lift COVID-19 restrictions, with travel, hospitality, and retail sectors leading the rebound.",
        "keywords": ["economic", "recovery", "COVID", "restrictions"]
    },
    {
        "title": "Schools Report Successful Return to In-Person Learning",
        "content": "Educational institutions across the country report successful implementation of in-person learning, with comprehensive COVID-19 safety protocols helping to minimize transmission.",
        "keywords": ["schools", "education", "COVID-19", "safety"]
    },
    {
        "title": "Rapid COVID Tests Become More Accurate and Accessible",
        "content": "New rapid COVID-19 tests offer improved accuracy comparable to PCR tests, with results available in minutes. Health officials encourage regular testing as part of ongoing prevention strategies.",
        "keywords": ["rapid tests", "COVID-19", "accuracy", "testing"]
    },
    {
        "title": "Air Quality Improvements During Pandemic Provide Climate Insights",
        "content": "Scientists studying air quality data from pandemic lockdowns have gained valuable insights into human impact on the environment, informing future climate policy discussions.",
        "keywords": ["air quality", "pandemic", "climate", "environment"]
    },
    {
        "title": "Mental Health Resources Expand to Address Pandemic Impact",
        "content": "Health systems worldwide are expanding mental health services to address the psychological impact of the COVID-19 pandemic, including increased anxiety and depression rates.",
        "keywords": ["mental health", "pandemic", "resources", "support"]
    },
    {
        "title": "COVID-19 Wastewater Surveillance Proves Effective Early Warning",
        "content": "Wastewater monitoring programs have proven effective at detecting COVID-19 outbreaks before clinical cases are reported, providing valuable early warning for public health officials.",
        "keywords": ["wastewater", "surveillance", "COVID-19", "monitoring"]
    },
    {
        "title": "Travel Industry Implements New Health and Safety Standards",
        "content": "Airlines, hotels, and cruise lines have implemented comprehensive health and safety protocols in response to COVID-19, aiming to restore traveler confidence and support industry recovery.",
        "keywords": ["travel", "safety", "COVID-19", "protocols"]
    },
]

HEALTH_NEWS = [
    {
        "title": "WHO Launches Global Health Initiative for Disease Prevention",
        "content": "The World Health Organization has announced a comprehensive global health initiative focusing on disease prevention, early detection, and equitable access to healthcare worldwide.",
        "keywords": ["WHO", "health", "prevention", "global"]
    },
    {
        "title": "Breakthrough in Understanding Immune System Response",
        "content": "Researchers have made significant breakthroughs in understanding how the immune system responds to pathogens, opening new avenues for vaccine and treatment development.",
        "keywords": ["immune system", "research", "breakthrough", "health"]
    },
    {
        "title": "New Study Links Gut Health to Overall Immune Function",
        "content": "A major study has established clear connections between gut microbiome health and overall immune function, highlighting the importance of diet and probiotics for disease prevention.",
        "keywords": ["gut health", "immune", "microbiome", "study"]
    },
    {
        "title": "Telemedicine Adoption Continues to Grow Post-Pandemic",
        "content": "Healthcare providers report sustained growth in telemedicine services, with patients and doctors alike embracing virtual consultations for routine care and follow-up appointments.",
        "keywords": ["telemedicine", "healthcare", "virtual", "adoption"]
    },
    {
        "title": "Exercise and Nutrition Key to Preventing Chronic Disease",
        "content": "Health experts emphasize that regular exercise and proper nutrition remain the most effective strategies for preventing chronic diseases including heart disease, diabetes, and cancer.",
        "keywords": ["exercise", "nutrition", "prevention", "health"]
    },
    {
        "title": "New Treatment Options Emerge for Autoimmune Diseases",
        "content": "Pharmaceutical advances have led to new treatment options for autoimmune diseases, offering improved outcomes and quality of life for millions of patients worldwide.",
        "keywords": ["autoimmune", "treatment", "health", "medicine"]
    },
    {
        "title": "Sleep Quality Directly Impacts Immune System Function",
        "content": "Research confirms that adequate, quality sleep is essential for optimal immune system function, with sleep deprivation significantly increasing susceptibility to infections.",
        "keywords": ["sleep", "immune", "health", "research"]
    },
    {
        "title": "Healthcare Workers Recognized for Pandemic Heroism",
        "content": "Nations worldwide continue to honor healthcare workers for their extraordinary service during the COVID-19 pandemic, with many implementing improved benefits and support programs.",
        "keywords": ["healthcare workers", "pandemic", "recognition", "support"]
    },
    {
        "title": "Advances in Gene Therapy Open New Treatment Possibilities",
        "content": "Recent advances in gene therapy technology are enabling treatments for previously incurable genetic disorders, with several therapies recently approved for clinical use.",
        "keywords": ["gene therapy", "treatment", "genetics", "medicine"]
    },
    {
        "title": "Public Health Infrastructure Investment Increases Globally",
        "content": "Governments worldwide are investing heavily in public health infrastructure, recognizing the importance of preparedness for future health emergencies and pandemics.",
        "keywords": ["public health", "infrastructure", "investment", "global"]
    },
    {
        "title": "Wearable Health Technology Transforms Patient Monitoring",
        "content": "Advanced wearable devices are revolutionizing how doctors monitor patient health, enabling real-time tracking of vital signs and early detection of potential health issues.",
        "keywords": ["wearable", "technology", "health", "monitoring"]
    },
    {
        "title": "Antibiotic Resistance Remains Major Global Health Threat",
        "content": "Health officials warn that antibiotic resistance continues to pose a significant threat to global health, calling for responsible antibiotic use and development of new treatments.",
        "keywords": ["antibiotic resistance", "health", "global", "threat"]
    },
    {
        "title": "Mental Health Awareness Campaigns Show Positive Results",
        "content": "Public awareness campaigns about mental health have led to increased help-seeking behavior and reduced stigma, according to new studies on mental health attitudes.",
        "keywords": ["mental health", "awareness", "campaigns", "stigma"]
    },
    {
        "title": "Clean Water Access Improves Health Outcomes in Developing Nations",
        "content": "International efforts to improve access to clean water in developing countries have resulted in significant improvements in health outcomes, particularly for children.",
        "keywords": ["clean water", "health", "developing nations", "access"]
    },
    {
        "title": "Precision Medicine Tailors Treatments to Individual Patients",
        "content": "The field of precision medicine continues to advance, allowing doctors to tailor treatments to individual patients based on their genetic makeup and specific disease characteristics.",
        "keywords": ["precision medicine", "treatment", "genetics", "personalized"]
    },
]

def generate_news_item(template, category, news_id, base_date):
    """Generate a single news item from a template."""
    # Pick a random source
    source = random.choice(SOURCES)
    
    # Generate a publication date (random within last 6 months)
    days_ago = random.randint(1, 180)
    pub_date = base_date - timedelta(days=days_ago)
    
    # Generate a realistic image URL
    image_urls = [
        f"https://images.unsplash.com/photo-{1584036561566 + news_id}-10c8f7aae94b?w=800",
        f"https://images.unsplash.com/photo-{1576091160550 + news_id}-2998b8b1c18b?w=800",
        f"https://images.unsplash.com/photo-{1579684385127 + news_id}-1ef1adf9ec28?w=800",
        f"https://images.unsplash.com/photo-{1584483766114 + news_id}-2aae25034bb7?w=800",
        f"https://images.unsplash.com/photo-{1585435557343 + news_id}-3b092031a831?w=800",
    ]
    
    return {
        "news_id": news_id,
        "title": template["title"],
        "content": template["content"],
        "link": f"https://example.com/news/{category}/{news_id}",
        "pubDate": pub_date.isoformat(),
        "urlToImage": random.choice(image_urls),
        "reference": source,
        "category": category,
        "keywords": template.get("keywords", [])
    }

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    json_path = os.path.join(project_root, 'client', 'public', 'data', 'mock-api-data.json')
    
    # Load existing mock data
    with open(json_path, 'r') as f:
        mock_data = json.load(f)
    
    # Generate news items
    all_news = []
    news_id = 1
    base_date = datetime(2024, 4, 13)  # Match the Worldometers data date
    
    # Generate vaccine news (multiple copies with variations)
    for i in range(3):  # 3 rounds of 15 = 45 vaccine articles
        for template in VACCINE_NEWS:
            item = generate_news_item(template, "vaccine", news_id, base_date)
            # Add slight variation to title if not first round
            if i > 0:
                item["title"] = f"Update: {item['title']}" if i == 1 else f"Latest: {item['title']}"
            all_news.append(item)
            news_id += 1
    
    # Generate COVID news
    for i in range(3):  # 3 rounds of 15 = 45 covid articles
        for template in COVID_NEWS:
            item = generate_news_item(template, "coronavirus", news_id, base_date)
            if i > 0:
                item["title"] = f"Update: {item['title']}" if i == 1 else f"Breaking: {item['title']}"
            all_news.append(item)
            news_id += 1
    
    # Generate health news
    for i in range(3):  # 3 rounds of 15 = 45 health articles
        for template in HEALTH_NEWS:
            item = generate_news_item(template, "health", news_id, base_date)
            if i > 0:
                item["title"] = f"New Study: {item['title']}" if i == 1 else f"Report: {item['title']}"
            all_news.append(item)
            news_id += 1
    
    # Sort by date (newest first)
    all_news.sort(key=lambda x: x['pubDate'], reverse=True)
    
    # Update mock data
    mock_data['news'] = all_news
    
    # Save updated mock data
    with open(json_path, 'w') as f:
        json.dump(mock_data, f, indent=2)
    
    print(f"✅ Generated {len(all_news)} news articles")
    print(f"   - Vaccine news: {sum(1 for n in all_news if n['category'] == 'vaccine')}")
    print(f"   - COVID news: {sum(1 for n in all_news if n['category'] == 'coronavirus')}")
    print(f"   - Health news: {sum(1 for n in all_news if n['category'] == 'health')}")
    print(f"📁 Updated: {json_path}")

if __name__ == '__main__':
    main()
