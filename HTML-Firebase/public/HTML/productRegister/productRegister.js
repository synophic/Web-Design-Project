var userRef = firebase.database().ref("user");
var productRef = firebase.database().ref("product");
var catagoryRef = firebase.database().ref("catagory");

let storageRef = firebase.storage().ref("product");

let user_data;
let prod_data;
let catg_data;

function getData() {
  userRef.orderByChild("id").on("value", (snapshot) => {
    if (snapshot.exists()) {
    	user_data = snapshot.val();
    } else {
      console.log("No User data available");
      user_data = "";
    }
  });
  productRef.orderByChild("id").on("value", (snapshot) => {
    if (snapshot.exists()) {
    	prod_data = snapshot.val();
    } else {
      console.log("No Product data available");
      prod_data_data = "";
    }
  });
  catagoryRef.orderByChild("id").on("value", (snapshot) => {
    if (snapshot.exists()) {
    	catg_data = snapshot.val();
      addCatagoryChoice(catg_data);
    } else {
      console.log("No Catagory data available");
      catg_data = "";
    }
  });
}

function addCatagoryChoice(catagory) {
  let select = document.querySelector("#catagory");
  for (let i in catagory) {
    let option = document.createElement("option");
    option.innerHTML = catagory[i];
    option.value = catagory[i];
    select.appendChild(option);
  }
}

function uploadData() {
  let name = document.querySelector("#name").value;
  let brand = document.querySelector("#brand").value;
  let quantity = document.querySelector("#quantity").value;
  let price = document.querySelector("#price").value;
  let desc = document.querySelector("#desc").value;
  let catagory = document.querySelector("#catagory").value;

  var user = firebase.auth().currentUser;

  if (user) {
    if ((name != "") && 
      (brand != "") &&
      (quantity != 0) &&
      (price != 0) &&
      (desc != "") &&
      document.querySelector("#files").files.length != 0) {
      let newProdRef = productRef.push({
        "name": name,
        "brand": brand,
        "quantity": parseFloat(quantity),
        "price": parseInt(price),
        "description": desc,
        "catagory": catagory,
        "user": user.uid
      });

      for (var i = 0; i < document.querySelector("#files").files.length; i++) {
        let file = document.querySelector("#files").files[i];
        let date = new Date().getTime();

        let thisRef = storageRef.child(newProdRef.key + "/" + date + "_" + file.name);
        
        thisRef.put(file).then((snapshot) => {
          thisRef.getDownloadURL().then((url) =>{
            newProdRef.child("images").push(url);
          });
        }).catch(e=>{
          console.log('Error'+e);
        });
      }
      alert("Upload Success")

    }
    else {
      if (name == "") document.querySelector("#nameAlert").style.display = "initial";
      if (brand == "") document.querySelector("#nameAlert").style.display = "initial";
      if (quantity == "") document.querySelector("#nameAlert").style.display = "initial";
      if (price == "") document.querySelector("#nameAlert").style.display = "initial";
      if (document.querySelector("#files").files.length == 0) document.querySelector("#nameAlert").style.display = "initial";
    }
  } else {
    window.document.location = "../account/account.html"
  }
}

window.onload = getData();