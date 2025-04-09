import pefile
import re
import os
import math
import hashlib
from utils import calculate_entropy
from simple_yara import load_rules_from_file, scan_file

# Define suspicious imports with their risk scores
SUSPICIOUS_IMPORTS = {
    # Process manipulation
    "VirtualAlloc": 70,
    "VirtualAllocEx": 80,
    "CreateRemoteThread": 90,
    "WriteProcessMemory": 85,
    "ReadProcessMemory": 70,
    "OpenProcess": 60,
    "CreateProcess": 50,
    "CreateProcessA": 50,
    "CreateProcessW": 50,
    
    # Hooking and injection
    "SetWindowsHookEx": 85,
    "SetWindowsHookExA": 85,
    "SetWindowsHookExW": 85,
    
    # Registry manipulation
    "RegCreateKey": 60,
    "RegSetValue": 60,
    
    # Network activity
    "socket": 50,
    "connect": 50,
    "send": 50,
    "recv": 50,
    "WSAStartup": 50,
    
    # File operations
    "CreateFile": 40,
    "WriteFile": 40,
    "DeleteFile": 50,
    
    # Keylogging related
    "GetAsyncKeyState": 80,
    "GetKeyState": 70,
    
    # Process enumeration
    "Process32First": 60,
    "Process32Next": 60,
}

# Define suspicious strings with their risk scores
SUSPICIOUS_STRINGS = {
    # Command execution
    r"cmd\.exe": 70,
    r"powershell": 70,
    r"system32": 40,
    r"rundll32": 60,
    
    # Network indicators
    r"http://": 50,
    r"https://": 50,
    r"ftp://": 60,
    r"socket": 50,
    r"connect": 50,
    r"wget": 60,
    r"curl": 60,
    
    # Suspicious behaviors
    r"inject": 80,
    r"shellcode": 90,
    r"keylog": 90,
    r"screenshot": 70,
    
    # Obfuscation indicators
    r"base64": 60,
    r"encrypt": 60,
    r"decrypt": 60,
}

# Known packers with their risk scores
KNOWN_PACKERS = {
    "UPX": 40,
    "ASPack": 60,
    "Themida": 80,
    "VMProtect": 70,
    "Enigma": 75,
    "PECompact": 50,
    "MPRESS": 50,
    "FSG": 65,
}

def scan_executable(file_path):
    """
    Scan an executable file for suspicious indicators
    
    Args:
        file_path: Path to the executable file
        
    Returns:
        dict: Scan results including sus level and details
    """
    results = {
        "filename": os.path.basename(file_path),
        "filesize": os.path.getsize(file_path),
        "md5": calculate_file_hash(file_path, "md5"),
        "sha256": calculate_file_hash(file_path, "sha256"),
        "imports": [],
        "suspicious_strings": [],
        "packing_indicators": [],
        "rule_matches": [],  # New field for rule matches
        "scores": {
            "imports_score": 0,
            "strings_score": 0,
            "packing_score": 0,
            "rules_score": 0,  # New score field
            "sus_level": 0
        }
    }
    
    # Load the file with pefile
    try:
        pe = pefile.PE(file_path)
        
        # Scan for suspicious imports
        results["scores"]["imports_score"] = scan_imports(pe, results)
        
        # Scan for packing indicators
        results["scores"]["packing_score"] = scan_packing(pe, file_path, results)
        
        # Close the PE file
        pe.close()
        
        # Scan for suspicious strings
        results["scores"]["strings_score"] = scan_strings(file_path, results)
        
        # Scan with simple YARA rules
        rules_file = os.path.join(os.path.dirname(__file__), "yara_rules", "simple_rules.json")
        if os.path.exists(rules_file):
            rules = load_rules_from_file(rules_file)
            matches = scan_file(file_path, rules)
            results["rule_matches"] = matches
            
            # Calculate rules score based on number and severity of matches
            rules_score = 0
            for match in matches:
                if match["severity"] == "high":
                    rules_score += 30
                elif match["severity"] == "medium":
                    rules_score += 20
                else:
                    rules_score += 10
            
            results["scores"]["rules_score"] = min(100, rules_score)
        
        # Calculate overall sus level
        results["scores"]["sus_level"] = calculate_sus_level(
            results["scores"]["imports_score"],
            results["scores"]["strings_score"],
            results["scores"]["packing_score"],
            results["scores"]["rules_score"]
        )
        
        # Add risk category
        results["risk_category"] = get_risk_category(results["scores"]["sus_level"])
        
    except Exception as e:
        results["error"] = str(e)
        results["scores"]["sus_level"] = 50  # Default to medium if analysis fails
        results["risk_category"] = "YELLOW"
    
    return results

