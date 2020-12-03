const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector( "#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const generate= document.querySelector("#gen");
var timer=[0,0,0,0];
var interval;
var runningTimer=false;

var arr=[ 
    "Push yourself, because no one else is going to do it for you.", 
    "Failure is the condiment that gives success its flavor.", 
    "Wake up with determination. Go to bed with satisfaction.", 
    "It's going to be hard, but hard does not mean impossible.", 
    "Learning never exhausts the mind.", 
    "The only way to do great work is to love what you do."
  ];

  function randomGen()
  {
    originText.innerHTML=arr[Math.floor(Math.random() * arr.length)];
  }

// Add leading zero to numbers 9 or below (purely for aesthetics):
    function checkTime(time)
    {
        if(time<=9)
        {
            time= "0" + time;
        }
        return time;
    }

// Run a standard minute/second/hundredths timer:
    function runTime()
    {
        var currentTime= checkTime(timer[0]) + ":" + checkTime(timer[1]) + ":" + checkTime(timer[2]);
        theTimer.innerHTML=currentTime;
        timer[3]++;
        timer[0]= Math.floor((timer[3]/100)/60);
        timer[1]= Math.floor((timer[3]/100) - (timer[0])*60);
        timer[2]= Math.floor(timer[3] - (timer[1]*100) - (timer[0])*6000);
    }

// Match the text entered with the provided text on the page:
    function check()
    {
        var textcheck=testArea.value;
        var origintextMatch=originText.innerHTML.substring(0,textcheck.length);

        if(textcheck == originText.innerHTML)
        {
            clearInterval(interval);
            testWrapper.style.borderColor="#09F30D";
        }
        else if(textcheck == origintextMatch)
        {
            testWrapper.style.borderColor="#F3E509";
        }
        else{
            testWrapper.style.borderColor="#F33709"
        }
        
    }

// Start the timer:
    function start()
    {
        var textlength=testArea.value.length;
        if(textlength===0 && !runningTimer)
        {
            runningTimer=true;
            interval = setInterval(runTime,10);
        }
    }

// Reset everything:
function allreset()
{
    clearInterval(interval);
    interval=null;
    timer=[0,0,0,0];
    runningTimer=false;
    testArea.value='';
    theTimer.innerHTML= "00:00:00";
    testWrapper.style.borderColor="grey";
    randomGen();
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start , false);
testArea.addEventListener("keyup", check , false);
resetButton.addEventListener("click",allreset, false);