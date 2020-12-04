const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector( "#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const generate= document.querySelector("#gen");
const wpm=document.querySelector("#origin-text1 p")
var timer=[0,0,0,0];
var interval;
var runningTimer=false;
var textcheck;
var word;
var arr=[ 
    "Push yourself, because no one else is going to do it for you.", 
    "Failure is the condiment that gives success its flavor.", 
    "Wake up with determination. Go to bed with satisfaction.", 
    "It's going to be hard, but hard does not mean impossible.", 
    "Learning never exhausts the mind.", 
    "The only way to do great work is to love what you do.",
    "The peacock is the national bird of India. They have colourful feathers, two legs and a small beak.They are famous for their dance."
    , "Ants are found everywhere in the world. They make their home in buildings, gardens etc. They live in anthills. Ants are very hardworking insects.",
    ,"The camels are called the “ships of the desert”. They are used to carry people and loads from one place to another. They have a huge hump on their body where they! Store their fat."
    ,"An elephant is the biggest living animal on land. It is quite huge in size. It is usually black or grey in colour.","Horses are farm animals. They are usually black, grey, white and brown in colour. They are known as beasts of burden.",
    "The Dog is a pet animal. It is one of the most obedient animals. There are many kinds of dogs in the world. Some of the are very friendly while some of them a dangerous.",
    "The stars are tiny points of light in the space. On a clear night we can see around 2,000 to 3,000 stars without using a telescope."
  ];

  function randomGen()
  {
    var i=[Math.floor(Math.random() * arr.length)];
    originText.innerHTML=arr[i];
    word=arr[i].length;
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
        textcheck=testArea.value;
        var origintextMatch=originText.innerHTML.substring(0,textcheck.length);
        if(textcheck == originText.innerHTML)
        {
            testWrapper.style.borderColor="#09F30D";
            var timerCal=((word/5)/(timer[0] + timer[1]/60 + ((timer[2]/1000)/60)));
            console.log(timerCal);
            wpm.innerHTML="Your typing speed is " + Math.floor(timerCal)+ " wpm";
            clearInterval(interval);
           
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