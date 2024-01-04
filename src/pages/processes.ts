import { pageController } from "../controller/page.controller.js";

document.addEventListener("DOMContentLoaded", initializeApp);

interface Page {
  title: string;
  content: string;
}

const pages: Page[] = [
  { title: "Quality Control", content: "Content for Page 1" },
  { title: "Page 2", content: "Content for Page 2" },
  { title: "Measurements result", content: "Content for Measurements" },
  // Add more pages as needed
];

let hamburgerMenu: HTMLElement;
let navMenuContainer: HTMLElement;
let machineModePopup: HTMLDivElement | null = null;
let machineStatusPopup: HTMLDivElement | null = null;

function createHeaderElement(tag: string, children: HTMLElement[]): HTMLElement {
  const headerElement = document.createElement(tag);
  children.forEach((child) => {
    if (child) {
      headerElement.appendChild(child);
    }
  });
  return headerElement;
}

function createLogoContainer(): HTMLElement {
  const logoContainer = createHeaderElement("div", [createLogo()]);
  logoContainer.className = "header-logo-container";
  return logoContainer;
}

function createLogo(): HTMLImageElement {
  const logo = document.createElement("img");
  logo.src = "../res/heitec-logo.png"; // Adjust the path as needed
  logo.alt = "Logo";
  logo.className = "logo";
  logo.style.maxHeight = "50px";
  return logo;
}

function createTitleContainer(): HTMLElement {
  const titleContainer = createHeaderElement("div", [createHeaderTitle()]);
  titleContainer.className = "header-title-container";
  return titleContainer;
}

function createHeaderTitle(): HTMLHeadingElement {
  const headerTitle = document.createElement("h1");
  headerTitle.className = "header_title_page1";
  headerTitle.textContent = "PLUSControl FANC";
  return headerTitle;
}

function createHamburgerMenuContainer(): HTMLElement {
  const hamburgerMenuContainer = createHeaderElement("div", [createNav()]);
  hamburgerMenuContainer.className = "header-hamburgermenu-container";
  hamburgerMenu = hamburgerMenuContainer.querySelector('.hamburger-menu') as HTMLElement; // Assign the hamburgerMenu variable
  return hamburgerMenuContainer;
}

function createNav(): HTMLElement {
  const nav = document.createElement("nav");
  nav.className = "nav";

  if (hamburgerMenu) {
    hamburgerMenu.className = "hamburger-menu";
    hamburgerMenu.textContent = "\u2630";
    nav.appendChild(hamburgerMenu);
  }

  return nav;
}

function createMainSection(): HTMLElement {
  const existingMainSection = document.querySelector(".middle-section");
  if (existingMainSection) {
    return existingMainSection as HTMLElement;
  }

  const mainSection = document.createElement("main");
  mainSection.className = "middle-section";
  document.body.appendChild(mainSection);

  const sideMainSectionLeft = document.createElement("main");
  sideMainSectionLeft.className = "side-main-section-left";
  mainSection.appendChild(sideMainSectionLeft);

  const sideMainSectionRight = document.createElement("main");
  sideMainSectionRight.className = "side-main-section-right";
  mainSection.appendChild(sideMainSectionRight);

  const sideMainSectionBottom = document.createElement("main");
  sideMainSectionBottom.className = "side-main-section-bottom";
  mainSection.appendChild(sideMainSectionBottom);

  createSideBoxes(sideMainSectionLeft);

  createMachineModeButton(sideMainSectionRight);
  createMachineStatusButton(sideMainSectionRight);


  return mainSection;
}

function createStartButton(parent: HTMLElement, label: string, clickHandler: () => void): void {
  createButton(parent, label, "rounded-button check-button", clickHandler);
}

function createResultButton(parent: HTMLElement, label: string, clickHandler: () => void): void {
  createButton(parent, label, "rounded-button check-button", clickHandler);
}

function createButton(parent: HTMLElement, label: string, className: string, clickHandler: () => void): HTMLElement {
  const button = document.createElement("button");
  button.textContent = label;
  button.className = className;
  button.addEventListener("click", clickHandler);
  parent.appendChild(button);
  return button;
}

function createMessageTextField(parent: HTMLElement): void {
  const textField = document.createElement("div");
  textField.id = "message";
  textField.className = "message";
  parent.appendChild(textField);
}

function createSideBoxes(parent: HTMLElement): void {
  createInfoBox(parent, "Information Box 1", "Description and small pictures go here.");
  createInfoBox(parent, "Information Box 2", "Description and small pictures go here.");
  createInfoBox(parent, "Information Box 1", "Description and small pictures go here.");
  createInfoBox(parent, "Information Box 2", "Description and small pictures go here.");
}

function createInfoBox(parent: HTMLElement, title: string, content: string): void {
  const sideBox = document.createElement("div");
  sideBox.className = "side-box";
  sideBox.innerHTML = `<h2>${title}</h2><p>${content}</p>`;
  parent.appendChild(sideBox);
}

function createMachineModeButton(parent: HTMLElement): void {
  createButton(parent, "Machine Mode", "rounded-button check-button", () => createMachineModePopup());
}

function createMachineStatusButton(parent: HTMLElement): void {
  createButton(parent, "Machine Status", "rounded-button check-button", () => createMachineStatusPopup());
}

