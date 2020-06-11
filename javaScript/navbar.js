class Interface {
    constructor() {
        this.navbarItems = document.querySelector("#nav-bar");
      }
      showNavBar() {
          const data = parseJwt();
          const role = data.role;
          if(role === 1 || role === 0){
            let output = "";
            if(role === 1) {
                output += `
                
                <ul>
                  <li>
                    <i class="fas fa-home"></i>
                    <a href="index.html">Home</a>
                  </li>
                  <li>
                    <i class="fas fa-motorcycle"></i>
                    <a href="automible.html">Automobiles</a>
                  </li>
                  <li>
                    <i class="fas fa-users"></i>
                    <a href="executivesList.html">Executives</a>
                  </li>
                  <li>
                    <i class="fas fa-pen"></i>
                    <a href="customers.html">Register Customers</a>
                  </li>
                  <li>
                    <i class="fas fa-users"></i>
                    <a href="customersList.html">Customers</a>
                  </li>
                  <li>
                    <i class="fas fa-money"></i>
                    <a href="payments.html">Pay Loan</a>
                  </li>
                  <li>
                    <i class="fas fa-user"></i>
                    <a href="customerDetails.html">Customer Details</a>
                  </li>
                  <li class="last-li">
                  <i class="fas fa-sign-out-alt"> &nbsp;
                  <a href="login.html">Logout</a>
                  </i>
                  </li>
                </ul>
                  `
            }else {
                output += `
                <ul>
                  <li>
                    <i class="fas fa-pen"></i>
                    <a href="customers.html">Register Customers</a>
                  </li>
                  <li>
                    <i class="fas fa-users"></i>
                    <a href="customersList.html">Customers</a>
                  </li>
                  <li>
                    <i class="fas fa-money"></i>
                    <a href="payments.html">Pay Loan</a>
                  </li>
                  <li>
                    <i class="fas fa-user"></i>
                    <a href="customerDetails.html">Customer Details</a>
                  </li>
                  <li class="last-li">
                  <i class="fas fa-sign-out-alt"> &nbsp;
                  <a href="login.html">Logout</a>
                  </i>
                  </li>
                </ul>
                  `
            }
            this.navbarItems.innerHTML = output;
          }else{
            location.href = "./login.html";
          }
        
      }
  }
  const uinterface = new Interface()
  document.addEventListener("DOMContentLoaded", uinterface.showNavBar());

  function parseJwt () {
    token = localStorage.getItem("token");
    if(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }else{
        location.href = "./login.html";
    }
  };