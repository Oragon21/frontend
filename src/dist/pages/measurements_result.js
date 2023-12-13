"use strict";
// measurementsResult.ts
class MeasurementsResult {
    constructor() {
        this.buttonClickCount = 0;
        this.hamburgerMenu = document.createElement("div");
        this.navMenuContainer = document.createElement("div");
        this.measurementResultsTextarea = document.createElement("textarea");
        this.createPageContent();
        this.setupEventListeners();
    }
    displayMessage(message) {
        const messageElement = document.getElementById("message");
        if (messageElement) {
            messageElement.textContent = message;
        }
    }
    createPageContent() {
        // Header
        const header = document.createElement("header");
        document.body.appendChild(header);
        const logoContainer = document.createElement("div");
        logoContainer.className = "header-logo-container";
        const logo = document.createElement("img");
        logo.src = "../../res/heitec-logo.png"; // Adjust the path as needed
        logo.alt = "Logo";
        logo.className = "logo";
        logo.style.maxHeight = "50px";
        logoContainer.appendChild(logo);
        header.appendChild(logoContainer);
        const titleContainer = document.createElement("div");
        titleContainer.className = "header-title-container";
        const headerTitle = document.createElement("h1");
        headerTitle.className = "header_title_page1";
        headerTitle.textContent = "PLUSControl FANC";
        titleContainer.appendChild(headerTitle);
        header.appendChild(titleContainer);
        const hamburgerMenuContainer = document.createElement("div");
        hamburgerMenuContainer.className = "header-hamburgermenu-container";
        const nav = document.createElement("nav");
        nav.className = "nav";
        hamburgerMenuContainer.appendChild(nav);
        header.appendChild(hamburgerMenuContainer);
        this.hamburgerMenu.className = "hamburger-menu";
        this.hamburgerMenu.textContent = "\u2630";
        nav.appendChild(this.hamburgerMenu);
        // Main
        // Add textarea to the main section
        const mainSection = document.createElement("main");
        mainSection.className = "middle-section";
        // First Section (divided into two)
        const firstSection = document.createElement("div");
        firstSection.className = "first-section";
        const mainTitle = document.createElement("h1");
        mainTitle.className = "main_title";
        mainTitle.textContent = "Measurements result";
        firstSection.appendChild(mainTitle);
        this.measurementResultsTextarea = document.createElement("textarea");
        this.measurementResultsTextarea.id = "measurementResults";
        this.measurementResultsTextarea.classList.add("measurement-results");
        this.measurementResultsTextarea.setAttribute("readonly", "true"); // Hozzáadott readonly attribútum
        firstSection.appendChild(this.measurementResultsTextarea);
        mainSection.appendChild(firstSection);
        document.body.appendChild(mainSection);
    }
    displayNavigationMenu() {
        this.navMenuContainer.classList.add("nav-menu-container", "show-nav-menu");
        const navMenuList = document.createElement("ul");
        navMenuList.classList.add("nav-menu-list");
        const pages = [
            { title: "Home", content: "Content for Home" },
            { title: "Quality Control", content: "Content for Page 1" },
            { title: "Page 2", content: "Content for Page 2" },
            // Add more pages as needed
        ];
        pages.forEach((page, index) => {
            const navMenuItem = document.createElement("li");
            navMenuItem.textContent = page.title;
            navMenuItem.addEventListener("click", () => {
                this.navigateTo(page);
            });
            navMenuList.appendChild(navMenuItem);
        });
        this.navMenuContainer.appendChild(navMenuList);
        document.body.appendChild(this.navMenuContainer);
    }
    navigateTo(page) {
        const pageUrlMap = {
            Home: "../index.html",
            "Quality Control": "quality_control.html",
            "Page 2": "page2.html",
        };
        const targetUrl = pageUrlMap[page.title];
        console.log(targetUrl);
        if (targetUrl) {
            window.location.href = targetUrl;
        }
    }
    setupEventListeners() {
        this.hamburgerMenu.addEventListener("click", () => {
            const navMenuContainer = document.querySelector(".nav-menu-container");
            if (navMenuContainer) {
                navMenuContainer.classList.toggle("show-nav-menu");
            }
            else {
                this.displayNavigationMenu();
            }
        });
    }
    displayMeasurementResults(results) {
        this.measurementResultsTextarea.value = results;
    }
}
// Instantiate the MeasurementsResult class when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    const measurementsResult = new MeasurementsResult();
    // Example usage: assume that measurementResultsString contains the results from the server
    const measurementResultsString = "Measurement result 1\nMeasurement result 2\n...";
    measurementsResult.displayMeasurementResults(measurementResultsString);
});
