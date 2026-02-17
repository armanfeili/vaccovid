import os
import re

def clean_svg_namespaces(directory):
    # Namespaces/Tags to remove
    # XML namespaces in tags are not supported by JSX (e.g. <rdf:RDF>, <cc:Work>)
    
    # 1. Remove <metadata>...</metadata> inclusive
    metadata_pattern = re.compile(r'<metadata.*?>.*?</metadata>', re.DOTALL)
    
    # 2. Remove xmlns:* attributes (previous logic)
    xmlns_patterns = [
        r'xmlns:dc="[^"]*"',
        r'xmlns:cc="[^"]*"',
        r'xmlns:rdf="[^"]*"',
        r'xmlns:svg="[^"]*"',
        r'xmlns:sodipodi="[^"]*"',
        r'xmlns:inkscape="[^"]*"'
    ]
    xmlns_combined = re.compile('|'.join(xmlns_patterns))
    
    # 3. Remove orphaned namespaced tags if they exist outside metadata (e.g. <sodipodi:namedview>)
    # Self-closing
    namespaced_tag_self_closing = re.compile(r'<[a-zA-Z0-9]+:[a-zA-Z0-9]+[^>]*?/>')
    
    count = 0
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".svg"):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                
                # Remove metadata blocks
                content = metadata_pattern.sub('', content)
                
                # Remove xmlns attributes
                content = xmlns_combined.sub('', content)
                
                # Remove self-closing namespaced tags
                content = namespaced_tag_self_closing.sub('', content)
                
                # Clean up double spaces
                content = re.sub(r'\s{2,}', ' ', content)
                
                if content != original_content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Cleaned {path}")
                    count += 1
    
    print(f"Total files cleaned: {count}")

if __name__ == "__main__":
    clean_svg_namespaces("/Users/armanfeili/code/Old projects/vaccovid/client/src")
