// var user = firebase.database().ref("user");
var Payment_slip = firebase.database().ref("img_slip");
// var catagory = firebase.database().ref("catagory");

let CATAGORY_LIST_CONTAINER = document.querySelector(".catg-list");

let day_data;
let time_data;

function getData() {

  img_slip.orderByChild("id").on("value", (snapshot) => {
    if (snapshot.exists()) {
      user_data = snapshot.val();
    } else {
      console.log("No User data available");
      user_data = "";
    }
  });

  // 1.3) Get "runId" value from Realtime database. then store data to "RUN_ID" variable.
}

function uploadData() {
  let name = document.querySelector("#name").value;
  let brand = document.querySelector("#brand").value;
  

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
      "description": desc
    });

    for (var i = 0; i < document.querySelector("#files").files.length; i++) {
      let file = document.querySelector("#files").files[i];
      let date = new Date().getTime();

      let thisRef = storageRef.child(newProdRef.key + "/" + date + "_" + file.name);

      thisRef.put(file).then((snapshot) => {
        thisRef.getDownloadURL().then((url) => {
          newProdRef.child("images").push(url);
        });
      }).catch(e => {
        console.log('Error' + e);
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
}

window.onload = getData();