randomNumber1 = Math.random()
randomNumber1 = Math.round(randomNumber1 * 5) + 1
//Math.random(Math.round(roundNumber1 * 5) + 1)
randomNumber2 = Math.random()
randomNumber2 = Math.round(randomNumber2 * 5) + 1

dice1 = "images/dice" + randomNumber1 + ".png"
dice2 = "images/dice" + randomNumber2 + ".png"
document.querySelectorAll("img")[0].setAttribute("src",dice1)
document.querySelectorAll("img")[1].setAttribute("src",dice2)

if(randomNumber1>randomNumber2){
  document.querySelector("h1").innerHTML = "Player1 Wins! 🚩"
}
else if (randomNumber1<randomNumber2){
  document.querySelector("h1").innerHTML = "Player2 Wins! 🚩"
}
else{
  document.querySelector("h1").innerHTML = "Draw!"
}
