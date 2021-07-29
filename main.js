var currentRank = 0;                                                    //Đếm số nhấn nút
var ruleScore = [2,1,-1,-2,-3,1,2];
var names = {
    player1: "",
    player2: "",
    player3: "",
    player4: ""
};
var scores = [
    {
        score1: 0,
        score2: 0,
        score3: 0,
        score4: 0
    }
];
var newScore = {
    player1: 0,
    player2: 0,
    player3: 0,
    player4: 0
}
var totalScores = [0,0,0,0];

var inputName1 = document.getElementById('player1');
var colName1 = document.getElementById('col-name1');
var btn1 = document.getElementById('btn-rank-1');

var inputName2 = document.getElementById('player2');
var colName2 = document.getElementById('col-name2');
var btn2 = document.getElementById('btn-rank-2');

var inputName3 = document.getElementById('player3');
var colName3 = document.getElementById('col-name3');
var btn3 = document.getElementById('btn-rank-3');

var inputName4 = document.getElementById('player4');
var colName4 = document.getElementById('col-name4');
var btn4 = document.getElementById('btn-rank-4');


//Xử lý nhập tên
inputName1.onchange = function(e){
    names.player1 = e.target.value;
    colName1.innerText = names.player1;
    btn1.innerText = names.player1;
    document.getElementById('special-score1').placeholder = names.player1;
}
inputName2.onchange = function(e){
    names.player2 = e.target.value;
    colName2.innerText = names.player2;
    btn2.innerText = names.player2;
    document.getElementById('special-score2').placeholder = names.player2;
}
inputName3.onchange = function(e){
    names.player3 = e.target.value;
    colName3.innerText = names.player3;
    btn3.innerText = names.player3;
    document.getElementById('special-score3').placeholder = names.player3;
}
inputName4.onchange = function(e){
    names.player4 = e.target.value;
    colName4.innerText = names.player4;
    btn4.innerText = names.player4;
    document.getElementById('special-score4').placeholder = names.player4;
}


//Xử lý nhập luật
var inputRole1 = document.getElementById('score1');
var inputRole2 = document.getElementById('score2');
// var inputRole3 = document.getElementById('score3');
// var inputRole4 = document.getElementById('score4');
var inputRule5 = document.getElementById('score-rule1');

inputRole1.onchange = function(e){
    ruleScore[0] = e.target.value;
    ruleScore[3] = ruleScore[0]*-1;
}
inputRole2.onchange = function(e){
    ruleScore[1] = e.target.value;
    ruleScore[2] = ruleScore[1]*-1;
}
inputRule5.onchange = function(e){
    ruleScore[4] = e.target.value;
}

//Tạo bảng
function createNewRow(){
    var table = document.getElementById("myTable");
    var row = table.insertRow(1);
    row.insertCell(0).innerHTML = newScore.player1;
    row.insertCell(1).innerHTML = newScore.player2;
    row.insertCell(2).innerHTML = newScore.player3;
    row.insertCell(3).innerHTML = newScore.player4;
}



// Xử lý nút nhập điểm
btn1.onclick = function(){
    newScore.player1 = ruleScore[currentRank];
    currentRank++;
    btn1.disabled = true;
}
btn2.onclick = function(){
    newScore.player2 = ruleScore[currentRank];
    currentRank++;
    btn2.disabled = true;
}
btn3.onclick = function(){
    newScore.player3 = ruleScore[currentRank];
    currentRank++;
    btn3.disabled = true;
}
btn4.onclick = function(){
    newScore.player4 = ruleScore[currentRank];
    currentRank++;
    btn4.disabled = true;
}

var btnConfirm = document.getElementById('btn-confirm');
btnConfirm.onclick = function(){
    if(currentRank == 1){
        for(var key in newScore){
            if(newScore[key] == ruleScore[0]) newScore[key]=ruleScore[4]*-3;
            else newScore[key] = ruleScore[4];
        }
    }
    else if(currentRank == 2){
        for(var key in newScore){
            if(newScore[key] == ruleScore[0]) newScore[key]=ruleScore[4]*-3;
            else if(newScore[key] == ruleScore[1]) newScore[key] = ruleScore[4]*3;
            else newScore[key] = 0;
        }
    }
    scores.push(newScore);
    calcTotalScore();
    createNewRow();
    updateTotal();
    resetNewScore();
    btn1.disabled = false;
    btn2.disabled = false;
    btn3.disabled = false;
    btn4.disabled = false;
}

document.getElementById('btn-confirm2').onclick = function(){
    newScore.player1 = document.getElementById('special-score1').value;
    newScore.player2 = document.getElementById('special-score2').value;
    newScore.player3 = document.getElementById('special-score3').value;
    newScore.player4 = document.getElementById('special-score4').value;
    scores.push(newScore);
    calcTotalScore();
    createNewRow();
    updateTotal();
    resetNewScore();
}

function calcTotalScore(){
    var temp = 0;
    for(var key in newScore){
        totalScores[temp] += newScore[key];
        temp++;
    }
}
function resetNewScore(){
    newScore.player1 = 0;
    newScore.player2 = 0;
    newScore.player3 = 0;
    newScore.player4 = 0;
    currentRank = 0;
}

function updateTotal(){
    document.getElementById('total1').innerText = totalScores[0];
    document.getElementById('total2').innerText = totalScores[1];
    document.getElementById('total3').innerText = totalScores[2];
    document.getElementById('total4').innerText = totalScores[3];
}

var type = document.getElementById('type-choose');
type.onclick = function(){
    var normalType = document.getElementById('normal-score');
    var specialType = document.getElementById('special-score');
    if (type.checked == true){
        normalType.style.display = "none";
        specialType.style.display = "block"
      } else {
        normalType.style.display = "block";
        specialType.style.display = "none"
      }
}