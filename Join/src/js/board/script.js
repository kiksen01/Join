
let container = ['board-to-do', 'board-in-progress', 'board-awaiting-feedback', 'board-task-done'];
let stat = ['to-do', 'in-progress', 'awaiting-feedback', 'done'];
let changedAssignedContacts = [];

let previousProgress;
let currentDraggedElement;
let currentOpenedTask;
let changedPrio;


/**
 * The `init` function asynchronously loads tasks, contacts, and cat data, and then updates the HTML.
 */
async function init() {
    await loadTasks();
    await loadContacts();
    await loadCat();
    await updateHTML();
}


//<----------------------------------------- UpdateHTML-Function for Drag & Drop -------------------------------------->


/**
 * This function is updating the current HTML ensure every content inside an array is displayed
 */
/**
 * The function "updateHTML" updates the HTML content of multiple boxes based on the tasks and their
 * status.
 */
async function updateHTML() {
    let boxCount = 0;
    for (let i = 0; i < container.length; i++) {
        let box = document.getElementById(container[i]);
        let task = tasks.filter(t => t['status'] === stat[i]);
        box.innerHTML = '';
        for (let j = 0; j < task.length; j++) {
            const element = task[j];
            let category = element['category'][0];
            box.innerHTML += generateTaskCard(element, category, boxCount);
            checkDescriptionLength(element['description'], boxCount);
            getCategoryColor(element['category'][0]['category'], boxCount);
            checkForSubtask(element, boxCount);
            renderContactInitials(element);
            boxCount++;
        }
    }
}
 

/**
 If the description in a task is too long for the task box on the board, this function shortens the text to fit. Full description is available in the popup.
 */
function checkDescriptionLength(element, boxCount) {
    let descriptionBox = document.getElementById(`board-task-box-description${boxCount}`);
    if (element.length > 30) {
        let shortenedText = element.slice(0, 35);
        descriptionBox.innerHTML = `${shortenedText}...`;
    }
}


/**
 * The function `getCategoryColor` sets the background color of a category tag based on the element and
 * boxCount parameters.
 * @param element - The `element` parameter represents the category you want to search for in the
 * `categoryColors` array. It is used to filter the array and find the corresponding color.
 * @param boxCount - The `boxCount` parameter is used to identify the specific category tag element
 * that needs to be styled. It is typically a number or a unique identifier that corresponds to the
 * category tag element.
 */
function getCategoryColor(element, boxCount) {
    let categoryToSearch = categoryColors.filter(t => t['category'] === element);
    let color = categoryToSearch[0]['color'];
    document.getElementById(`category-tag${boxCount}`).style = `background-color: ${color};`
}


/**
 * The function checks if a subtask exists for an element and updates the progress container
 * accordingly.
 * @param element - The `element` parameter is an object that contains information about a task. It
 * likely has properties such as `subtask` which is an array of subtasks, and each subtask object has a
 * property `subtask_Name` which represents the name of the subtask.
 * @param boxCount - The `boxCount` parameter is a number that represents the count or index of the box
 * or element being checked for subtasks.
 */
function checkForSubtask(element, boxCount) {
    let subtask = element['subtask'][0]['subtask_Name'];
    if (subtask.length > 0) {
        document.getElementById(`progressContainer${boxCount}`).classList.remove('d-none');
        setProgress(element, boxCount);
    }
}


/**
    Checks the progress on subtasks and fills the progressbar accordingly.
 */
function setProgress(element, boxCount) {
    const counts = {};
    let arrayToSearch = element['subtask'][0]['checked'];
    let popUpCheck = 0;
    for (let i = 0; i < arrayToSearch.length; i++) {counts[arrayToSearch[i]] = (counts[arrayToSearch[i]] + 1) || 1;}
    let currentProgress = 100 / (arrayToSearch.length / counts['true']);
    if (!currentProgress) {currentProgress = 0;}
    let progressBar = document.getElementById(`progress${boxCount}`);
    let countContainer = document.getElementById(`countContainer${boxCount}`);
    if (currentProgress > 0) {countContainer.innerHTML = `${counts['true']}/${arrayToSearch.length} Done`;
    } else {countContainer.innerHTML = `0/${arrayToSearch.length} Done`;};
    progressBar.style = `width: ${currentProgress}%`;
    checkForAllSubtasksDone(currentProgress, progressBar, arrayToSearch);
}


