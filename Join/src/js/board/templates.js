//<----------------------------------------------- generate HTML functions ---------------------------------------------------------------->openTaskPopUp
/**
 * The function generates an HTML task card element with dynamic data.
 * @param element - An object containing information about the task, such as its id, title,
 * description, and priority.
 * @param category - The category parameter is an object that contains information about the category
 * of the task. It has two properties: 'color' and 'category'. The 'color' property represents the
 * background color of the category tag, and the 'category' property represents the name of the
 * category.
 * @param boxCount - The `boxCount` parameter is used to generate unique IDs for various elements in
 * the task card. It is incremented each time a new task card is generated, ensuring that each task
 * card has a unique ID.
 * @returns an HTML template string.
 */
function generateTaskCard(element, category, boxCount){
    return /*html*/`
        <div id="taskBox${element['id']}" draggable="true" onclick="openTaskPopUp(${element['id']})" ondragstart="startDragging(${element['id']})" class="board-task-box flex-column">
            <div>
                <div class="task-card-container">
                    <span id="category-tag${boxCount}" class="category-tag" style="background-color:${category['color']};">${category['category']}</span>
                    <span class="move-task" onclick="event.stopPropagation(), moveMobile(${element['id']})"> ||| </span>
                </div>
                <h3>${element['title']}</h3>
                <div id="board-task-box-description${boxCount}" class="board-task-box-description">${element['description']}</div>
                <div class="flex-row" style="justify-content: space-between;">
                <div id="progressContainer${boxCount}" class="progress d-none" role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width: 80%;">
                <div id="progress${boxCount}"  class="progress-bar"></div>
                </div>
                <div id="countContainer${boxCount}"></div>
                </div>
                <div class="contacts-urgency-box">
                    <div class="assigned-contacts" id="assigned-contacts${element['id']}">

                    </div>
                    <img src="./src/img/${element['priority'][0]['priority']}.svg">
                </div>
                
            </div>
        </div>
    `; 
}


/**
 * The function generates HTML code for a mobile move task container with options to move a task to
 * different sections.
 * @param index - The `index` parameter is the index of the task in the `tasks` array. It is used to
 * access the specific task object in the array.
 * @returns a string that represents an HTML template for a mobile move task container.
 */
function generateMobileMoveTaskWithoutToDo(index){
    return `
    <div class="mobile-move-container">
        <div> Move this to: </div>
        <div class="mobile-section-move-container cursor-class" onclick="event.stopPropagation(), moveToMobile('in-progress', ${tasks[index]['id']})">
        <span class="mobile-move-btn"> In Progress </span>
        </div>
        <div class="mobile-section-move-container cursor-class " onclick="event.stopPropagation(), moveToMobile('awaiting-feedback', ${tasks[index]['id']})">
        <span class="mobile-move-btn"> Awaiting Feedback </span>
        </div>
        <div class="mobile-section-move-container cursor-class" onclick="event.stopPropagation(), moveToMobile('done', ${tasks[index]['id']})">
        <span class="mobile-move-btn"> Done </span>
        </div>
        
        <div> <span class="cursor-class close-mobile-move" onclick="event.stopPropagation(), closeTaskPopUp()">X</span> </div>
    </div>
    `
}

