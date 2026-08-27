let data;

async function loadData() {

    const response =
        await fetch("planning-data.json");

    data = await response.json();

    const select =
        document.getElementById("person");

    select.innerHTML = "";

    data.people.forEach(person => {

        const option =
            document.createElement("option");

        option.value =
            person.initials;

        option.textContent =
            `${person.initials} - ${person.name}`;

        select.appendChild(option);

    });

    updateOutput();
}

function updateOutput() {

    document.getElementById("output").value =
        JSON.stringify(data, null, 2);
}

document.getElementById("entryForm")
.addEventListener("submit", function (e) {

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
        person: person,
        start: start,
        end: end
    };

    if (!data[type]) {
        data[type] = [];
    }

    data[type].push(item);

    updateOutput();
});

loadData();
