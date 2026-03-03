# 🎬 AI Movie Insight Builder
### Brew Full-Stack Developer Internship | Round 1 Submission

---

## 🚀 Live Deployment
**[🔗 View Live App on Vercel](REPLACE_WITH_YOUR_VERCEL_URL)**

---

## 🌟 Overview
This is a high-performance MERN-stack application designed to transform raw IMDb data into meaningful audience insights. By simply entering an IMDb ID, the app fetches metadata, scrapes user reviews, and utilizes the **Gemini 2.5-Flash** model to generate a professional sentiment analysis.

---

## 🧠 Tech Stack Rationale
I chose this specific stack to meet the "Premium and Modern" requirements of the Brew AI assignment:

* **Next.js 14 (App Router):** Provides a robust full-stack framework with optimized Server-Side Rendering (SSR) for SEO and performance.
* **MongoDB Atlas:** Implemented for session persistence, allowing the application to cache searches and provide a "History" feature for users.
* **Gemini 2.5-Flash:** Selected for its industry-leading inference speed and accuracy in distilling complex audience sentiments into concise summaries.
* **Cheerio:** Used for server-side scraping to extract real-time audience feedback directly from IMDb reviews.
* **Tailwind CSS:** Enabled a rapid development of a responsive, "dark-mode" premium UI that works across all device types.

---

## 🛠️ Key Features
* **Automated Metadata:** Fetches posters, titles, and release years via OMDb API.
* **AI Sentiment Analysis:** Condenses hundreds of words of raw reviews into 2-3 high-impact sentences.
* **Persistent Search History:** Stores previous insights in MongoDB for instant retrieval.
* **Fully Responsive:** A "Mobile-First" design approach ensures usability on smartphones and desktops.
* **Secure Architecture:** Uses Environment Variables and `.gitignore` to protect sensitive API credentials.

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd brew
