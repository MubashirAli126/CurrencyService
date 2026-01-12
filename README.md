# Currency Converter Application

A full-stack currency converter application built with React (TypeScript) and NestJS.

## Project Structure

```
TA-Solution/
├── backend/          # NestJS backend server
└── frontend/         # React frontend application
```

## Prerequisites

- Node.js (v14 or higher)
- npm

## Setup Instructions

### Backend (NestJS)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies (already done):
   ```bash
   npm install
   ```

3. The `.env` file is already configured with:
   - PORT=3001
   - CURRENCY_API_KEY=4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2
   - CURRENCY_API_BASE_URL=https://api.freecurrencyapi.com/v1

4. Start the development server:
   ```bash
   npm run start:dev
   ```

   The backend will run on `http://localhost:3001`

### Frontend (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (already done):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`

## Running Both Servers

To run both servers simultaneously, open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## Features (To be implemented)

- ✅ Project setup and configuration
- ⏳ Currency conversion with dynamic currency support
- ⏳ Conversion history with persistence
- ⏳ Historical exchange rates (bonus feature)
- ⏳ Mobile-first responsive design

## Technologies Used

- **Frontend:** React, TypeScript, Bootstrap, Axios
- **Backend:** NestJS, TypeScript, @nestjs/config
# CurrencyService
