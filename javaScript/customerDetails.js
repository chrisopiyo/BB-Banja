
class Customers {
    async getHttp(url) {
        const response = await fetch(url);
        const resData = await response.json();
        return resData;
      }
}

const http = new Customers(); 

async function fetchCustomer() {
    const customerPhone = document.getElementById("phone-number").value
    const total = await fetchTotalInstallments();
    const nextDate = await fetchNextPaymentDate();
    http
      .getHttp(`https://boda-boda-banja-back.herokuapp.com/api/customer/${customerPhone}`)
      .then(data => {
        if(data.length) {
          const startDate = new Date(data[0].startDay);
          const lastDate = new Date(data[0].lastDay);
          const dateDiffTime = Math.abs(lastDate - startDate);
          const dateDiffDays = Math.ceil(dateDiffTime / (1000 * 3600 * 24))
          const dateNext = new Date(nextDate);
          const remainingTime = Math.abs(lastDate - dateNext);
          const remainingDays = Math.ceil(remainingTime / (1000 * 3600 * 24));
          const remianingMonths = Math.ceil(remainingDays / 30);
          const amountPayablePerMonth = Math.ceil((data[0].totalAmount - (parseInt(data[0].downPayment) + parseInt(total)))/remianingMonths);
          console.log(amountPayablePerMonth);
          const balance = parseInt(data[0].totalAmount) - (parseInt(data[0].downPayment) +parseInt(total));
          const amountPaid = parseInt(data[0].downPayment) + parseInt(total);
          const dateDiffYears = Math.ceil(dateDiffDays / 365);
          document.getElementById("full-name").value = data[0].firstName + " " + data[0].lastName;
          document.getElementById("NiN").value = data[0].nationalId;
          document.getElementById("vehicle-type").value = data[0].vehicleType;
          document.getElementById("unit-price").value ="Ugx "+ data[0].totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          document.getElementById("payable-in").value = dateDiffYears+ " Years";
          document.getElementById("amount-paid").value ="Ugx "+ amountPaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          document.getElementById("balance-due").value ="Ugx "+ balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          document.getElementById("expected-monthly").value ="Ugx "+  amountPayablePerMonth.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          document.getElementById("next-due-date").value = nextDate;
          document.getElementById("last-date").value = new Date(data[0].lastDay).toLocaleDateString();
        }else{
          document.getElementById("full-name").value = "";
          document.getElementById("NiN").value = "";
          document.getElementById("vehicle-type").value = "";
          document.getElementById("unit-price").value = "";
          document.getElementById("payable-in").value = "";
          document.getElementById("amount-paid").value = "";
          document.getElementById("balance-due").value = "";
          document.getElementById("next-due-date").value = "";
          document.getElementById("last-date").value = "";
          document.getElementById("expected-monthly").value = "";
        }
      })
      .catch(err => err);
  }

 async function fetchTotalInstallments() {
    const customerPhone = document.getElementById("phone-number").value
    let totalAmount = 0;
    await http
      .getHttp(`https://boda-boda-banja-back.herokuapp.com/api/payment/${customerPhone}`)
      .then(data => {
        if(data.length) {
          data.forEach(element => {
           totalAmount = totalAmount + parseInt(element.amountPaid);
          });
        }
      })
      .catch(err => err);
      return totalAmount;
  }

  async function fetchNextPaymentDate() {
    const customerPhone = document.getElementById("phone-number").value
    let nextPaymentDate = "";
    await http
      .getHttp(`https://boda-boda-banja-back.herokuapp.com/api/payment/${customerPhone}`)
      .then(data => {
        if(data.length) {
          data.forEach(element => {
            nextPaymentDate = element.nextPaymentDate;
          });
        }
      })
      .catch(err => err);
      return nextPaymentDate;
  }
