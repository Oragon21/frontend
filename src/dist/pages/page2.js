"use strict";
// src/pages/page2.ts
var page2;
(function (page2) {
    //Attributumok
    let buttonClickCount = 0;
    var hamburgerMenu = document.createElement("div");
    const navMenuContainer = document.createElement("div");
    const pages = [
        { title: "Home", content: "Content for Home page" },
        { title: "Quality Control", content: "Content for Page 1" },
        { title: "Measurements result", content: "Content for Measurements" },
        // Add more pages as needed
    ];
    //Methodok
    // Függvény a fő tartalom létrehozásához
    function createPageContent() {
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
        hamburgerMenu.className = "hamburger-menu";
        hamburgerMenu.textContent = "\u2630";
        nav.appendChild(hamburgerMenu);
        // Main
        const mainSection = document.createElement("main");
        mainSection.className = "middle-section";
        // First Section (divided into two)
        const firstSection = document.createElement("div");
        firstSection.className = "first-section";
        // Buttons Column
        const buttonsColumn = document.createElement("div");
        buttonsColumn.className = "buttons-column";
        const startButton = document.createElement("button");
        startButton.textContent = "Start";
        startButton.classList.add("rounded-button", "start-button");
        buttonsColumn.appendChild(startButton);
        const abortButton = document.createElement("button");
        abortButton.textContent = "Abort";
        abortButton.classList.add("rounded-button", "abort-button");
        buttonsColumn.appendChild(abortButton);
        firstSection.appendChild(buttonsColumn);
        // Description Column
        const descriptionColumn = document.createElement("div");
        descriptionColumn.className = "description-column";
        const description = document.createElement("p");
        description.textContent = "Description goes here.";
        descriptionColumn.appendChild(description);
        firstSection.appendChild(descriptionColumn);
        // Second Section
        const secondSection = document.createElement("div");
        secondSection.className = "second-section";
        const sectionTitle = document.createElement("h2");
        sectionTitle.textContent = "Description";
        const sectionDescription = document.createElement("p");
        sectionDescription.textContent = "Section description goes here.";
        secondSection.appendChild(sectionTitle);
        secondSection.appendChild(sectionDescription);
        mainSection.appendChild(firstSection);
        mainSection.appendChild(secondSection);
        document.body.appendChild(mainSection);
    }
    // Függvény az üzenet megjelenítéséhez
    function displayMessagePage1(message) {
        const messageElement = document.getElementById("message");
        if (messageElement) {
            messageElement.textContent = message;
        }
    }
    // Add this section to your code
    // Function to create and display the navigation menu
    function displayNavigationMenu() {
        navMenuContainer.classList.add("nav-menu-container", "show-nav-menu");
        const navMenuList = document.createElement("ul");
        navMenuList.classList.add("nav-menu-list");
        // Create list items for each page
        pages.forEach((page, index) => {
            const navMenuItem = document.createElement("li");
            navMenuItem.textContent = page.title;
            navMenuItem.addEventListener("click", () => {
                navigateTo(page); // Call a function to navigate to the selected page
            });
            navMenuList.appendChild(navMenuItem);
        });
        navMenuContainer.appendChild(navMenuList);
        document.body.appendChild(navMenuContainer);
    }
    // Function to navigate to the selected page
    function navigateTo(page) {
        // Implement the logic to navigate to the actual page here
        // For now, let's set the window location to a placeholder URL
        const pageUrlMap = {
            Home: "../index.html",
            "Quality Control": "quality_control.html",
            "Measurements result": "measurements_result.html", // Update the URL accordingly
        };
        const targetUrl = pageUrlMap[page.title];
        console.log(targetUrl);
        if (targetUrl) {
            window.location.href = targetUrl;
        }
    }
    //Eventek
    // Add an event listener to the hamburger menu to display the navigation menu
    hamburgerMenu.addEventListener("click", () => {
        const navMenuContainer = document.querySelector(".nav-menu-container");
        // Toggle the visibility of the navigation menu
        if (navMenuContainer) {
            navMenuContainer.classList.toggle("show-nav-menu");
        }
        else {
            // If the navigation menu container doesn't exist, create and display it
            displayNavigationMenu();
        }
    });
    // Oldal tartalmának létrehozása a script betöltésekor
    createPageContent();
})(page2 || (page2 = {}));