/**
 * The function checks if a subtask popup exists and displays the progress container if it does.
 * @param element - An object that contains information about a task. It has a property called
 * "subtask" which is an array of subtasks. Each subtask is an object that has a property called
 * "subtask_Name" which represents the name of the subtask.
 * @param boxCount - The `boxCount` parameter is the number of boxes or subtasks that need to be
 * displayed in the progress popup.
 */
function checkForSubtaskPopUp(element, boxCount) {
    let subtask = element['subtask'][0]['subtask_Name'];
    if (subtask.length > 0) {
        document.getElementById(`progressContainer`).classList.remove('d-none');
        setPopUpProgress(element, boxCount);
    }
}


/**
 * This is changing the subtask status between done and undone. After changing, the progressbar will be rerendered.
 * @param {The position of the subtask in the array} count 
 */
async function changeSubtaskStatus(count) {
    let checkbox = document.getElementById(`subtaskCheckbox${count}`);
    let currentTask = getCurrentTask();
    if (checkbox.checked) {
        checkbox.checked = true;
        currentTask['subtask'][0]['checked'][count] = 'true';
        await saveRemote();
    } else {
        checkbox.checked = false;
        currentTask['subtask'][0]['checked'][count] = 'false';
        await saveRemote();
    } setPopUpProgress(currentTask, count + 1000);
}


/**
 * This is changing the progressbar after a subtask has been checked.
 * @param {The current opened task in the popup} element 
 */
function setPopUpProgress(element) {
    const counts = {};
    let arrayToSearch = element['subtask'][0]['checked'];
    let popUpCheck = 1;
    for (let i = 0; i < arrayToSearch.length; i++) {counts[arrayToSearch[i]] = (counts[arrayToSearch[i]] + 1) || 1;}
    let currentProgress = 100 / (arrayToSearch.length / counts['true']);
    if (!currentProgress) {currentProgress = 0;} else {currentProgress = currentProgress.toFixed(0);}
    let progressBar = document.getElementById(`progress`);
    let subtaskContainer = document.getElementById(`count-container`);
    if (currentProgress > 0) {subtaskContainer.innerHTML = `<div>${counts['true']}/${arrayToSearch.length} Done</div>`;} else {
        subtaskContainer.innerHTML = `<div>0/${arrayToSearch.length} Done</div>`;};
    progressBar.style = `width: ${currentProgress}%`;
    checkForAllSubtasksDone(currentProgress, progressBar, arrayToSearch, popUpCheck);
}


/**
 * The function checks if all subtasks are done and updates the progress bar and checkboxes
 * accordingly.
 * @param currentProgress - The current progress of the task, represented as a decimal number between 0
 * and 100. For example, if the task is 50% complete, currentProgress would be 50.
 * @param progressBar - The progressBar parameter is the HTML element that represents the progress bar.
 * @param arrayToSearch - arrayToSearch is an array that contains the subtasks to be checked.
 * @param popUpCheck - The `popUpCheck` parameter is a boolean value that determines whether or not to
 * check for all subtasks done in a pop-up window. If `popUpCheck` is `true`, the function will iterate
 * through the `arrayToSearch` and add the 'all-subtasks-done-color'
 */
function checkForAllSubtasksDone(currentProgress, progressBar, arrayToSearch, popUpCheck) {
    if (currentProgress > 99.9) {
        progressBar.classList.add('all-subtasks-done-color');
        if (popUpCheck) { for (let i = 0; i < arrayToSearch.length; i++) {document.getElementById(`subtaskCheckbox${i}`).classList.add('all-subtasks-done-color');}}
    } else {progressBar.classList.remove('all-subtasks-done-color');
        if (popUpCheck) {
            for (let i = 0; i < arrayToSearch.length; i++) {let checkbox = document.getElementById(`subtaskCheckbox${i}`);checkbox.classList.remove('all-subtasks-done-color');}
        }
    }
}


