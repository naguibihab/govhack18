const URL = "https://script.google.com/macros/s/AKfycbweVFC9txLngras37l0X_AvaLGylTfPUWSY4oxvZDBabtMnBg/exec";

// I ❤︎ this application

$('#feedback-submit').click(function () {
  addDate();
});

$("#feedback").on("submit", function (event) {
  event.preventDefault();

  $.ajax({
    url: URL,
    method: "POST",
    dataType: "jsonp",
    data: $("#feedback").serializeObject(),
    success: processResult
  });

  // const form = $("#feedback");
  // fetch(URL, { method: 'POST', body: new FormData(form)})
  //   .then(response => console.log('Success!', response))
  //   .catch(error => console.error('Error!', error.message))

  setTimeout(processResult, 1250);
});

$('#modal').click(function () {
  handleModal();
});

function addDate() {
  const datestamp = moment().format();

  $("#feedback-date").val(datestamp);
}

function processResult() {
  $("body").addClass("modal");
  $("#modal").on("click", handleModal);
}

function handleReset() {
  $("#feedback input, #feedback textarea").val(null);
  $("#feedback option").eq(0).attr('selected','selected');
}

function handleModal() {
  handleReset();
  $("body").removeClass("modal");
}
