var user = firebase.database().ref("user");
var product = firebase.database().ref("product");
var soldRec = firebase.database().ref("soldRec");
var catagory = firebase.database().ref("catagory");

let CATAGORY_LIST_CONTAINER = document.querySelector(".catg-list");

let user_data;
let prod_data;
let sold_data;
let catg_data;

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
      downloadContent(prod_data);
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

function downloadContent(product){
  let getProduct = document.location.search.replace(/^.*?\=/,"");
  const container = document.querySelector("#preview");

  const imgContent = document.createElement("div");
  imgContent.classList.add("col-md-6");
  imgContent.id = "image";
  const imgPreview = document.createElement("img");
  imgPreview.classList.add("preview");

  for (let j in product[getProduct].images) {
    imgPreview.src = product[getProduct].images[j];
    imgPreview.dataset.reval = j;
    imgContent.appendChild(imgPreview);
    console.log(product[getProduct].images[j]);
    break;
  }

  //const bar = document.createElement("div");
  const slider = document.createElement("div");
  slider.classList.add("slider");
  const slideInner = document.createElement("div");
  slideInner.classList.add("slider-inner");
  let slideNum = 0;

  for (let j in product[getProduct].images) {
    slideNum += 1;
    const imgButton = document.createElement("button");
    imgButton.classList.add("slide-border");
    const image = document.createElement("img");
    image.classList.add("slide-img");
    image.src = product[getProduct].images[j];

    imgButton.appendChild(image);
    slideInner.appendChild(imgButton);
  }

  slideInner.dataset.num = slideNum;
  slideInner.style.width = "calc(100px * " + slideNum + ")"
  slider.appendChild(slideInner);
  imgContent.appendChild(slider);
  container.appendChild(imgContent);

  const datailContent = document.createElement("div");
  datailContent.classList.add("col-md-6");
  datailContent.id = "detail"

  const tag = document.createElement("div");
  const taglink = document.createElement("a");
  taglink.innerHTML = "smartphone";
  tag.appendChild(taglink);
  datailContent.appendChild(tag);

  const name = document.createElement("div");
  name.innerHTML = product[getProduct].name;
  name.id = "name";
  datailContent.appendChild(name);

  const brand = document.createElement("div");
  brand.innerHTML = product[getProduct].brand;
  brand.id = "brand";
  datailContent.appendChild(brand);

  const price = document.createElement("div");
  price.innerHTML = "฿" + toPrice(product[getProduct].price);
  price.id = "price";
  datailContent.appendChild(price);

  const status = document.createElement("div");
  if (product[getProduct].quantity > 0) {
    status.innerHTML = "In stock";
    status.classList.add("inStock");
  }
  else {
    status.innerHTML = "Out stock";
    status.classList.add("outStock");
  }
  status.id = "status";
  datailContent.appendChild(status);

  const addContain = document.createElement("div");
  const inpCol = document.createElement("div");
  const inpControl = document.createElement("div");
  const label = document.createElement("label");
  const plus = document.createElement("button");
  const minus = document.createElement("button");
  const input = document.createElement("input");
  const btnCol = document.createElement("div");
  const button = document.createElement("button");

  addContain.classList.add("row");
  inpCol.classList.add("col-md-6");
  inpControl.classList.add("input-group");
  btnCol.classList.add("col-md-6");
  btnCol.classList.add("addCart");

  label.for = "input-group";
  label.innerHTML = "Quantity"
  inpCol.appendChild(label);

  plus.innerHTML = "+";
  plus.classList.add("btn");
  plus.classList.add("btn-outline-secondary");
  minus.innerHTML = "-";
  minus.classList.add("btn");
  minus.classList.add("btn-outline-secondary");
  input.type = "number";
  input.id = "quantity";
  input.classList.add("form-control");
  input.min = "1";
  input.max = product[getProduct].quantity;

  inpControl.appendChild(plus);
  inpControl.appendChild(input);
  inpControl.appendChild(minus);
  inpCol.appendChild(inpControl);
  addContain.appendChild(inpCol);

  button.innerHTML = "Add to cart";
  btnCol.appendChild(button);
  addContain.appendChild(btnCol);
  datailContent.appendChild(addContain);

  const description = document.createElement("div");
  description.innerHTML = product[getProduct].description;
  description.id = "desc";
  datailContent.appendChild(description);

  container.appendChild(datailContent);
}

function toPrice(num){
  let newNum = num;
  let text = newNum % 1000 + "";
  newNum = Math.floor(newNum / 1000);
  while(newNum > 1000) {
    text = newNum % 1000 + "," + text;
    newNum = Math.floor(newNum / 1000);
  }
  text = newNum + "," + text;
  return text;
}

window.onload = getData();