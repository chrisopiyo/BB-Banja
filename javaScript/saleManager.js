class Customer {
  async postHttp(url, data) {
    const response = await fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData;
  }
}

// above class is used to connect with backend...async means wait for the fetch method to execute before proceeding

const http = new Customer();
document.querySelector(".register").addEventListener("click", submit);

function submit() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const dateOfBirth = document.getElementById("dateOfBirth").value;
  const currentDate = document.getElementById("currentDate").value;
  const mobileNumber = document.getElementById("mobileNumber").value;
  const telephoneNumber = document.getElementById("telephoneNumber").value;
  const supervisorsName = document.getElementById("supervisorsName").value;
  const password = document.getElementById("password").value;
  const workingDays = document.getElementById("workingDays").value;
  const role = parseInt(document.getElementById("roles").value);

  const data = {
    firstName,
    lastName,
    email,
    dateOfBirth,
    currentDate,
    mobileNumber,
    telephoneNumber,
    supervisorsName,
    password,
    workingDays,
    role,
  };

  http
    .postHttp("https://boda-boda-banja-back.herokuapp.com/api/executives", data)
    .then((response) => {
      if (response.executive) {
      }
    })
    .catch((err) => console.log(err))
    .finally((done) => {});
}
let emailSuccess = false;
let firstNameSuccess = false;
let lastNameSuccess = false;
let phoneNumberSuccess = false;
let officeNumberSuccess = false;
let supervisorNameSuccess = false;
let passwordSuccess = false;
const registerButton = document.getElementById("register");

function finalValidation() {
  if (
    emailSuccess &&
    firstNameSuccess &&
    lastNameSuccess &&
    phoneNumberSuccess &&
    officeNumberSuccess &&
    supervisorNameSuccess &&
    passwordSuccess
  ) {
    registerButton.disabled = false;
    document.getElementById("register").classList.remove("deactivated");
  } else {
    registerButton.disabled = true;
    document.getElementById("register").classList.add("deactivated");
  }
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validateLoginEmail() {
  const email = document.getElementById("email").value;
  finalValidation();
  // console.log(email)
  if (validateEmail(email)) {
    document.getElementById("email").classList.remove("email-invalid");
    document.getElementById("email").classList.add("email-valid");
    emailSuccess = true;
  } else {
    document.getElementById("email").classList.remove("email-valid");
    document.getElementById("email").classList.add("email-invalid");
    emailSuccess = false;
  }
}

function validateName(name) {
  var re = /^[a-zA-Z ]*$/;
  return re.test(String(name).toLowerCase());
}

function firstNameValidator() {
  const firstName = document.getElementById("firstName").value;
  finalValidation();
  if (!validateName(firstName)) {
    document.getElementById("firstName").classList.remove("firstName-valid");
    document.getElementById("firstName").classList.add("firstName-invalid");
    firstNameSuccess = false;
  } else {
    document.getElementById("firstName").classList.remove("firstName-invalid");
    document.getElementById("firstName").classList.add("firstName-valid");
    firstNameSuccess = true;
  }
}

function lastNameValidator() {
  const lastName = document.getElementById("lastName").value;
  finalValidation();
  if (!validateName(lastName)) {
    document.getElementById("lastName").classList.remove("lastName-valid");
    document.getElementById("lastName").classList.add("email-invalid");
    lastNameSuccess = false;
  } else {
    document.getElementById("lastName").classList.remove("lastName-invalid");
    document.getElementById("lastName").classList.add("lastName-valid");
    lastNameSuccess = true;
  }
}

function supervisorsNameValidator() {
  const supervisorsName = document.getElementById("supervisorsName").value;
  finalValidation();
  if (!validateName(supervisorsName)) {
    document
      .getElementById("supervisorsName")
      .classList.remove("supervisorsName-valid");
    document
      .getElementById("supervisorsName")
      .classList.add("supervisorsName-invalid");
    supervisorNameSuccess = false;
  } else {
    document
      .getElementById("supervisorsName")
      .classList.remove("supervisorsName-invalid");
    document
      .getElementById("supervisorsName")
      .classList.add("supervisorsName-valid");
    supervisorNameSuccess = true;
  }
}

function validatemobileNumber(mobileNumber) {
  return mobileNumber.match(/\d/g).length >= 10;
}

function mobileNumberValidator() {
  const mobileNumber = document.getElementById("mobileNumber").value;
  finalValidation();
  if (!validatemobileNumber(mobileNumber)) {
    document.getElementById("mobileNumber").classList.remove("email-valid");
    document.getElementById("mobileNumber").classList.add("email-invalid");
    phoneNumberSuccess = false;
  } else {
    document.getElementById("mobileNumber").classList.remove("email-invalid");
    document.getElementById("mobileNumber").classList.add("email-valid");
    phoneNumberSuccess = true;
  }
}

function officeNumberValidator() {
  const officeNumber = document.getElementById("telephoneNumber").value;
  finalValidation();
  if (!validatemobileNumber(officeNumber)) {
    document.getElementById("telephoneNumber").classList.remove("email-valid");
    document.getElementById("telephoneNumber").classList.add("email-invalid");
    officeNumberSuccess = false;
  } else {
    document
      .getElementById("telephoneNumber")
      .classList.remove("email-invalid");
    document.getElementById("telephoneNumber").classList.add("email-valid");
    officeNumberSuccess = true;
  }
}

function validatePassword(password) {
  var re = /^[A-Za-z0-9-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]{6,12}$/;
  return re.test(String(password).toLowerCase());
}

function passwordValidator() {
  const password = document.getElementById("password").value;
  finalValidation();
  if (!validatePassword(password)) {
    document.getElementById("password").classList.remove("email-valid");
    document.getElementById("password").classList.add("email-invalid");
    passwordSuccess = false;
  } else {
    document.getElementById("password").classList.remove("email-invalid");
    document.getElementById("password").classList.add("email-valid");
    passwordSuccess = true;
  }
}