function generateMobileMoveTaskWithoutProgress(index){
    return `
    <div class="mobile-move-container">
        <div> Move this to: </div>
        <div class="mobile-section-move-container cursor-class" onclick="event.stopPropagation(), moveToMobile('to-do', ${tasks[index]['id']})">
        <span class="mobile-move-btn"> To do </span>
        </div>
        
        <div class="mobile-section-move-container cursor-class " onclick="event.stopPropagation(), moveToMobile('awaiting-feedback', ${tasks[index]['id']})">
        <span class="mobile-move-btn"> Awaiting Feedback </span>
        </div>
        <div class="mobile-section-move-container cursor-class" onclick="event.stopPropagation(), moveToMobile('done', ${tasks[index]['id']})">
        <span class="mobile-move-btn"> Done </span>
        </div>
        
        <div> <span class="cursor-class close-mobile-move" onclick="event.stopPropagation(), closeTaskPopUp()">X</span> </div>
    </div>
    `
}
function generateMobileMoveTaskWithoutAwaiting(index){
    return `
    <div class="mobile-move-container">
        <div> Move this to: </div>
        <div class="mobile-section-move-container cursor-class" onclick="event.stopPropagation(), moveToMobile('to-do', ${tasks[index]['id']})">
        <span class="mobile-move-btn"> To do </span>
        </div>
        <div class="mobile-section-move-container cursor-class" onclick="event.stopPropagation(), moveToMobile('in-progress', ${tasks[index]['id']})">
        <span class="mobile-move-btn"> In Progress </span>
        </div>
        
        <div class="mobile-section-move-container cursor-class" onclick="event.stopPropagation(), moveToMobile('done', ${tasks[index]['id']})">
        <span class="mobile-move-btn"> Done </span>
        </div>
        
        <div> <span class="cursor-class close-mobile-move" onclick="event.stopPropagation(), closeTaskPopUp()">X</span> </div>
    </div>
    `
}
function generateMobileMoveTaskWithoutDone(index){
    return `
    <div class="mobile-move-container">
        <div> Move this to: </div>
        <div class="mobile-section-move-container cursor-class" onclick="event.stopPropagation(), moveToMobile('to-do', ${tasks[index]['id']})">
        <span class="mobile-move-btn"> To do </span>
        </div>
        <div class="mobile-section-move-container cursor-class" onclick="event.stopPropagation(), moveToMobile('in-progress', ${tasks[index]['id']})">
        <span class="mobile-move-btn"> In Progress </span>
        </div>
        <div class="mobile-section-move-container cursor-class " onclick="event.stopPropagation(), moveToMobile('awaiting-feedback', ${tasks[index]['id']})">
        <span class="mobile-move-btn"> Awaiting Feedback </span>
        </div>
        
        <div> <span class="cursor-class close-mobile-move" onclick="event.stopPropagation(), closeTaskPopUp()">X</span> </div>
    </div>
    `
}


/**
 * The function generates a div element with a specific ID and class for creating a box shadow effect.
 * @param container - The `container` parameter is a string that represents the ID or class of the
 * container element where you want to generate the box shadow.
 * @returns an HTML string that represents a div element with the class "dragbox-shadow d-none" and an
 * id of "dragbox-shadow-".
 */
function generateBoxShadow(container){
    return /*html*/`
    <div ondragover="event.stopPropagation()" class="dragbox-shadow d-none" id="dragbox-shadow-${container}"></div>
    `;
}


/**
 * The function `generatePopUpHTML` generates HTML code for a pop-up window displaying information
 * about a clicked element.
 * @param clickedElement - The `clickedElement` parameter is an object that represents the clicked
 * element. It contains various properties such as `category`, `title`, `description`, `duedate`,
 * `priority`, and `id`. These properties are used to populate the HTML elements in the generated
 * popup.
 * @param index - The index parameter is the index of the clicked element in an array or list. It is
 * used to identify the specific element that was clicked on.
 * @returns an HTML string.
 */
function generatePopUpHTML(clickedElement, index){
    return /*html*/`
        <span class="category-tag task-popup-margin" style="background-color:${clickedElement['category'][0]['color']};">${clickedElement['category'][0]['category']}</span>
        <h1 id="popUpHeadline${clickedElement['id']}" class="task-popup-headline-main task-popup-margin">${clickedElement['title']}</h1>
        <span class="task-popup-text task-popup-margin">${clickedElement['description']}</span>
        <span class="flex-row task-popup-margin task-popup-text"><h3 class="task-popup-headline-secondary">Due date:</h3> ${clickedElement['duedate']}</span>
        <span class="flex-row task-popup-margin task-popup-text"><h3 class="task-popup-headline-secondary">Priority:</h3><div id="popUp-urgency-container" class="popup-urgency" style="background-color: ${clickedElement['priority'][0]['color']}; text-transform: capitalize;"> ${clickedElement['priority'][0]['priority']}<img class="urgency-img" src="./src/img/${clickedElement['priority'][0]['priority']}.svg"></div></span>
        <div id="subtask-container" class="subtask-container"></div>
        <span class="flex-row task-popup-margin task-popup-text"><h3 class="task-popup-headline-secondary">Assigned To:</h3></span>
        <div class="flex-column" id="task-popup-contacts">
        
        </div>
        <div class="delete-and-edit-task">
            <div onclick="deletePopupTask(${index})" class="delete-button hover-white-button mobile-edit-and-delete cursor" > 
                <img src="src/img/delete-task.svg">
            </div>
               
                <div onclick="editTask(${index});" class="edit-task button-hover mobile-edit-and-delete cursor">
                    <img src="src/img/edit-task-popup.svg">
                </div>
        </div>
    `;
}


