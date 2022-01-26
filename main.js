var currentRank = 0;                                                    //Đếm số nhấn nút
var ruleScore = [2,1,-1,-2,-3,1,2];
var basicRuleScore = [2,1,-1,-2,-3,1,2];

var names = {
    player1: "",
    player2: "",
    player3: "",
    player4: ""
};
var scores = [
    [0,0,0,0]
];
var newScore = [1,2,3,4];
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
function handleChangeRule(src){
    for(var i=0;i<ruleScore.length;i++){
        ruleScore[i] = src.value * basicRuleScore[i];
    }
}

var inputRole1 = document.getElementById('score1');
var inputRole2 = document.getElementById('score2');
// var inputRole3 = document.getElementById('score3');
// var inputRole4 = document.getElementById('score4');
var inputRule5 = document.getElementById('score-rule1');

// inputRole1.onchange = function(e){
//     ruleScore[0] = parseInt(e.target.value);
//     ruleScore[3] = ruleScore[0]*-1;
// }
// inputRole2.onchange = function(e){
//     ruleScore[1] = parseInt(e.target.value);
//     ruleScore[2] = ruleScore[1]*-1;
// }
// inputRule5.onchange = function(e){
//     ruleScore[4] = parseInt(e.target.value);
// }



//Tạo bảng
function createNewRow(){
    var table = document.getElementById("myTable");
    var row = table.insertRow(1);
    row.insertCell(0).innerHTML = newScore[0];
    row.insertCell(1).innerHTML = newScore[1];
    row.insertCell(2).innerHTML = newScore[2];
    row.insertCell(3).innerHTML = newScore[3];
}
function undoRow(){
    var table = document.getElementById("myTable");
    var row = table.deleteRow(1);
}



// Xử lý nút nhập điểm
btn1.onclick = function(){
    newScore[0] = ruleScore[currentRank];
    currentRank++;
    btn1.disabled = true;
}
btn2.onclick = function(){
    newScore[1] = ruleScore[currentRank];
    currentRank++;
    btn2.disabled = true;
}
btn3.onclick = function(){
    newScore[2] = ruleScore[currentRank];
    currentRank++;
    btn3.disabled = true;
}
btn4.onclick = function(){
    newScore[3] = ruleScore[currentRank];
    currentRank++;
    btn4.disabled = true;
}

var btnConfirm = document.getElementById('btn-confirm');
btnConfirm.onclick = function(){
    if(currentRank == 1){
        for(let i = 0; i < newScore.length; i++){
            if(newScore[i] == ruleScore[0]) newScore[i]=ruleScore[4]*-3;
            else newScore[i] = ruleScore[4];
        }
    }
    else if(currentRank == 2){
        for(let i = 0; i < newScore.length; i++){
            if(newScore[i] == ruleScore[0]) newScore[i]=ruleScore[4]*-3;
            else if(newScore[i] == ruleScore[1]) newScore[i] = ruleScore[4]*3;
            else newScore[i] = 0;
        }
    }
    scores.push([newScore[0], newScore[1], newScore[2], newScore[3]]);
    calcTotalScore();
    createNewRow();
    updateTotal();
    resetNewScore();
}

document.getElementById('btn-confirm2').onclick = function(){
    newScore[0] = Number(document.getElementById('special-score1').value);
    newScore[1] = Number(document.getElementById('special-score2').value);
    newScore[2] = Number(document.getElementById('special-score3').value);
    newScore[3] = Number(document.getElementById('special-score4').value);
    scores.push(newScore);
    calcTotalScore();
    createNewRow();
    updateTotal();
    resetNewScore();
    document.getElementById('special-score1').value = "";
    document.getElementById('special-score2').value = "";
    document.getElementById('special-score3').value = "";
    document.getElementById('special-score4').value = "";
}

function calcTotalScore(){
    var temp = 0;
    for(var key in newScore){
        totalScores[temp] += newScore[key];
        temp++;
    }
}
function resetNewScore(){
    newScore[0] = 0;
    newScore[1] = 0;
    newScore[2] = 0;
    newScore[3] = 0;
    currentRank = 0;
    btn1.disabled = false;
    btn2.disabled = false;
    btn3.disabled = false;
    btn4.disabled = false;
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

// //Reset
document.getElementById('btn-reset').onclick = function(){
    resetNewScore();
}
// //Undo
document.getElementById('btn-undo').onclick = function(){
    resetNewScore();
    //score
    var undoScore = scores.pop();
    // //total
    var temp = 0;
    for(var key in undoScore){
        totalScores[temp] -= undoScore[key];
        temp++;
    }
    updateTotal();
    // //row
    undoRow();
}

