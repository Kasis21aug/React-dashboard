# React Product Dashboard

A simple product dashboard built with React that displays products in a table with editable title, delete functionality, and column-based filters (including price & rating ranges). Data operations are handled using a mock API with Promise + setTimeout.

---

##Live Demo (Deployed URL)
🔗 https://your-deployed-link-here.com

---

## Technologies Used
- React (Vite)
- JavaScript (ES6)
- CSS
- Mock API (Promise + setTimeout)
- Git & GitHub

---

## Features
- Display products in a table:
  - Title (Editable)
  - Brand
  - Category
  - Price
  - Rating
- Edit product title (saved via mock API on blur)
- Delete product row (saved via mock API)
- Filters for:
  - Brand (dynamic)
  - Category (dynamic)
  - Price Range (dropdown)
  - Rating Range (dropdown)
- Reset filters button
- Loading and error state handling
- "No results found" message when filters return no data

---

## Setup Instructions (Run Locally)

### 1) Clone the repository
```bash
git clone https://github.com/Kasis21aug/React-dashboard.git
cd React-dashboard
npm install
npm run dev
Open the URL shown in your terminal (example):
http://localhost:5173
```

📁 Project Structure

src/data/products.js
Local product data (acts like a database)

src/api/productApi.js
Mock API functions (get products, update title, delete product)

src/pages/Dashboard.jsx
Main dashboard page (filters + table + state handling)

src/components/ProductTable.jsx
Product table UI (editable title + delete button)

src/App.css
Basic styling for dashboard and table

🔧 Notes / Configuration

This project uses a mock API (no real backend).

Updates are stored in memory while the app is running.

To persist changes after refresh, you can store updated products in localStorage.
