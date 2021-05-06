var user = firebase.database().ref("user");
var product = firebase.database().ref("product");
var cart = firebase.database().ref("cart");

let user_data;
let prod_data;
let cart_data;

function createCart(data) {
  var user = firebase.auth().currentUser;
  const container = document.querySelector(".cart-list")
  if (user) {
    for (let j in data[user.uid]) {
      const item = document.createElement("div");
      item.classList.add("cart-item");

      const img_border = document.createElement("div");
      img_border.classList.add("img-border");
      const image = document.createElement("img");
      image.src = getImg(j);
      img_border.appendChild(image);
      item.appendChild(img_border);

      const info_border = document.createElement("div");
      info_border.classList.add("Info-border");
      const name = document.createElement("h1");
      name.innerHTML = prod_data[j].name;
      const brand = document.createElement("h5");
      brand.innerHTML = prod_data[j].brand;
      info_border.appendChild(name);
      info_border.appendChild(brand);
      item.appendChild(info_border);

      const qty_border = document.createElement("div");
      qty_border.classList.add("qty-border");
      const quantity = document.createElement("h2");
      quantity.innerHTML = data[user.uid][j] + "pcs";
      qty_border.appendChild(quantity);
      item.appendChild(qty_border);

      const pce_border = document.createElement("div");
      pce_border.classList.add("pce-border");
      const price = document.createElement("h2");
      price.innerHTML = "฿ " + toPrice(prod_data[j].price * data[user.uid][j]);
      pce_border.appendChild(price);
      item.appendChild(pce_border);

      const button = document.createElement("button");
      button.innerHTML = "purchase"
      button.classList.add("submit-btn");
      item.appendChild(button);

      container.appendChild(item);
    }
  } else {
    // No user is signed in.
  }
}

function getImg(ID) {
  for (var i in prod_data[ID].images) {
    return prod_data[ID].images[i];
  }
}

function getData() {
  user.orderByChild("id").on("value", (snapshot) => {
    if (snapshot.exists()) {
    	user_data = snapshot.val();
    } else {
      console.log("No User data available");
      user_data = "";
      }
  });

  product.orderByChild("id").on("value", (snapshot) => {
    if (snapshot.exists()) {
    	prod_data = snapshot.val();
    } else {
      console.log("No Product data available");
      prod_data_data = "";
    }
  });

  cart.orderByChild("id").on("value", (snapshot) => {
    if (snapshot.exists()) {
    	cart_data = snapshot.val();
      createCart(cart_data);
    } else {
      console.log("No Sold record data available");
      cart_data = "";

    }
  });
}

function toPrice(num){
  let newNum = num;
  let text = newNum % 1000 +"";
  console.log("value: " + num + " text: " + text.length);
  if (text.length == "1") text = "00" + text;
  else if (text.length == "2") text = "0" + text;
  let allText = text;
  newNum = Math.floor(newNum / 1000);
  while(newNum > 1000) {
    text = newNum % 1000 +"";
    if (text.length == 1) text = "00" + text;
    else if (text.length == 2) text = "0" + text;
    newNum = Math.floor(newNum / 1000);
    allText = text + "," + allText;
  }
  allText = newNum + "," + allText;
  return allText;
}

window.onload = getData();