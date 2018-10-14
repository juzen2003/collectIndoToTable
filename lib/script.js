import {DATA, map} from "./opusdata.js";
// console.log(DATA.page);
// console.log(DATA.columns.length);
// console.log(map);

// Initialize the table
genTable(DATA);

// make modal draggable
$("#myModal").draggable({
     handle: ".modal-header"
});

// generate table using DATA from opusdata.js
function genTable(data) {
  let body = document.getElementsByTagName("body")[0];
  let table = document.createElement("table");
  let tableBody = document.createElement("tbody");
  let tableHead = document.createElement("thead");

  let rowNum = data.page.length;
  let colNum = data.columns.length;
  // generate rows
  for(let i = 0; i <= rowNum; i++) {
    let row = document.createElement("tr");

    // generate columns
    for(let j = 0; j <= colNum; j++) {
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
      row.setAttribute("data-toggle", "modal");
      row.setAttribute("data-target", "#myModal");
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
  // toggling for ascending and descending sort
  if(event.target.getAttribute("data-sort") === "desc") {
    var desc = false;
    event.target.setAttribute("data-sort", "asc");
  } else {
    desc = true;
    event.target.setAttribute("data-sort", "desc");
  }

  let key = event.target.innerText;
  let idx = map.get(key);
  let pages = DATA.page;

  pages.sort((row1, row2) => {
    let col1 = row1[idx];
    let col2 = row2[idx];

    if(desc) {
      return ascending(col1, col2);
    } else {
      return descending(col1, col2);
    }
  });

  DATA.page = pages;
  // udpate the table after sorting
  updateTable(DATA);
}

// sorting ascending
function ascending(el1, el2) {
  if(el1 > el2) {
    return 1;
  } else if( el1 < el2) {
    return -1;
  } else if (el1 === el2) {
    return 0;
  }
}

// sorting descending
function descending(el1, el2) {
  if(el1 < el2) {
    return 1;
  } else if( el1 > el2) {
    return -1;
  } else if (el1 === el2) {
    return 0;
  }
}

// update rows after sorting
function updateTable(data) {
  let table = document.getElementsByTagName("table")[0];
  let tableBody = document.getElementsByTagName("tbody")[0];
  let tableHead = document.getElementsByTagName("thead")[0];

  let rowNum = data.page.length;
  let colNum = data.columns.length;
  for(let i = 1; i <= rowNum; i++) {
    for(let j = 1; j <= colNum; j++) {
      table.rows[i].cells[j].innerHTML = data.page[i-1][j-1];
    }
  }
}
