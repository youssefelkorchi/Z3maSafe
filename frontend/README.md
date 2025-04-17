# Z3maSafe Frontend

A React-based frontend for Z3maSafe, a static .exe analyzer for detecting suspicious behavior.

## Project Overview

This frontend provides a user interface for uploading and scanning executable files, displaying scan results, and accessing documentation about the scanning process.

## Features

- File upload with drag-and-drop functionality
- Executable file scanning
- Detailed scan results visualization
- About and Documentation pages

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm start
```

## Available Scripts

- `npm start` - Runs the app in development mode at [http://localhost:3000](http://localhost:3000)
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production

## Tech Stack

- React 18
- React Router
- Axios for API requests
- Styled Components
- React Dropzone
- React Icons

## Project Structure

- `/src/components` - Reusable UI components
- `/src/pages` - Page components
- `/public` - Static assets

## Backend Integration

The frontend connects to a Python backend running at `http://localhost:8000` for file scanning functionality.
