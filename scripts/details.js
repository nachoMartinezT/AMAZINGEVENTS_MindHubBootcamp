const cardsContainer = document.getElementById("cards-container");

const categoriesContainer = document.getElementById("categories");

const inputSearch = document.getElementById('input-search')

const apiUrl = "https://mindhub-xj03.onrender.com/api/amazing";

const apiJson = "/data.json";


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


const querySearch = document.location.search; 

const id = new URLSearchParams(querySearch).get("id");  



const eventDetails = async () => {
  try {
    const events = await getEvents();
    const eventSelected = events.find(event => event._id == id);

    const detailsContainer = document.getElementById("container"); 



detailsContainer.innerHTML = `<div class="container mx-auto card mb-5 container-details">
    <div class="row h-100 " >
      <div class="col-md-6">
        <img src="${eventSelected.image}" class="img-details img-fluid mx-auto my-auto " alt="Image of event">
      </div>
      <div class="col-md-6">
        <div class="card-body">
          <h5 class="card-title fs-1">${eventSelected.name}</h5>
          <p class="card-text fs-4">${eventSelected.description}</p>
          <p class="card-text fs-4">Place: ${eventSelected.place}</p>
          <p class="card-text fs-4">Date: ${eventSelected.date}</p>
          <p class="card-text fs-3">Price: U$S ${eventSelected.price}</p>
        </div>
      </div>
    </div>
  </div>`;
  } catch (error) {
    
  }
}


eventDetails();