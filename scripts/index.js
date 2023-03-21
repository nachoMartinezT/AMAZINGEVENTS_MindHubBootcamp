const cardsContainer = document.getElementById("cards-container");

const categoriesContainer = document.getElementById("categories");

const inputSearch = document.getElementById('input-search')

const apiUrl = "https://mindhub-xj03.onrender.com/api/amazing";

const apiJson = "/data.json";


start()


function start() {
  
    showCards(getEvents()); 
    showCategories();
    inputSearch.addEventListener('input', combinedFilter)
    categoriesContainer.addEventListener('change',combinedFilter)
}




async function getEvents() {
  try{
    let response = await fetch(apiUrl);
    if (response.status > 200) {
      response = await fetch(apiJson)
    }
    const dataEvents = await response.json();
    const events =  dataEvents.events;
    return events;
  } catch(error) {
    console.error(error);
  } 
}




  async function showCards(arrayEvents){
  try {
    const events = await arrayEvents;
    if (events.length == 0) {
      cardsContainer.innerHTML = "<h2>No matches found</h2>";
      return;
    }
    let cards = "";
    
    await events.forEach(event=>{
      cards += `<div class="col-md-4 col-12 mb-3">
          <div class="card cards card-height h-100">
              <div class="card-body d-flex flex-column justify-content-between">
              <img src="${event.image}" class="card-img-top img-fluid" alt="Imagen de la tarjeta">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <p class="card-text mb-0 align-self-end">$ ${event.price}</p>
                  <a href="./details.html?id=${event._id}" class="btn btn-primary">Details</a>
                </div>
              </div>
              </div>
          </div>`;
    });
    cardsContainer.innerHTML = cards;
  } catch (error) {
    console.log(error);
  };
  
};


async function showCategories(){
  try {
    const events = await getEvents();
    let checkCategories = "";
    let allCategories = events.map(element => element.category);
    let categories = new Set(allCategories);
    categories.forEach(category => {
    let modifyString = category.replace(' ','-').toLowerCase();
    checkCategories += `<div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="${modifyString}" value="${category}">
    <label class="form-check-label" for="${modifyString}">${category}</label>
</div>`
  });
  categoriesContainer.innerHTML = checkCategories;

  } catch (error){
    console.log(error);
  }
};


async function filterInputText(text){
  try {
    const events = await getEvents();
    let filteredArray = events.filter(element => element.name.toLowerCase().includes(text.toLowerCase()))
    return filteredArray
  } catch (error) {
    console.log(error);
  }
  
};



async function filteredCategories(arrayEvents){
  try {
    const events = await arrayEvents;
    showCategories;
    const checkboxes =  document.querySelectorAll("input[type='checkbox']")
    const arrayChecks = Array.from(checkboxes)
    const checksChecked = arrayChecks.filter(check => check.checked)
    if(checksChecked.length == 0){
        return events
    }
    let checkValues = checksChecked.map(check => check.value)
    let arrayFiltrado = events.filter(element => checkValues.includes(element.category))

    return arrayFiltrado
  } catch (error) {
    console.log(error);
  }
  
};


function combinedFilter(){
  let firstFilter =  filterInputText(inputSearch.value)
  let secondFilter = filteredCategories(firstFilter)
  showCards(secondFilter)
};




 

 





