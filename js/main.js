// Select DOM elements and declare variables

const employeeList = document.getElementById('employee-list');
const modalOverlay = document.getElementById('modal-overlay');
const body = document.getElementsByName('body');
const exitModal = document.getElementsByClassName('close');
const modalDiv = document.getElementsByClassName('modal');

let cardIndex;
let employeeIndex = 0;
let employeeData;

// Use the Fetch API to get 12 random users from random employee generator. Create a new <li class='employeeCard'> for each

const fetchData = fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response => response.json());

fetchData
    .then(function(data) {
      employeeData = data.results;
      
      for(let i=0; i<employeeData.length; i+=1) {
        const employeeLI = document.createElement('li');
        employeeLI.id = i;
        employeeLI.className = 'employeeCard';
        employeeLI.innerHTML = `
          <div class="cardWrapper">
            <div class="imgContainer">
              <img class="userImage" src="${employeeData[i].picture.large}"/>
            </div>
            <div class="userDescription">
              <span class="fullName">${employeeData[i].name.first +" "+ employeeData[i].name.last}</span>
              <span class="email">${employeeData[i].email}</span>
              <span class="city">${employeeData[i].location.city}</span
            </div>
          </div>
          `
        employeeList.appendChild(employeeLI);
      }
    })

    // Open modal popup when user clicks on an employee card

    .then(function() {
      const employeeCard = document.getElementsByClassName('employeeCard');
      for (let i=0; i<employeeCard.length; i+=1) {
          let card = employeeCard[i];
          card.addEventListener('click', function() {
            modalOverlay.className = 'overlay-reveal';
            cardIndex = this.id;
            generateModal(employeeData, cardIndex);
        })
      }
    })

    // Format employee date of birth for proper display in the modal.

    const birthDate = function(array, i) {
      let dob = new Date(array[i].dob.date);
        let day = dob.getDate();
        let month = dob.getMonth();
        let year = dob.getFullYear();
        if(day<10) {
          day='0' + day;
        }
        if (month<10) {
          month = '0' + month;
        }
        let employeeDob = `${month}/${day}/${year}`;
        return employeeDob;
    }


    // Generate modal data and append to modalOverlay

    const generateModal = function(employeeData, i){
      numberOfEmployees = employeeData.length;


      const popup = document.createElement('div');
          let employeeDob = birthDate(employeeData, i);
          popup.id = i;
          popup.innerHTML = `
          
            <div class="modal-wrapper">
              <span class="close">&times;</span>
              <img id="image-model" src="${employeeData[i].picture.large}"/>
              <h1 class="modalFullName">${employeeData[i].name.first +" "+ employeeData[i].name.last}</h1>
              <h3 class="modalEmail">${employeeData[i].email}</h3>
              <h3 class="modalCity">${employeeData[i].location.city}</h3>
              <hr>
              <div class="modalDetails"
                <span class="phone">${employeeData[i].cell}</span><br><br>
                <span class="address">${employeeData[i].location.street} ${employeeData[i].location.city}, ${employeeData[i].location.state},  ${employeeData[i].location.postcode}</span>
                <span class="birthday">Date of Birth: ${employeeDob}</span>
              </div>
            </div>
          `
          modalOverlay.appendChild(popup);

          // Click listener to close modal when user clicks the close button

          const close = $('.close');
                     
          close.click(function() {
              modalOverlay.className='Hide';
              popup.style.display = 'none';
          });
    }



    