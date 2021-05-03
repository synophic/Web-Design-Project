var user = firebase.database().ref("user");
var product = firebase.database().ref("product");
var soldRec = firebase.database().ref("soldRec");
var catagory = firebase.database().ref("catagory");

let CATAGORY_LIST_CONTAINER = document.querySelector(".catg-list");

let SLIDER = document.querySelector(".slider");
let INNER_SLIDER = document.querySelector(".slider-inner");

let pressed = false;
let startx;
let x;

let user_data;
let prod_data;
let sold_data;
let catg_data;

SLIDER.addEventListener('mousedown', (event) => {
  pressed = true;
  startx = event.offsetX - INNER_SLIDER.offsetLeft;
  SLIDER.style.cursor = 'grabbing';
});

SLIDER.addEventListener('mouseenter', () => {
  SLIDER.style.cursor = 'grab';
})

SLIDER.addEventListener('mouseup', () => {
  SLIDER.style.cursor = 'grab';
});

window.addEventListener('mouseup', () => {
  pressed = false;
});

SLIDER.addEventListener('mousemove', (event) => {
  if (!pressed) return;
  event.preventDefault();
  x = event.offsetX;
  INNER_SLIDER.style.left = `${x - startx}px`;
});

function checkboundary() {
  let outer = SLIDER.getBoundingClientRect();
  let inner = INNER_SLIDER.getBoundingClientRect();

  if (parseInt(INNER_SLIDER.style.left) > 0) {
    INNER_SLIDER.style.left = '0px';
  }
  else if (inner.right < outer.right) {
    INNER_SLIDER.style.left = `-${inner.width - outer.width}px`
  }
}

checkboundary();

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
  soldRec.orderByChild("id").on("value", (snapshot) => {
    if (snapshot.exists()) {
    	sold_data = snapshot.val();
    } else {
      console.log("No Sold record data available");
      sold_data = "";
    }
  });
  catagory.orderByChild("id").on("value", (snapshot) => {
    if (snapshot.exists()) {
    	catg_data = snapshot.val();
    	renderCatagoryList(catg_data);
    } else {
      console.log("No Catagory data available");
      catg_data = "";
    }
  });

}

function renderCatagoryList(catagoryList){
	CATAGORY_LIST_CONTAINER.innerHTML = "";
	for (let i in catagoryList) {
		CATAGORY_LIST_CONTAINER.appendChild(
			createCatagoryList(catagoryList[i])
			);
	}
}

function createCatagoryList(text){
	const li = document.createElement("li");
	const a = document.createElement("a");
	li.classList.add("catg-item");
	a.innerHTML = text;
	li.appendChild(a);
	return li;
}

window.onload = getData();