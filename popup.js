var pointsPossible = 0;
var pointsEarned = 0;
var categories = [];
var closeList = [];


function toggleScoreForm() {

  var x = document.getElementById("scoreform"); 

  if (x.style.display === "block") {
      x.style.display = "none";
  } else {
      x.style.display = "block";
  }
}
function toggleCategoryForm() {
  var x = document.getElementById("categoryform"); 

  if (x.style.display === "block") {
      x.style.display = "none";
  } else {
      x.style.display = "block";
  }
}

function getScore(){
  var title = document.getElementById('title');
  var assignmentScore= document.getElementById('assignmentScore');
  var overallScore = document.getElementById('overallScore');
  var category = document.getElementById('categoryList');
  
  title = title.value;
  assignmentScore= assignmentScore.value;
  overallScore = overallScore.value;
  category = category.value;
  return[title,assignmentScore,overallScore, category];
}
function getCategory() {
  var title = document.getElementById('newCategoryName');
  var weight = document.getElementById('newCategoryWeight');
  title = title.value;
  weight = weight.value;
  return[title, weight];
}

function cleanUpScoreForm(){
  document.getElementById('title').value = "";
  document.getElementById('assignmentScore').value = "";
  document.getElementById('overallScore').value = "";
  //document.getElementById('category').value = "";
}

function cleanUpCategoryForm(){
  document.getElementById('newCategoryName').value = "";
  document.getElementById('newCategoryWeight').value = "";
}

//check is string a number
function isNumber(n) {

  return !isNaN(parseFloat(n)) && isFinite(n);
}


function addNewScore() {

  // get score from getScore 
  var newScoreList = getScore();
  var score = Object();
  score.title = newScoreList[0];
  score.assignmentScore = newScoreList[1];
  score.overallScore= newScoreList[2];

  // string not include in object score
  score.category = newScoreList[3];

  for(var i = 0; i < categories.length; ++i){
    if (categories[i].title === score.category) {
      categories[i].grades.push(score);
      //alert('score pushed to category' + category);
    }
  }

  // create new li 
  if ( score.title !== "" &&  score.assignmentScore!== "" && score.overallScore !== "" ){
    // check score is a number
    if (isNumber(score.assignmentScore) && isNumber(score.overallScore)){
      var li = document.createElement("li");
      var percentScore = score.assignmentScore/score.overallScore;
      var gradeLetter = percentScore >= .93 ? 'A' : percentScore >= .9 ? 'A-' : percentScore >= .86 ? 'B+' : percentScore >= .83 ? 'B' : percentScore >= .8 ? 'B-' : 'E';
      var overallGrade = calculateOverallGrade();
      //alert(overallGrade);
      document.getElementById("score").innerHTML = String(overallGrade); 

      
      percentScore = (100*percentScore).toFixed(2)
      // create input value

      

      var inputValue =  score.title + " " + score.assignmentScore+ "/" + score.overallScore + " " + gradeLetter + " " + percentScore + '%';

      var tmp = document.createTextNode(inputValue);
      // add inputvalue into li
      li.appendChild(tmp);
      // add li to popup.html
      document.getElementById("myUL").appendChild(li);


      var close = document.getElementsByClassName("close");
      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      li.appendChild(span);


      // this is the list to store the score information of close
      closeList.push(score);

      for (i = 0; i < close.length; i++) {

        // pass parameter i as index
        (function(index){
          close[i].onclick = function(){

            // put the score information of the button 
            removeScore(closeList[index]);

            // hide the cancel thing 
            var div = this.parentElement;
            div.style.display = "none";
          }    
        })(i);

      }

      // clean up the form 
      cleanUpScoreForm();
      // hide the form
      toggleScoreForm();
    }else{
      alert("Pleaze enter a number not random characters!")
    }

  }else{
    alert("You didn't fill out yet!")
  }
}

