'use strict';
function displayProducts() {
  let data, keys, product;
  [data, keys, product] = localSetup();
  let html = '';
  for (let p in product) {
    html += `
        <div class="all-product">
          <div class="collapsible-header-2">
            <div class="row">
              <p class = "name-p col ">${p}</p>
              <i class="material-icons col 
              right info">info_outline</i>
              <span class="badge col right info"> <b>₹ ${product[p]}</b></span>
            </div>

          </div>
          <div class="collapsible-body-2"  
                style="display: none;">
                  <p>Product name   :<b class="cap">${p}</b></p>
                  <p>Price per item :<b>₹ ${product[p]}</b></p>
                  <div class="row" style="display:block; ">
                  <button class="btn btn-small waves-effect waves-light light-blue darken-2 edit-product-details col right"      type="submit" name="action" style="display:block; ">edit
                  </button>
                  <button class="btn btn-small waves-effect waves-light  red lighten-1 delete-product-details col right"       type="submit" name="action" style="display:block; ">delete
                    
                  </button>
                  </div>
                  <div class="edit" style="display:none;">
                          <div class="input-field col s12">
                              <i class="material-icons prefix ">    shopping_cart</i>
                              <input type="text" id="edit-product-name-${p}">
                              <label for="edit-product-name-${p}"     class="">New Product Name</label>
                          </div>
        
                      <div class="input-field col s12">
                          <i class="material-icons prefix"> monetization_on</i>
                          <input type="text" inputmode="numeric"         id="edit-amount-${p}">
                          <label for="edit-amount-${p}">New Amount Per Unit</label>
                      </div>
                      <div class="row">
                           <button class="btn btn-small waves-effect waves-light right light-blue darken-2 edit-product-button" name="action"
                             >save
                             
                         </button>
                         <button class="btn btn-small waves-effect waves-light right light-blue darken-2 edit-product-cancel" s name="action"
                             >cancel
                             
                         </button>
                      </div>
                  </div>
                  
          </div>
          
        </div>`;
  }
  document.getElementsByClassName('all-products')[0].innerHTML = html;
}
displayProducts();
document.getElementById('search-products').addEventListener('keyup', () => {
  let products = document.querySelectorAll('.collapsible-header-2');
  let searchName = document
    .getElementById('search-products')
    .value.toLowerCase();
  products.forEach((product) => {
    let productName = product.firstElementChild.firstElementChild.textContent.toLowerCase();
    console.log(product.firstElementChild.firstElementChild.textContent);
    if (productName.includes(searchName)) {
      product.parentElement.style.display = 'block';
    } else {
      product.parentElement.style.display = 'none';
    }
  });
});
function event1() {
  let collapsibleHeader2 = document.querySelectorAll('.collapsible-header-2');

  collapsibleHeader2.forEach((ele) => {
    ele.addEventListener('click', (e) => changeCollapsible2(e));
  });

  document.querySelectorAll('.edit-product-details').forEach((product) => {
    product.addEventListener('click', (product) => {
      // console.log(product ,product.target)
      if (
        product.target.parentElement.nextElementSibling.style.display == 'none'
      ) {
        product.target.parentElement.nextElementSibling.style.display = 'block';
        product.target.parentElement.style.display = 'none';
      } else {
        product.target.parentElement.nextElementSibling.style.display = 'none';
        product.target.parentElement.style.display = 'block';
      }
    });
  });

  document.querySelectorAll('.edit-product-cancel').forEach((btn) => {
    btn.addEventListener('click', (ele) => {
      // console.log(ele.target.parentElement.parentElement);
      ele.target.parentElement.parentElement.previousElementSibling.style.display =
        'block';
      ele.target.parentElement.parentElement.style.display = 'none';
    });
  });

  //delete product form product list
  document.querySelectorAll('.delete-product-details').forEach((ele) => {
    ele.addEventListener('click', (e) => {
      let name =
        e.target.parentElement.parentElement.firstElementChild.firstElementChild
          .textContent;
      deleteProduct(name);
    });
  });
  document.querySelectorAll('.edit-product-button').forEach((ele) => {
    ele.addEventListener('click', (e) => {
      editProductDetail(
        e,
        e.target.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.innerText.toLowerCase()
      );
    });
  });
}

