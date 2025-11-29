# Career Navigator V2

This is the ReactJS + FastAPI version of the Career Navigator application.

## Project Structure

-   **backend/**: FastAPI application handling authentication and API logic.
-   **frontend/**: React application (Vite) for the user interface.

## Prerequisites

-   Python 3.8+
-   Node.js 16+

## Setup Instructions

### 1. Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Run the server:
    ```bash
    uvicorn main:app --reload
    ```
    The API will be available at `http://localhost:8000`.

### 2. Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

## Features

-   **Authentication**: Login and Register with "blueish" theme.
-   **Dashboard**: Sidebar navigation and content area.
-   **Primary Education**: Migrated content for Grade 10 education.
-   **Chat Bot**: Placeholder for Gemini integration (backend ready).
