var user = firebase.database().ref("user");
var product = firebase.database().ref("product");
var soldRec = firebase.database().ref("soldRec");
var catagory = firebase.database().ref("catagory");



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
      // 1.2) Set Display condition: When it doesn't have any data you must hide a remove button.
    }
  });
  product.orderByChild("id").on("value", (snapshot) => {
    if (snapshot.exists()) {
    	prod_data = snapshot.val();
    } else {
      console.log("No Product data available");
      prod_data_data = "";
      // 1.2) Set Display condition: When it doesn't have any data you must hide a remove button.
    }
  });
  soldRec.orderByChild("id").on("value", (snapshot) => {
    if (snapshot.exists()) {
    	sold_data = snapshot.val();
    } else {
      console.log("No Sold record data available");
      sold_data = "";
      // 1.2) Set Display condition: When it doesn't have any data you must hide a remove button.
    }
  });
  catagory.orderByChild("id").on("value", (snapshot) => {
    if (snapshot.exists()) {
    	catg_data = snapshot.val();
    	renderCatagoryList(catg_data);
    } else {
      console.log("No Catagory data available");
      catg_data = "";
      // 1.2) Set Display condition: When it doesn't have any data you must hide a remove button.
    }
  });

  // 1.3) Get "runId" value from Realtime database. then store data to "RUN_ID" variable.
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

function renderProductCard(product){
  const row = document.querySelector("#list");
  for (let items in product) {
    const contain = document.createElement("div");
    const card = document.createElement("div");
    const image = document.createElement("img");
    const name = document.createElement("h3");
    const value = document.createElement("p");
    

    contain.dataset.product = items;
    contain.style.cursor = 'Default';
    


    for (let j in product[items].images) {
      image.src = product[items].images[j];
      break;
    }

    name.innerHTML = product[items].name;
    value.innerHTML = "฿" + toPrice(product[items].price);
    

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(value);
    

    contain.appendChild(card);

    row.appendChild(contain);
  }

	const li = document.createElement("li");
	const a = document.createElement("a");
	li.classList.add("catg-item");
	a.innerHTML = text;
	li.appendChild(a);
	return li;

}

window.onload = getData();