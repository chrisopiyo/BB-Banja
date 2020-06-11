class Customer {
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
        this.autoMobiles = document.querySelector("#vehicleType");
      }
      showAutoMobile(autoMobiles) {
        let output = "<option selected>Select Automobile</option>";

        autoMobiles.forEach(autoMobile => {
          output += `
          <option value="${autoMobile.name}">${autoMobile.name}</option>
            `;
        });
    
        this.autoMobiles.innerHTML = output;
      }
  }

const ui = new UserInterface(); 

    
const http = new Customer();

document.addEventListener("DOMContentLoaded", fetchAutoMobiles);

document.querySelector(".register").addEventListener('click', submit);
document.querySelector(".cancel").addEventListener('click', clearInputs)

function submit(){
  document.getElementById("spinner").classList.remove("default");
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const nationality = document.getElementById('nationality').value;
    const nationalId = document.getElementById('nationalId').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const downPayment = document.getElementById('downPayment').value;
    const refereeName = document.getElementById('refereeName').value;
    const refereeContact = document.getElementById('refereeContact').value;
    const refereeOccupation = document.getElementById('refereeOccupation').value;
    const refereeDateOfBirth = document.getElementById('refereeDateOfBirth').value;
    const otherLoans = document.getElementById('otherLoans').value;
    const stageName = document.getElementById('stageName').value;
    const LConeName = document.getElementById('LConeName').value;
    const LCthreeName = document.getElementById('LCthreeName').value;
    const status = document.querySelector('input[name="status"]:checked')? document.querySelector('input[name="status"]:checked').value: "single"
    const vehicleType = document.getElementById('vehicleType').value;
    const totalAmount = parseInt(document.getElementById("total-amount").innerHTML);

    let payableWithin = document.getElementById("payable-within").innerHTML;
    const duration = parseInt(payableWithin.replace("Payable within ","").replace(/ /g, "").replace("years", ""));
    let nowDate = new Date();
    const today = nowDate.toLocaleDateString()
    console.log(nationality)
    
    let finalDate = new Date(today);
    finalDate.setFullYear(finalDate.getFullYear() + duration);
    finalDate.toLocaleDateString();

      const data = {
        firstName,
        lastName,
        phoneNumber,
        nationality,
        nationalId,
        dateOfBirth,
        vehicleType,
        downPayment,
        refereeName,
        refereeContact,
        refereeOccupation,
        refereeDateOfBirth,
        otherLoans,
        stageName,
        LConeName,
        LCthreeName,
        status,
        totalAmount,
        startDay: today,
        lastDay: finalDate,
        latestPaymentDate: today
    }
    http
      .postHttp("https://boda-boda-banja-back.herokuapp.com/api/customers", data)
      .then(response => {
          if(response.customer) {
            document.getElementById("success").classList.remove("default");
            document.getElementById("success").classList.remove("error");
            document.getElementById("success").innerHTML = "Successfully registered client";
            document.getElementById("success").style.display='inline !important';
            document.getElementById("success").style.color='green !important';
            document.getElementById("success").classList.add("success");
            clearInputs()
          }else{
            document.getElementById("success").innerHTML = "Error occured, check the data for validation related issues";
            document.getElementById("success").classList.add("error");
          }
          
      })
      .catch(err => console.log(err))
      .finally(done => {
        document.getElementById("spinner").classList.add("default");
      });
    }
      


function clearInputs() {
  document.querySelector(".input-clear").value = ""
  document.querySelector(".input-select").checked = ""
  document.querySelector(".input-select-single").checked = ""
  document.getElementById('firstName').value = "";
  document.getElementById('lastName').value = "";
  document.getElementById('phoneNumber').value = "";
  document.getElementById('nationality').value = "";
  document.getElementById('nationalId').value = "";
  document.getElementById('dateOfBirth').value = "";
  document.getElementById('downPayment').value = "";
  document.getElementById('refereeName').value = "";
  document.getElementById('refereeContact').value = "";
  document.getElementById('refereeOccupation').value = "";
  document.getElementById('refereeDateOfBirth').value = "";
  document.getElementById('otherLoans').value = "";
  document.getElementById('stageName').value = "";
  document.getElementById('LConeName').value = "";
  document.getElementById('LCthreeName').value = "";
  document.getElementById('vehicleType').value = "Select Automobile";
  document.getElementById("downPayment").value = "";
  document.getElementById("payable-within").innerHTML = "";
  document.getElementById("min-down-payment").innerHTML ="";
}

