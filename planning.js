async function loadPlanning() {
 
const response = await fetch("planning-data.json");
const data = await response.json();
 
const table = document.getElementById("planningTable");
 
const today = new Date();
 
const year = today.getFullYear();
const month = today.getMonth();
 
const daysInMonth =
new Date(year, month + 1, 0).getDate();
 
let html = "<tr><th>Jour</th>";
 
data.people.forEach(person => {
html += `<th>${person.initials}</th>`;
});
 
html += "</tr>";
 
for (let day = 1; day <= daysInMonth; day++) {
 
html += `<tr>`;
 
html += `<td class="day">${day}</td>`;
 
data.people.forEach(() => {
html += `<td></td>`;
});
 
html += `</tr>`;
}
 
table.innerHTML = html;
}
 
loadPlanning();
