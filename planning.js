let data;
let currentDate = new Date();
let displayMode = "both";
 
async function loadData() {
 
const response = await fetch("planning-data.json");
data = await response.json();
 
renderTable();
}
 
function renderTable() {
 
const table = document.getElementById("planningTable");
 
table.innerHTML = "";
 
const year = currentDate.getFullYear();
const month = currentDate.getMonth();
 
const daysInMonth =
new Date(year, month + 1, 0).getDate();
 
document.getElementById("currentMonth").innerText =
currentDate.toLocaleDateString("fr-BE", {
month: "long",
year: "numeric"
});
 
let html = "<tr><th>Jour</th>";
 
data.people.forEach(person => {
 
html += `
<th title="${person.name}">
${person.initials}
</th>
`;
});
 
html += "</tr>";
 
for (let day = 1; day <= daysInMonth; day++) {
 
const currentDay =
`${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
 
html += `
<tr>
<td class="day-column">${day}</td>
`;
 
data.people.forEach(person => {
 
let vacation = false;
let oncall = false;
 
data.vacations.forEach(v => {
 
if (
v.person === person.initials &&
currentDay >= v.start &&
currentDay <= v.end
) {
vacation = true;
}
 
});
 
data.oncall.forEach(o => {
 
if (
o.person === person.initials &&
currentDay >= o.start &&
currentDay <= o.end
) {
oncall = true;
}
 
});
 
let css = "";
 
if (displayMode === "both") {
 
if (vacation && oncall)
css = "both";
else if (vacation)
css = "vacation";
else if (oncall)
css = "oncall";
}
 
if (displayMode === "vacation" && vacation)
css = "vacation";
 
if (displayMode === "oncall" && oncall)
css = "oncall";
 
html += `<td class="${css}"></td>`;
 
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
 
document.querySelectorAll(".filter")
.forEach(button => {
 
button.addEventListener("click", () => {
 
document.querySelectorAll(".filter")
.forEach(b => b.classList.remove("active"));
 
button.classList.add("active");
 
displayMode = button.dataset.mode;
 
renderTable();
 
});
 
});
 
loadData();
