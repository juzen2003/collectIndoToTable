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
    for(let j = 0; j <= data.columns.length; j++) {
      let cell = document.createElement("td");
      let cellHead = document.createElement("th");
      let cellTxt = document.createTextNode("");

      if(i === 0 && j === 0) {
        cell.appendChild(cellTxt);

      } else if(j === 0 && i !== 0) { // check box in 1st column
        let cb = checkBox();
        cell.appendChild(cb);
      } else if(i === 0 && j !== 0) { // column heading
        cellTxt = document.createTextNode(data.columns[j-1]);
        cell = cellHead;
        cell.appendChild(cellTxt);

      } else { // data from each row
        cellTxt = document.createTextNode(data.page[i-1]);
        cell.appendChild(cellTxt);
      }

      row.appendChild(cell);
    }

    if(i === 0) {
      row.setAttribute("id", "c-heading");
    } else {
      row.setAttribute("id", `row-${i-1}`);
    }
    tableBody.appendChild(row);
  }

  table.appendChild(tableBody);
  body.appendChild(table);
}

// generate check box
function checkBox() {
  let cb = document.createElement("input");
  cb.type = "checkBox";
  return cb;
}
