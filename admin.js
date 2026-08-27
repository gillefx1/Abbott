let data;

async function loadData() {

    const response =
        await fetch("planning-data.json");

    data = await response.json();

    const select =
        document.getElementById("person");

    data.people.forEach(person => {

        select.innerHTML +=
        `<option value="${person.initials}">
            ${person.name}
        </option>`;

    });

    updateOutput();
}

function updateOutput() {

    document.getElementById("output")
    .value =
    JSON.stringify(data, null, 2);
}

document.getElementById("entryForm")
.addEventListener("submit", e => {

    e.preventDefault();

    const person =
        document.getElementById("person").value;

    const type =
        document.getElementById("type").value;

    const start =
        document.getElementById("start").value;

    const end =
        document.getElementById("end").value;

    const item = {
        person,
        start,
        end
    };

    data[type].push(item);

    updateOutput();
});

loadData();
``