/**
 * The function `getCurrentTask` retrieves the current task element based on its headline text and
 * returns it.
 * @returns the first element in the `tasks` array that has a `title` property matching the
 * `currentHeadlineText`.
 */
function getCurrentTask() {
    let currentPopUpHeadline = document.getElementsByClassName('task-popup-headline-main task-popup-margin');
    let currentHeadlineText = currentPopUpHeadline[0]['innerText'];
    let currentElement = tasks.filter(t => t['title'] === currentHeadlineText);
    return currentElement[0]; for (let i = 0; i < arrayToSearch.length; i++) {
        document.getElementById(`subtaskCheckbox${i}`).classList.add('all-subtasks-done-color');
    }
}


/**
 * This function is saving the id of the current dragged element
 * @param {*} id - To differ between the task-divs
 */
function startDragging(id) {
    currentDraggedElement = id;
}


/**
 * The function allows an element to be dropped into another element.
 * @param ev - The parameter "ev" is an event object that represents the dragover event.
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * This function changes the status of a tasks, saves it and then updates the HTML
 * @param {string} category - the coulmn the element is to be dropped in
 */
async function moveTo(category) {
    let index = getIndexOfTask(currentDraggedElement);
    tasks[index]['status'] = category;
    saveRemote();
    updateHTML();
    
}


/**
 * The `moveMobile` function is used to display a pop-up menu with options to move a task to different
 * sections.
 * @param id - The `id` parameter is the unique identifier of the task that needs to be moved.
 */
function moveMobile(id) {
    let task = document.getElementById(`taskBox${id}`);
    let index = getIndexOfTask(id);
    if(tasks[index]['status'] == 'to-do'){task.innerHTML = generateMobileMoveTaskWithoutToDo(index);}
    else if(tasks[index]['status'] == 'in-progress'){task.innerHTML = generateMobileMoveTaskWithoutProgress(index);}
    else if(tasks[index]['status'] == 'awaiting-feedback'){task.innerHTML = generateMobileMoveTaskWithoutAwaiting(index);}
    else if(tasks[index]['status'] == 'done'){task.innerHTML = generateMobileMoveTaskWithoutDone(index);}
}


/**
 * This function saves the changed status to remote storage
 */
async function saveRemote() {
    await setItem('task', JSON.stringify(tasks));
}


/**
 * This function displays a shadow in the column a draggable element is dragged over
 * @param {number} counter - This is used to differ between the hidden box-shadows inside the task columns
 */
function dragHighlight(boxShadow) {
    document.getElementById(boxShadow).classList.remove('d-none');
}


/**
 * This function hides the box shadow as soon as the column isn't hovered any more
 * @param {number} counter - This is used to differ between the hidden box-shadows inside the task columns
 */
function endHighlight(boxShadow) {
    document.getElementById(boxShadow).classList.add('d-none');
}


/**
 * The function `moveToMobile` updates the status of a task to a specified category and then saves the
 * changes remotely and updates the HTML.
 * @param category - The category parameter represents the new status or category that the task will be
 * moved to. It could be a string value such as "completed", "in progress", or "pending", depending on
 * the task management system being used.
 * @param currentID - The currentID parameter is the unique identifier of the task that needs to be
 * moved to the mobile category.
 */
async function moveToMobile(category, currentID) {
    let index = getIndexOfTask(currentID);
    tasks[index]['status'] = category;
    saveRemote();
    updateHTML();
}


/**
 * Returns index of draggable task from the tasks array
 * 
 * @param {number} id - Id of draggable task
 * @returns {number}
 */
function getIndexOfTask(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (id === tasks[i].id) {
            return i;
        }
    }
}


//<--------------------------------------------- Open and Close PopUps ------------------------------------------->

/**
 * The function `openAddTask` is used to display an overlay for adding a task, with different behavior
 * depending on the window width.
 * @param status - The `status` parameter is a string that represents the status of the task. It is
 * used to determine the behavior of the `createTask` function when the task is being created.
 */
