// console.clear();
//input validation for binary octal decimal and hexadecimal
//return true if valid or else false
var isValid = {
  binary: function (value) {
    if (value === '') {
      return false;
    }
    var numberArray = value.split('.');
    if (numberArray.length <= 2) {
      number = numberArray.join('');
      // console.log(number);
      number = number.split('');
      // console.log(number);
      for (let i = 0; i < number.length; i++) {
        if (number[i] != '1' && number[i] != '0') {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  },
  octal: function (value) {
    if (value === '') {
      return false;
    }
    var numberArray = value.split('.');
    if (numberArray.length <= 2) {
      number = numberArray.join('');
      // console.log(number);
      number = number.split('');
      // console.log(number);
      for (let i = 0; i < number.length; i++) {
        if (
          isNaN(Number(number[i])) ||
          number[i] === '9' ||
          number[i] === '8'
        ) {
          // console.log(Number(number[i]));
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  },
  decimal: function (value) {
    if (value === '') {
      return false;
    }
    var numberArray = value.split('.');
    if (numberArray.length <= 2) {
      number = numberArray.join('');
      // console.log(number);
      number = number.split('');
      // console.log(number);
      for (let i = 0; i < number.length; i++) {
        if (isNaN(Number(number[i]))) {
          // console.log(Number(number[i]));
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  },
  hexadecimal: function (value) {
    if (value === '') {
      return false;
    }
    let arr = ['A', 'B', 'C', 'D', 'E', 'F'];
    let flag = 1;
    value = value.toUpperCase();
    var numberArray = value.split('.');
    if (numberArray.length <= 2) {
      number = numberArray.join('');
      // console.log(number);
      number = number.split('');
      // console.log(number);
      for (let i = 0; i < number.length; i++) {
        if (isNaN(Number(number[i]))) {
          // console.log(Number(number[i]));
          if (arr.indexOf(number[i]) == -1) {
            return false;
          }
        }
      }
      return true;
    } else {
      return false;
    }
  },
};
//
//
//reset button
document
  .getElementsByTagName('button')[0]
  .addEventListener('click', function () {
    for (let i = 0; i < 4; i++) {
      input[i].value = '';
      input[i].className = 'valid';
    }
  });

function resetAllColor() {
  for (let i = 0; i < 4; i++) {
    input[i].className = 'valid';
  }
}
//
//
//setting event listeners
var input = document.getElementsByTagName('input');
// console.log(input);

for (let i = 0; i < 4; i++) {
  input[i].onkeyup = function (e) {
    updated(e);
  };
}

//switching control flow
function updated(e) {
  var element = e.target;
  var value = element.value;
  console.log(value);
  var name = element.name;

  switch (name) {
    case 'binary':
      {
        resetAllColor();
        if (isValid.binary(value)) {
          element.className = 'valid';
          value = convert(value, 2); //to decimal
          input[1].value = (+value).toString(8);
          input[2].value = value;
          input[3].value = (+value).toString(16).toUpperCase();
        } else {
          element.className = 'invalid';
        }
      }
      break;
    case 'octal':
      {
        resetAllColor();
        if (isValid.octal(value)) {
          element.className = 'valid';
          let binaryNumber = OctalToBinary(value);
          value = convert(binaryNumber, 2); //to decimal
          input[0].value = binaryNumber;
          input[2].value = value;
          input[3].value = (+value).toString(16).toUpperCase();
        } else {
          element.className = 'invalid';
        }
      }
      break;
    case 'decimal':
      {
        resetAllColor();
        if (isValid.decimal(value)) {
          element.className = 'valid';
          input[0].value = (+value).toString(2);
          input[1].value = (+value).toString(8);
          input[3].value = (+value).toString(16).toUpperCase();
        } else {
          element.className = 'invalid';
        }
      }
      break;
    case 'hexadecimal':
      {
        resetAllColor();
        if (isValid.hexadecimal(value) || value === '') {
          element.className = 'valid';
          value = convert(value, 16); //to decimal
          input[0].value = (+value).toString(2);
          input[1].value = (+value).toString(8);
          input[2].value = value;
        } else {
          element.className = 'invalid';
        }
      }
      break;
  }
}

// used to convert binary and hex to decimal
function convert(value, base = 2) {
  var [integer, fraction = ''] = value.toString().split('.');

  return (
    parseInt(integer, base) +
    (integer[0] !== '-' || -1) *
      fraction
        .split('')
        .reduceRight((r, a) => (r + parseInt(a, base)) / base, 0)
  );
}

// Octal To Binary converter
function OctalToBinary(octalNumber) {
  var binary = '';
  var arr = octalNumber.split('');
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    switch (arr[i]) {
      case '0':
        binary += '000';
        break;
      case '1':
        binary += '001';
        break;
      case '2':
        binary += '010';
        break;
      case '3':
        binary += '011';
        break;
      case '4':
        binary += '100';
        break;
      case '5':
        binary += '101';
        break;
      case '6':
        binary += '110';
        break;
      case '7':
        binary += '111';
        break;
      case '.':
        binary += '.';
        break;
    }
  }
  return binary;
}
