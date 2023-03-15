const cardsContainer = document.getElementById("cards-container");

const categoriesContainer = document.getElementById("categories");

const inputSearch = document.getElementById('input-search')

const events = data.events;

const currentDate = data.currentDate;



const combinedFilter = ()=>{
  let firstFilter = filterInputText(events, inputSearch.value)
  let secondFilter = filteredCategories(firstFilter)
  showCards(secondFilter)
}


const showCards = arrayOfEvents =>{
  if (arrayOfEvents.length == 0) {
    cardsContainer.innerHTML = "<h2>No matches found</h2>";
    return;
  }
  let cards = "";
  arrayOfEvents.forEach(event=>{
        if (event.date < currentDate) {
            cards += `<div class="col-md-4 col-12 mb-3">
        <div class="card cards card-height h-100">
            <div class="card-body d-flex flex-column justify-content-between">
            <img src="${event.image}" class="card-img-top img-fluid" alt="Imagen de la tarjeta">
              <h5 class="card-title">${event.name}</h5>
              <p class="card-text">${event.description}</p>
              <div class="d-flex justify-content-between align-items-center">
                <p class="card-text mb-0 align-self-end">$ ${event.price}</p>
                <button class="btn btn-primary mt-auto">Details</button>
              </div>
            </div>
            </div>
        </div>`;
        }
        /* 
    cards += `<div class="col-md-4 col-12 mb-3">
        <div class="card cards card-height h-100">
            <div class="card-body d-flex flex-column justify-content-between">
            <img src="${event.image}" class="card-img-top img-fluid" alt="Imagen de la tarjeta">
              <h5 class="card-title">${event.name}</h5>
              <p class="card-text">${event.description}</p>
              <div class="d-flex justify-content-between align-items-center">
                <p class="card-text mb-0 align-self-end">$ ${event.price}</p>
                <button type="button" class="btn btn-primary mt-auto" data-bs-toggle="modal" data-target="${event._id}">Details</button>
              </div>
            </div>
            </div>
        </div>`;  */
  });
  cardsContainer.innerHTML = cards; 
}


const showCategories = arrayOfEvents =>{
  let checkCategories = "";
  let allCategories = arrayOfEvents.map(element => element.category);
  let categories = new Set(allCategories);
  categories.forEach(category => {
    let modifyString = category.replace(' ','-').toLowerCase();
    checkCategories += `<div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="${modifyString}" value="${category}">
    <label class="form-check-label" for="${modifyString}">${category}</label>
</div>`
  });
  categoriesContainer.innerHTML = checkCategories;
}


const filterInputText = (arrayOfEvents, text)=>{
  let filteredArray = arrayOfEvents.filter(element => element.name.toLowerCase().includes(text.toLowerCase()))
  return filteredArray
}



const filteredCategories = arrayOfEvents =>{
  let checkboxes = document.querySelectorAll("input[type='checkbox']")
    console.log(checkboxes);
    let arrayChecks = Array.from(checkboxes)
    console.log(arrayChecks);
    let checksChecked = arrayChecks.filter(check => check.checked)
    console.log(checksChecked);
    if(checksChecked.length == 0){
        return arrayOfEvents
    }
    let checkValues = checksChecked.map(check => check.value)
    console.log(checkValues);
    let arrayFiltrado = arrayOfEvents.filter(element => checkValues.includes(element.category))
    console.log(arrayFiltrado);
    return arrayFiltrado
}


showCards(events); 
showCategories(events);
console.log(events[0].date < currentDate);
console.log(showCards(events));
console.log(showCategories(events));
inputSearch.addEventListener('input',combinedFilter)

categoriesContainer.addEventListener('change',combinedFilter)


  