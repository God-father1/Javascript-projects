'use strict';

//auto complete
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener('input', function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement('DIV');
    a.setAttribute('id', this.id + 'autocomplete-list');
    a.setAttribute('class', 'autocomplete-items');
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement('DIV');
        /*make the matching letters bold:*/
        b.innerHTML = '<strong>' + arr[i].substr(0, val.length) + '</strong>';
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener('click', function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName('input')[0].value;
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener('keydown', function (e) {
    var x = document.getElementById(this.id + 'autocomplete-list');
    if (x) x = x.getElementsByTagName('div');
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add('autocomplete-active');
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove('autocomplete-active');
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName('autocomplete-items');
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener('click', function (e) {
    closeAllLists(e.target);
  });
}
var productName = [];
function autoComplete() {
  let data, keys, products;
  [data, keys, products] = localSetup();
  productName = [];
  for (name in products) {
    productName.push(name);
  }
  autocomplete(document.getElementById('product-name-timeline'), productName);
}
document.addEventListener('DOMContentLoaded', autoComplete);

function isValidName(name) {
  if (name == '') {
    alertError('Product name can not be empty');
    return false;
  } else {
    return true;
  }
}

function isValidNumber(number, str) {
  if (number === '') {
    alertError(`${str} can not be empty`);
    return false;
  } else if (isNaN(Number(number))) {
    alertError(`${str} must be a number`);
    return false;
  } else if (Number(number) < 0) {
    alertError(`${str} can not be negative`);
    return false;
  } else {
    return true;
  }
}

// popup alert
function alertError(errorString) {
  M.toast({ html: errorString });
}

//local storage setup
function localSetup() {
  let data, keys, products;
  if (localStorage.getItem('data') == null) {
    localStorage.setItem('data', JSON.stringify({}));
  } else {
    data = JSON.parse(localStorage.getItem('data'));
  }

  if (localStorage.getItem('keys') == null) {
    localStorage.setItem('keys', JSON.stringify({ 0: [] }));
  } else {
    keys = JSON.parse(localStorage.getItem('keys'));
  }
  if (localStorage.getItem('products') == null) {
    localStorage.setItem('products', JSON.stringify({}));
  } else {
    products = JSON.parse(localStorage.getItem('products'));
  }

  return [data, keys, products];
}

// prompt yes or no for delete
function confirmDelete(string) {
  return swal({
    title: 'Are you sure?',
    text: string,
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  });
}

//get unique key

function getKey() {
  let now = new Date();
  let year = now.getFullYear().toString();
  let month = (now.getMonth() + 1).toString();
  let date = now.getDate().toString();
  let hours = now.getHours().toString();
  let minutes = now.getMinutes().toString();
  let seconds = now.getSeconds().toString();
  let milliSecond = now.getMilliseconds().toString();
  if (month.length == 1) {
    month = '0' + month;
  }
  if (date.length == 1) {
    date = '0' + date;
  }
  if (hours.length == 1) {
    hours = '0' + hours;
  }
  if (minutes.length == 1) {
    minutes = '0' + minutes;
  }
  if (seconds.length == 1) {
    seconds = '0' + seconds;
  }
  if (milliSecond.length == 1) {
    milliSecond = '00' + milliSecond;
  } else if (milliSecond.length == 2) {
    milliSecond = '0' + milliSecond;
  }
  let key = parseInt(
    year + month + date + hours + minutes + seconds + milliSecond
  );
  if (key.toString().length != 17) {
    throw 'Key Generation Error : Key length is differed';
  }
  return [key, now];
}

// nav bar change code
const navBar = document.querySelectorAll('#navBar li a');
navBar.forEach((element) =>
  element.addEventListener('click', (e) => changeTab(e))
);
const home = document.getElementById('home');
const dashBoard = document.getElementById('dashBoard');
const settings = document.getElementById('settings');

function changeTab(e) {
  navBar.forEach((element) => {
    element.parentElement.classList.remove('active');
  });
  switch (e.target.id) {
    case 'homeButton':
      home.style.display = 'block';
      dashBoard.style.display = 'none';
      settings.style.display = 'none';
      e.target.parentElement.classList.add('active');
      break;
    case 'dashBoardButton':
      home.style.display = 'none';
      dashBoard.style.display = 'block';
      settings.style.display = 'none';
      e.target.parentElement.classList.add('active');
      break;
    case 'settingsButton':
      home.style.display = 'none';
      dashBoard.style.display = 'none';
      settings.style.display = 'block';
      e.target.parentElement.classList.add('active');
      break;
  }
}

// delete all data from the local storage
document.getElementById('delete-data').addEventListener('click', () => {
  confirmDelete('Once deleted, you will not be able to recover all data!').then(
    (flag) => {
      if (flag) {
        localStorage.clear();
        productName = [];

        localSetup();
        displayTimeLine();
        autoComplete();
        swal('Local storage cleared successfully', {
          icon: 'success',
        });
      }
    }
  );
});

//event listeners for add new product
document.getElementById('add-product-icon').addEventListener('click', () => {
  let icon = document.getElementsByClassName('create-product-icon-box')[0];
  let card = document.getElementsByClassName('create-product-form')[0];
  icon.style.display = 'none';
  card.style.display = 'block';
});

document.getElementById('add-product-cancel').addEventListener('click', () => {
  let icon = document.getElementsByClassName('create-product-icon-box')[0];
  let card = document.getElementsByClassName('create-product-form')[0];
  icon.style.display = 'flex';
  card.style.display = 'none';
  let name = document.getElementById('new-product-name');
  let amount = document.getElementById('new-amount');
  name.value = '';
  amount.value = '';
  name.previousElementSibling.classList.remove('active');
  name.nextElementSibling.classList.remove('active');
  amount.previousElementSibling.classList.remove('active');
  amount.nextElementSibling.classList.remove('active');
});

document.getElementById('add-product-button').addEventListener('click', () => {
  let data, keys, products;
  let name = document.getElementById('new-product-name').value.toLowerCase();
  let amountString = document.getElementById('new-amount').value.toLowerCase();
  console.log(name, amountString);
  if (isValidName(name) && isValidNumber(amountString, 'Amount')) {
    let amount = Number(amountString);
    console.log(name, amount);
    [data, keys, products] = localSetup();
    console.log(products);
    if (name in products && amount != products[name]) {
      confirmDelete(
        `${name} is already present in product list with price of ₹${products[name]}.Do you want to overwrite the price ₹${amount}`
      ).then((flag) => {
        if (flag) {
          products[name] = amount;
          localStorage.setItem('products', JSON.stringify(products));
          swal('Overwritten successfully', {
            icon: 'success',
          });
          let n = document.getElementById('new-product-name');
          let a = document.getElementById('new-amount');
          n.value = '';
          a.value = '';
          n.previousElementSibling.classList.remove('active');
          n.nextElementSibling.classList.remove('active');
          a.previousElementSibling.classList.remove('active');
          a.nextElementSibling.classList.remove('active');
        }
      });
    } else if (name in products && amount == products[name]) {
      swal(`${name} is already present in the list with price of ₹${amount}`);
    } else {
      products[name] = amount;
      localStorage.setItem('products', JSON.stringify(products));
      swal(`${name} Added successfully`, {
        icon: 'success',
      });
      productName.push(name);
      displayProducts();
      reloadChart();
      event1();
      let n = document.getElementById('new-product-name');
      let a = document.getElementById('new-amount');
      n.value = '';
      a.value = '';
      n.previousElementSibling.classList.remove('active');
      n.nextElementSibling.classList.remove('active');
      a.previousElementSibling.classList.remove('active');
      a.nextElementSibling.classList.remove('active');
    }
  }
});

//get data from the form
function getUserData() {
  let productName = document
    .getElementById('product-name-timeline')
    .value.toLowerCase();
  let data, keys, products, amount;
  [data, keys, products] = localSetup();
  amount = products[productName];
  let count = document.getElementById('count-timeline').value;
  let flag,
    flag1 = false;

  // console.log(productName, amount, count);

  if (productName === '') {
    alertError('Product Name can not be Empty');
    flag = false;
  }
  if (isValidNumber(count, 'Count')) {
    flag = true;
    flag1 = true;
  }
  if (amount === undefined) {
    swal(
      `${productName} is not found in the product list. To add item to time line you should add to the product list first`,
      {
        icon: 'warning',
      }
    );
    flag = false;
  }

  if (
    productName === '' ||
    count === '' ||
    count <= 0 ||
    amount === undefined
  ) {
    flag = false && flag1;
  } else {
    flag = true && flag1;
  }

  if (flag) {
    document.getElementById('product-name-timeline').value = '';
    document.getElementById('count-timeline').value = '';
    document
      .getElementById('product-name-timeline')
      .previousElementSibling.classList.remove('active');
    document
      .getElementById('product-name-timeline')
      .nextElementSibling.classList.remove('active');
    document
      .getElementById('count-timeline')
      .previousElementSibling.classList.remove('active');
    document
      .getElementById('count-timeline')
      .nextElementSibling.classList.remove('active');
  }
  return [flag, productName, amount, count];
}

// function invokes when add is clicked and add product to local storage and calls displayTimeLine(); to display data
function addProduct() {
  let data, keys, products;
  [data, keys, products] = localSetup();
  let flag, productName, amount, count;
  const arr = getUserData();
  flag = arr[0];
  if (flag) {
    productName = arr[1];
    amount = arr[2];
    count = arr[3];
    let [key, time] = getKey();
    keys[0].unshift(key);
    let x = {};
    x[key] = {
      name: productName,
      amount: +amount,
      count: +count,
      total: amount * count,
      time: time,
    };
    Object.assign(data, x);
    localStorage.setItem('data', JSON.stringify(data));
    localStorage.setItem('keys', JSON.stringify(keys));
    alertError('Item added successfully');

    displayTimeLine();
    reloadChart();
  }
}

document.getElementById('addProduct-timeline').addEventListener('click', () => {
  // console.log('hello');
  addProduct();
});

// function to give collapsible effect in time line data
function changeCollapsible(e) {
  // console.log(e.target.parentElement.nextElementSibling);
  // console.log(e.target.parentElement.children[1])
  try {
    if (e.target.parentElement.children[1].nodeName == 'DIV') {
      if (
        e.target.parentElement.children[1].style.display == '' ||
        e.target.parentElement.children[1].style.display == 'block'
      ) {
        e.target.parentElement.children[1].setAttribute(
          'style',
          'display : none;'
        );
      } else {
        e.target.parentElement.children[1].setAttribute(
          'style',
          'display : block;'
        );
      }
    }
  } catch (error) {}
}

// function to give collapsible effect in all product data
function changeCollapsible2(e) {
  // console.log(e.target.nodeName);
  let ele = e.target.parentElement.nextElementSibling;
  if (e.target.nodeName == 'I') {
    ele = e.target.parentElement.parentElement.nextElementSibling;
  }
  // console.log(ele.nodeName)
  try {
    if (ele.nodeName == 'DIV') {
      if (ele.style.display == '' || ele.style.display == 'block') {
        ele.setAttribute('style', 'display : none;');
      } else {
        ele.setAttribute('style', 'display : block;');
      }
    }
  } catch (error) {
    // console.log(error)
  }
}

function checkForDate(key,index,arr){
  let keyString = (''+key).slice(0,8);
  let nextKeyString = (''+arr[index+1]).slice(0,8);
  console.log(keyString,nextKeyString)
  
  if(keyString !== nextKeyString ){
    return true;
  }
  return false;
  
}

//gets data from local storage and create a html and add to time line every
function displayTimeLine() {
  let data, keys, products;
  [data, keys, products] = localSetup();
  // console.table(data);
  // console.log(keys);
  // console.log(keys[0].length)
  if (keys[0].length > 0) {
    document.getElementsByClassName('time-line')[0].style.display = 'block';
  } else {
    document.getElementsByClassName('time-line')[0].style.display = 'none';
  }
  let collapsible = document.getElementsByClassName('collapsible')[0];
  let html = '';
  console.log(keys[0])
  keys[0].forEach((key,index,arr) => {
    // console.log(data[key]);

    let product = data[key];
    let name = product.name;
    let amount = product.amount;
    let count = product.count;
    let total = product.total;
    let time = new Date(product.time);
    let date = time.getUTCDate();
    let month = time.getMonth();
    let year = time.getFullYear();
    let timing = time.toString().split(' ')[4];
    let day = time.toString().split(' ')[0];
    // console.log(key)
    let dateTimeline = time.toString().split(' ').slice(0,4).join(" ");
    
    
    html += `

    <li class='${key}'>
         <div class="collapsible-header">
             <p class = "p-name">${name}</p>
             <span class="badge"> <b> ( ${count} ) &nbsp; ₹ ${total}</b></span>
             <i class="material-icons delete-icon">cancel</i>
         </div>
         <div class="collapsible-body">
             <p>Price per item :<b> ₹${amount}</b></p>
             <p>Product count  :<b> ${count}</b></p
             <p>Date           :<b> ${date}-${
      month + 1
    }-${year} (${day})</b></p>
             <p>Time           :<b> ${timing}</b><p>
         </div>
    </li>`;
    if(checkForDate(key,index,arr)){
      html +=`<li class="date">
    <div>( ${dateTimeline} )</div>
    </li>`
    }
    
  });


  collapsible.innerHTML = html;

  let collapsibleHeader = document.querySelectorAll('.collapsible-header');
  collapsibleHeader.forEach((ele) =>
    ele.addEventListener('click', (e) => changeCollapsible(e))
  );
  let deleteIcon = document.querySelectorAll('.delete-icon');
  deleteIcon.forEach((ele) =>
    ele.addEventListener('click', (e) => {
      // console.log(e.target.parentElement.parentElement.className);
      let ID = e.target.parentElement.parentElement.className;
      confirmDelete(
        'Once deleted, you will not be able to recover this data!'
      ).then((flag) => {
        if (flag) {
          delete data[ID];
          const index = keys[0].indexOf(+ID);
          if (index > -1) {
            keys[0].splice(index, 1);
          }
          localStorage.setItem('data', JSON.stringify(data));
          localStorage.setItem('keys', JSON.stringify(keys));
          displayTimeLine();
          swal('Data has been deleted!', {
            icon: 'success',
          });
          reloadChart();
        }
      });
      e.preventDefault();
    })
  );
}
displayTimeLine();
reloadChart();

function reloadChart() {
  document
    .getElementsByClassName('chart-1')[0]
    .removeChild(document.getElementById('myChart'));
  let can = document.createElement('canvas');
  can.setAttribute('id', 'myChart');

  document.getElementsByClassName('chart-1')[0].appendChild(can);
  let ctx = document.getElementById('myChart').getContext('2d');

  let data, keys, products;
  [data, keys, products] = localSetup();
  let productArr = [];
  let priceArr = [];
  for (const product in products) {
    productArr.push(product);
    priceArr.push(products[product]);
  }
  // console.log(priceArr);
  // console.log(productArr);

  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: productArr,
      datasets: [
        {
          label: 'Price',
          backgroundColor: 'rgb(255, 79, 132)',
          borderColor: 'rgb(255, 79, 132)',
          data: priceArr,
        },
      ],
    },

    // Configuration options go here
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  document
    .getElementsByClassName('chart-2')[0]
    .removeChild(document.getElementById('myChart2'));
  let can2 = document.createElement('canvas');
  can2.setAttribute('id', 'myChart2');

  document.getElementsByClassName('chart-2')[0].appendChild(can2);
  let ctx2 = document.getElementById('myChart2').getContext('2d');
  let totalPrice = [];
  productArr.forEach((p) => {
    let sum = 0;
    keys[0].forEach((key) => {
      if (data[key].name == p) {
        // console.log(data[key].name);
        sum += data[key].total;
      }
    });
    totalPrice.push(sum)
  });

  let chart2 = new Chart(ctx2, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: productArr,
      datasets: [
        {
          label: 'Price',
          backgroundColor: 'rgb(255, 79, 132)',
          borderColor: 'rgb(255, 79, 132)',
          data: totalPrice,
        },
      ],
    },

    // Configuration options go here
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
