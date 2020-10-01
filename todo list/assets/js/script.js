// adding new list items
$("input").keypress(function(event) {
	if (event.which == 13) {
		$("ul").append('<li><span><i class="fa fa-trash"></i></span> ' + $(this).val() + '</li>');
		$(this).val("");
	}
});

// marking todo list item
$('ul').on('click', 'li', function() {
	$(this).toggleClass("completed");
});

// deleting list
$('ul').on ('click', 'span', function (event) {
	$(this).parent().fadeOut(500, function () {
		$(this).remove();
	});
	event.stopPropagation();
});

$('.fa-plus').on ('click', function() {
	$('input').fadeToggle();
});