// src/header.ts
export class Header {
    constructor() {
        this.buttonClickCount = 0;
        this.hamburgerMenu = document.createElement("div");
        this.navMenuContainer = document.createElement("div");
    }
    displayMessage(message) {
        const messageElement = document.getElementById("message");
        if (messageElement) {
            messageElement.textContent = message;
        }
    }
    createPageContent() {
        const header = document.createElement("header");
        document.body.appendChild(header);
        const logo = this.createLogo();
        header.appendChild(logo);
        const headerTitle = this.createHeaderTitle();
        header.appendChild(headerTitle);
        const nav = this.createNav();
        header.appendChild(nav);
        // Implement Main section creation if needed
    }
    createLogo() {
        const logo = document.createElement("img");
        logo.src = "../../res/heitec-logo.png"; // Adjust the path as needed
        logo.alt = "Logo";
        logo.className = "logo";
        logo.style.maxHeight = "50px";
        return logo;
    }
    createHeaderTitle() {
        const headerTitle = document.createElement("h1");
        headerTitle.className = "header_title_page1";
        headerTitle.textContent = "PLUSControl FANC";
        return headerTitle;
    }
    createNav() {
        const nav = document.createElement("nav");
        nav.className = "nav";
        this.hamburgerMenu.className = "hamburger-menu";
        this.hamburgerMenu.textContent = "\u2630";
        nav.appendChild(this.hamburgerMenu);
        return nav;
    }
    displayNavigationMenu(pages) {
        this.navMenuContainer.classList.add("nav-menu-container", "show-nav-menu");
        const navMenuList = document.createElement("ul");
        navMenuList.classList.add("nav-menu-list");
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
            'Page 1': 'pages/quality_control.html',
            'Page 2': 'pages/page2.html', // Update the URL accordingly
            // Add more pages as needed
        };
        const targetUrl = pageUrlMap[page.title];
        console.log(targetUrl);
        if (targetUrl) {
            window.location.href = targetUrl;
        }
    }
    getHamburgerMenu() {
        return this.hamburgerMenu;
    }
}
