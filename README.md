# Z3maSafe 🛡️

> ⚠️ **DISCLAIMER**: This project is currently under active development and is not yet ready for production use. Features may be incomplete or subject to change.

## 🔐 Project Overview

**Z3maSafe** is a static `.exe` analyzer designed to detect suspicious behavior in executable files. It allows users to drag and drop `.exe` files into the application and returns a "Sus Level" score from 1 to 100, based on known indicators of malware and suspicious behavior.

This tool is designed to help non-technical users and enthusiasts quickly assess whether a Windows executable might be suspicious before executing it on their system.

## 🌟 Key Features

### 🔍 Suspicious File Analysis
- Detects **packing/protection** (e.g., UPX, ASPack, Themida)
- Identifies **dangerous imports** like `VirtualAlloc`, `CreateRemoteThread`, `SetWindowsHookEx`
- Scans for **suspicious strings** such as:
  - `cmd.exe`, `powershell`, `system32`
  - Networking calls (e.g., `socket`, `connect`, `wget`)

### 📊 Sus Level Score (1-100)
- Weights indicators and shows a visual SUS rating
- Color-coded results: Green (0-30), Yellow (31-70), Red (71-100)

### 🖥️ User-Friendly Interface
- Simple drag-and-drop functionality for `.exe` files
- Clean, intuitive React-based UI
- Detailed but easy-to-understand scan results

### 🔒 "Pre-Antivirus" Concept
- Analyze `.exe` files **before** installing or executing
- Works offline — does not upload or expose files
- Complements traditional antivirus as a first line of defense

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router for navigation
- Axios for API requests
- Styled Components for styling
- React Dropzone for file upload
- React Icons

### Backend
- Python with FastAPI
- pefile for PE file analysis
- YARA rules for pattern matching
- Uvicorn ASGI server

## 📂 Project Structure

```
z3masafe/
├── backend/                # Python FastAPI backend
│   ├── main.py            # API endpoints
│   ├── scanner.py         # Core scanning logic
│   ├── utils.py           # Utility functions
│   ├── requirements.txt   # Python dependencies
│   └── yara_rules/        # YARA rule definitions
│       └── suspicious.yar # Suspicious patterns
├── frontend/              # React frontend
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   └── App.js         # Main application component
│   └── package.json       # Node.js dependencies
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+) and npm for the frontend
- Python 3.10+ for the backend
- Git

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/z3masafe.git
cd z3masafe

# Set up Python virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install backend dependencies
cd backend
pip install -r requirements.txt

# Start the backend server
uvicorn main:app --reload
```

The backend API will be available at http://localhost:8000

### Frontend Setup

```bash
# Navigate to the frontend directory
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend application will be available at http://localhost:3000

## 🧪 How It Works

Z3maSafe performs static analysis on executable files without executing them:

1. **File Upload**: User drags and drops an `.exe` file
2. **Static Analysis**: Backend analyzes:
   - PE file structure
   - Import tables for suspicious functions
   - Strings for suspicious patterns
   - Section entropy for packing detection
3. **Scoring**: Calculates a "Sus Level" based on weighted indicators
4. **Results Display**: Shows color-coded results and detailed findings

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [pefile](https://github.com/erocarrera/pefile) for PE file analysis
- [FastAPI](https://fastapi.tiangolo.com/) for the backend API
- [React](https://reactjs.org/) for the frontend UI
- All contributors and supporters of the project