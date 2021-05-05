function GoogleLogin(){
  let provider = new firebase.auth.GoogleAuthProvider();

  console.log('Login Btn Call');
  firebase.auth().signInWithPopup(provider).then(result =>{
    console.log(result.user);
    checkAuthState();
  })
}

function checkAuthState(){
  firebase.auth().onAuthStateChanged(user=>{
    if(user){

    }else{

    }
  })
}
  

    //   function LogoutUser(){
    //     console.log('Logout Btn Call')
    //     firebase.auth().signOut().then(()=>{
    //       document.getElementById('LoginScreen').style.display="block"
    //       document.getElementById('dashboard').style.display="none"
    //     }).catch(e=>{
    //       console.log(e)
    //     })
    //   }
    //   checkAuthState()