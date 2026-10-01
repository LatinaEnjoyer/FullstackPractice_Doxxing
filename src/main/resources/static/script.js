document.addEventListener("DOMContentLoaded", initApp);

const BASE_URL = "http://localhost:8080";

const table = document.querySelector(".person-list");

async function initApp() {
    const personList = await fetchPersonList();
    displayPeople(personList);
}


async function fetchPersonList() {
    const response = await fetch(`${BASE_URL}/api/get-all`);
    return await response.json();
}

function displayPeople(personList) {
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