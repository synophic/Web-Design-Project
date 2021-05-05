var user = firebase.database().ref("user");
var product = firebase.database().ref("product");
var soldRec = firebase.database().ref("soldRec");
var catagory = firebase.database().ref("catagory");

const signIn = document.querySelector("#signIn");
const signUp = document.querySelector("#signUp");
const account = document.querySelector("#account");

let user_data;
let prod_data;
let sold_data;
let catg_data;

function userCheck() {

  var user = firebase.auth().currentUser;
  if (user == null) {
    signIn.style.display = "flex";
    signUp.style.display = "none";
    account.style.display = "none";
  }
  else if (user != null) {
    signIn.style.display = "none";
    signUp.style.display = "none";
    account.style.display = "flex";
  }
}

function userSignOut() {
  firebase.auth().signOut().then(() => {
    signIn.style.display = "flex";
    signUp.style.display = "none";
    account.style.display = "none";
  }).catch((error) => {
  // An error happened.
  });
}

function toSignUp() {
  signIn.style.display = "none";
  signUp.style.display = "flex";
  account.style.display = "none";
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
    } else {
      console.log("No Catagory data available");
      catg_data = "";
    }
  });
}

window.onload = userCheck();