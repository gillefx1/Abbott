let data;
let currentDate = new Date();

async function loadData() {

    const response = await fetch("planning-data.json");

    data = await response.json();

    renderTable();
}

function isBelgianHoliday(date) {

    const y = date.getFullYear();

    const holidays = [
        `${y}-01-01`,
        `${y}-05-01`,
        `${y}-07-21`,
        `${y}-08-15`,
        `${y}-11-01`,
        `${y}-11-11`,
        `${y}-12-25`
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

    data.people.forEach(person => {

        html += `<th title="${person.name}">
                    ${person.initials}
                 </th>`;

    });

    html += "</tr>";

    for (let day = 1; day <= daysInMonth; day++) {

        const currentDayDate = new Date(year, month, day);

        const currentDayString =
            `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        let dayClass = "day";

        if (
            currentDayDate.getDay() === 0 ||
            currentDayDate.getDay() === 6 ||
            isBelgianHoliday(currentDayDate)
        ) {
            dayClass += " nonworkingday";
        }

        html += "<tr>";

        html += `<td class="${dayClass}">${day}</td>`;

        data.people.forEach(person => {

            let vacation = false;
            let oncall = false;
            let sickness = false;

            if (data.vacations) {

                data.vacations.forEach(v => {

                    if (
                        v.person === person.initials &&
                        currentDayString >= v.start &&
                        currentDayString <= v.end
                    ) {
                        vacation = true;
                    }

                });
            }

            if (data.oncall) {

                data.oncall.forEach(g => {

                    if (
                        g.person === person.initials &&
                        currentDayString >= g.start &&
                        currentDayString <= g.end
                    ) {
                        oncall = true;
                    }

                });
            }
            if (data.sickness) {

                data.sickness.forEach(s => {

                   if (
                        s.person === person.initials &&
                        currentDayString >= s.start &&
                        currentDayString <= s.end
                    ) {
                        sickness = true;
                    }

                });
            }

            let cssClass = "";
let text = "";

if (sickness) {

    cssClass = "sickness";
    text = "M";

}
else if (vacation && oncall) {

    cssClass = "both";
    text = "CG";

}
else if (vacation) {

    cssClass = "vacation";
    text = "C";

}
else if (oncall) {

    cssClass = "oncall";
    text = "G";

}

            html += `<td class="${cssClass}">${text}</td>`;

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

loadData();
