
var Timer = 60;
var score = 0;
var hitrn = 0;


function increaseScr(){
    score += 10;
    document.querySelector("#scoreval").textContent = score;
}

function getNewHit(){
     hitrn = Math.floor(Math.random()*10);
    document.querySelector("#hitval").textContent = hitrn;
}   

function makebubble(){
    var clutter = " ";

for(var i =1; i<=112; i++){
    var rn = Math.floor(Math.random()*10);
    clutter += `<div class="bubble">${rn}</div>`;
}
  document.querySelector("#pbtm").innerHTML = clutter;
}

function runTimer(){
    var timeint = setInterval(function () {
        if(Timer > 0){
        Timer--;
        document.querySelector("#timerval").textContent = Timer;
        }
    else{
        clearInterval(timeint);
        document.querySelector("#pbtm").innerHTML = `<h1>Game Over</h1>`;
    }
    }, 1000)
}

document.querySelector("#pbtm")
.addEventListener("click", function(dets){
    var clickednum = Number(dets.target.textContent);
    if(clickednum === hitrn){
        increaseScr();
        makebubble();
        getNewHit();
    }
});

runTimer();
makebubble();
getNewHit();