async function openAddTask(status) {
    let addTaskOverlay = document.getElementById('add-task-overlay');
    let profilePic = document.getElementById('profile_img');
    let createTaskButton = document.getElementById('create-task-button');
    let mobileCreateTaskButton = document.getElementById('mobile-create-btn-board');
    if (window.innerWidth < 901) {addTaskOverlay.classList.remove('add-task-overlay-not-visible');
        addTaskOverlay.classList.remove('d-none');
        profilePic.classList.add('d-none');
        createTaskButton.classList.add('d-none');
        mobileCreateTaskButton.classList.remove('d-none');
    } else {addTaskOverlay.classList.remove('d-none');renderDate(); setTimeout(slideAddTaskOverlay, 75);
        if (status) {document.getElementById('create-task-button').setAttribute("onclick", `createTask('${status}')`)}
    }
}


/**
 * The closeAddTask function is used to hide or show the add task overlay and adjust the visibility of
 * certain elements based on the window width.
 */
async function closeAddTask() {
    let addTaskOverlay = document.getElementById('add-task-overlay');
    let profilePic = document.getElementById('profile_img');
    let createTaskButton = document.getElementById('create-task-button');
    let mobileCreateTaskButton = document.getElementById('mobile-create-btn-board');
    if (window.innerWidth < 901) {
        addTaskOverlay.classList.add('d-none');
        addTaskOverlay.classList.add('add-task-overlay-not-visible');
        profilePic.classList.remove('d-none');
        createTaskButton.classList.remove('reposition-create-task-button');
        mobileCreateTaskButton.classList.add('d-none');
    } else {await slideAddTaskOverlay(); setTimeout(hideOrShowAddTask, 125);}
}


/**
 * The function `slideAddTaskOverlay` toggles the visibility of an overlay element with the id
 * 'add-task-overlay'.
 */
function slideAddTaskOverlay() {
    let addTaskOverlay = document.getElementById('add-task-overlay');
    if (addTaskOverlay.classList.contains('add-task-overlay-not-visible')) {
        addTaskOverlay.classList.remove('add-task-overlay-not-visible');
        addTaskOverlay.classList.add('add-task-overlay-visible');
    } else {
        addTaskOverlay.classList.remove('add-task-overlay-visible');
        addTaskOverlay.classList.add('add-task-overlay-not-visible');
    }
}


/**
 * The function hides the add task overlay if it is currently visible.
 */
function hideOrShowAddTask() {
    let addTaskOverlay = document.getElementById('add-task-overlay');
    if (!addTaskOverlay.classList.contains('d-none')) {
        addTaskOverlay.classList.add('d-none');
    }
}


/**
 * The function "openTaskPopUp" is used to display a pop-up window with details, subtasks, assigned
 * contacts, and checkbox status for a specific task.
 * @param id - The `id` parameter is the unique identifier of the task for which the pop-up is being
 * opened.
 */
function openTaskPopUp(id) {
    renderPopUpDetails(id);
    renderSubtasks(id);
    renderAssignedContacts(id);
    getCheckBoxStatus(id);
    document.getElementById('task-popup-background').classList.remove('d-none');
}


/**
 * The function "closeTaskPopUp" closes a task pop-up window and updates the HTML.
 */
function closeTaskPopUp() {
    currentOpenedTask = '';
    updateHTML();
    document.getElementById('task-popup-background').classList.add('d-none');
}


/**
 * This function checks whether a subtask has already been done or not
 * @param {Id of the currently opened task in the popup} id 
 */
function getCheckBoxStatus(id) {
    let index = getIndexOfTask(id)
    let currentTask = tasks[index];
    let checkedStatus = currentTask['subtask'][0]['checked'];
    for (let i = 0; i < checkedStatus.length; i++) {
        const element = checkedStatus[i];
        if (element == 'true') {document.getElementById(`subtaskCheckbox${i}`).checked = true;
        } else {document.getElementById(`subtaskCheckbox${i}`).checked = false;}
    }
}


/**
 * The function `renderPopUpDetails` is used to render the details of a task in a pop-up window based
 * on its ID.
 * @param id - The `id` parameter is the unique identifier of a task. It is used to find the index of
 * the task in the `tasks` array.
 */
