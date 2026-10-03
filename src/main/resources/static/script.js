document.addEventListener("DOMContentLoaded", initApp);

import {addPerson, fetchPersonList, deletePersonFromDatabase, getPersonById, editPersonById} from "./scriptAPI.js";

const table = document.querySelector(".person-list");
const activityText = document.querySelector(".activity-text");
const addPersonBtn = document.querySelector("#add-person-btn")
const popupContainer = document.querySelector(".popup-container");
const popupForm = document.querySelector(".popup-form");
const h3Form = document.querySelector("#h3-form");

// form data
const firstNameInput = document.querySelector("#first-name");
const lastNameInput = document.querySelector("#last-name");
const birthdayInput = document.querySelector("#date");
const genderInput = document.querySelector("#gender");
const registrationNumberInput = document.querySelector("#registration-number");
const registrationNumberBox = document.querySelector("#registration-number-box");

async function initApp() {
    popupForm.addEventListener("submit", handleFormSubmit)

    addPersonBtn.addEventListener("click", () => {
        resetPopup();
        popupContainer.classList.remove("hidden");
    });
    popupContainer.addEventListener("click", (event) => {
        if (event.target === popupContainer) {
            resetPopup();
            popupContainer.classList.add("hidden");
        }
    })
    table.addEventListener("click", handleTableClick);

    const personList = await fetchPersonList();
    displayPersonList(personList);
}

function displayPersonList(personList) {
    table.innerHTML = "";
    personList.forEach(person => {
        renderPersonInformation(person)
    })
}

function renderPersonInformation(person) {
    const row = document.createElement("tr");
    row.setAttribute("data-id", person.id);
    row.innerHTML = `
        <td>${person.firstName}</td>
        <td>${person.lastName}</td>
        <td>${person.age}</td>
        <td>${person.birthday}</td>
        <td>${person.gender}</td>
        <td>
            <button data-action="edit">Edit</button>
            <button data-action="delete">Delete</button>
        </td>
    `;
    table.appendChild(row);
}

function renderUpdatedPersonInformation(person) {
    const row = table.querySelector(`tr[data-id="${person.id}"]`);

    row.children[0].textContent = person.firstName;
    row.children[1].textContent = person.lastName;
    row.children[2].textContent = person.age;
    row.children[3].textContent = person.birthday;
    row.children[4].textContent = person.gender;
}

async function handleTableClick(event) {
    const action = event.target.getAttribute("data-action");
    const row = event.target.closest("tr");
    const id = row.getAttribute("data-id");
    if (action === "delete") {
        const confirmed = confirm("Are you sure you want to remove this person")

        if (!confirmed) {
            return;
        }

        const success = await deletePersonFromDatabase(id);
        if (success) {
            row.remove();
        }
    } else if (action === "edit") {
        await showEditForm(id);
    }
}

async function showEditForm(id) {
    h3Form.textContent = "Edit person in the database";
    popupForm.setAttribute("data-action", "edit");
    popupForm.setAttribute("data-id", id);

    registrationNumberInput.required = false;
    registrationNumberBox.classList.add("hidden");

    try {
        const person = await getPersonById(id);

        firstNameInput.value = person.firstName;
        lastNameInput.value = person.lastName;
        birthdayInput.value = person.birthday;
        genderInput.value = person.gender;

        popupContainer.classList.remove("hidden");
    } catch (e) {
        console.log("something went wrong in showeditform");
    }
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const birthday = formData.get("date");
    const gender = formData.get("gender");

    const formType = popupForm.getAttribute("data-action")
    if (formType === "create") {
        const registrationNumber = formData.get("registration-number");
        const personData = {firstName, lastName, birthday, gender, registrationNumber}

        try {
            const newPerson = await addPerson(personData);

            renderPersonInformation(newPerson);
            event.target.reset();

            popupContainer.classList.add("hidden");
        } catch (e) {
            activityTextMessage(e.message)
        }
    } else if (formType === "edit") {
        const personData = {firstName, lastName, birthday, gender}
        const id = popupForm.getAttribute("data-id");

        try {
            const editedperson = await editPersonById(id, personData);

            renderUpdatedPersonInformation(editedperson);

            popupContainer.classList.add("hidden");
            resetPopup();
        } catch (e) {
            activityTextMessage(e.message);
        }
    }

}

function activityTextMessage(message) {
    activityText.textContent = message;
    activityText.classList.remove("hidden");
    setTimeout(() => {
        activityText.textContent = "";
        activityText.classList.add("hidden");
    }, 5000);
}

function resetPopup() {
    popupForm.reset();
    h3Form.textContent = "Add person to the database"
    popupForm.setAttribute("data-action", "create");
    registrationNumberInput.required = true;
    registrationNumberBox.classList.remove("hidden");
}