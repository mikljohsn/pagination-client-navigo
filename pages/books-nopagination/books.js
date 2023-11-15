import { sanitizeStringWithTableRows } from "../../utils.js"
import {API_URL} from "../../settings.js"
const API_ENDPOINT = `${API_URL}/books`;

export async function initBooksNoPagination() {
  //TODO: Use the match argument to read the page, size and sort parameters from the query string 
  
  fetchData(); //Fetch data for the first page
}

async function fetchData() {
  const data = await fetch(`${API_ENDPOINT}?size=100`).then(res => res.json())//TODO: Handle error cases
  displayData(data.content);
}

function displayData(books) {
  const tableRows = books.map(book => `<tr><td>${book.author}</td><td>${book.title}</td></tr>`).join('')
  document.getElementById('book-rows').innerHTML = sanitizeStringWithTableRows(tableRows);
}
