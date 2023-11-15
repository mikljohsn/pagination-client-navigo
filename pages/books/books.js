import { sanitizeStringWithTableRows } from "../../utils.js"
import {API_URL} from "../../settings.js"
const API_ENDPOINT = `${API_URL}/books`;

//These values are not declared as constants, to allow for changing them due to user interaction
let pageSize = 10;
let sortColumn = 'author';
let sortDirection = 'asc';
let queryString
let isInitialized = false;

//You will (probably) need the match object to get the query string parameters for a later assignment
export async function initBooks(match) {
  //TODO: Use the match argument to read the page, size and sort parameters from the query string 
  //and initialize pageSize, sortColumn and sortOrder accordingly
  const page =  0

  if (!isInitialized) {  //No reason to setup event handlers if it's already been done
    isInitialized = true;
    document.querySelector('#pagination').addEventListener('click', handlePaginationClick)
    document.getElementById("header-row").addEventListener("click", handleSortClick)
  }

  fetchData(Number(page)); //Fetch data for the first page
}

function handlePaginationClick(evt) {
  evt.preventDefault()
  if (evt.target.tagName === 'A' && evt.target.hasAttribute('data-page')) {
    const page = parseInt(evt.target.getAttribute('data-page'));
    fetchData(page);
  }
}

function handleSortClick(evt) {
  const target = evt.target
  if (!target.id.startsWith("sort-")) return
  //TODO Add the missing sort functionality here
  fetchData();
}

async function fetchData(page = 0) {
  const size = pageSize
  //Build a query string like this to match expectations on the server: ?page=0&size=10&sort=author,desc
  queryString = `?page=${page}&size=${size}&sort=${sortColumn},${sortDirection}`
  const data = await fetch(`${API_ENDPOINT}${queryString}`).then(res => res.json())//TODO: Handle error cases
  displayData(data.content);
  displayPagination(data.totalPages, page);

  //TODO Update URL here,  without forcing an actual navigation step
  
}

function displayData(books) {
  const tableRows = books.map(book => `<tr><td>${book.author}</td><td>${book.title}</td></tr>`).join('')
  document.getElementById('book-rows').innerHTML = sanitizeStringWithTableRows(tableRows);
}

function displayPagination(totalPages, currentPage) {
  let paginationHtml = '';
  if (currentPage > 0) { // Previous Page
    paginationHtml += `<li class="page-item"><a class="page-link" data-page="${currentPage - 1}" href="#">Previous</a></li>`
  }
  // Display page numbers
  let startPage = Math.max(0, currentPage - 2);
  let endPage = Math.min(totalPages - 1, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    if (i === currentPage) {
      paginationHtml += `<li class="page-item active"><a class="page-link" href="#">${i + 1}</a></li>`
    } else {
      paginationHtml += `<li class="page-item"><a class="page-link" data-page="${i}" href="#">${i + 1}</a></li>`
    }
  }
  if (currentPage < totalPages - 1) { // Next Page
    paginationHtml += `<li class="page-item"><a class="page-link" data-page="${currentPage + 1}" href="#">Next</a></li>`
  }
  document.getElementById('pagination').innerHTML = paginationHtml;
}