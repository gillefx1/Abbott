const people = [
    "QG",
    "BB",
    "FT",
    "NL",
    "EB",
    "FG",
    "PM",
    "QF",
    "MB",
    "AS",
    "AD",
    "DM"
];

let currentDate = new Date();

function renderTable() {

    const table = document.getElementById("planningTable");

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth =
        new Date(year, month + 1, 0).getDate();

    document.getElementById("currentMonth").innerText =
        currentDate.toLocaleDateString(
            "fr-BE",
            {
                month: "long",
                year: "numeric"
            }
        );

    let html = "<tr><th>Jour</th>";

    people.forEach(person => {
        html += `<th>${person}</th>`;
    });

    html += "</tr>";

    for (let day = 1; day <= daysInMonth; day++) {

        html += "<tr>";

        html += `<td class="day">${day}</td>`;

        people.forEach(() => {
            html += "<td></td>";
        });

        html += "</tr>";
    }

    table.innerHTML = html;
}

document.getElementById("prevMonth")
.addEventListener("click", () => {

    currentDate.setMonth(
        currentDate.getMonth() - 1
    );

    renderTable();

});

document.getElementById("nextMonth")
.addEventListener("click", () => {

    currentDate.setMonth(
        currentDate.getMonth() + 1
    );

    renderTable();

});

document.getElementById("todayBtn")
.addEventListener("click", () => {

    currentDate = new Date();

    renderTable();

});

renderTable();
