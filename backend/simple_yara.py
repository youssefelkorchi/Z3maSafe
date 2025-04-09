import re
import os
import json

class SimpleRule:
    def __init__(self, name, description, severity, patterns):
        self.name = name
        self.description = description
        self.severity = severity
        self.patterns = patterns
    
    def match(self, content):
        """Check if any pattern matches in the content"""
        matches = []
        for pattern in self.patterns:
            if re.search(pattern, content, re.IGNORECASE | re.MULTILINE):
                matches.append(pattern)
        
        return len(matches) > 0

def load_rules_from_file(rules_file):
    """Load rules from a JSON file"""
    with open(rules_file, 'r') as f:
        rules_data = json.load(f)
    
    rules = []
    for rule_data in rules_data:
        rule = SimpleRule(
            rule_data['name'],
            rule_data.get('description', ''),
            rule_data.get('severity', 'medium'),
            rule_data['patterns']
        )
        rules.append(rule)
    
    return rules

def scan_file(file_path, rules):
    """Scan a file with the given rules"""
    try:
        with open(file_path, 'rb') as f:
            content = f.read().decode('utf-8', errors='ignore')
        
        matches = []
        for rule in rules:
            if rule.match(content):
                matches.append({
                    'rule': rule.name,
                    'description': rule.description,
                    'severity': rule.severity
                })
        
        return matches
    except Exception as e:
        print(f"Error scanning file: {str(e)}")
        return []