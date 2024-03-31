let modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}


loadUser();

function login(){

    let name = document.getElementById("userName").value;
    let password = parseInt(document.getElementById("password").value);

    let userData = {

        name : name,
        password : password
    }

    if(name != "")
    {

        let userDataString= JSON.stringify(userData);
        localStorage.setItem("userData",userDataString)
    }

    fetch("users.json")
    .then(result => { return result.json()})
    .then(obj => obj.map(user => new User(user.name, user.password)))
    .then(listUsers => {
        let flag = false;
        listUsers.forEach(u => {
            if(!flag){
                flag = u.exist(name, password)
            }  
        });
        if(flag===true){
            window.location.href ="library.html";
        }
        else{
            alert("שם משתמש או הסיסמא אינם נכונים")
        }
    
    })

}


function loadUser(){

    let userDataStr = localStorage.getItem("userData");
    let userObj = JSON.parse(userDataStr);

    if(userObj != undefined )
        {
            document.getElementById("userName").value = userObj.name;
            document.getElementById("password").value = userObj.password;
        }

}
