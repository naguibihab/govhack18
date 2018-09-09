const APIKEY = "AIzaSyDsTsgg_SAHjiToyP185-bLxLQ2c07MKDE";
const URI = "https://maps.googleapis.com/maps/api/place/findplacefromtext/";
let output = "json";
let fields = "photos,formatted_address,name,rating,opening_hours,geometry";
let QUERY = output + "?key=" + APIKEY + "&inputtype=textquery&fields=" + fields + "&input=";

$(document).ready(function () {

  $('#fetch-data').click(function () {
    const input = $("#google").val();

    console.log(formatQuery(URI + QUERY + input.replace));

    $.ajax({
      type: 'GET',
      url: formatQuery(URI + QUERY + input),
      async: false,
      jsonpCallback: 'processResult',
      contentType: "application/json",
      dataType: 'jsonp',
      success: processResult,
      error: processError
    });

  });

  $("#search-suggestions").on("change", function (event) {
    $("#google").val(formatQuery(event.target.value));
  });
});

$("#search").on("submit", function (event) {
  event.preventDefault();
});

$("#display-result").on("click", "[rel=external]", function (event) {
  event.target.target = "_blank";
});

function formatQuery(string) {
  let query = string.replace(/\+/gi, " ");
  return query;
}

function handleResult(result) {
  const url = "http://en.wikipedia.org/w/index.php?curid="
  const $atom = $("<li><a href='" + url + result.pageid + "' rel='external'>" + result.title + "</a></li>");

  return $atom;
}

function processResult(apiResult) {
  console.log(apiResult);

  $('#display-result').empty();

  // Not implemented till we get a paid API Account
  for (i = 0; i < data.results.length; i++) {
    myAddress[i] = data.results[i].formatted_address;
    document.getElementById("message").innerHTML += myAddress[i] + "<br>";
    console.log(myAddress[i]);
  };
}

function processError(error) {
  const message = "[ERROR] The application recieved an Error response from the Places API: \n" + error.message;
  console.log(message);

  const url = formatQuery(URI + QUERY + $("#google").val());
  const faux = window.open(url, '_blank');
  faux.focus();
}