event1();

function deleteProduct(na) {
  confirmDelete(
    'Once deleted, your all product details related to this product will be deleted permanently  '
  ).then((flag) => {
    if (flag) {
      let [data, keys, products] = localSetup();

      // console.log(products[na]);
      let x = [];
      x = [...keys[0]];
      delete products[na];
      x.forEach((key) => {
        // console.log(data[key].name == na)
        // console.log(key)
        if (data[key].name == na) {
          const index = keys[0].indexOf(key);
          if (index > -1) {
            keys[0].splice(index, 1);
          }

          delete data[key];
        }
      });

      localStorage.setItem('products', JSON.stringify(products));
      localStorage.setItem('data', JSON.stringify(data));
      localStorage.setItem('keys', JSON.stringify(keys));
      displayProducts();
      displayTimeLine();
      autoComplete();
      reloadChart();
      event1();

      swal('Product has been deleted!', {
        icon: 'success',
      });
    }
  });
}

function editProductDetail(e, pName) {
  // console.log(pName);
  let newAmount = e.target.parentElement.parentElement.firstElementChild.nextElementSibling.children[1].value.toLowerCase();
  let newName = e.target.parentElement.parentElement.firstElementChild.children[1].value.toLowerCase();
  if (isValidName(newName) && isValidNumber(newAmount, 'Amount')) {
    if (productName.indexOf(newName) == -1 || newName == pName) {
      confirmDelete(
        'Once changed all the data related to this product will be changed accordingly'
      ).then((flag) => {
        if (flag) {
          changeDetails(pName, newName, newAmount);
        }
      });
    } else {
      swal(
        `${newName} is already found in the product list and can not be rename the same`,
        {
          icon: 'warning',
        }
      );
    }
  }
  reloadChart();
}

function changeDetails(pName, newName, newAmount) {
  let data, keys, products;
  [data, keys, products] = localSetup();
  let pAmount = products[pName];
  newAmount = +newAmount;
  console.log(pName, pAmount, newName, newAmount);
  if (pName == newName && pAmount == newAmount) {
    alertError('The name and amount are same as previous');
  } else if (pName == newName && pAmount != newAmount) {
    changeAmount(pName, newAmount);
    swal('Product details has been changed successfully', {
      icon: 'success',
    });
  } else if (pName != newName && pAmount == newAmount) {
    changeName(pName, newName);
    swal('Product details has been changed successfully', {
      icon: 'success',
    });
  } else if (pName != newName && pAmount != newAmount) {
    changeAmount(pName, newAmount);
    changeName(pName, newName);
    swal('Product details has been changed successfully', {
      icon: 'success',
    });
  }
  reloadChart();
}

function changeAmount(pName, newAmount) {
  let data, keys, products;
  [data, keys, products] = localSetup();
  products[pName] = newAmount;
  keys[0].forEach((key) => {
    if (data[key].name == pName) {
      data[key].amount = newAmount;
      data[key].total = newAmount * data[key].count;
    }
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('data', JSON.stringify(data));

    displayProducts();
    displayTimeLine();
    autoComplete();
    // reloadChart();
    event1();
  });
}

function changeName(pName, newName) {
  let data, keys, products;
  [data, keys, products] = localSetup();
  products[newName] = products[pName];
  delete products[pName];
  keys[0].forEach((key) => {
    if (data[key].name == pName) {
      data[key].name = newName;
    }
  });
  localStorage.setItem('products', JSON.stringify(products));
  localStorage.setItem('data', JSON.stringify(data));

  displayProducts();
  displayTimeLine();
  autoComplete();
  // reloadChart();
  event1();

}
