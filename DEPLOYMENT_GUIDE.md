# ProjectMatch AI — Live Deployment Guide

This guide provides step-by-step instructions for deploying:
- **Backend API on Render** (`https://<your-app>.onrender.com`)
- **Frontend SPA on Netlify** (`https://<your-app>.netlify.app`)

---

## 🗺️ Live Architecture Overview

```
 [User Browser]
       │
       ▼
 [Netlify Frontend] (React + Vite SPA)
   URL: https://projectmatch-ai.netlify.app
   Env: VITE_API_URL = https://projectmatch-api.onrender.com
       │
       │ (REST API calls with JWT Bearer Token)
       ▼
 [Render Backend] (Node.js + Express)
   URL: https://projectmatch-api.onrender.com
   Env: GEMINI_API_KEY, MONGODB_URI, JWT_SECRET, CLIENT_URL
       │
       ├──► [MongoDB Atlas] (Cloud Database)
       └──► [Google Gemini API] (LLM Inference Engine)
```

---

## STEP 1: Push Code to GitHub

Both Render and Netlify connect directly to your GitHub repository for continuous deployment.

1. **Open a terminal in the project directory:**
   ```bash
   cd "c:\Users\puliv\OneDrive\Desktop\projectmatch AI"
   ```

2. **Initialize Git (if not already done):**
   ```bash
   git init
   git add .
   git commit -m "Initial release of ProjectMatch AI with Render & Netlify deployment configs"
   ```

3. **Create a new repository on GitHub:**
   - Go to [https://github.com/new](https://github.com/new).
   - Name it `projectmatch-ai`.
   - Set it to **Public** (or **Private**).
   - Do **NOT** initialize with README (we already have one).

4. **Push your code to GitHub:**
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/projectmatch-ai.git
   git push -u origin main
   ```

---

## STEP 2: Deploy Backend to Render

1. Log in to [https://render.com](https://render.com) (sign up with GitHub).
2. Click **New +** at the top right and select **Web Service**.
3. Select **Build and deploy from a Git repository** and connect your `projectmatch-ai` repository.
4. Configure the Web Service settings:

| Field | Value |
| :--- | :--- |
| **Name** | `projectmatch-ai-server` (or your preferred name) |
| **Region** | Choose closest to you (e.g., *Singapore*, *Frankfurt*, *Oregon*) |
| **Branch** | `main` |
| **Root Directory** | `server` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Instance Type** | `Free` |

5. Scroll down to **Environment Variables** and add the following:

| Key | Value | Description |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Enables production optimizations |
| `PORT` | `10000` | Render default port (auto-set) |
| `JWT_SECRET` | *(Random 32+ char string)* | Secure secret for JWT signing |
| `GEMINI_API_KEY` | *(Your Gemini API key)* | From Google AI Studio (optional, runs in smart fallback if unset) |
| `MONGODB_URI` | *(Your MongoDB Atlas URI)* | e.g., `mongodb+srv://...` (optional, uses in-memory store if unset) |
| `CLIENT_URL` | `https://<your-netlify-site>.netlify.app` | Your frontend URL on Netlify (you can update this after Step 3) |

6. Click **Deploy Web Service**.
7. Wait 2–3 minutes for the build to finish. Once live, Render will provide your backend URL:
   `https://projectmatch-ai-server.onrender.com`
8. Verify it works by opening in your browser:
   `https://projectmatch-ai-server.onrender.com/api/health`
   *(You should see `{"status":"online","appName":"ProjectMatch AI Backend",...}`)*

---

## STEP 3: Deploy Frontend to Netlify

1. Log in to [https://app.netlify.com](https://app.netlify.com) (sign up with GitHub).
2. Click **Add new site** > **Import an existing project**.
3. Choose **GitHub** and authorize your `projectmatch-ai` repository.
4. Netlify will automatically detect `netlify.toml` from our repository! Verify the settings:

| Field | Value |
| :--- | :--- |
| **Base directory** | `client` |
| **Build command** | `npm run build` |
| **Publish directory** | `dist` (or `client/dist`) |

5. Before clicking deploy, click **Environment variables** > **Add a variable**:

| Key | Value |
| :--- | :--- |
| `VITE_API_URL` | `https://projectmatch-ai-server.onrender.com` *(Paste your Render backend URL from Step 2)* |

6. Click **Deploy projectmatch-ai**.
7. Netlify will build the client and provide your live URL:
   `https://<your-site-name>.netlify.app`
8. (Optional) Go to **Site configuration** > **Change site name** to pick a custom subdomain like `projectmatch-ai.netlify.app`.

---

## STEP 4: (Optional) Set Up Free Cloud MongoDB Atlas

If you want persistent cloud database storage across Render restarts:

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. Create a **Free Shared Cluster (M0)**.
3. Under **Database Access**, create a user (e.g. `pm_admin` with password).
4. Under **Network Access**, click **Add IP Address** and choose **Allow Access From Anywhere (`0.0.0.0/0`)** so Render can connect.
5. Click **Connect** > **Drivers** > copy the connection string:
   ```
   mongodb+srv://pm_admin:<password>@cluster0.abcde.mongodb.net/projectmatch_ai?retryWrites=true&w=majority
   ```
6. Add this string as `MONGODB_URI` in your Render Environment Variables.
7. Render will automatically redeploy and connect to MongoDB Atlas!

---

## STEP 5: (Optional) Get Free Google Gemini API Key

1. Visit [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey).
2. Sign in with your Google account.
3. Click **Create API Key**.
4. Copy the key and add it as `GEMINI_API_KEY` in your Render Environment Variables.

---

## 🎯 Verification Checklist

- [ ] Open your Netlify site URL: `https://<your-app>.netlify.app`.
- [ ] Landing page loads with dark/light mode toggle.
- [ ] Click **"1-Click Demo Mode"** in the top bar to verify login and authentication.
- [ ] Go to **Dashboard** and view Recharts analytics.
- [ ] Open **Find Projects** and test search, filtering, and comparison.
- [ ] Open any project and test **Generate Blueprint**, **Generate Roadmap**, and **Skill Gap Analyzer**.
- [ ] Direct page refresh (e.g. at `/dashboard` or `/projects`) works without 404 error (handled by `_redirects` and `netlify.toml`).
