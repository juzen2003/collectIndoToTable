import { DATA } from "./opusdata.js";
// console.log(DATA.page);
// console.log(DATA.columns.length);

genTable(DATA);

// generate table using DATA from opusdata.js
function genTable(data) {
  let body = document.getElementsByTagName("body")[0];
  let table = document.createElement("table");
  let tableBody = document.createElement("tbody");

  // row
  for(let i = 0; i <= data.page.length; i++) {
    let row = document.createElement("tr");

    // column
    for(let j = 0; j < data.columns.length; j++) {
      let cell = document.createElement("td");
      let cellHead = document.createElement("th");
      let cellTxt = "";

      if(i === 0) {
        cellTxt = document.createTextNode(data.columns[j]);
        cell.appendChild(cellHead);
        cellHead.appendChild(cellTxt);
      } else {
        cellTxt = document.createTextNode(data.page[i-1]);
        cell.appendChild(cellTxt);
      }
      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  }

  table.appendChild(tableBody);
  body.appendChild(table);
}
