let addList = () => {
    var title = document.getElementById("toDoInput").value;

    const firebaseRef = firebase.database().ref("MyList");
    firebaseRef.push({
        title : title,
    })

    alert("Add list complete!");
    document.getElementById("toDoInput").value = "";
}