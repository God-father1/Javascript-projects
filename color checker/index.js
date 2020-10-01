const inputColor = document.getElementById('color');
const container = document.querySelector(".container")

inputColor.addEventListener('input', () => {
    const color = inputColor.value;

    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
	
    if(color.match(hexColorRegex)) {
        inputColor.style.borderColor = color;
        container.style.background = color;
    } else {
        inputColor.style.borderColor = 'rgb(226,226,226)'
    }


}); 