/**
 * The function generates an HTML form for editing a task, with pre-filled values based on the current
 * task and an index parameter.
 * @param currentTask - An object representing the current task with properties such as title,
 * description, duedate, and id.
 * @param index - The index parameter is the index of the current task in the task list. It is used to
 * identify the task when saving the changes made in the edit popup.
 * @returns an HTML template for generating an edit pop-up form.
 */
function generateEditPopUp(currentTask, index){
    return /*html*/`
    <div class="form-div">
                <span>Title</span>
                <input id="newTitle" required id="title" class="title-input" type="text" value="${currentTask['title']}">
                <div id="titleValidationText" class="d-none validation-text">Please fill in the text form</div>
            </div>
            <div class="form-div">
                <span>Description</span>
                <textarea id="newDescription" required id="description" class="desc-input" type="text">${currentTask['description']}</textarea>
                <div id="descValidationText"  class="d-none validation-text">Please fill in the text form</div>
            </div>
            <div class="form-div">
            <span>Due Date</span>
            <input id="newDueDate" class="title-input" type="date" required min="" value="${currentTask['duedate']}">
            <div id="dateValidationText"  class="d-none validation-text">Please set a date</div>
        </div>
        <div class="form-div">
            <span>Prio</span>
            <div class="prio-container">
                <button onclick="changePrio(0)" class="prio-input" id="urgentPopUp">Urgent
                    <img id="img-urgent-popUp" src="src/img/urgent.svg" alt="">
                </button>
                <button onclick="changePrio(1)" class="prio-input" id="mediumPopUp">Medium
                    <img id="img-medium-popUp" src="src/img/medium.svg" alt="">
                </button>
                <button onclick="changePrio(2)" class="prio-input" id="lowPopUp">Low
                    <img id="img-low-popUp" src="src/img/low.svg" alt="">
                </button>
                
            </div>
            <div id="prioValidationText"  class="d-none validation-text">Choose a priority</div>
        </div>
        <div class="form-div mobile-edit">
                <span>Assigned to</span>
                <div onclick="openAssignedTo('showAssignedPopUp', 'assignedPopUp'), event.stopPropagation()" id="assignedPopUp" class="assigned-dropdown-div cursor">
                    <div id="assignedPeoplePopUp">Assigned to</div>
                    <img  class="curso mobile-dropdown-opener" src="src/img/dropdown-arrow.svg">
                </div>
                <div class="d-none" id="showAssignedPopUp">
                    
                </div>
                <div id="assigned-contacts${currentTask['id']}" class="flex-row">
                    
                </div>
                <div id="assignedValidationTextPopUp"  class="d-none validation-text">Please assign the Task</div>
            </div>
            <button onclick="saveChanges(${index});" class="mobile-change-button button_option_2 flex-row curser button-hover">Ok
                        <i class='bx bx-check'></i>
                    </button>
    `;
}


/**
 * The function generates a checkbox element for a contact and assigns a click event to open a pop-up
 * window.
 * @param contact - The `contact` parameter is an object that represents a contact. It likely has
 * properties such as `name`, `email`, `phone`, etc.
 * @param i - The parameter "i" is used as an index to uniquely identify each contact checkbox. It is
 * typically used in a loop to generate multiple contact checkboxes.
 * @returns an HTML template string that represents a contact checkbox element.
 */
