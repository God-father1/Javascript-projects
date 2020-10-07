"use strict";

const keyCodeOutput = document.getElementById("outputDiv");

document.addEventListener("keypress", function onPress(e) {
   keyCodeOutput.innerText = "Key code for " + e.code + ": " + e.charCode;
});

