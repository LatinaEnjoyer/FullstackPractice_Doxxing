const BASE_URL = "http://localhost:8080";

export async function addPerson(person) {
    const response = await fetch(`${BASE_URL}/api`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(person)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail);
    }

    return await response.json();
}

export async function fetchPersonList() {
    const response = await fetch(`${BASE_URL}/api/get-all`);
    return await response.json();
}

export async function deletePersonFromDatabase(id) {
    const response = await fetch(`${BASE_URL}/api/${id}`, {
        method: "DELETE"
    })
    return response.ok;
}

export async function getPersonById(id) {
    const response = await fetch(`${BASE_URL}/api/${id}`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail);
    }

    return await response.json();
}

export async function editPersonById(id, person) {
    const response = await fetch(`${BASE_URL}/api/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(person)
    })

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail);
    }

    return await response.json();
}