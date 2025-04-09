import math
import collections

def calculate_entropy(data):
    """
    Calculate Shannon entropy of binary data
    
    Args:
        data: Binary data
        
    Returns:
        float: Entropy value (0-8)
    """
    if not data:
        return 0
    
    entropy = 0
    for x in range(256):
        p_x = float(data.count(x)) / len(data)
        if p_x > 0:
            entropy += - p_x * math.log(p_x, 2)
    
    return entropy

def get_byte_frequency(data):
    """
    Get frequency distribution of bytes in data
    
    Args:
        data: Binary data
        
    Returns:
        dict: Byte frequency distribution
    """
    if not data:
        return {}
    
    freq = collections.Counter(data)
    return {byte: count / len(data) for byte, count in freq.items()}

def is_likely_text_section(entropy, byte_freq):
    """
    Check if a section is likely to be a text/code section
    
    Args:
        entropy: Entropy value
        byte_freq: Byte frequency distribution
        
    Returns:
        bool: True if likely a text section
    """
    # Text sections typically have entropy between 5.5 and 6.5
    if entropy < 5.5 or entropy > 6.8:
        return False
    
    # Text sections have a more uniform distribution of certain bytes
    null_byte_freq = byte_freq.get(0, 0)
    if null_byte_freq > 0.3:  # Too many null bytes for code
        return False
    
    return True