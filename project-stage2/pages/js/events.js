'use strict';

const eventful_apikey = "RTPqhKxFt2HhNBBm";
getData();
/*
This API enables the user to search for specific events with 
"What (q=)", "Where (l=)", "When (t=)", "Category (c=)" as
optional parameters

All data from eventful.com
*/

$("#search").on("click", getData);

$("#filter-form").on("input", function() {
  if ($("#location").val() === "") {
    $("#search").attr("disabled",true);
    $("#location").addClass("alert alert-danger");
  } else {
    $("#location").removeClass("alert alert-danger");
    $("#search").attr("disabled",false);
  }
});

$(".switch").on("click", function() {
  $(".list").toggleClass("hidden");
  $("#save").attr("disabled", true);
  $(".event-heading").toggleClass("hidden");
  $(".form-container").toggleClass("hidden");
  clearFields();
});

$(".event-form").on("input", function() {
  if ($("#inputEventName").val() !== "" && $("#inputAddress").val() !== "" && $("#inputDate").val() !== ""
  && $("#inputTime").val() !== "" && $("#inputLink").val() !== "") {
    $("#save").attr("disabled", false);
  }
})

$("#save").on("click", function() {
  $("#listView").append(createManualRow());
  $(".list").toggleClass("hidden");
  $(".event-heading").toggleClass("hidden");
  $(".form-container").toggleClass("hidden");
  clearFields();
})

function clearFields() {
  document.getElementById("inputEventName").value = "";
  document.getElementById("inputAddress").value = "";
  document.getElementById("inputDate").value = "";
  document.getElementById("inputTime").value = "";
  document.getElementById("inputLink").value = "";
}

function getData() {
  let corsHeader = "https://cors-anywhere.herokuapp.com/";
  let base_url = "http://api.eventful.com/json/events/search?";
  let locationQuery = "l=" + $("#location").val();
  let keyWordQuery = "q=" + $("#keywords").val() + "&";
  let dateQuery = "date=" + $("#date").val() + "&";
  if ($("#keywords").val()) {
    locationQuery = keyWordQuery + locationQuery;
  } 
  if ($("#date").val()) {
    locationQuery = dateQuery + locationQuery;
  } 
  let authorization = "&app_key=" + eventful_apikey;
  fetch(corsHeader + base_url + locationQuery + authorization)
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      createRows(data.events);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function noResultsFound() {
  $("#listView").empty();
  $("#listView").append("<h2>No Results Found<h2>");
}

function createRow(event) {
    let row = create("div");
    row.classList.add("table-row");
    let nameCell = create("div");
    let timeCell = create("div");
    let dateCell = create("div");
    let locationCell = create("div");
    nameCell.innerHTML = "<a href=" + event["url"] + ">" + event["title"] + "</a>";
    locationCell.textContent = event["venue_address"];
    let dateTime = event["start_time"].split(" ");
    timeCell.textContent = dateTime[1];
    dateCell.textContent = dateTime[0];
    row.appendChild(nameCell);
    row.appendChild(locationCell);
    row.appendChild(timeCell);
    row.appendChild(dateCell);
    let cells = row.querySelectorAll("div")
    for (let cell of cells) {
        cell.classList.add("cell");
    }
    return row;
}

function createManualRow() {
  let row = create("div");
  row.classList.add("table-row");
  let nameCell = create("div");
  let timeCell = create("div");
  let dateCell = create("div");
  let locationCell = create("div");
  nameCell.innerHTML = "<a href=" + $("#inputLink").val() + ">" + $("#inputEventName").val() + "</a>";
  locationCell.textContent = $("#inputAddress").val();
  timeCell.textContent = $("#inputTime").val();
  dateCell.textContent = $("#inputDate").val();
  row.appendChild(nameCell);
  row.appendChild(locationCell);
  row.appendChild(timeCell);
  row.appendChild(dateCell);
  let cells = row.querySelectorAll("div")
  for (let cell of cells) {
      cell.classList.add("cell");
  }
  return row;
}

function createRows(responseData) {
  $("#listView").empty();
  if (responseData["event"].length === 0) {
    noResultsFound();
  }
  for (let i = 0; i < responseData["event"].length; i++) {
    let newRow = createRow(responseData["event"][i]);
    $("#listView").append(newRow);
  }
}

/*
HELPER FUNCTIONS
*/

/* Get Element By ID */
function id(name) {
    return document.getElementById(name);
}

/* Get Element By QuerySelector */
function qs(name) {
    return document.querySelector(name);
}

/* Get All Elements By QuerySelector */
function qsa(name) {
    return document.querySelectorAll(name);
}

/* Create an Element */
function create(name) {
    return document.createElement(name);
}