function fetchAutoMobiles(){

  http
    .getHttp("https://boda-boda-banja-back.herokuapp.com/api/automobiles")
    .then(response => {
       ui.showAutoMobile(response)
    })
    .catch(err => console.log(err));
          
}

function fetchAutoMobile(name){

  http
    .getHttp(`https://boda-boda-banja-back.herokuapp.com/api/automobile/${name}`)
    .then(response => {
        if(response.length) {
          document.getElementById("min-down-payment").innerHTML ="Min Down Payment: Ugx "+ response[0].downPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          document.getElementById("total-amount").innerHTML = response[0].price;
          document.getElementById("payable-within").innerHTML = "Payable within "+ response[0].duration + " years";
        }else{
          document.getElementById("downPayment").value = "";
          document.getElementById("payable-within").innerHTML = "";
          document.getElementById("min-down-payment").innerHTML ="";
        }
        
    })
    .catch(err => console.log(err));
          
}

function fetchDownPayment(){
  const vehicleType = document.getElementById('vehicleType').value;
  fetchAutoMobile(vehicleType);
}

function validateDownPayment() {
  let minDownPayment = document.getElementById("min-down-payment").innerHTML;
  const actualMinDownPay = parseInt(minDownPayment.replace("Min Down Payment: Ugx ","").replace(/,/g, ""));
  const downPayment = document.getElementById('downPayment').value;
  if(downPayment < actualMinDownPay) {
    document.getElementById("downPayment").classList.add("less-than");
  }else{
    document.getElementById("downPayment").classList.remove("less-than");
  }
}

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

let NINSuccess = false;
let firstNameSuccess = false;
let lastNameSuccess = false;
let lc1NameSuccess = false;
let lc3NameSuccess = false;
let stageNameSuccess = false;
let refreesNameSuccess = false
let phoneNumberSuccess = false;
let refreeContactSuccess = false;
let refreeOccupationSuccess = false;



function finalValidation() {
  const registerButton = document.getElementById("register");
  if(NINSuccess && firstNameSuccess && lastNameSuccess && lc1NameSuccess &&lc3NameSuccess && stageNameSuccess
    && phoneNumberSuccess && refreesNameSuccess && refreeContactSuccess && refreeOccupationSuccess){
    registerButton.disabled = false;
    console.log("activated")
    document.getElementById("register").classList.remove("deactivated");
  }else{
    console.log("not activated")
    document.getElementById("register").classList.add("deactivated");
    registerButton.disabled = true;
  }
}

// nin done
function validatenationalID(nationalId) {
  var re = /^[A-Za-z]{3}/;
  return re.test(String(nationalId).toLowerCase());
}

function nationalIDValidator() {
  const nationalId = document.getElementById('nationalId').value;
  finalValidation();
  if(nationalId.length !== 13 || !validatenationalID(nationalId)) {
    document.getElementById("nationalId").classList.remove("valid");
    document.getElementById("nationalId").classList.add("invalid");
    NINSuccess = true;
  }else{
    document.getElementById("nationalId").classList.remove("invalid");
    document.getElementById("nationalId").classList.add("valid");
    NINSuccess = false;
  }

 
 }
// firstName done
function validateName(name) {
  var re = /^[a-zA-Z ]*$/;
  return re.test(String(name).toLowerCase());
}

function firstNameValidator() {
  const firstName = document.getElementById('firstName').value;
  finalValidation();
  if(!validateName(firstName)) {
    document.getElementById("firstName").classList.remove("valid");
    document.getElementById("firstName").classList.add("invalid");
    firstNameSuccess = false;
  }else{
    document.getElementById("firstName").classList.remove("invalid");
    document.getElementById("firstName").classList.add("valid");
    firstNameSuccess = true;
  }
}

