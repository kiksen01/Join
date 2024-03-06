/**
 * The function `includeHTML` is used to include HTML files into the current page using XMLHttpRequest.
 * @returns The function does not explicitly return anything.
 */
function includeHTML() {
    let z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
    getActiveLink();
}


/**
 * The function checks the current URL and adds a specific class to the corresponding link element if
 * the URL contains certain keywords.
 */
function getActiveLink() {
    if (window.location.href.indexOf("summary") > -1) {addActiveBgr('summary_link', 'mobile_summary_link');}
    if (window.location.href.indexOf("board") > -1) {addActiveBgr('board_link', 'mobile_board_link');}
    if (window.location.href.indexOf("add-task") > -1) {addActiveBgr('add_task_link', 'mobile_add_task_link');}
    if (window.location.href.indexOf("contacts") > -1) {addActiveBgr('contact_link', 'mobile_contact_link');}
    if (window.location.href.indexOf("legal-notice") > -1) {let element = document.getElementById("legal_notice_link"); element.classList.add("active");}
}


/* The code `window.addEventListener('resize', () => { getActiveLink(); });` adds an event listener to
the window object for the 'resize' event. When the window is resized, the `getActiveLink()` function
is called. This allows the function to be executed whenever the window is resized, ensuring that the
active link is updated based on the current URL. */
window.addEventListener('resize', () => {
    getActiveLink();
});


/**
 * The function adds the "active" class to either element1 or element2 based on the window width.
 * @param id1 - The value of id1 is the id of the first element that you want to add the "active" class
 * to.
 * @param id2 - The `id2` parameter is the ID of the element that you want to add the "active" class to
 * when the window width is less than or equal to 468 pixels.
 */
function addActiveBgr(id1, id2) {
    let element = document.getElementById(id1);
    let element2 = document.getElementById(id2);
    try {
        if (window.innerWidth <= 468) {
            element2.classList.add("active");
        } else {
            element.classList.add("active");
        }
    } catch (error) {
        return;
    }
}


/**
 * The function `openHeaderMenu` checks the width of the window and shows the appropriate header menu
 * based on the width.
 */
function openHeaderMenu() {
    if (window.innerWidth >= 468) {
        document.getElementById('header_menu').classList.remove('d-none');
    } else {
        document.getElementById('mobile_header_menu').classList.remove('d-none');
    }
    
}


/**
 * The function closeHeaderMenu hides the header menu based on the window width.
 */
function closeHeaderMenu() {
    if (window.innerWidth >= 468) {
        document.getElementById('header_menu').classList.add('d-none');
    } else {
        document.getElementById('mobile_header_menu').classList.add('d-none');
    }
}


/**
 * The function toggles the visibility of an element with the ID 'help_link' and an element with the ID
 * 'help_includer'.
 */
function toggleHelp() {
    document.getElementById('help_link').classList.toggle('d-none');
    document.getElementById('help_includer').classList.toggle('d-none');
}


/**
 * The function stopPropagation stops the event from bubbling up the event chain.
 * @param event - The event parameter is an object that represents the event that occurred, such as a
 * mouse click or a key press. It contains information about the event, such as the target element and
 * any additional data associated with the event.
 */
function stopPropagation(event) {
    event.stopPropagation();
}


/**
 * The `logout` function logs the user out by resetting the login status and redirecting them to the
 * login page.
 */
async function logout() {
    await resetLoginStatus();
    document.location.href = 'login.html';
}


/**
 * The function resets the login status of all accounts by setting their online status to false and
 * their greeting count to 0.
 */
async function resetLoginStatus() {
    for (let i = 0; i < accounts.length; i++) {
        accounts[i].online = false;
        accounts[i].greeting = 0;
    }
    await saveAccount();
}