function createMachineStatusPopup(): void {
  if (!machineStatusPopup && !machineModePopup) {
    machineStatusPopup = createPopupContainer();
    createPopupButtons(machineStatusPopup, ["Start", "Reset", "Close"], [navigateToDescriptionPage, resetMachineMode, () => closePopup(machineStatusPopup)]);
    document.body.appendChild(machineStatusPopup);
    // Disable Machine Mode button while Machine Status popup is active
    disableButton("Machine Mode");
  } else {
    console.log("Machine status popup already exists!");
  }
}

function createMachineModePopup(): void {
  if (!machineModePopup && !machineStatusPopup) {
    machineModePopup = createPopupContainer();
    createPopupButtons(machineModePopup, ["Production", "Manual", "Reset", "Close"], [() => setMachineMode(1), () => setMachineMode(2), resetMachineMode, () => closePopup(machineModePopup)]);
    document.body.appendChild(machineModePopup);
    // Disable Machine Status button while Machine Mode popup is active
    disableButton("Machine Status");
  } else {
    console.log("Machine mode popup already exists!");
  }
}

function createPopupContainer(): HTMLDivElement {
  const popupContainer = document.createElement("div");
  popupContainer.className = "popup-container";
  return popupContainer;
}

function createPopupButtons(container: HTMLElement, labels: string[], handlers: (() => void)[]): void {
  labels.forEach((label, index) => {
    const button = createPopupButton(label, handlers[index]);
    container.appendChild(button);
  });
}

function createPopupButton(label: string, clickHandler: () => void): HTMLButtonElement {
  const button = document.createElement("button");
  button.textContent = label;
  button.className = "rounded-button check-button";
  button.addEventListener("click", clickHandler);
  return button;
}

function disableButton(buttonName: string): void {
  const buttons = document.querySelectorAll(`button[data-name="${buttonName}"]`);
  buttons.forEach(button => {
    button.setAttribute("disabled", "true");
  });
}

function enableButton(buttonName: string): void {
  const buttons = document.querySelectorAll(`button[data-name="${buttonName}"]`);
  buttons.forEach(button => {
    button.removeAttribute("disabled");
  });
}

// Handle button clicks
async function handleStartButtonClick() {
  try {
    const data = await pageController.startProcess("process_start_request", ["FANC", "52", ""]);
    displayMessage(data.message);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function handleGetResultButtonClick() {
  try {
    const result = await pageController.getResult();
    displayMessage(result.message);
  } catch (error) {
    console.error("Error fetching result:", error);
  }
}

function displayMessage(message: string): void {
  const messageElement = document.getElementById("message");
  if (messageElement) {
    messageElement.textContent = message;
  }
}

// Functions
function displayNavigationMenu(): void {
  navMenuContainer.classList.add("nav-menu-container");

  const navMenuList = document.createElement("ul");
  navMenuList.classList.add("nav-menu-list");

  // Create list items for each page
  pages.forEach((page) => {
    const navMenuItem = document.createElement("li");
    navMenuItem.textContent = page.title;
    navMenuItem.addEventListener("click", () => navigateTo(page));
    navMenuList.appendChild(navMenuItem);
  });

  navMenuContainer.appendChild(navMenuList);
  document.body.appendChild(navMenuContainer);
  console.log("RHE")
}

function navigateTo(page: Page): void {
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

function navigateToDescriptionPage(): void {
  // Implement navigation logic to the new page where you describe what happens
  console.log("Navigating to the description page...");
}

function closePopup(popupContainer: HTMLDivElement | null): void {
  // Check if popupContainer is not null before removing
  if (popupContainer) {
    // Remove the popup container from the DOM
    popupContainer.remove();
    // Enable the machine mode and machine status buttons when the popup is closed
    if (machineModePopup === popupContainer) {
      machineModePopup = null;
      enableButton("Machine Status");
    } else if (machineStatusPopup === popupContainer) {
      machineStatusPopup = null;
      enableButton("Machine Mode");
    }
  }
}

function setMachineMode(mode: number): void {
  // Implement logic to set the machine mode variable and perform any other actions
  // For now, let's just log the selected mode
  console.log("Machine mode set to:", mode);
  closePopup(machineModePopup); // Close the popup after setting the mode
}

function resetMachineMode(): void {
  // Implement logic to reset the machine mode variable and perform any other actions
  // For now, let's just log a message
  console.log("Machine mode reset!");
  closePopup(machineModePopup); // Close the popup after resetting the mode
}

// Event listeners
document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  if (!machineModePopup && !machineStatusPopup) {
    if (target.classList.contains("rounded-button") && target.classList.contains("check-button")) {
      // Prevent button clicks when popups are active
      event.stopPropagation();
    }
  }
});

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  if (target.classList.contains("hamburger-menu")) {
    // Toggle navigation menu visibility on hamburger menu click
    navMenuContainer.classList.toggle("visible");
  } else if (!machineModePopup && !machineStatusPopup) {
    if (target.classList.contains("rounded-button") && target.classList.contains("check-button")) {
      // Prevent button clicks when popups are active
      event.stopPropagation();
    }
  }
});

// Initial setup
function initializeApp() {
  hamburgerMenu = createHeaderElement("header", [createLogoContainer(), createTitleContainer(), createHamburgerMenuContainer()]);
  document.body.insertBefore(hamburgerMenu, document.body.firstChild);
  navMenuContainer = document.createElement("div");
  createMainSection();
  displayNavigationMenu();
}

initializeApp();
