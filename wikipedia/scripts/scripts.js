$(document).ready(function () {

  $('#fetch-data').click(function () {
    console.log($("#wikipedia").val())

    $.ajax({
      url: 'http://en.wikipedia.org/w/api.php',
      data: {
        action: 'query',
        list: 'search',
        srsearch: $("#wikipedia").val(),
        format: 'json'
      },
      dataType: 'jsonp',
      success: processResult
    });
  });

  $("#search-suggestions").on("change", function (event) {
    $("#wikipedia").val(event.target.value);
  });
});

$("#search").on("submit", function (event) {
  event.preventDefault();
});

$("#display-result").on("click", "[rel=external]", function (event) {
  event.target.target = "_blank";
});

function handleResult(result) {
  const url = "http://en.wikipedia.org/w/index.php?curid="
  const $atom = $("<li><a href='" + url + result.pageid + "' rel='external'>" + result.title + "</a></li>");

  return $atom;
}

function processResult(apiResult) {
  console.log(apiResult);

  $('#display-result').empty();

  for (var i = 0; i < apiResult.query.search.length; i++){
    $('#display-result').append(handleResult(apiResult.query.search[i]));
  }
}
