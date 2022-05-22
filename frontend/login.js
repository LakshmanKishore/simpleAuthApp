let submitButton = document.querySelector(".submitButton");
let username = document.querySelector("#username");
let password = document.querySelector("#password");

const login = async (e,username, password) => {
  e.preventDefault();
  const resp = await fetch(`http://127.0.0.1:5000/login`, { 
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ username: username, password: password }) 
  })

  if(resp.status === 401){
    alert("Invalid credentials")
  }
  
  if(!resp.ok) throw Error("There was a problem in the login request")

  const data = await resp.json()
  console.log(data);
  localStorage.setItem("jwt-token", data.token);
  location.href = "/frontend/loggedInPage.html"
}

submitButton.addEventListener("click",(e)=>login(e,username.value,password.value));

if(localStorage.getItem("jwt-token")){
  console.log("Already Logged in!!");
  // Can be routed to loggedInPage
  location.href = "/frontend/loggedInPage.html";
}

