

```markdown
# 🎬 AI Movie Insight Builder
### Brew Full-Stack Developer Internship | Round 1 Submission

---

## 🚀 Live Deployment
**[🔗 View Live App on Vercel](https://brew-alpha.vercel.app)**

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
git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME)
cd brew

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Environment Configuration

Create a `.env.local` file in the root directory and include the following:

```text
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
OMDB_API_KEY=da1b2b62

```

### 4. Run Development Server

```bash
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to view the app.

---

## 📝 Assumptions & Logic

* **Scraping Depth:** The system scrapes the top 3-5 reviews. This sample size was chosen to provide high accuracy for the AI while maintaining fast response times.
* **ID Prefix:** The app assumes input follows the IMDb `tt` prefix standard (e.g., tt0816692).
* **Data Freshness:** If a movie exists in the database, the app serves the cached version to minimize API costs and improve speed.

---

```
