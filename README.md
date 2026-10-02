# Security Event Analytics Dashboard

A responsive, client-side React application built as a frontend technical evaluation for a cybersecurity platform[cite: 2]. This dashboard visualizes generated security event data, providing key metrics, time-series trends, and detailed logs.

## 📋 The Task

The objective of this project was to build a comprehensive dashboard for analyzing network security events[cite: 2]. The application processes a generated dataset of 100-500 mock JSON records containing variables such as timestamps, severities, protocols, and event types[cite: 2, 3]. 

Key requirements implemented include:
*   **Dashboard Summary:** Dynamic calculation of Total Events, Critical/High Severity Events, Open Events, and Average Risk Score[cite: 3].
*   **Event Trend Analysis:** A time-series chart visualizing event volume over time with adjustable time-range filters (24 hours, 7 days, 30 days)[cite: 4].
*   **Event Log Table:** A comprehensive data table displaying 9 specific data points per event, featuring status filtering, column-based sorting, and pagination[cite: 4].
*   **Interactive Event Details:** An on-click modal that presents the complete event information along with a visual pipeline representation (Source → Protocol → Destination → Event → Risk Score)[cite: 5].

## 🛠️ Technologies Used

*   **React (Vite):** Utilized for fast compilation and component-based UI architecture.
*   **Standard CSS:** Entirely custom-styled using pure CSS variables, Flexbox, and CSS Grid. No utility frameworks were used, ensuring a clean, maintainable, and scoped styling system.
*   **Recharts:** Implemented for rendering the responsive time-series line chart for event trends.
*   **Lucide React:** Used for clean, consistent iconography across the summary cards and visual flow pipeline.

## ✨ Key Features

*   **Responsive Design:** Fully fluid layout that adapts beautifully to both desktop monitors and mobile screens.
*   **Optimized Performance:** Leverages `useMemo` hooks to cache data sorting, filtering, and chart calculations, preventing unnecessary re-renders.
*   **Custom Mock Data Generator:** Includes a built-in utility to generate randomized security records to test rendering thresholds and interactions[cite: 3].
*   **Polished UI/UX:** Features hover animations, custom scrollbars, badging for severity levels, and an accessible modal overlay.

## 🚀 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Sajin25/innspark-security-dashboard.git](https://github.com/Sajin25/innspark-security-dashboard.git)
   cd innspark-security-dashboard


##   Install dependencies:
    npm install

##   Start the development server:
    npm run dev

##   Open in browser:
    Navigate to http://localhost:5173 to view the application.





    
    
Developed by Sajin Sabu