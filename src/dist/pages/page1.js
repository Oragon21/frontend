// src/pages/page1.ts
var page1;
(function (page1) {
    let buttonClickCount = 0;
    var hamburgerMenu = document.createElement('div');
    const navMenuContainer = document.createElement('div');
    function handleYesAction() {
        // Hozzáadjuk a popup-ot a megerősítő üzenettel
        const popupContainer = document.createElement('div');
        popupContainer.classList.add('popup-container');
        const popupContent = document.createElement('div');
        popupContent.classList.add('popup-content');
        const popupMessage = document.createElement('p');
        popupMessage.textContent = 'Are you sure you want to perform the quality test?';
        const yesButton = document.createElement('button');
        yesButton.textContent = 'Yes';
        yesButton.classList.add('rounded-button', 'yes-button');
        yesButton.addEventListener('click', () => {
            // Ha "Yes"-re kattintanak, akkor hajtódik végre a quality test
            buttonClickCount++;
            const tableBody = document.getElementById('qualityTableBody');
            if (tableBody instanceof HTMLTableSectionElement) {
                const rowCount = tableBody.rows.length;
                if (buttonClickCount <= rowCount) {
                    const selectedRow = tableBody.rows[buttonClickCount - 1];
                    const checkmarkCell = selectedRow.cells[2];
                    // Hozzáadunk egy szóközt a checkmarkhoz
                    const space = document.createTextNode(" ");
                    checkmarkCell.appendChild(space);
                    checkmarkCell.innerHTML = '&#10004;'; // Pipa szimbólum
                    checkmarkCell.classList.add('checkmark-cell');
                    displayMessagePage1(`Test completed for Task ${buttonClickCount}.`);
                    // Ha elértük a maximum gombnyomások számát, visszaállítjuk a számlálót
                    if (buttonClickCount === rowCount) {
                        buttonClickCount = 0;
                    }
                }
            }
            // Az ablak bezárása
            popupContainer.remove();
        });
        const noButton = document.createElement('button');
        noButton.textContent = 'No';
        noButton.classList.add('rounded-button', 'no-button');
        noButton.addEventListener('click', () => {
            // Ha "No"-ra kattintanak, akkor nem hajtódik végre a quality test
            // Az ablak bezárása
            popupContainer.remove();
        });
        popupContent.appendChild(popupMessage);
        popupContent.appendChild(yesButton);
        popupContent.appendChild(noButton);
        popupContainer.appendChild(popupContent);
        document.body.appendChild(popupContainer);
    }
    // Függvény a fő tartalom létrehozásához
    function createPageContent() {
        // Header
        const header = document.createElement('header');
        document.body.appendChild(header);
        const logo = document.createElement('img');
        logo.src = '../../res/heitec-logo.png'; // Adjust the path as needed
        logo.alt = 'Logo';
        logo.className = 'logo';
        logo.style.maxHeight = '50px';
        header.appendChild(logo);
        const headerTitle = document.createElement('h1');
        headerTitle.className = 'header_title_page1';
        headerTitle.textContent = 'PLUSControl FANC';
        header.appendChild(headerTitle);
        const nav = document.createElement('nav');
        nav.className = 'nav';
        header.appendChild(nav);
        hamburgerMenu.className = 'hamburger-menu';
        hamburgerMenu.textContent = '\u2630'; // Unicode character for the hamburger menu
        nav.appendChild(hamburgerMenu);
        //Main
        const mainSection = document.createElement('main');
        mainSection.className = 'middle-section';
        const pageTitle = document.createElement('h1');
        pageTitle.className = 'page1_title';
        pageTitle.textContent = 'Quality Control';
        mainSection.appendChild(pageTitle);
        // Táblázat létrehozása
        const qualityCheckTable = document.createElement('table');
        qualityCheckTable.className = 'quality-table';
        // Táblázat fejléce
        const thead = qualityCheckTable.createTHead();
        const headerRow = thead.insertRow();
        headerRow.insertCell().textContent = 'Nr.';
        headerRow.insertCell().textContent = 'Description';
        headerRow.insertCell().textContent = 'Checkmark';
        // Táblázat törzse
        const tbody = qualityCheckTable.createTBody();
        tbody.id = 'qualityTableBody';
        var tableDescription = [
            'Check the DuT card according cleanness (NOTE: acceptance criteria!?)',
            'Check correct position of SNr- Label Must be within related border line. (see Abbildung 3 1).',
            'QS-Label: Checkbox “Sichtprüfung” must contain cross in red color.',
            'QS-Label: Checkbox „Flying-Probe-Prüfung“  must contain cross in red color.',
            'Perform mounting of light pipe. Check correct planar placement of LEDs (DS200, DS400 und DS401) (NOTE: would recommend reference detail picture here)',
            'Place the Type-Label (CO- or MI-Rack), according to Abbildung 3 1. Retrieve the correct type from production order form.'
        ];
        // Dummy sorok hozzáadása a táblázathoz
        for (let i = 0; i < tableDescription.length; i++) {
            const dummyRow = tbody.insertRow();
            const codeCell = dummyRow.insertCell();
            codeCell.textContent = `1.${i + 1}`;
            dummyRow.insertCell().textContent = tableDescription[i];
            dummyRow.insertCell().textContent = ''; // Checkmark oszlop üresen indul
        }
        mainSection.appendChild(qualityCheckTable);
        // Gomb létrehozása a minőségellenőrzéshez
        const checkButton = document.createElement('button');
        checkButton.textContent = 'Perform Quality Test';
        checkButton.classList.add('rounded-button', 'check-button');
        checkButton.addEventListener('click', handleYesAction);
        mainSection.appendChild(checkButton);
        document.body.appendChild(mainSection);
    }
    // Függvény az üzenet megjelenítéséhez
    function displayMessagePage1(message) {
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.textContent = message;
        }
    }
    // Add this section to your code
    const pages = [
        { title: 'Home', content: 'Content for Home page' },
        { title: 'Page 2', content: 'Content for Page 2' },
        { title: 'Measurements result', content: 'Content for Measurements' },
        // Add more pages as needed
    ];
    // Function to create and display the navigation menu
    function displayNavigationMenu() {
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
    function navigateTo(page) {
        // Implement the logic to navigate to the actual page here
        // For now, let's set the window location to a placeholder URL
        const pageUrlMap = {
            'Home': '../index.html',
            'Page 2': 'page2.html',
            'Measurements result': 'measurements_result.html', // Update the URL accordingly
        };
        const targetUrl = pageUrlMap[page.title];
        console.log(targetUrl);
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
        }
        else {
            // If the navigation menu container doesn't exist, create and display it
            displayNavigationMenu();
        }
    });
    // Oldal tartalmának létrehozása a script betöltésekor
    createPageContent();
})(page1 || (page1 = {}));
export { page1 };
