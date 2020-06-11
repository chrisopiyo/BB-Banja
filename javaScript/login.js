class loginHTTP {
    async postHttp(url, data) {
      const response = await fetch(url, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const resData = await response.json();
      return resData;
    }
    
  }
    
  const http = new loginHTTP();
  document.querySelector("#loginExecutive").addEventListener("click", login);   
 
/*.LOGIN.*/
  function login(event) {
    document.getElementById("spinner").classList.remove("default");
    event.preventDefault();

    const password = document.querySelector("#password").value;
    const email = document.querySelector("#user_email").value;
  
    const data = {
        password,
        email
    }; 

        http
          .postHttp("https://boda-boda-banja-back.herokuapp.com/excutives/login", data)
          .then(response => {
              if(response.message && response.message === "Success") {
                localStorage.setItem("token", response.token)
                location.href = "./customers.html";
              }else{
                document.getElementById("error").innerHTML = "Authentication credentials invalid";
                document.getElementById("error").classList.remove("default");
              }
          })
          .catch(err => console.log(err))
          .finally(done => {
            document.getElementById("spinner").classList.add("default"); 
          });
  }
  
  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateLoginEmail() {
  const email = document.getElementById("user_email").value;
  console.log(email)
  if(validateEmail(email)){
    document.getElementById("user_email").classList.remove("email-invalid");
    document.getElementById("user_email").classList.add("email-valid");
  }else{
    console.log("invalid")
    document.getElementById("user_email").classList.remove("email-valid");
    document.getElementById("user_email").classList.add("email-invalid");
  }
}