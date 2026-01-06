# 📉 Real-Time E-Commerce Price Monitor

![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

## 🚀 Overview

The **Real-Time Price Monitor** is a full-stack automated scraping solution designed to track e-commerce product prices and availability in real-time. Built to solve the problem of manual price checking, this application allows users to track specific products, visualize price history trends, and receive automated email alerts when price drops occur.

This project demonstrates the integration of complex backend scheduling (Cron jobs), third-party scraping APIs, and reactive frontend data visualization.

**[🌐 View Live Demo](#)** *(https://real-time-price-monitor.vercel.app/)*

## ✨ Key Features

-   **Automated Web Scraping:** Utilizes **Firecrawl** and custom proxy rotation to reliably scrape product metadata (Price, Title, Stock Status) from various e-commerce platforms.
-   **Scheduled Cron Jobs:** Implements server-side Cron jobs (via API Routes) to automatically re-scrape and update product data at defined intervals without user intervention.
-   **Data Visualization:** Interactive price history charts using **Recharts/Chart.js** to track market trends over time.
-   **Smart Notifications:** Automated email alerting system triggers when a product hits a target price or comes back in stock.
-   **Secure Authentication:** Full user session management and row-level security (RLS) implementation using **Supabase Auth**.
-   **Modern UI/UX:** Responsive design built with **Shadcn UI** and **Tailwind CSS**, featuring dark mode support.

## 🛠️ Technical Architecture

### Tech Stack
-   **Frontend:** Next.js 14 (App Router), React, Tailwind CSS, Lucide Icons.
-   **Backend:** Next.js Server Actions, API Routes (Edge Runtime).
-   **Database:** Supabase (PostgreSQL) for relational data and realtime subscriptions.
-   **Scraping Engine:** Firecrawl API & Custom Proxy configurations.
-   **Utilities:** `cron` for scheduling, Nodemailer/Resend for notifications.

### System Workflow
1.  **Input:** User inputs a product URL via the dashboard.
2.  **Extraction:** The system triggers a server action to scrape the URL, parsing the DOM for relevant metadata.
3.  **Storage:** Data is normalized and stored in Supabase.
4.  **Monitoring:** A scheduled Cron job runs periodically, fetching fresh data and comparing it against historical records.
5.  **Action:** If a price drop is detected, an email event is dispatched to the user.

## ⚡ Getting Started

### Prerequisites
-   Node.js (v18+)
-   NPM or Yarn
-   Supabase Account
-   Firecrawl API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/real-time-price-monitor.git](https://github.com/your-username/real-time-price-monitor.git)
    cd real-time-price-monitor
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory and populate it with your credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
    FIRECRAWL_API_KEY=your_firecrawl_key
    EMAIL_PASSWORD=your_email_app_password
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```bash
├── app/
│   ├── api/cron/       # Scheduled scraping tasks
│   ├── auth/           # Supabase auth callbacks
│   └── page.js         # Main dashboard
├── components/
│   ├── PriceChart.js   # Visualization component
│   └── AddProduct.js   # Form handling & Server Actions
├── lib/
│   ├── firecrawl.js    # Scraping logic configuration
│   └── email.js        # Notification transport logic
└── utils/
    └── supabase/       # Database client & middleware
