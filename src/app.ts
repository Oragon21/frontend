// src/app.ts

import { pageController } from "./controller/page.controller.js";

document.addEventListener("DOMContentLoaded", initializeApp);
const pages = [
  { title: "Quality Control", content: "Content for Page 1" },
  { title: "Page 2", content: "Content for Page 2" },
  { title: "Measurements result", content: "Content for Measurements" },
  // Add more pages as needed
];
function initializeApp() {
  let buttonClickCount = 0;
  const hamburgerMenu = document.createElement("div");
  const navMenuContainer = document.createElement("div");

  function displayMessage(message: string) {
    const messageElement = document.getElementById("message");
    if (messageElement) {
      messageElement.textContent = message;
    }
  }

  function createPageContent(): void {
    const header = createHeader();
    const mainSection = createMainSection();

    displayNavigationMenu();
  }

  function createHeader(): HTMLElement {
    const header = document.createElement("header");
    document.body.appendChild(header);

    const logoContainer = createLogoContainer();
    const titleContainer = createTitleContainer();
    const hamburgerMenuContainer = createHamburgerMenuContainer();

    header.appendChild(logoContainer);
    header.appendChild(titleContainer);
    header.appendChild(hamburgerMenuContainer);

    return header;
  }

  function createLogoContainer(): HTMLElement {
    const logoContainer = document.createElement("div");
    logoContainer.className = "header-logo-container";

    const logo = createLogo();
    logoContainer.appendChild(logo);

    return logoContainer;
  }

  function createLogo(): HTMLImageElement {
    const logo = document.createElement("img");
    logo.src = "../../res/heitec-logo.png"; // Adjust the path as needed
    logo.alt = "Logo";
    logo.className = "logo";
    logo.style.maxHeight = "50px";

    return logo;
  }

  function createTitleContainer(): HTMLElement {
    const titleContainer = document.createElement("div");
    titleContainer.className = "header-title-container";

    const headerTitle = createHeaderTitle();
    titleContainer.appendChild(headerTitle);

    return titleContainer;
  }

  function createHeaderTitle(): HTMLHeadingElement {
    const headerTitle = document.createElement("h1");
    headerTitle.className = "header_title_page1";
    headerTitle.textContent = "PLUSControl FANC";

    return headerTitle;
  }

  function createHamburgerMenuContainer(): HTMLElement {
    const hamburgerMenuContainer = document.createElement("div");
    hamburgerMenuContainer.className = "header-hamburgermenu-container";

    const nav = createNav();
    hamburgerMenuContainer.appendChild(nav);

    return hamburgerMenuContainer;
  }

  function createNav(): HTMLElement {
    const nav = document.createElement("nav");
    nav.className = "nav";

    hamburgerMenu.className = "hamburger-menu";
    hamburgerMenu.textContent = "\u2630";
    nav.appendChild(hamburgerMenu);

    return nav;
  }

  function createMainSection(): HTMLElement {
    const mainSection = document.createElement("main");
    mainSection.className = "middle-section";
    document.body.appendChild(mainSection);

    createStartButton(mainSection);
    createResultButton(mainSection);
    createMessageTextField(mainSection);

    return mainSection;
  }

  function createStartButton(parent: HTMLElement): void {
    const buttonServer = document.createElement("button");
    buttonServer.textContent = "Start ";
    buttonServer.className = "rounded-button check-button";
    buttonServer.addEventListener("click", handleStartButtonClick);

    parent.appendChild(buttonServer);
  }

  async function handleStartButtonClick() {
    try {
      const data = await pageController.startProcess("process_start_request", [
        "FANC",
        "52",
        "",
      ]);
      displayMessage(data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function createResultButton(parent: HTMLElement): void {
    const buttonGetResult = document.createElement("button");
    buttonGetResult.textContent = "Get Result";
    buttonGetResult.className = "rounded-button check-button";
    buttonGetResult.addEventListener("click", handleGetResultButtonClick);

    parent.appendChild(buttonGetResult);
  }

  async function handleGetResultButtonClick() {
    try {
      const result = await pageController.getResult();
      displayMessage(result.message);
    } catch (error) {
      console.error("Error fetching result:", error);
    }
  }

  function createMessageTextField(parent: HTMLElement): void {
    const textField = document.createElement("div");
    textField.id = "message";
    textField.className = "message";

    parent.appendChild(textField);
  }

  function displayNavigationMenu(): void {
    navMenuContainer.classList.add("nav-menu-container");

    const navMenuList = document.createElement("ul");
    navMenuList.classList.add("nav-menu-list");

    // Create list items for each page
    pages.forEach((page, index) => {
      const navMenuItem = document.createElement("li");
      navMenuItem.textContent = page.title;

      navMenuItem.addEventListener("click", () => {
        navigateTo(page);
      });

      navMenuList.appendChild(navMenuItem);
    });

    navMenuContainer.appendChild(navMenuList);
    document.body.appendChild(navMenuContainer);
  }

  function navigateTo(page: { title: string; content: string }): void {
    const pageUrlMap: Record<string, string> = {
      "Quality Control": "pages/quality_control.html",
      "Page 2": "pages/page2.html",
      "Measurements result": "pages/measurements_result.html",
    };

    const targetUrl = pageUrlMap[page.title];
    console.log(targetUrl);
    if (targetUrl) {
      window.location.href = targetUrl;
    }
  }

  hamburgerMenu.addEventListener("click", () => {
    var navMenuContainer = document.querySelector(".nav-menu-container");
  
    if (navMenuContainer) {
      navMenuContainer.classList.toggle("show-nav-menu");
    } else {
      navMenuContainer = document.createElement("div");
      displayNavigationMenu();
    }
  });

  createPageContent();
}
