// src/app.ts

module headerModule{
let buttonClickCount = 0;
var hamburgerMenu = document.createElement("div");
const navMenuContainer = document.createElement("div");

function displayMessage(message: string) {
  const messageElement = document.getElementById("message");
  if (messageElement) {
    messageElement.textContent = message;
  }
}

// Függvény a fő tartalom létrehozásához
function createPageContent(): void {
  // Header
  const header = document.createElement("header");
  document.body.appendChild(header);

  const logo = document.createElement("img");
  logo.src = "../../res/heitec-logo.png"; // Adjust the path as needed
  logo.alt = "Logo";
  logo.className = "logo";
  logo.style.maxHeight = "50px";
  header.appendChild(logo);

  const headerTitle = document.createElement("h1");
  headerTitle.className = "header_title_page1";
  headerTitle.textContent = "PLUSControl FANC";
  header.appendChild(headerTitle);

  const nav = document.createElement("nav");
  nav.className = "nav";
  header.appendChild(nav);

  hamburgerMenu.className = "hamburger-menu";
  hamburgerMenu.textContent = "\u2630"; // Unicode character for the hamburger menu
  nav.appendChild(hamburgerMenu);

  //Main
  const mainSection = document.createElement("main");
  mainSection.className = "middle-section";


  document.body.appendChild(mainSection);
}


// Add this section to your code
const pages = [
  { title: 'Page 1', content: 'Content for Page 1' },
  { title: 'Page 2', content: 'Content for Page 2' },
  // Add more pages as needed
];

// Function to create and display the navigation menu
function displayNavigationMenu(): void {
  navMenuContainer.classList.add('nav-menu-container', 'show-nav-menu');

  const navMenuList = document.createElement('ul');
  navMenuList.classList.add('nav-menu-list');

  // Create list items for each page
  pages.forEach((page, index) => {
    const navMenuItem = document.createElement('li');
    navMenuItem.textContent = page.title;

    navMenuItem.addEventListener('click', () => {
      navigateTo(page); // Call a function to navigate to the selected page
    });

    navMenuList.appendChild(navMenuItem);

  });

  navMenuContainer.appendChild(navMenuList);
  document.body.appendChild(navMenuContainer);
}

// Function to navigate to the selected page
function navigateTo(page: { title: string; content: string }): void {
  // Implement the logic to navigate to the actual page here
  // For now, let's set the window location to a placeholder URL
  const pageUrlMap: Record<string, string> = {
    'Page 1': 'pages/quality_control.html', // Update the URL accordingly
    'Page 2': 'pages/page2.html', // Update the URL accordingly
  };

  const targetUrl = pageUrlMap[page.title];
  console.log(targetUrl)
  if (targetUrl) {
    window.location.href = targetUrl;
  }
}

// Add an event listener to the hamburger menu to display the navigation menu
hamburgerMenu.addEventListener('click', () => {
  const navMenuContainer = document.querySelector('.nav-menu-container');

  // Toggle the visibility of the navigation menu
  if (navMenuContainer) {
    navMenuContainer.classList.toggle('show-nav-menu');
  } else {
    // If the navigation menu container doesn't exist, create and display it
    displayNavigationMenu();
  }
});

module.exports.createPageContent()
}
export {headerModule}