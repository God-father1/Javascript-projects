$(document).ready( function() {	

	var cNote = document.getElementById('cAudio');
	var dNote = document.getElementById('dAudio');
	var eNote = document.getElementById('eAudio');
	var fNote = document.getElementById('fAudio');
	var gNote = document.getElementById('gAudio');
	var aNote = document.getElementById('aAudio');
	var bNote = document.getElementById('bAudio');

	$('#c').click(function(){
		cNote.currentTime = 0;
		cNote.play();
	});

	$('#d').click(function(){
		dNote.currentTime = 0;
		dNote.play();
	});

	$('#e').click(function(){
		eNote.currentTime = 0;
		eNote.play();
	});

	$('#f').click(function(){
		fNote.currentTime = 0;
		fNote.play();
	});

	$('#g').click(function(){
		gNote.currentTime = 0;
		gNote.play();
	});

	$('#a').click(function(){
		aNote.currentTime = 0;
		aNote.play();
	});

	$('#b').click(function(){
		bNote.currentTime = 0;
		bNote.play();
	});

});