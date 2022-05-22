window.onload = function() {
  let body = document.querySelector("body");
  let loginButton = document.querySelector(".loginButton");
  
  if(localStorage.getItem("jwt-token")){
    console.log("Already Logged in!!");
    // Can be routed to loggedInPage
    // location.href = "/frontend/loggedInPage.html";

    // Or give a link to view the LoggedInPage route
    loginButton.hidden = true;
    body.innerHTML += "You have already Logged in, so you can : <a href = '/frontend/loggedInPage.html'>View Logged In Page</a>"
  }

  const handleLogin = () => {
    location.href = "/frontend/login.html";
  }

  loginButton.addEventListener("click",handleLogin);
}