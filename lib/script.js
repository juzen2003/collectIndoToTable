import {DATA, map} from "./opusdata.js";
// console.log(DATA.page);
// console.log(DATA.columns.length);
// console.log(map);

// Initialize the table
genTable(DATA);


// generate table using DATA from opusdata.js
function genTable(data) {
  let body = document.getElementsByTagName("body")[0];
  let table = document.createElement("table");
  let tableBody = document.createElement("tbody");
  let tableHead = document.createElement("thead");

  // generate rows
  for(let i = 0; i <= data.page.length; i++) {
    let row = document.createElement("tr");

    // generate columns
    for(let j = 0; j <= data.columns.length; j++) {
      let cell = document.createElement("td");
      let cellHead = document.createElement("th");
      let cellTxt = document.createTextNode("");

      if(i === 0 && j === 0) {
        cell = cellHead;
        cell.appendChild(cellTxt);

      } else if(j === 0 && i !== 0) { // add checkbox in 1st column
        let cb = addCheckBox();
        cell.appendChild(cb);

      } else if(i === 0 && j !== 0) { // add column heading
        cellTxt = document.createTextNode(data.columns[j-1]);
        cell = cellHead;
        cell.appendChild(cellTxt);
        // attached event listener
        cell.addEventListener("click", sortingData);

      } else { // add data from each row
        cellTxt = document.createTextNode(data.page[i-1][j-1]);
        cell.appendChild(cellTxt);
      }
      row.appendChild(cell);
    }

    if(i === 0) {
      row.setAttribute("id", "c-heading");
      tableHead.appendChild(row);
    } else {
      row.setAttribute("id", `row-${i-1}`);
      tableBody.appendChild(row);
    }
  }
  table.appendChild(tableHead);
  table.appendChild(tableBody);
  body.appendChild(table);
}

// generate check box
function addCheckBox() {
  let cb = document.createElement("input");
  cb.type = "checkBox";
  return cb;
}

// sort the row based on column heading
function sortingData() {
  console.log(event.target.innerText);
  let key = event.target.innerText;
  let idx = map.get(key);
  let pages = DATA.page;

  pages.sort((el1, el2) => {
    return el1[idx] - el2[idx];
  });

  DATA.page = pages;

}

// update rows after sorting
function updateTable(data) {

}
