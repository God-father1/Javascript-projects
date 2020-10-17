// Called when the user clicks on the browser action.
function openRuler() {
	//chrome.tabs.executeCSS(null,{file : "measureStyles.css"});
	chrome.tabs.executeScript(null,{file : "js/external/jquery.js"});
	chrome.tabs.executeScript(null, {file: "js/external/canvasTextLibrary.js"});
	chrome.tabs.executeScript(null, {file: "siteJsCode.js"});

}

function openSprite(){
	chrome.tabs.create({
		url : chrome.extension.getURL('spritegenerator.html')
	})
}
document.getElementById("measure").addEventListener("click",openRuler);
document.getElementById('spritegenerator').addEventListener("click",openSprite);