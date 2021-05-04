firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
	  // User is signed in.
  
	
  
	  var user = firebase.auth().currentUser;
  
	  if(user != null){
  
		var email_id = user.email;
		console.log(user.email)
		window.location.href = 'index.html';
	  }
  
	} else {
	  // No user is signed in.
  
	
  
	}
  });
  function register(){
  console.log(1);
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });

}