function lastNameValidator() {
  const lastName = document.getElementById('lastName').value;
  finalValidation();
  if(!validateName(lastName)) {
    document.getElementById("lastName").classList.remove("valid");
    document.getElementById("lastName").classList.add("invalid");
    lastNameSuccess = false;
  }else{
    document.getElementById("lastName").classList.remove("invalid");
    document.getElementById("lastName").classList.add("valid");
    lastNameSuccess = true;
  }
}

function lc1NameValidator() {
  const LConeName = document.getElementById('LConeName').value;
  finalValidation();
  if(!validateName(LConeName)) {
    document.getElementById("LConeName").classList.remove("valid");
    document.getElementById("LConeName").classList.add("invalid");
    lc1NameSuccess= false;
  }else{
    document.getElementById("LConeName").classList.remove("invalid");
    document.getElementById("LConeName").classList.add("valid");
    lc1NameSuccess = true;
  }
}
function lc3NameValidator() {
  const LConeName = document.getElementById('LCthreeName').value;
  finalValidation();
  if(!validateName(LConeName)) {
    document.getElementById("LCthreeName").classList.remove("valid");
    document.getElementById("LCthreeName").classList.add("invalid");
    lc3NameSuccess = false;
  }else{
    document.getElementById("LCthreeName").classList.remove("invalid");
    document.getElementById("LCthreeName").classList.add("valid");
    lc3NameSuccess = true;
  }
}
function stageNameValidator() {
  const stageName = document.getElementById('stageName').value;
  finalValidation();
  if(!validateName(stageName)) {
    document.getElementById("stageName").classList.remove("valid");
    document.getElementById("stageName").classList.add("invalid");
    stageNameSuccess = false;
  }else{
    document.getElementById("stageName").classList.remove("invalid");
    document.getElementById("stageName").classList.add("valid");
    stageNameSuccess = true;
  }
}


function refereeNameValidator() {
  const refereeName = document.getElementById('refereeName').value;
  finalValidation();
  if(!validateName(refereeName)) {
    document.getElementById("refereeName").classList.remove("valid");
    document.getElementById("refereeName").classList.add("invalid");
    refreesNameSuccess= false;
  }else{
    document.getElementById("refereeName").classList.remove("invalid");
    document.getElementById("refereeName").classList.add("valid");
    refreesNameSuccess = true;
    
  }
}
function refereeOccupationValidator() {
  const refereeOccupation = document.getElementById('refereeOccupation').value;
  finalValidation();
  if(!validateName(refereeOccupation)) {
    document.getElementById("refereeOccupation").classList.remove("valid");
    document.getElementById("refereeOccupation").classList.add("invalid");
    refreeOccupationSuccess = false;
  }else{
    document.getElementById("refereeOccupation").classList.remove("invalid");
    document.getElementById("refereeOccupation").classList.add("valid");
    refreeOccupationSuccess = true;
    
  }
}

// phone number done

function validatephoneNumber(phoneNumber) {
  return phoneNumber.match(/\d/g).length >= 10;
}

function phoneNumberValidator() {
  const phoneNumber = document.getElementById('phoneNumber').value;
  finalValidation();
  if(!validatephoneNumber(phoneNumber)) {
    document.getElementById("phoneNumber").classList.remove("valid");
    document.getElementById("phoneNumber").classList.add("invalid");
    phoneNumberSuccess = false;
  }else{
    document.getElementById("phoneNumber").classList.remove("invalid");
    document.getElementById("phoneNumber").classList.add("valid");
    phoneNumberSuccess = true;
  }
}

function refereeContactValidator() {
  const refereeContact = document.getElementById('refereeContact').value;
  finalValidation();
  if(!validatephoneNumber(refereeContact)) {
    document.getElementById("refereeContact").classList.remove("valid");
    document.getElementById("refereeContact").classList.add("invalid");
    refreeContactSuccess  = false;
  }else{
    document.getElementById("refereeContact").classList.remove("invalid");
    document.getElementById("refereeContact").classList.add("valid");
    refreeContactSuccess  = true;
  }
}
