function loadContacts() { // Generiert die vollständige Kontaktliste
    let contactList = document.getElementById('listContainer');
    contactList.innerHTML = '';
    for (let i = 0; i < alphabet.length; i++) { // Iteration durch das Alphabet
        let letter = alphabet[i];
        generateLetterGroup(contactList, letter); // Generiert alphabetisch die Container für die Kontaktunterlisten
        generateContacts(letter); // Generiert die Kontaktunterliste zu dem jeweiligen Container
    }
}

function generateLetterGroup(element, x) {
    let letterAmount = 0;
    for (let i = 0; i < contacts.length; i++) { // Iteration durch das Kontaktarray
        let y = getFirstChar(i); // Separiert den ersten Buchstaben des Namens (Kleinbuchstabe)
        if (x === y && letterAmount == 0) { // Bei Übereinstimmung des Anfangsbuchstaben des Namens mit dem des Alphabetes wird ein Container für die Kontaktunterliste erstellt
            let upperCaseLetter = x.toUpperCase();
            element.innerHTML += createContactGroup(x, upperCaseLetter); // erzeugt Container Template
            letterAmount++;
            break;
        }
    }
}

function generateContacts(x) {
    let contactSubList = document.getElementById(`group${x}`);
    if (contactSubList) { // Falls Container für den jeweiligen Buchstbaben existiert, werden Kontakte hinzugefügt
        contactSubList.innerHTML = '';
        let names = [];
        filterContactsByChar(names, x); // Kontakte werden entsprechend des Anfangsbuchstabens in eine neue Liste separiert
        for (let i = 0; i < names.length; i++) { // Iteration duch das neue gefilterte Kontaktarray
            let y = getFirstCharofLastname(i, names); // Separiert den ersten Buchstaben des Nachnamens (Großbuchstabe)
            x = x.toUpperCase();
            contactSubList.innerHTML += createContact(x, y, names[i]['name'], names[i]['email'],  names[i]['id']); // erzeugt Kontakt Template
            document.getElementById(`contactInitials${names[i]['id']}`).style.backgroundColor = names[i]['color']; // generiert Bg-color für Initiale
        }
    }
}

function filterContactsByChar(names, x) {
    for (let i = 0; i < contacts.length; i++) {
        let y = getFirstChar(i);
        if (x === y) {
            names.push(contacts[i]);
        }
    }
    names = sortFilteredContacts(names); // Gefilterte Liste wird alphabetisch geordnet
}

function sortFilteredContacts(names) {
    return names.sort((a, b) => {
        if (a.name < b.name) {
        return -1;
        }
    });
}

function getFirstChar(i) {
    let char = contacts[i]['name'];
    char = char.charAt(0);
    char = char.toLowerCase();
    return char;
}

function getFirstCharofLastname(i, array) {
    let char = array[i]['name'];
    let index = char.indexOf(' ');
    char = char.charAt(index + 1);
    char = char.toUpperCase();
    return char;
}

function openContactInfo(id) { // Blendet Information des Kontaktes ein
    document.getElementById('contactInfoContainer').style.transform = 'translateX(0)';
    addContactInformation(id); // Fügt Kontaktinformationen ein
}

function addContactInformation(id) {
    document.getElementById('infoInitials').innerHTML = getInitial(id);
    document.getElementById('infoInitials').style.backgroundColor = contacts[id]['color'];
    document.getElementById('infoName').innerHTML = contacts[id]['name'];
    document.getElementById('infoEmail').innerHTML = contacts[id]['email'];
    document.getElementById('infoPhone').innerHTML = contacts[id]['phone'];
}

function getInitial(id) {
    let charFirstname = getFirstChar(id);
    charFirstname = charFirstname.toUpperCase();
    let charLastname = getFirstCharofLastname(id, contacts);
    return `${charFirstname}${charLastname}`;
}

function openContactMenu() { // Blendet Add-Contact Fenster ein
    document.getElementById('partitionWindow').classList.remove('d-none');
    document.getElementById('contactOptionWindow').style.transform = 'translateX(0)';
}

function closeContactMenu() { // Blendet Add-Contact Fenster aus
    document.getElementById('contactOptionWindow').style.transform = 'translateX(150%)';
    document.getElementById('partitionWindow').classList.add('d-none');
}

function addContact() { // Fügt neuen Kontakt in Kontaktliste hinzu
    let newContact = createNewContact();
    contacts.push(newContact);
    closeContactMenu();
    clearContactMenu()
    loadContacts();
    openContactInfo(newContact['id']);
}

function createNewContact() {
    let id = getIdForNewContact(); // Generiert neue Id
    let name = document.getElementById('contactNameInput').value;
    let email = document.getElementById('contactEmailInput').value;
    let phone = document.getElementById('contactPhoneInput').value;
    let color = createRandomRGBColor();
    let newContact = {
        'id' : id,
        'name' : name,
        'email' : email,
        'phone' : phone,
        'color' : color
    };
    return newContact;
}

function clearContactMenu() {
    document.getElementById('contactNameInput').value = '';
    document.getElementById('contactEmailInput').value = '';;
    document.getElementById('contactPhoneInput').value = '';;
}

function getIdForNewContact() {
    let lastId = contacts[contacts.length - 1]['id'];
    lastId++;
    return lastId;
}

function createRandomRGBColor() { // Generiert zufällige RGB-Color
    let red = getRandomInt(0, 255);
    let green = getRandomInt(0, 255);
    let blue = getRandomInt(0, 255);
    return `rgb(${red}, ${green}, ${blue})`;
}
  
function getRandomInt (min, max) { // Generiert zufällige Zahl von 0 bis 255
    min = Math.ceil(min); // Runded immer auf und gibt Ganzzahl zurück
    max = Math.floor(max); // Runded immer ab und gibt Ganzzahl zurück
    return Math.floor(Math.random() * (max - min + 1) + min);
}