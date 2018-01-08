function toggle() {
alert("ffff");
  var x = document.getElementsByClassName("scoreform");
  if (x.style.display === "none") {
      x.style.display = "block";
  } else {
      x.style.display = "none";
  }
}

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('newScoreButton');
    var submitScoreButton = document.getElementById("submitScoreButton");
    // onClick's logic below:
    submitScoreButton.addEventListener('click', function() {
        toggle();
    });
});