function generateContactCheckbox(contact, i){
    return /*html*/`
    <div onclick="assignTaskPopUp(${i})" class="contact-container cursor">
                <span id="contactName${i}">${contact.name}</span>
                <div class="checkbox-container">
                        <input type="checkbox" id="tickIdPopUp${i}">
                </div>
            </div>
    `;
}


/**
 * The function generates HTML code for a task popup contact box with the contact's initials, name, and
 * background color.
 * @param contact - The `contact` parameter is an object that contains information about a contact. It
 * has the following properties:
 * @returns an HTML template string that represents a contact box in a task popup.
 */
function generateTaskPopupContacts(contact){
    return /*html*/`
        <div class="assigned-contact-box">
            <div class="contact-initials" id="contact-first-chars" style="background-color: ${contact['color']}">
                ${contact['initials']}
            </div>
            <p class="task-popup-text">${contact['name']}</p>
        </div>
    `;
}


/**
 * The function generates a small contact bubble with a background color and initials.
 * @param contact - The `contact` parameter is an object that contains information about a contact. It
 * has two properties:
 * @returns an HTML string that represents a small contact bubble. The background color of the bubble
 * is determined by the 'color' property of the 'contact' object, and the initials of the contact are
 * displayed inside the bubble.
 */
function generateSmallContactBubbles(contact){
    return /*html*/`
    <div class="small-contact-bubble" style="background-color: ${contact['color']};">
        ${contact['initials']}
    </div>
    `;
}


/**
 * The function generates a small number bubble that displays the difference between the number of
 * assigned contacts and 2.
 * @param assignedContacts - The parameter "assignedContacts" is an array that contains the contacts
 * that have been assigned.
 * @returns an HTML string that represents a small number bubble. The bubble displays the number of
 * assigned contacts minus 2.
 */
function generateSmallNumberBubble(assignedContacts){
    return /*html*/`
    <div class="small-number-bubble">
        +${(assignedContacts.length - 2)}
    </div>
    `;
}


/**
 * The function generates a section for a subtask with a checkbox and a label.
 * @param subtask - The subtask is a string that represents the name or description of the subtask.
 * @param count - The count parameter is used to generate a unique identifier for each subtask
 * checkbox. It is typically an integer value that represents the position or index of the subtask in a
 * list or array.
 * @returns an HTML string that represents a section for a subtask. The section includes a checkbox
 * input element and the subtask text.
 */
function generateSubtaskSection(subtask, count){
    return /*html*/`
    <div class="flex-row subtask-checkbox-popup"><input class="form-check-input" id="subtaskCheckbox${count}" onchange="changeSubtaskStatus(${count})" type="checkbox">${subtask}</div>
    
    `;
}


/**
 * The function generates a pop-up progress bar with a count container.
 * @param count - The count parameter is the number of items or tasks that you want to display progress
 * for.
 * @returns an HTML string that represents a pop-up progress bar.
 */
function generatePopUpProgressBar(count){
    return /*html*/`
    <div id="bar-and-count-container">
    <div id="progressContainer" class="progress progressPopUp d-none" role="progressbar" aria-label="Basic example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
        <div id="progress"  class="progress-bar"></div>
    </div>
    <div id="count-container"></div>
    </div>
    `;
}


/**
 * The function `regenerateAssignedPopUp` returns an HTML string representing a dropdown menu for
 * selecting assigned people.
 * @returns an HTML string that represents a pop-up element for assigning a task to someone.
 */
function regenerateAssignedPopUp(){
    return /*html*/`
    <div onclick="openAssignedTo('showAssignedPopUp', 'assignedPopUp'), event.stopPropagation()" id="assignedPopUp" class="assigned-dropdown-div cursor">
                    <div id="assignedPeoplePopUp">Assigned to</div>
                    <img  class="cursor" src="src/img/dropdown-arrow.svg"  style='height: 42px; width: 14px'>
                </div>
    `;
}