const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";
const quoteSelection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");

let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

//Display random quotes
const randomNewQuote = async () => {
  //Fetching components  from the url
  const response = await fetch(quoteApiUrl);

  //storing responses
  let data = await response.json();

  //Accessing quotes
  quote = data.content;

  //Array of characters in quote
  let arr = quote.split("").map((value) => {
    //wrap the characters in a span tag
    return "<span class='quote-chars'>" + value + "</span>";
  });
  //join array for displaying
  quoteSelection.innerHTML += arr.join("");
};

//Logic for comparing input words with quote
userInput.addEventListener("input", () => {
  let quoteChars = document.querySelectorAll(".quote-chars");

  //create an array from recieved span tags
  quoteChars = Array.from(quoteChars);

  //Array of user input characters
  let userInputChars = userInput.value.split("");

  //loop through each characterin quote

  quoteChars.forEach((char, index) => {
    if (char.innerText == userInputChars[index]) {
      char.classList.add("success");
    }
    //If user hasnt entered anything or backspaced
    else if (userInputChars[index] == null) {
      //remove class if any
      if (char.classList.contains("success")) {
        char.classList.remove("success");
      } else {
        char.classList.remove("fail");
      }
    }
    //If user enters a wrong character
    else {
      if (!char.classList.contains("fail")) {
        //increment and display mistakes
        mistakes += 1;
        char.classList.add("fail");
      }
      document.getElementById("mistakes").innerText = mistakes;
    }
    //returns true if all the characters are entered correctly
    let check = quoteChars.every((element) => {
      return element.classList.contains("success");
    });
    //End test if all charaters are correctly
    if (check) {
      displayResult();
    }
  });
});
//Update timer
function updateTimer() {
  if (time == 0) {
    //End test if timer reaches 0
    displayResult();
  } else {
    document.getElementById("timer").innerText = --time + "s;";
  }
}
//sets timer

const timeReduce = () => {
  time = 60;
  timer = setInterval(updateTimer, 1000);
};
//End test
const displayResult = () => {
  //display result div
  document.querySelector(".result").style.display = "block";
  clearInterval(timer);
  document.getElementById("stop-test").style.display = "none";
  userInput.disabled = true;
  let timeTaken = 1;
  if (time != 0) {
    timeTaken = (60 - time) / 100;
  }
  document.getElementById("wpm").innerText =
    (userInput.value.length / 5 / timeTaken).toFixed(2) + "wpm";
  document.getElementById("accuracy").innerText =
    Math.round(
      ((userInput.value.length - mistakes) / userInput.value.length) * 100
    ) + "%";
};

//Start Test

const startTest = () => {
  mistakes = 0;
  timer = "";
  userInput.disabled = false;
  timeReduce();
  document.getElementById("start-test").style.display = "none";
  document.getElementById("stop-test").style.display = "block";
};

window.onload = () => {
  userInput.value = "";
  document.getElementById("start-test").style.display = "block";
  document.getElementById("stop-test").style.display = "none";
  userInput.disabled = true;
  randomNewQuote();
};
