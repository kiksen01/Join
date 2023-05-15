function createContactGroup(charLowCase, charUpperCase) {
    return `<div class="contactGroup flex-column">
    <div class="letter flex-row">${charUpperCase}</div>
    <div class="horizontalLine"></div>
    <div id="group${charLowCase}" class="contactSubList flex-column"></div></div>`;
}

function createContact(x, y, name, email, id) {
    return `<div class="contact flex-row curser" onclick="openContactInfo(${id})">
    <div id="contactInitials${id}" class="contactInitials grid">${x}${y}</div>
    <div class="contactName flex-column">
        <span class="contactSubListName">${name}</span>
        <span class="contactSubListEmail">${email}</span>
    </div></div>`;
}