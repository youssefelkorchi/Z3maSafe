from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import os
import tempfile
from scanner import scan_executable

app = FastAPI(
    title="Z3maSafe API",
    description="Static .exe analyzer API for detecting suspicious behavior",
    version="1.0.0"
)

# Configure CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Root endpoint that returns basic API information"""
    return {
        "message": "Welcome to Z3maSafe API - Static .exe analyzer",
        "description": "Upload .exe files to scan for suspicious behavior",
        "endpoints": {
            "/scan": "POST - Upload and scan an executable file",
            "/health": "GET - Check API health status"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

@app.post("/scan")
async def scan_file(file: UploadFile = File(...)):
    """
    Scan an executable file for suspicious behavior
    
    - **file**: The .exe file to analyze
    
    Returns a JSON with scan results including sus level and details
    """
    # Validate file extension
    if not file.filename.lower().endswith('.exe'):
        raise HTTPException(
            status_code=400, 
            detail="Only .exe files are supported"
        )
    
    # Create a temporary file
    temp_file_fd, temp_file_path = tempfile.mkstemp(suffix='.exe')
    
    try:
        # Write the uploaded file to the temporary file
        with os.fdopen(temp_file_fd, 'wb') as temp_file:
            content = await file.read()
            temp_file.write(content)
        
        # Scan the file
        scan_results = scan_executable(temp_file_path)
        
        return JSONResponse(content=scan_results)
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error scanning file: {str(e)}"
        )
    
    finally:
        # Clean up the temporary file
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)