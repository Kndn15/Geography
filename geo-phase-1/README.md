# Geographic Data & API Integration
**Live Demo:** [https://lucent-kheer-2cdd77.netlify.app/](https://lucent-kheer-2cdd77.netlify.app/)

This repository serves as a functional exploration of **D3.js** (Data-Driven Documents) and **Asynchronous API fetching**. Below is a technical breakdown of how the interface handles geography, state, and external data.

---

## 🧭 1. The Geometry Logic (D3.js)
The map is rendered as a series of SVG paths. Unlike a standard image, every country is a unique mathematical object.

* **Coordinate Translation:** The code uses `d3.geoMercator()` to project 3D spherical coordinates (longitude/latitude) onto a 2D screen. 
* **The Scaling Formula:** To solve the problem of maps looking different on every screen, I implemented a dynamic scale logic:
    ```javascript
    projection.scale(window.innerWidth / 7);
    ```
    This ratio ensures the "zoom" level of the world adapts automatically to the user's viewport size.
* **Dynamic Redrawing:** Inside the `resize` event listener, the `PathGenerator` is updated and applied to all `path` elements. This forces the map to redraw instantly when the browser window is stretched.



---

## 📡 2. The Data Pipeline (REST Countries API)
The interaction logic follows a "Pull-on-Demand" architecture to keep the initial load light.

* **The Identifier:** Every country in the GeoJSON has a unique `id` (e.g., `IND`, `FRA`). When clicked, this ID is captured and passed as a parameter.
* **Asynchronous Handling:** I used `async/await` to handle the API request. This prevents the browser from "freezing" while waiting for the flag image or country data to arrive from the server.
* **UI Injection:** Once the data is fetched, the script targets the DOM nodes directly:
    ```javascript
    document.getElementById("countryName").innerText = country.name.common;
    ```
* **The Auto-Clear Timer:** To manage screen real estate, a `setTimeout` is triggered for 3000ms. This logic automatically resets the `infoBox` display to `none`, ensuring the map remains the focal point.



---

## 🌗 3. Theme State Management
The "Dark Mode" implementation avoids complex JavaScript styling. Instead, it manages the **state** of the environment.

* **State Toggle:** The Moon/Sun button acts as a light switch. It doesn't change colors; it simply adds or removes the `.dark-mode` class from the `<body>`.
* **CSS Specificity:** The logic relies on CSS "scoping." When `body.dark-mode` is active, the browser automatically prioritizes specific colors for the map paths and the info box.
* **SVG Attributes:** A key learning point in this logic is that SVG shapes use `fill` (the interior color) and `stroke` (the border color), rather than the standard CSS `background-color`.



---

## 🛠 Project Realities
* **Data Integrity:** This project is a study in architectural logic. In cases where the API does not return a value (such as the capital of Antarctica or specific territories), the console will log an error. This behavior is intentionally left unhandled to demonstrate how the script reacts to "null" values in a live API environment.
* **Mobile Adaptation:** The UI uses `@media` queries to pivot the `infoBox`. On small screens, the card moves to the bottom of the viewport to improve "thumb-reachability," while the D3 engine continues to scale the map proportionally.

---
