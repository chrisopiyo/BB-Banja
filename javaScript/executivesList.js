class Executives {
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
        this.salesManager = document.querySelector("#sales-grid");
      }
      showExecutives(salesManagers) {
        let output = "";

        salesManagers.forEach(salesManager => {
          output += `
            <div class="card-body-grid">
              <div class="card-body-grid-item">${salesManager.firstName}</div>
              <div class="card-body-grid-item">${salesManager.lastName}</div>
              <div class="card-body-grid-item">${salesManager.supervisorsName}</div>
              <div class="card-body-grid-item">${salesManager.mobileNumber}</div>
              <div class = "card-body-grid-item">${salesManager.email}</div>
              <div class = "card-body-grid-item remove-item"> <i class="fa fa-trash fa-md remove-item" style="color:red;" data-id="${salesManager._id}"></i></div>
            </div>
            `;
        });
    
        this.salesManager.innerHTML = output;
      }
  }

const ui = new UserInterface();  

const http = new Executives();

document.addEventListener("DOMContentLoaded", getExecutives);

document.querySelector('#sales-grid').addEventListener('click', removeElement)

function getExecutives(){
    http
    .getHttp("https://boda-boda-banja-back.herokuapp.com/api/executives")
    .then(data => ui.showExecutives(data))
    .catch(err => err);
}


/*. DELETE EXECUTIVES.*/

function removeElement(e){
    console.log("delete clicked")  
    const id = e.target.dataset.id;
    console.log(id)
    if (e.target.classList.contains("remove-item")) {
        const id = e.target.dataset.id;
        console.log(id, "below")
        
          http
            .delete(`https://boda-boda-banja-back.herokuapp.com/api/executives/${id}`)
            .then(data => {
              console.log(data)
              getExecutives()
            })
            .catch(err => console.log(err));
           
      }
}