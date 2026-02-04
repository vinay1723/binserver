#  Pastebin Application – Local Setup Guide

This guide explains how to run the Pastebin application locally by configuring both the frontend and backend.

---

##  Project Overview

The project consists of two main parts:

- **Frontend**: React (Vite)
- **Backend**: Node.js, Express.js, MongoDB

---

## ⚙️ Step 1: Update Backend URL in Frontend

To run the project locally, replace the deployed backend URL with the local backend URL.

### 🔄 Replace this URL: https://binserver-nine.vercel.app/  ##with  http://localhost:3000/


### 📍 Update the following files:

- `Home.jsx`
- `ViewPaste.jsx`

### Example:

js
 Before (Production URL)
fetch("https://binserver-nine.vercel.app/api/pastes");

// After (Local URL)
fetch("http://localhost:3000/api/pastes");

## 💻 Step 2: Run the Frontend Application

Navigate to the frontend folder and execute the following commands:

### 1️⃣ Install dependencies

bash
npm install

### 2 Run the command 

bash
npm run dev


## 🔧 Step 3: Configure CORS in Backend

Open the `app.js` file in the backend project and configure CORS to allow requests from the frontend.

### ✅ Update CORS configuration:

```js
import cors from "cors";

app.use(cors({
  origin: "http://localhost:5173"
}));

##  Run the Backend Application


### 1️⃣ Install dependencies

bash
npm install

### 2 Run the command 

bash
npm start 