def scan_imports(pe, results):
    """Scan PE imports for suspicious functions"""
    imports_score = 0
    total_imports = 0
    suspicious_count = 0
    
    try:
        for entry in pe.DIRECTORY_ENTRY_IMPORT:
            for imp in entry.imports:
                total_imports += 1
                if imp.name:
                    imp_name = imp.name.decode('utf-8', errors='ignore')
                    for sus_import, score in SUSPICIOUS_IMPORTS.items():
                        if sus_import.lower() in imp_name.lower():
                            suspicious_count += 1
                            results["imports"].append({
                                "name": imp_name,
                                "library": entry.dll.decode('utf-8', errors='ignore'),
                                "score": score
                            })
                            imports_score += score
                            break
    except AttributeError:
        # No imports found
        pass
    
    # Normalize the score (0-100)
    if suspicious_count > 0:
        imports_score = min(100, imports_score / suspicious_count)
    else:
        imports_score = 0
    
    return imports_score

def scan_strings(file_path, results):
    """Scan file for suspicious strings"""
    strings_score = 0
    suspicious_count = 0
    
    try:
        with open(file_path, 'rb') as f:
            content = f.read().decode('utf-8', errors='ignore')
            
            for pattern, score in SUSPICIOUS_STRINGS.items():
                matches = re.finditer(pattern, content, re.IGNORECASE)
                for match in matches:
                    suspicious_count += 1
                    matched_text = match.group(0)
                    results["suspicious_strings"].append({
                        "string": matched_text,
                        "score": score
                    })
                    strings_score += score
    except Exception as e:
        results["string_scan_error"] = str(e)
    
    # Normalize the score (0-100)
    if suspicious_count > 0:
        strings_score = min(100, strings_score / suspicious_count)
    else:
        strings_score = 0
    
    return strings_score

def scan_packing(pe, file_path, results):
    """Detect packing or protection"""
    packing_score = 0
    indicators_count = 0
    
    # Check for known packers in sections
    for section in pe.sections:
        section_name = section.Name.decode('utf-8', errors='ignore').strip('\x00')
        for packer_name, score in KNOWN_PACKERS.items():
            if packer_name.lower() in section_name.lower():
                indicators_count += 1
                results["packing_indicators"].append({
                    "type": "section_name",
                    "name": section_name,
                    "packer": packer_name,
                    "score": score
                })
                packing_score += score
    
    # Check section entropy
    for section in pe.sections:
        section_name = section.Name.decode('utf-8', errors='ignore').strip('\x00')
        section_data = section.get_data()
        entropy = calculate_entropy(section_data)
        
        # High entropy (>7.0) often indicates packing/encryption
        if entropy > 7.0:
            indicators_count += 1
            score = min(100, int(entropy * 10))
            results["packing_indicators"].append({
                "type": "high_entropy",
                "section": section_name,
                "entropy": entropy,
                "score": score
            })
            packing_score += score
    
    # Check for small number of imports (often indicates packing)
    try:
        import_count = sum(len(entry.imports) for entry in pe.DIRECTORY_ENTRY_IMPORT)
        if import_count < 10:
            indicators_count += 1
            score = 60
            results["packing_indicators"].append({
                "type": "few_imports",
                "count": import_count,
                "score": score
            })
            packing_score += score
    except AttributeError:
        # No imports found, very suspicious
        indicators_count += 1
        score = 80
        results["packing_indicators"].append({
            "type": "no_imports",
            "score": score
        })
        packing_score += score
    
    # Normalize the score (0-100)
    if indicators_count > 0:
        packing_score = min(100, packing_score / indicators_count)
    else:
        packing_score = 0
    
    return packing_score

def calculate_sus_level(imports_score, strings_score, packing_score, rules_score):
    """Calculate overall suspicion level"""
    # Updated weighted average
    weights = {
        "imports": 0.3,
        "strings": 0.2,
        "packing": 0.2,
        "rules": 0.3
    }
    
    sus_level = (
        imports_score * weights["imports"] +
        strings_score * weights["strings"] +
        packing_score * weights["packing"] +
        rules_score * weights["rules"]
    )
    
    return round(sus_level)

def get_risk_category(sus_level):
    """Get risk category based on sus level"""
    if sus_level <= 30:
        return "GREEN"
    elif sus_level <= 70:
        return "YELLOW"
    else:
        return "RED"

def calculate_file_hash(file_path, algorithm="sha256"):
    """Calculate file hash using specified algorithm"""
    hash_obj = None
    
    if algorithm == "md5":
        hash_obj = hashlib.md5()
    elif algorithm == "sha1":
        hash_obj = hashlib.sha1()
    elif algorithm == "sha256":
        hash_obj = hashlib.sha256()
    else:
        raise ValueError(f"Unsupported hash algorithm: {algorithm}")
    
    with open(file_path, "rb") as f:
        # Read the file in chunks to handle large files
        for chunk in iter(lambda: f.read(4096), b""):
            hash_obj.update(chunk)
    
    return hash_obj.hexdigest()