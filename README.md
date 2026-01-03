# GlobeTrotter – Smart Travel Planner 🌍

## 📖 Overview
GlobeTrotter is a smart, web-based travel planner designed to provide travel enthusiasts with essential information about destinations worldwide. In a single click, users can access details like currency, best visiting times, and top tourist attractions.

## 🚀 Features
- **Dynamic Data:** Information is fetched from an external JSON file, making it easy to update.
- **Interactive UI:** Clean, responsive design with a modern card layout.
- **Essential Info:** Provides Capital, Currency, Best Time to Visit, and Famous Places.
- **Scalable:** New countries can be added to the JSON file without changing the HTML code.

## 🛠️ Tech Stack
- **HTML5:** Semantic structure.
- **CSS3:** Flexbox, Responsive Design, CSS Transitions.
- **JavaScript (ES6+):** Async/Await, DOM Manipulation, Fetch API.
- **JSON:** Data storage.

## ⚙️ How to Run Locally
*Note: Because this project uses the `fetch` API to load a JSON file, browser security policies (CORS) may block it if you simply open `index.html` directly from your file folder.*

1. **Clone or Download** the repository.
2. **Use a Local Server** (Recommended):
   - If you have Python installed:
     ```bash
     python -m http.server
     ```
   - If you use VS Code:
     - Install the **"Live Server"** extension.
     - Right-click `index.html` and select **"Open with Live Server"**.
3. The app should now load the data correctly.

## 📂 Project Structure
```text
/GlobeTrotter
│── index.html    # Main user interface
│── style.css     # Styling and layout
│── script.js     # Logic and data fetching
│── data.json     # Database of countries
└── README.md     # Documentation
