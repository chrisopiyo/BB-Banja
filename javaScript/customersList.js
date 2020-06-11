class Customers {
    async getHttp(url) {
        const response = await fetch(url);
        const resData = await response.json();
        return resData;
      }

      async delete(url) {
        const response = await fetch(url, {
          method: "delete",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });
        const resData = "Resource Deleted";
        return resData;
      }
  }

class UserInterface {
    constructor() {
        this.customersList = document.querySelector("#sales-grid");
      }
      showCustomers(customersList) {
        let output = "";
        customersList.forEach(customer => {
          output += `
            <div class="card-body-grid">
              <div onclick="fetchCustomer(${customer.phoneNumber})" class = "card-body-grid-item full-name" >${customer.firstName} ${customer.lastName}</div>
              <div class = "card-body-grid-item">${customer.vehicleType}</div>
              <div class = "card-body-grid-item">Ugx ${customer.downPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
              <div class = "card-body-grid-item">${customer.startDay}</div>
              <div class = "card-body-grid-item">${customer.latestPaymentDate}</div>
              <div class = "card-body-grid-item">${new Date(customer.lastDay).toLocaleDateString()}</div>
              <div class = "card-body-grid-item">Ugx ${customer.totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            </div>
            `;
        });
    
        this.customersList.innerHTML = output;
      }
  }

const ui = new UserInterface();  

const http = new Customers();

document.addEventListener("DOMContentLoaded", getCustomers);

// document.querySelector('#sales-grid').addEventListener('click', removeElement)

function getCustomers(){
    http
    .getHttp("https://boda-boda-banja-back.herokuapp.com/api/customers")
    .then(data => ui.showCustomers(data))
    .catch(err => err);
}
