class AutoMobile {
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

    async getHttp(url) {
        const response = await fetch(url);
        const resData = await response.json();
        return resData;
      }

  }

  class UserInterface {
    constructor() {
        this.autoMobiles = document.querySelector("#auto-grid");
      }
      showAutoMobile(autoMobiles) {
        let output = "";

        autoMobiles.forEach(autoMobile => {
          output += `
            <div class="card-body-grid">
              <div class="card-body-grid-item">${autoMobile.name}</div>
              <div class="card-body-grid-item">Ugx ${autoMobile.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
              <div class="card-body-grid-item">${autoMobile.quantity}</div>
              <div class="card-body-grid-item">Ugx ${autoMobile.downPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
              <div class="card-body-grid-item">${autoMobile.duration} Years</div>
            </div>
            `;
        });
    
        this.autoMobiles.innerHTML = output;
      }
  }

const ui = new UserInterface(); 

  // above class is used to connect with backend...async means wait for the fetch method to execute before proceeding
  
const http = new AutoMobile();

document.querySelector(".register").addEventListener('click', submit);



document.querySelector(".cancel").addEventListener('click', clear);


document.addEventListener("DOMContentLoaded", fetchAutoMobiles);

function clear() {
  document.getElementById('auto-name').value = "";
  document.getElementById('auto-price').value = "";
   document.getElementById('auto-quantity').value = "";
   document.getElementById('auto-down-payment').value = "";
  document.getElementById('auto-duration').value = "";
}

function submit(){
    const name = document.getElementById('auto-name').value;
    const price = document.getElementById('auto-price').value;
    const quantity = document.getElementById('auto-quantity').value;
    const downPayment = document.getElementById('auto-down-payment').value;
    const duration = document.getElementById('auto-duration').value;


    const data = {
        name,
        price,
        quantity,
        downPayment,
        duration
    }

    http
      .postHttp("https://boda-boda-banja-back.herokuapp.com/api/automobile" , data)
      .then(response => {
         if(response.autoMobile){
            fetchAutoMobiles();
         }
      })
      .catch(err => console.log(err));
            
}

function fetchAutoMobiles(){

    http
      .getHttp("https://boda-boda-banja-back.herokuapp.com/api/automobiles")
      .then(response => {
          console.log(response)
         ui.showAutoMobile(response)
      })
      .catch(err => console.log(err));
            
}
let  autoNameSuccess= false;

const registerButton = document.getElementById("register");

function finalValidation() {
  if(autoNameSuccess){
    registerButton.disabled = false;
    document.getElementById("register").classList.remove("deactivated");
  }else{
    registerButton.disabled = true;
    document.getElementById("register").classList.add("deactivated");
  }
}

function validateautoName(autoName) {
  var re = /^[a-zA-Z]{3,}$/;
  return re.test(String(autoName).toLowerCase());
}


function autoNameValidator() {
  const autoName = document.getElementById('auto-name').value;
  finalValidation();
  if(!validateautoName(autoName)) {
    document.getElementById("auto-name").classList.remove("autoName-valid");
    document.getElementById("auto-name").classList.add("autoName-invalid");
    autoNameSuccess = false;
  }else{
    document.getElementById("auto-name").classList.remove("autoName-invalid");
    document.getElementById("auto-name").classList.add("autoName-valid");
    autoNameSuccess = true;
  }
}