function renderPopUpDetails(id) {
    let taskPopUp = document.getElementById('popup-content');
    let index = getIndexOfTask(id);
    taskPopUp.innerHTML = '';
    taskPopUp.innerHTML += generatePopUpHTML(tasks[index], index);
}


/**
 * The function `renderAssignedContacts` is used to display assigned contacts for a specific task in a
 * task popup.
 * @param id - The `id` parameter is the identifier of a task.
 */
function renderAssignedContacts(id) {
    let assignedContactsBox = document.getElementById('task-popup-contacts');
    let index = getIndexOfTask(id);
    assignedContactsBox.innerHTML = '';
    let contactsToDisplay = tasks[index]['assigned'];
    for (let i = 0; i < contactsToDisplay.length; i++) {
        const contact = contactsToDisplay[i];
        assignedContactsBox.innerHTML += generateTaskPopupContacts(contact);
    }
}


/**
 * The function `renderSubtasks` is used to render subtasks on a webpage based on the provided task ID.
 * @param id - The `id` parameter is the identifier of the task for which the subtasks need to be
 * rendered.
 */
function renderSubtasks(id) {
    let index = getIndexOfTask(id);
    let subtaskContainer = document.getElementById(`subtask-container`);
    let temporaryArray = tasks.filter(t => t['id'] === id);
    let subtaskArray = temporaryArray[0]['subtask'][0]['subtask_Name'];
    for (let i = 0; i < subtaskArray.length; i++) {
        const subtask = subtaskArray[i];
        subtaskContainer.innerHTML += generateSubtaskSection(subtask, i);
    }
    subtaskContainer.innerHTML += generatePopUpProgressBar(index);
    checkForSubtaskPopUp(tasks[index], index + 1000);
}


/**
 * This renders the initials of assigned contacts into bubbles. If more than three contacts are assigned it will display two bubbles with initals and one with the number of additional assigned contacts.
 * @param {Currently opened task in popup} element 
 */
function renderContactInitials(element) {
    let contactBox = document.getElementById(`assigned-contacts${element['id']}`)
    let assignedContacts = element['assigned'];
    contactBox.innerHTML = '';
    for (let i = 0; i < assignedContacts.length; i++) {
        if (assignedContacts.length >= 4) { const contact1 = assignedContacts[0];
            const contact2 = assignedContacts[1];
            contactBox.innerHTML += generateSmallContactBubbles(contact1);
            contactBox.innerHTML += generateSmallContactBubbles(contact2);
            contactBox.innerHTML += generateSmallNumberBubble(assignedContacts);
            break;
        } else {const contact = assignedContacts[i]; contactBox.innerHTML += generateSmallContactBubbles(contact);} }
}


/**
 * The `deletePopupTask` function deletes a task from an array, saves the updated array, updates the
 * HTML, and closes the task popup.
 * @param i - The parameter "i" represents the index of the task that needs to be deleted from the
 * "tasks" array.
 */
async function deletePopupTask(i) {
    tasks.splice(i, 1);
    await saveTask();
    updateHTML();
    closeTaskPopUp();
}


/*<-------------------------------------------------- functions for edit task ------------------------------------------> */

/**
 * This deletes the contents of the popup window and replaces it with inputs to edit the currently opened task.
 * @param {index of task to edit} index 
 */
function editTask(index) {
    let popUpWindow = document.getElementById('popup-content');
    let currentTask = tasks[index];
    changedPrio = currentTask;
    popUpWindow.innerHTML = '';
    console.log(currentTask);
    popUpWindow.innerHTML = generateEditPopUp(currentTask, index);
    currentOpenedTask = currentTask;
    getPrioColor(currentTask);
    fillContacts(currentTask);
    checkForAssignedStatus(currentTask);
    renderContactInitials(currentTask);
}


/**
 * Checks the prio of the opened task and highlights the set prio-button.
 * @param {currently opened task} currentTask 
 */
