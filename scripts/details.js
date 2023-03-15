const events = data.events;



const querySearch = document.location.search; 
console.log(querySearch);
const id = new URLSearchParams(querySearch).get("id");  

console.log(id);

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
  </div>

`;

//En resumen, este código filtra y transforma datos de personajes de un conjunto de datos y los muestra en una tarjeta HTML, en función del parámetro "id" proporcionado en la URL.
