function averageColors(c1, c2, precent) {
    if (isNaN(precent)) precent = 1;
    var rAve = Math.round(c1.r * precent * 1.0 + c2.r * (1 - precent));
    var gAve = Math.round(c1.g * precent + c2.g * (1 - precent));
    var bAve = Math.round(c1.b * precent + c2.b * (1 - precent));
    return "rgb(" + rAve + "," + gAve + "," + bAve + ")";
}

function getColor(percentage) {
    var stops = [{ loc: 100, r: 0, g: 128, b: 0 }, { loc: 85, r: 173, g: 216, b: 230 }, { loc: 75, r: 255, g: 255, b: 0 }, { loc: 65, r: 255, g: 165, b: 0 }, { loc: 40, r: 255, g: 0, b: 0 }, { loc: 0, r: 0, g: 0, b: 0 }]
    var topStop = stops[0];
    var bottumStop = stops[stops.length - 1];

    percentage = Math.min(percentage,100);

    for (var i = 0; i < stops.length; i++) {
        var stop = stops[i]
        if (stop.loc >= percentage && stop.loc < topStop.loc) topStop = stop;
        if (stop.loc <= percentage && stop.loc > bottumStop.loc) bottumStop = stop;
    }
    var average = averageColors(topStop, bottumStop, (percentage - bottumStop.loc) / (topStop.loc - bottumStop.loc));
    return average;
}

function recolorGrades() {
    try {
        var grades = document.getElementsByClassName("colorMyGrade");

        for (var i = 0; i < grades.length; i++) {
            var gradeCell = grades[i];
            var gradeText = gradeCell.firstElementChild.innerHTML;
            if (!gradeText.includes("<br>")) {
                continue;
            }
            var percentageString = gradeText.slice(gradeText.indexOf("<br>") + "<br>".length);
            var percentage = parseInt(percentageString);
            gradeCell.style.background = getColor(percentage);
        }
    } catch (e) { }
}

function reformatCourseInfo() {
    try {
        var contacts = document.getElementsByClassName("button mini dialogM");

        for (var j = 0; j < contacts.length;) {
            var elem = contacts[j];
            var courseInfo = elem.parentNode;
            courseInfo.removeChild(elem);
            courseInfo.innerHTML = "<strong>" + courseInfo.innerHTML.replace(new RegExp("&nbsp;", 'g'), '').replace("<br>", "</strong><br>");
        }
    } catch (e) { }
}

function removeExplanation() {
    try {
        var infoParagraph = document.getElementsByClassName("grade-info")[0];
        infoParagraph.parentNode.removeChild(infoParagraph);
    } catch (e) { }
}

function reformatHeader() {
    try {
        var banner = document.getElementsByClassName("navbar navbar-default")[0];
        banner.style = "margin-top: 0 !important";
        var image = banner.getElementsByTagName("img")[0];
        image.src = "https://avatars3.githubusercontent.com/u/8658063?s=400&v=4.png"
        image.height = 240;
        image.width = 1500;
        var userInfo = document.getElementById("topbar-tools");
        userInfo.parentNode.removeChild(userInfo);
        var dumbTools = document.getElementById("topbar-tools2");
        var toolParent = dumbTools.parentNode;
        toolParent.removeChild(dumbTools);
        toolParent.appendChild(userInfo);
        var userLinks = userInfo.getElementsByTagName("a");
        for (var j = 0; j < userLinks.length; j++) {
            userLinks[j].style.color = "white";
        }
        var userLis = userInfo.getElementsByTagName("li");
        for (var j = 0; j < userLis.length; j++) {
            userLis[j].style.color = "white";
            userLis[j].style.background = "transparent";
        }
    } catch (e) { }
}

function colorAssignments() {
    try {
        var assignmentsTable = document.getElementById("assigment-list").getElementsByTagName("tbody")[0];
        var assignmentsTableItmes = assignmentsTable.getElementsByTagName("tr");
        for (var j = 0; j < assignmentsTableItmes.length; j++) {
            var assignment = assignmentsTableItmes[j];
            var assignmentElements = assignment.getElementsByTagName("td");
            var gardePercentage = parseInt(assignmentElements[assignmentElements.length - 2].innerText);
            if (isNaN(gardePercentage)) {
                continue;
            }
            assignmentElements[assignmentElements.length - 2].style.background = getColor(gardePercentage);
        }
    } catch (e) { }
}