function removeScore(score){
  var categoryIndex;
  for(j = 0; j < categories.length; j++){
    if (categories[j].title == score.category) {
      categoryIndex = j;
    }
  }
  var scoreIndex;
  //alert(categoryIndex);
  for(j = 0; j < categories[categoryIndex].grades.length; j++){
    if (score.title == categories[categoryIndex].grades[j].title && score.assignmentScore ==  categories[categoryIndex].grades[j].assignmentScore && score.overallScore ==  categories[categoryIndex].grades[j].overallScore) {
      scoreIndex = j;
    }
  }

  categories[categoryIndex].grades.splice(scoreIndex , 1);
  overallGrade = isNaN(calculateOverallGrade()) ? '' : calculateOverallGrade();
  document.getElementById("score").innerHTML = String(overallGrade);
}

function addCategory() {
  var newCategoryList = getCategory();
  var title = newCategoryList[0];
  var weight = newCategoryList[1]
  //creates a new category object and assigns it values based on user input
  var category = Object();
  category.title = title;
  category.weight = weight;
  category.grades = [];
  var alreadyExists = false;
  for (var i = 0; i < categories.length; i++) {

    if(categories[i].title === category.title) {
      alreadyExists = true;
    }
  }
  //var category = newScoreList[3];

  // create new li 
  if (!alreadyExists) { 
  if ( title !== "" && weight !== ""){
    // check weight is a number
    if (isNumber(weight)){
      //adds the category as an option on the drop down list
      var opt = document.createElement('option');
      opt.value = title;
      opt.innerHTML = title;
      document.getElementById("categoryList").appendChild(opt);
      //adds category to a global categories list
      categories.push(category);
      //clears category form      
      toggleCategoryForm();
      cleanUpCategoryForm();
    }else{
      alert("Pleaze enter a number not random characters!");
    }

  }else{
    alert("You didn't fill out yet!");
  }
}
  else {
      alert("That category already exists");
  } 
}

function calculateOverallGrade(){
  weightSum = 0;
  pointsSum = 0;
  for (var i = 0; i < categories.length; i++) {
    //stores the point values for each category
    pointsEarnedSum = 0;
    pointsPossibleSum = 0;
    if(categories[i].grades.length > 0) {
      for (var j = 0; j < categories[i].grades.length; j++) {
        pointsEarnedSum += parseFloat(categories[i].grades[j].assignmentScore);
        pointsPossibleSum += parseFloat(categories[i].grades[j].overallScore);
      }
    //records the score of the category based on its weight
      weightSum += parseFloat(categories[i].weight);
      pointsSum += parseFloat(categories[i].weight * (pointsEarnedSum/pointsPossibleSum));
    }
  }

  // return two decinamls  
  return  (100*pointsSum/weightSum).toFixed(2);
}


document.addEventListener('DOMContentLoaded', function() {

    // listner for newsScoreButton
    document.getElementById("newScoreButton").addEventListener("click",
        function() {
      toggleScoreForm();
    }, false);

    // listner for submitScoreButton
    document.getElementById("submitScoreButton").addEventListener("click",
        function() {
        addNewScore();
        
        // var a = document.getElementById("myUL").innerHTML;
        // chrome.storage.sync.set({ "ul" : a }, function() {
        //     if (chrome.runtime.error) {
        //       console.log("Runtime error.");
        //     }
        //     console.log(a);

        //   }
        // );

        // var d = document.getElementById("score").innerHTML;
        //   chrome.storage.sync.set({ "data" : d }, function() {
        //     if (chrome.runtime.error) {
        //       console.log("Runtime error.");
        //     }
        //     console.log(d);

        //   }
        // );
        // I put toggle into addNewScore
      
    }, false);
    document.getElementById("addCategoryButton").addEventListener("click",
      function() {
        toggleCategoryForm();
      }
    )
    document.getElementById("submitCategoryButton").addEventListener("click",
        function() {
          addCategory();
        }
    )
});


function setDOMInfo(info) {
  alert(info.total);
}


window.addEventListener('DOMContentLoaded', function () {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        // ...also specifying a callback to be called 
        //    from the receiving end (content script)
        setDOMInfo);
  });
});