function getPrioColor(currentTask) {
    let currentPrio = currentTask['priority'][0]['priority'];
    let currentColor = currentTask['priority'][0]['color'];
    let prioImage = document.getElementById(`img-${currentPrio}-popUp`);
    let currentButton = document.getElementById(`${currentPrio}PopUp`);
    currentButton.style.backgroundColor = `${currentColor}`;
    prioImage.style = `filter: brightness(0) invert(1)`;
    currentButton.style.color = 'white';
}


/**
 * The function `changePrio` updates the priority and color of an item and then calls two other
 * functions.
 * @param i - The parameter `i` is the index of the priority that you want to change.
 */
function changePrio(i) {
    let newPrio = priorities[i]['priority'];
    let newColor = priorities[i]['color'];
    changedPrio['priority'][0]['priority'] = newPrio;
    changedPrio['priority'][0]['color'] = newColor;
    getPrioColor(changedPrio);
    resetUnselectedColor(changedPrio['priority'][0]['priority']);
}


/**
 * After changing the prio of a task via button, this checks for the new prio and highlights the right button.
 * @param {new set prio} newPrio 
 */
function resetUnselectedColor(newPrio) {
    if (newPrio == 'urgent') {document.getElementById('mediumPopUp').style = ''; document.getElementById('img-medium-popUp').style = '';
        document.getElementById('lowPopUp').style = ''; document.getElementById('img-low-popUp').style = ''; }
    if (newPrio == 'medium') {document.getElementById('urgentPopUp').style = ''; document.getElementById('img-urgent-popUp').style = '';
        document.getElementById('lowPopUp').style = ''; document.getElementById('img-low-popUp').style = '';}
    if (newPrio == 'low') {document.getElementById('mediumPopUp').style = ''; document.getElementById('img-medium-popUp').style = '';
        document.getElementById('urgentPopUp').style = ''; document.getElementById('img-urgent-popUp').style = '';}
}


/**
 * Renders all available contacts into a hidden dropdown menu.
 */
function fillContacts() {
    let contactsContainer = document.getElementById('showAssignedPopUp');
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        contactsContainer.innerHTML += generateContactCheckbox(contact, i);
    }
    contactsContainer.innerHTML += `<div onclick="AddNewContact('assignedPopUp', 'showAssignedPopUp')" class="contact-container cursor">Invite New Contact</div>`;
}


/**
 * When the assigned dropdown menue is opened, this checks which contacts have already been assigned to the task and checks them.
 * @param {currently opened task} currentTask 
 */
function checkForAssignedStatus(currentTask) {
    let assignedPeople = currentTask['assigned'];
    let namesToCheck = [];
    for (let i = 0; i < assignedPeople.length; i++) {const contactName = assignedPeople[i]['name']; namesToCheck.push(contactName);}
    for (let i = 0; i < contacts.length; i++) {
        const contactName = contacts[i]['name'];
        let currentNameToCheck = document.getElementById(`contactName${i}`).innerText;
        let currentCheckbox = document.getElementById(`tickIdPopUp${i}`);
        let indexOfName = getIndexOfName(currentNameToCheck, namesToCheck);
        if (indexOfName > -1) {currentCheckbox.checked = true;}
    }
}


/**
 * The function "getIndexOfName" returns the index of a given name in an array.
 * @param name - The name parameter is the name you want to search for in the array.
 * @param arr - The `arr` parameter is an array of names.
 * @returns The index of the given name in the given array.
 */
function getIndexOfName(name, arr) {
    let index = arr.indexOf(name);
    return index;
}


/**
 * Either adds or removes a contact from the assigned list of the opened task.
 * @param {position of a contact in contacs array} i 
 */
function assignTaskPopUp(i) {
    let checkbox = document.getElementById(`tickIdPopUp${i}`);
    let alreadyAssignedContacts = currentOpenedTask['assigned'];
    let contactToAssign = contacts[i];
    if (!checkbox.checked) {
        alreadyAssignedContacts.push(contactToAssign);
        checkbox.checked = true;
    } else {
        removeObjectWithId(alreadyAssignedContacts, contacts[i].id);
        checkbox.checked = false;
    }
    renderContactInitials(currentOpenedTask);
}


