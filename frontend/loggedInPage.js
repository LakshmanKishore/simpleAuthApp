window.onload = function () {
  let username = document.querySelector(".username");
  let logoutButton = document.querySelector(".logoutButton");
  let userDetailsDiv = document.querySelector(".userDetailsDiv");
  
  // assuming "/protected" is a private endpoint
  const loggedInPageData = async () => {
    // retrieve token form localStorage
    const token = localStorage.getItem('jwt-token');
    
    const resp = await fetch(`http://127.0.0.1:5000/protected`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token // ⬅⬅⬅ authorization token
      }
    })
    
    const data = await resp.json();
    username.innerHTML = data.username;
    console.log("Authenticated userid:", data.id);
    console.log("Authenticated username:", data.username);
    userDetailsDiv.innerHTML += `<h3>Authenticated userid: ${data.id}</h3>`
    userDetailsDiv.innerHTML += `<h3>Authenticated username: ${data.username}</h3>`
    return data
  }

  if(!localStorage.getItem("jwt-token")){
    console.log("You are not logged in!")
    location.href = "/frontend/login.html";
  } else {
    loggedInPageData();
  }

  const handleLogout = () => {
    localStorage.removeItem("jwt-token");
    location.href = "/frontend/home.html";
  }

  logoutButton.addEventListener("click",handleLogout)

  
  

}