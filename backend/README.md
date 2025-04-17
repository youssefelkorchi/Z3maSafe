# Z3maSafe Backend

Backend service for Z3maSafe, a static .exe analyzer for detecting suspicious behavior in executable files.

## Overview

This FastAPI-based backend provides an API for scanning Windows executable files (.exe) and detecting potentially malicious behavior. It analyzes files without executing them, providing a "Sus Level" score from 0-100 based on various indicators.

## Setup

### Prerequisites

- Python 3.10+
- Required packages (see requirements.txt)

### Installation

```bash
# Create and activate virtual environment (recommended)
python -m venv venv
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt
```

### Running the Server

```bash
uvicorn main:app --reload
```

The API will be available at http://localhost:8000

## API Endpoints

- `GET /` - Root endpoint with API information
- `GET /health` - Health check endpoint
- `POST /scan` - Upload and scan an executable file

## Components

- **main.py**: FastAPI application setup and endpoints
- **scanner.py**: Core scanning logic for executable analysis
- **simple_yara.py**: Simplified YARA-like pattern matching implementation
- **utils.py**: Helper functions for entropy calculation and byte analysis
- **yara_rules/**: Directory containing detection rules
  - **simple_rules.json**: JSON-based detection rules
  - **suspicious.yar**: YARA-format rules

## Detection Methods

- Suspicious imports detection (process manipulation, hooking, etc.)
- Suspicious strings detection (command execution, network indicators, etc.)
- Packing detection (known packers, high entropy sections)
- Pattern matching using YARA-like rules

## Security Note

This tool performs static analysis only and does not execute the files being analyzed.