function reformatAssignmentsTitle(){
    try {
    var classInfoTable = document.getElementsByClassName("linkDescList")[0];
    var classInfo = classInfoTable.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td");

    var divWrapper = document.createElement("div");
    var divTitle = document.createElement("div");

    var title = document.createElement("h1");
    title.innerText = classInfo[0].innerText;
    title.style.margin = 0;
    var subtitle = document.createElement("p");
    subtitle.innerText = classInfo[1].innerText;
    divTitle.appendChild(title);
    divTitle.appendChild(subtitle);
    divTitle.style = "display: inline-block; float:left; margin: 0 10px;";

    var gradeBadge = document.createElement("div");
    gradeBadge.style = "display: inline-block; float:left; text-align: center; font-weight: bold; padding: 0 5px;";
 var letter = classInfo[3].innerText.substring(0 ,classInfo[3].innerText.indexOf(" "));
 var num = classInfo[3].innerText.substring(classInfo[3].innerText.indexOf(" ")).replace(new RegExp(" ", 'g'), "").replace(new RegExp("\u00a0", 'g'), "").replace("%","");

    gradeBadge.innerHTML = letter + "<br>" + num + "%";
    gradeBadge.style.background = getColor(parseInt(num));

    divWrapper.appendChild(divTitle);
    divWrapper.appendChild(gradeBadge)

    var currentTitle = document.getElementsByTagName("h1")[0];
    currentTitle.parentNode.replaceChild(divWrapper, currentTitle);
    classInfoTable.parentNode.removeChild(classInfoTable);
    } catch (e) { }
}

function recolorTableHeadings(){
    try {
    var thArray = document.getElementsByTagName("th");
    for (var j = 0; j < thArray.length; j++) {
        var th = thArray[j];
        if(th.style.background == ""){
            th.style.background = "#114890";
            th.style.color = "white";
            th.style.borderColor = "#114890";
            try {
            var children = th.childNodes;
            for(var i = 0; i < children.length; i++){
                children[i].style.color = "white";
            }
        } catch (e) { }
        }
    }
    } catch (e) { }
}

function reformatGradesSummary(){
    recolorGrades();
    removeExplanation();
    reformatCourseInfo();
}

function reformatCourseGrade(){
    colorAssignments();
    reformatAssignmentsTitle();
}

function reformatSource(){

    // var assignmentsTable = document.getElementById("assigment-list").getElementsByTagName("tbody")[0];
    // var thArray = document.getElementById("");
    // alert(assignmentsTable);


    reformatHeader();
    recolorTableHeadings();
    try {
        reformatGradesSummary();
    } catch (error) {}
    try {
        reformatCourseGrade();
    } catch (error) {}
}
reformatSource();

//var assignmentsTable = document.getElementById("sps-assignment-categories").getElementsByTagName("tbody")[1];
//alert(assignmentsTable);


var weight = [];
var names = [];
var pointsPossibleList = [];
var pointsEarnedList = [];
var t = document.getElementById("sps-assignment-categories").getElementsByTagName("tbody")[0]; // This have to be the ID of your table, not the tag

for(i=0;i< t.getElementsByTagName("tr").length;i++){
  var d = t.getElementsByTagName("tr")[i];  
  var r = d.getElementsByTagName("td")[1];
  var value = r.innerHTML;
  var name = d.getElementsByTagName("td")[0].innerHTML;
  var pointsPossible = d.getElementsByTagName("td")[3].innerHTML;
  var pointsEarned = d.getElementsByTagName("td")[4].innerHTML;
  weight.push(value);
  names.push(name);
  pointsPossibleList.push(pointsPossible);
  pointsEarnedList.push(pointsEarned);
}


chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    // Collect the necessary data 
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`)
    var domInfo = {
      weight: weight,
      names: names,
      pointsPossible: pointsPossibleList,
      pointsEarned: pointsEarnedList
    };

    // Directly respond to the sender (popup), 
    // through the specified callback */
    response(domInfo);
  }
});


// popup.js

// window.onload = function() {
//   chrome.storage.sync.get("data", function(items) {
//     if (!chrome.runtime.error && items != "undefined") {
//       console.log(items);

//       document.getElementById("score").innerHTML = items.data;
//     }
//   });
//   chrome.storage.sync.get("ul", function(items) {
//     if (!chrome.runtime.error && items != "undefined") {
//       console.log(items);

//       document.getElementById("myUL").appendChild(items);
//     }
//   });
// }

// change the display of the scoreform div 



// var pointsPossible = 0;
// var pointsEarned = 0;
// var categories = [];
// var closeList = [];


// function toggleScoreForm() {

//   var x = document.getElementById("scoreform"); 

//   if (x.style.display === "block") {
//       x.style.display = "none";
//   } else {
//       x.style.display = "block";
//   }
// }
// function toggleCategoryForm() {
//   var x = document.getElementById("categoryform"); 

//   if (x.style.display === "block") {
//       x.style.display = "none";
//   } else {
//       x.style.display = "block";
//   }
// }

// function getScore(){
//   var title = document.getElementById('title');
//   var assignmentScore= document.getElementById('assignmentScore');
//   var overallScore = document.getElementById('overallScore');
//   var category = document.getElementById('categoryList');
  
//   title = title.value;
//   assignmentScore= assignmentScore.value;
//   overallScore = overallScore.value;
//   category = category.value;
//   return[title,assignmentScore,overallScore, category];
// }
// function getCategory() {
//   var title = document.getElementById('newCategoryName');
//   var weight = document.getElementById('newCategoryWeight');
//   title = title.value;
//   weight = weight.value;
//   return[title, weight];
// }

// function cleanUpScoreForm(){
//   document.getElementById('title').value = "";
//   document.getElementById('assignmentScore').value = "";
//   document.getElementById('overallScore').value = "";
//   //document.getElementById('category').value = "";
// }

// function cleanUpCategoryForm(){
//   document.getElementById('newCategoryName').value = "";
//   document.getElementById('newCategoryWeight').value = "";
// }

// //check is string a number
// function isNumber(n) {

//   return !isNaN(parseFloat(n)) && isFinite(n);
// }


// function addNewScore() {

//   // get score from getScore 
//   var newScoreList = getScore();
//   var score = Object();
//   score.title = newScoreList[0];
//   score.assignmentScore = newScoreList[1];
//   score.overallScore= newScoreList[2];

//   // string not include in object score
//   score.category = newScoreList[3];

//   for(var i = 0; i < categories.length; ++i){
//     if (categories[i].title === score.category) {
//       categories[i].grades.push(score);
//       //alert('score pushed to category' + category);
//     }
//   }

//   // create new li 
//   if ( score.title !== "" &&  score.assignmentScore!== "" && score.overallScore !== "" ){
//     // check score is a number
//     if (isNumber(score.assignmentScore) && isNumber(score.overallScore)){
//       var li = document.createElement("li");
//       var percentScore = score.assignmentScore/score.overallScore;
//       var gradeLetter = percentScore >= .93 ? 'A' : percentScore >= .9 ? 'A-' : percentScore >= .86 ? 'B+' : percentScore >= .83 ? 'B' : percentScore >= .8 ? 'B-' : 'E';
//       var overallGrade = calculateOverallGrade();
//       //alert(overallGrade);
//       document.getElementById("score").innerHTML = String(overallGrade); 

      
//       percentScore = (100*percentScore).toFixed(2)
//       // create input value

      

//       var inputValue =  score.title + " " + score.assignmentScore+ "/" + score.overallScore + " " + gradeLetter + " " + percentScore + '%';

//       var tmp = document.createTextNode(inputValue);
//       // add inputvalue into li
//       li.appendChild(tmp);
//       // add li to popup.html
//       document.getElementById("myUL").appendChild(li);


//       var close = document.getElementsByClassName("close");
//       var span = document.createElement("SPAN");
//       var txt = document.createTextNode("\u00D7");
//       span.className = "close";
//       span.appendChild(txt);
//       li.appendChild(span);


//       // this is the list to store the score information of close
//       closeList.push(score);

//       for (i = 0; i < close.length; i++) {

//         // pass parameter i as index
//         (function(index){
//           close[i].onclick = function(){

//             // put the score information of the button 
//             removeScore(closeList[index]);

//             // hide the cancel thing 
//             var div = this.parentElement;
//             div.style.display = "none";
//           }    
//         })(i);

//       }

//       // clean up the form 
//       cleanUpScoreForm();
//       // hide the form
//       toggleScoreForm();
//     }else{
//       alert("Pleaze enter a number not random characters!")
//     }

//   }else{
//     alert("You didn't fill out yet!")
//   }
// }

// function removeScore(score){
//   var categoryIndex;
//   for(j = 0; j < categories.length; j++){
//     if (categories[j].title == score.category) {
//       categoryIndex = j;
//     }
//   }
//   var scoreIndex;
//   //alert(categoryIndex);
//   for(j = 0; j < categories[categoryIndex].grades.length; j++){
//     if (score.title == categories[categoryIndex].grades[j].title && score.assignmentScore ==  categories[categoryIndex].grades[j].assignmentScore && score.overallScore ==  categories[categoryIndex].grades[j].overallScore) {
//       scoreIndex = j;
//     }
//   }

//   categories[categoryIndex].grades.splice(scoreIndex , 1);
//   overallGrade = isNaN(calculateOverallGrade()) ? '' : calculateOverallGrade();
//   document.getElementById("score").innerHTML = String(overallGrade);
// }

// function addCategory() {
//   var newCategoryList = getCategory();
//   var title = newCategoryList[0];
//   var weight = newCategoryList[1]
//   //creates a new category object and assigns it values based on user input
//   var category = Object();
//   category.title = title;
//   category.weight = weight;
//   category.grades = [];
//   var alreadyExists = false;
//   for (var i = 0; i < categories.length; i++) {

//     if(categories[i].title === category.title) {
//       alreadyExists = true;
//     }
//   }
//   //var category = newScoreList[3];

//   // create new li 
//   if (!alreadyExists) { 
//   if ( title !== "" && weight !== ""){
//     // check weight is a number
//     if (isNumber(weight)){
//       //adds the category as an option on the drop down list
//       var opt = document.createElement('option');
//       opt.value = title;
//       opt.innerHTML = title;
//       document.getElementById("categoryList").appendChild(opt);
//       //adds category to a global categories list
//       categories.push(category);
//       //clears category form      
//       toggleCategoryForm();
//       cleanUpCategoryForm();
//     }else{
//       alert("Pleaze enter a number not random characters!");
//     }

//   }else{
//     alert("You didn't fill out yet!");
//   }
// }
//   else {
//       alert("That category already exists");
//   } 
// }

// function calculateOverallGrade(){
//   weightSum = 0;
//   pointsSum = 0;
//   for (var i = 0; i < categories.length; i++) {
//     //stores the point values for each category
//     pointsEarnedSum = 0;
//     pointsPossibleSum = 0;
//     if(categories[i].grades.length > 0) {
//       for (var j = 0; j < categories[i].grades.length; j++) {
//         pointsEarnedSum += parseFloat(categories[i].grades[j].assignmentScore);
//         pointsPossibleSum += parseFloat(categories[i].grades[j].overallScore);
//       }
//     //records the score of the category based on its weight
//       weightSum += parseFloat(categories[i].weight);
//       pointsSum += parseFloat(categories[i].weight * (pointsEarnedSum/pointsPossibleSum));
//     }
//   }

//   // return two decinamls  
//   return  (100*pointsSum/weightSum).toFixed(2);
// }


// document.addEventListener('DOMContentLoaded', function() {

//     // listner for newsScoreButton
//     document.getElementById("newScoreButton").addEventListener("click",
//         function() {


//       toggleScoreForm();
//     }, false);

//     // listner for submitScoreButton
//     document.getElementById("submitScoreButton").addEventListener("click",
//         function() {
//         addNewScore();
        
//         // var a = document.getElementById("myUL").innerHTML;
//         // chrome.storage.sync.set({ "ul" : a }, function() {
//         //     if (chrome.runtime.error) {
//         //       console.log("Runtime error.");
//         //     }
//         //     console.log(a);

//         //   }
//         // );

//         // var d = document.getElementById("score").innerHTML;
//         //   chrome.storage.sync.set({ "data" : d }, function() {
//         //     if (chrome.runtime.error) {
//         //       console.log("Runtime error.");
//         //     }
//         //     console.log(d);

//         //   }
//         // );
//         // I put toggle into addNewScore
      
//     }, false);
//     document.getElementById("addCategoryButton").addEventListener("click",
//       function() {
//         toggleCategoryForm();
//       }
//     )
//     document.getElementById("submitCategoryButton").addEventListener("click",
//         function() {
//           addCategory();
//         }
//     )
// });