/**
 * saves all the changes of edit task. CAUTION: THIS DOESN'T SAVE TO REMOTE STORAGE!!!
 * @param {index of the opened task} index 
 */
async function saveChanges(index) {
    let currentTask = tasks[index];
    let newTitle = document.getElementById('newTitle').value;
    let newDescription = document.getElementById('newDescription').value;
    let newDueDate = document.getElementById('newDueDate').value;
    let newPrio = changedPrio['priority'][0]['priority'];
    let newPrioColor = changedPrio['priority'][0]['color'];
    if (newTitle != 0 && newDescription != 0 && newDueDate && newPrio != 0 && newPrioColor) {
        await pushChanges(currentTask, newTitle, newDescription, newDueDate);
        updateHTML();
    }
    else return;

}


/**
 * pushes changes from edited task to the tasks array and saves them in remote storage.
 * @param {current opened task} currentTask 
 * @param {new title from edit task} newTitle 
 * @param {new description from edit task} newDescription 
 * @param {new duedate from edit task} newDueDate 
 */
async function pushChanges(currentTask, newTitle, newDescription, newDueDate) {
    let assignedContacts = currentTask['assigned']
    currentTask['title'] = newTitle;
    currentTask['description'] = newDescription;
    currentTask['duedate'] = newDueDate;
    await pushContacts(assignedContacts)
    await saveRemote();
    openTaskPopUp(currentTask['id']);
    changedAssignedContacts.splice(0, changedAssignedContacts.length);
}


/**
 * This combines the changed assigned contacts and the already existing assignations into one array and then removes all the duplicates.
 * @param {assigned contacts before the edit} assignedContacts 
 */
async function pushContacts(assignedContacts) {
    for (let i = 0; i < changedAssignedContacts.length; i++) {
        const contact = changedAssignedContacts[i];
        const contactName = contact['name'];
        assignedContacts.push(contact);
    }
    let cleanedArray = removeDuplicateObjects(assignedContacts);
    assignedContacts.splice(0, assignedContacts.length);
    for (let i = 0; i < cleanedArray.length; i++) {
        const element = cleanedArray[i];
        assignedContacts.push(element);
    }

}


/**
 * The function removes duplicate objects from an array by comparing their stringified versions.
 * @param arr - The parameter `arr` is an array of objects.
 * @returns The function `removeDuplicateObjects` returns an array of unique objects.
 */
function removeDuplicateObjects(arr) {
    const uniqueObjects = [];
    const keys = new Set();
    for (const obj of arr) {
        const key = JSON.stringify(obj);
        if (!keys.has(key)) {
            keys.add(key);
            uniqueObjects.push(obj);
        }
    }
    return uniqueObjects;
}


/**
 * Returns first letter of the name as a uppercase letter
 * 
 * @param {string} contactName - Name of contact
 * @returns {string} - first letter of the name of the contact as a uppercase letter
 */
function getFirstChar(contactName) {
    let name = contactName;
    let char = name.charAt(0);
    char = char.toUpperCase();
    return char;
}


/**
 * Returns the first letter of the lastname as a uppercase letter
 * 
 * @param {string} contactName - Name of contact
 * @returns {string} - first letter of the lastname as a uppercase letter
 */
function getFirstCharofLastname(contactName) {
    let name = contactName;
    let index = name.lastIndexOf(' ');
    let char = name.charAt(index + 1);
    char = char.toUpperCase();
    return char;
}


/**
 * The function searches for tasks based on a search word and hides or shows task boxes accordingly.
 */
function searchForTask() {
    let searchWord = document.getElementById('search-task').value;
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        if (!element['title'].toUpperCase().includes(searchWord.toUpperCase()) && !element['description'].toUpperCase().includes(searchWord.toUpperCase()) &&
            !element['category'][0].category.toUpperCase().includes(searchWord.toUpperCase())) {
            document.getElementById(`taskBox${element['id']}`).classList.add('d-none');
        } else {
            document.getElementById(`taskBox${element['id']}`).classList.remove('d-none');
        }
    }

}