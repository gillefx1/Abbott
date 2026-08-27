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

function isBelgianHoliday(date) {

    const y = date.getFullYear();

    const holidays = [
        `${y}-01-01`, // Nouvel An
        `${y}-05-01`, // Fête du Travail
        `${y}-07-21`, // Fête Nationale
        `${y}-08-15`, // Assomption
        `${y}-11-01`, // Toussaint
        `${y}-11-11`, // Armistice
        `${y}-12-25`  // Noël
    ];

    const current =
        `${y}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    return holidays.includes(current);
}

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

        const currentDay = new Date(year, month, day);

        let dayClass = "day";

        const weekDay = currentDay.getDay();

        if (
            weekDay === 0 ||
            weekDay === 6 ||
            isBelgianHoliday(currentDay)
        ) {
            dayClass += " nonworkingday";
        }

        html += "<tr>";

        html += `<td class="${dayClass}">${day}</td>`;

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
