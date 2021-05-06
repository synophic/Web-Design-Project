var user = firebase.database().ref("user");
var product = firebase.database().ref("product");
var soldRec = firebase.database().ref("soldRec");
var catagory = firebase.database().ref("catagory");

const signIn = document.querySelector("#signIn");
const signUp = document.querySelector("#signUp");
const account = document.querySelector("#account");

let uid;
let user_data;
let prod_data;
let sold_data;
let catg_data;

firebase.auth().on

function userCheck() {

  var user = firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      signIn.style.display = "none";
      signUp.style.display = "none";
      account.style.display = "flex";
      document.querySelector("#name").innerHTML = user_data[user.uid].name + " " + user_data[user.uid].surName;
      console.log(user);
    } else {
      signIn.style.display = "flex";
      signUp.style.display = "none";
      account.style.display = "none";
    }
  });
}

function userSignOut() {
  firebase.auth().signOut().then(() => {
    
  }).catch((error) => {
  // An error happened.
  });
  userCheck();
}

function toSignUp() {
  signIn.style.display = "none";
  signUp.style.display = "flex";
  account.style.display = "none";
}

function userSignUp() {
  const email = document.querySelector("#signUpEmail").value;
  const password = document.querySelector("#signUpPassword").value;
  const name = document.querySelector("#signUpName").value;
  const surname = document.querySelector("#signUpSName").value;
  const age = document.querySelector("#signUpAge").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    var user = userCredential.user;
    firebase.database().ref("user/" + user.uid).set({
      "name": name,
      "surName": surname,
      "age": age
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
    userCheck();
    console.log("add data complete")
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

function userSignIn() {
  const email = document.querySelector("#signInEmail").value;
  const password = document.querySelector("#signInPassword").value;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    userCheck();
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

function getData() {
  user.orderByChild("id").on("value", (snapshot) => {
    if (snapshot.exists()) {
    	user_data = snapshot.val();
      userCheck();
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

window.onload = getData();