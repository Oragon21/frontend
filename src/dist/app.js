import { pageController } from "./controller/page.controller.js";
document.addEventListener("DOMContentLoaded", initializeApp);
const pages = [
    { title: "Quality Control", content: "Content for Page 1" },
    { title: "Processes", content: "Content for Page 2" },
    { title: "Measurements result", content: "Content for Measurements" },
    // Add more pages as needed
];
let hamburgerMenu;
let navMenuContainer;
let machineModePopup = null;
let machineStatusPopup = null;
function createHeaderElement(tag, children) {
    const headerElement = document.createElement(tag);
    children.forEach((child) => {
        if (child) {
            headerElement.appendChild(child);
        }
    });
    return headerElement;
}
function createLogoContainer() {
    const logoContainer = createHeaderElement("div", [createLogo()]);
    logoContainer.className = "header-logo-container";
    return logoContainer;
}
function createLogo() {
    const logo = document.createElement("img");
    logo.src = "../res/heitec-logo.png"; // Adjust the path as needed
    logo.alt = "Logo";
    logo.className = "logo";
    logo.style.maxHeight = "50px";
    return logo;
}
function createTitleContainer() {
    const titleContainer = createHeaderElement("div", [createHeaderTitle()]);
    titleContainer.className = "header-title-container";
    return titleContainer;
}
function createHeaderTitle() {
    const headerTitle = document.createElement("h1");
    headerTitle.className = "header_title_page1";
    headerTitle.textContent = "PLUSControl FANC";
    return headerTitle;
}
function createHamburgerMenuContainer() {
    const hamburgerMenuContainer = createHeaderElement("div", [createNav()]);
    hamburgerMenuContainer.className = "header-hamburgermenu-container";
    hamburgerMenu = hamburgerMenuContainer.querySelector('.hamburger-menu'); // Assign the hamburgerMenu variable
    return hamburgerMenuContainer;
}
function createNav() {
    const nav = document.createElement("nav");
    nav.className = "nav";
    if (hamburgerMenu) {
        hamburgerMenu.className = "hamburger-menu";
        hamburgerMenu.textContent = "\u2630";
        nav.appendChild(hamburgerMenu);
    }
    return nav;
}
function createMainSection() {
    const existingMainSection = document.querySelector(".middle-section");
    if (existingMainSection) {
        return existingMainSection;
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
    const sideMainSectionRight2 = document.createElement("main");
    sideMainSectionRight2.className = "side-main-section-right";
    mainSection.appendChild(sideMainSectionRight2);
    const sideMainSectionRight3 = document.createElement("main");
    sideMainSectionRight3.className = "side-main-section-right";
    mainSection.appendChild(sideMainSectionRight3);
    createSideBoxes(sideMainSectionLeft);
    createMachineModeButton(sideMainSectionRight);
    createMachineStatusButton(sideMainSectionRight);
    createStartButton(sideMainSectionRight2, "Start", handleStartButtonClick);
    createResultButton(sideMainSectionRight2, "Get Result", handleGetResultButtonClick);
    createMessageTextField(sideMainSectionRight3);
    return mainSection;
}
function createStartButton(parent, label, clickHandler) {
    createButton(parent, label, "rounded-button check-button", clickHandler);
}
function createResultButton(parent, label, clickHandler) {
    createButton(parent, label, "rounded-button check-button", clickHandler);
}
function createButton(parent, label, className, clickHandler) {
    const button = document.createElement("button");
    button.textContent = label;
    button.className = className;
    button.addEventListener("click", clickHandler);
    parent.appendChild(button);
    return button;
}
function createMessageTextField(parent) {
    const textField = document.createElement("div");
    textField.id = "message";
    textField.className = "message";
    parent.appendChild(textField);
}
function createSideBoxes(parent) {
    createInfoBox(parent, "Information Box 1", "Description and small pictures go here.");
    createInfoBox(parent, "Information Box 2", "Description and small pictures go here.");
    createInfoBox(parent, "Information Box 1", "Description and small pictures go here.");
    createInfoBox(parent, "Information Box 2", "Description and small pictures go here.");
}
function createInfoBox(parent, title, content) {
    const sideBox = document.createElement("div");
    sideBox.className = "side-box";
    sideBox.innerHTML = `<h2>${title}</h2><p>${content}</p>`;
    parent.appendChild(sideBox);
}
function createMachineModeButton(parent) {
    createButton(parent, "Machine Mode", "rounded-button check-button", () => createMachineModePopup());
}
function createMachineStatusButton(parent) {
    createButton(parent, "Machine Status", "rounded-button check-button", () => createMachineStatusPopup());
}
function createMachineStatusPopup() {
    if (!machineStatusPopup && !machineModePopup) {
        machineStatusPopup = createPopupContainer();
        createPopupButtons(machineStatusPopup, ["Start", "Reset", "Close"], [navigateToDescriptionPage, resetMachineStatus, () => closePopup(machineStatusPopup)]);
        document.body.appendChild(machineStatusPopup);
        // Disable Machine Mode button while Machine Status popup is active
        disableButton("Machine Mode");
    }
    else {
        console.log("Machine status popup already exists!");
    }
}
function createMachineModePopup() {
    if (!machineModePopup && !machineStatusPopup) {
        machineModePopup = createPopupContainer();
        createPopupButtons(machineModePopup, ["Production", "Manual", "Reset", "Close"], [() => setMachineMode(1), () => setMachineMode(2), resetMachineMode, () => closePopup(machineModePopup)]);
        document.body.appendChild(machineModePopup);
        // Disable Machine Status button while Machine Mode popup is active
        disableButton("Machine Status");
    }
    else {
        console.log("Machine mode popup already exists!");
    }
}
function createPopupContainer() {
    const popupContainer = document.createElement("div");
    popupContainer.className = "popup-container";
    return popupContainer;
}
function createPopupButtons(container, labels, handlers) {
    labels.forEach((label, index) => {
        const button = createPopupButton(label, handlers[index]);
        container.appendChild(button);
    });
}
function createPopupButton(label, clickHandler) {
    const button = document.createElement("button");
    button.textContent = label;
    button.className = "rounded-button check-button";
    button.addEventListener("click", clickHandler);
    return button;
}
function disableButton(buttonName) {
    const buttons = document.querySelectorAll(`button[data-name="${buttonName}"]`);
    buttons.forEach(button => {
        button.setAttribute("disabled", "true");
    });
}
function enableButton(buttonName) {
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
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
}
async function handleGetResultButtonClick() {
    try {
        const result = await pageController.getResult();
        displayMessage(result.message);
    }
    catch (error) {
        console.error("Error fetching result:", error);
    }
}
function displayMessage(message) {
    const messageElement = document.getElementById("message");
    if (messageElement) {
        messageElement.textContent = message;
    }
}
// Functions
function displayNavigationMenu() {
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
    console.log("RHE");
}
function navigateTo(page) {
    const pageUrlMap = {
        "Quality Control": "pages/quality_control.html",
        "Processes": "pages/processes.html",
        "Measurements result": "pages/measurements_result.html",
    };
    const targetUrl = pageUrlMap[page.title];
    console.log(targetUrl);
    if (targetUrl) {
        window.location.href = targetUrl;
    }
}
function navigateToDescriptionPage() {
    // Implement navigation logic to the new page where you describe what happens
    console.log("Navigating to the description page...");
}
function closePopup(popupContainer) {
    // Check if popupContainer is not null before removing
    if (popupContainer) {
        // Remove the popup container from the DOM
        popupContainer.remove();
        // Enable the machine mode and machine status buttons when the popup is closed
        if (machineModePopup === popupContainer) {
            machineModePopup = null;
            enableButton("Machine Status");
        }
        else if (machineStatusPopup === popupContainer) {
            machineStatusPopup = null;
            enableButton("Machine Mode");
        }
    }
}
function setMachineMode(mode) {
    // Implement logic to set the machine mode variable and perform any other actions
    // For now, let's just log the selected mode
    console.log("Machine mode set to:", mode);
    closePopup(machineModePopup); // Close the popup after setting the mode
}
function resetMachineMode() {
    // Implement logic to reset the machine mode variable and perform any other actions
    // For now, let's just log a message
    console.log("Machine mode reset!");
    closePopup(machineModePopup); // Close the popup after resetting the mode
}
function resetMachineStatus() {
    // Implement logic to reset the machine mode variable and perform any other actions
    // For now, let's just log a message
    console.log("Machine mode reset!");
    closePopup(machineStatusPopup); // Close the popup after resetting the mode
}
// Event listeners
document.addEventListener("click", (event) => {
    const target = event.target;
    if (!machineModePopup && !machineStatusPopup) {
        if (target.classList.contains("rounded-button") && target.classList.contains("check-button")) {
            // Prevent button clicks when popups are active
            event.stopPropagation();
        }
    }
});
document.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("hamburger-menu")) {
        // Toggle navigation menu visibility on hamburger menu click
        navMenuContainer.classList.toggle("visible");
    }
    else if (!machineModePopup && !machineStatusPopup) {
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
