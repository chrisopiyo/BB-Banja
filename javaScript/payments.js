class Payments {
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
    async putHttp(url, data) {
      const response = await fetch(url, {
        method: "put",
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
        this.payments = document.querySelector("#payments");
    }
      showPayments(payments) {
        let output = "";
        payments.forEach(payment => {
          output += `
            <div class="card-body-grid">
              <div class="card-body-grid-item">${payment.name}</div>
              <div class="card-body-grid-item">${payment.phone}</div>
              <div class="card-body-grid-item">${payment.nationalId}</div>
              <div class="card-body-grid-item">${payment.autoMobile}</div>
              <div class="card-body-grid-item">Ugx ${payment.amountPaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
              <div class="card-body-grid-item">${payment.month}</div>
              <div class="card-body-grid-item">${payment.paymentDate}</div>
              <div class="card-body-grid-item">${payment.nextPaymentDate}</div>
            </div>
            `;
        });
    
        this.payments.innerHTML = output;
      }
  }

const ui = new UserInterface(); 
const http = new Payments();

document.querySelector(".register").addEventListener('click', submit);
document.addEventListener("DOMContentLoaded", fetchPayments);


function submit(){
    const name = document.getElementById('name').value;
    const month = document.getElementById('month').value;
    const phone = document.getElementById('phone').value;
    const nationalId = document.getElementById('nationalId').value;
    const amountPaid = document.getElementById('amountPaid').value;
    const autoMobile = document.getElementById('automobile').value;
    const nextPaymentDate = document.getElementById("next-date").innerHTML.replace("Next Pay Day:", "");
    const paymentDate = new Date().toLocaleDateString();
    const data = {
        name,
        phone,
        autoMobile,
        nationalId,
        amountPaid,
        month,
        paymentDate,
        nextPaymentDate
    }

    http
      .postHttp("https://boda-boda-banja-back.herokuapp.com/api/payment" , data)
      .then(response => {
        console.log(response)
         if(response.newPayment){
            fetchPayments();
         }
      })
      .catch(err => console.log(err));
            
}

function fetchPayments(){

    http
      .getHttp("https://boda-boda-banja-back.herokuapp.com/api/payments")
      .then(response => {
          console.log(response)
         ui.showPayments(response)
      })
      .catch(err => console.log(err));
            
}

function fetchPayment(){
    const phone = document.getElementById("phone").value;
    http
    .getHttp(`https://boda-boda-banja-back.herokuapp.com/api/customer/${phone}`)
    .then(response => {
      const nextPaymentDate = document.querySelector("#next-date");
        if(response.length) {  
            updateLatestPaymentDate(response[0].startDay)
            nextPaymentDate.innerHTML = "Next Pay Day:"+ calculateNextPaymentDate(response[0].startDay);
            document.getElementById("name").value = response[0].firstName +" "+ response[0].lastName;
            document.getElementById("nationalId").value = response[0].nationalId;
            document.getElementById("automobile").value = response[0].vehicleType;
        }else{
            nextPaymentDate.innerHTML = "";
            document.getElementById("name").value = "";
            document.getElementById("nationalId").value = "";
            document.getElementById("automobile").value = "";
        }
       
    })
    .catch(err => console.log(err));
}

function calculateNextPaymentDate(startDate) {
    let currentDate = new Date();
    let initialDate = new Date(startDate);
    const yearMonth = document.getElementById("month").value;
    const dateSplit = yearMonth.split("-");
    currentDate.setMonth(parseInt(dateSplit[1]))
    currentDate.setDate(initialDate.getDate());
    return currentDate.toLocaleDateString();
}

function updateLatestPaymentDate(startDate) {
  const phone = document.getElementById("phone").value;
  const yearMonth = document.getElementById("month").value;
  const dateSplit = yearMonth.split("-");
  let latestDate = new Date();
  let initialDate = new Date(startDate);
  console.log(dateSplit[1])
  latestDate.setMonth(parseInt(dateSplit[1]) - 1);
  latestDate.setFullYear(parseInt(dateSplit[0]));
  latestDate.setDate(initialDate.getDate())
  const data = {
    latestPaymentDate: latestDate.toLocaleDateString()
  }
  console.log(data)
  http
      .putHttp(`https://boda-boda-banja-back.herokuapp.com/api/customer/${phone}` , data)
      .then(response => {
        console.log(response)
      })
      .catch(err => console.log(err));
}
