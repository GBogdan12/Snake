let score = [];
let score2 = [];
function dashbord() {
  
    score = localStorage.getItem('score');
    score2=score.split(",");

    if(score2[0])
        document.getElementById('scor1').innerHTML = score2[0];
    if (score2[1])
        document.getElementById('scor2').innerHTML = score2[1];
    if (score2[2])
        document.getElementById('scor3').innerHTML = score2[2];
    if (score2[3])
        document.getElementById('scor4').innerHTML = score2[3];
    if (score2[4])
        document.getElementById('scor5').innerHTML = score2[4];
    if (score2[5])
        document.getElementById('scor6').innerHTML = score2[5];
    if (score2[6])
        document.getElementById('scor7').innerHTML = score2[6];
    if (score2[7])
        document.getElementById('scor8').innerHTML = score2[7];
    if (score2[8])
        document.getElementById('scor9').innerHTML = score2[8];
    if (score2[9])
        document.getElementById('scor10').innerHTML = score2[9];

}