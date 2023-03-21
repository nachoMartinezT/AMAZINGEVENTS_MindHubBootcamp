const staticsTable = document.getElementById("events-statics");
const upcomingTable = document.getElementById("upcoming-statics");
const pastTable = document.getElementById("past-statics");


const apiUrl = "https://mindhub-xj03.onrender.com/api/amazing";

const apiJson = "/data.json";

const getCurrentDate = async () =>{
  try {
    let response = await fetch(apiUrl);
    if (response.status > 200) {
      response = await fetch(apiJson);
    }
    const dataEvents = await response.json();
    const currentDate = dataEvents.currentDate;
    return currentDate;
  } catch (error) {
    console.log(error);
  }
}

const getEvents = async ()=> {
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
  

const showStats = async () =>{
  try {
    const events = await getEvents();
    
  let row = "";
  let highestPercentage;
  let lowestPercentage;
  let largerCapacity;
  let auxHig = 0;
  let auxLow = 100;
  let auxLg = 0;
  
  events.forEach(event=>{
    if (event.assistance * 100 / event.capacity > auxHig) {
      auxHig = event.assistance * 100 / event.capacity;
      highestPercentage = event;
    }
    if (event.assistance * 100 / event.capacity < auxHig) {
      auxLow = event.assistance * 100 / event.capacity;
      lowestPercentage = event;
    }
    if (event.capacity > auxLg) {
      auxLg = event.capacity
      largerCapacity = event;
    }
       
  });
 
  staticsTable.innerHTML +=`<tr>
  <th>${highestPercentage.name}(${auxHig.toFixed(2)}%)</th>
  <th>${lowestPercentage.name}(${auxLow.toFixed(2)}%)</th>
  <th>${largerCapacity.name}(${largerCapacity.capacity})</th>
</tr>`;


  } catch (error) {
    console.log(error);
  }
  
}
showStats()

const showUpcomingStats = async ()=>{
  try {
    const events = await getEvents();

  } catch (error) {
    console.log(error);
  }
}



const upcoming = async () =>{
  try {
    
  } catch (error) {
    
  }
  const events = await getEvents();
  const currentDate = await getCurrentDate();
  const upcoming = events.filter(event => event.date > currentDate )
  return upcoming;
}


const past = async () => {
  const events = await getEvents();
  const currentDate = await getCurrentDate();
  const past = events.filter(event => event.date < currentDate )

  return past;
}

const loadData = (category, totalRevenue, percentageAssist) => {
  `<tr>
  <th>${category}</th>
  <th>${totalRevenue}</th>
  <th>${percentageAssist.toFixed(2)}</th>
</tr>`;
}


const filterCategory = async (arrayOfEvents) =>{
  try {
    const events = await arrayOfEvents;
  const currentDate =  await getCurrentDate();
  const categoriesFiltered = events.reduce((categories, event) => {
    if (!categories[event.category]) {
      categories[event.category] = [];
    }
    categories[event.category].push(event);
    
    return categories;
  }, {});


  
  for (const category in categoriesFiltered) {
    let totalRevenue;
    let percentageAssist;
    let date = "";
    const eventsCategory = categoriesFiltered[category];
    
      totalRevenue = eventsCategory.reduce((total, event) => {
        
        if (currentDate < event.date) {
          return total + event.price * event.estimate
        } 
        
        if (currentDate > event.date) {
          return total + event.price * event.assistance
        }
      }, 0);
  
      percentageAssist = eventsCategory.reduce((total, event) => {
       
        if (currentDate < event.date) {
          date = 'upcoming'
          return total +  (event.estimate * 100 / event.capacity) / eventsCategory.length
        } 
        
        if (currentDate > event.date) {
          date = 'past'
          return total + (event.assistance * 100 / event.capacity) / eventsCategory.length
        }
      }, 0);
      
      if (date == 'upcoming') {
        upcomingTable.innerHTML += `<tr class="font-weight-light">
        <th>${category}</th>
        <th>U$S ${totalRevenue}</th>
        <th>${percentageAssist.toFixed(2)} %</th>
      </tr>`;
      }
      
      if (date == 'past') {
        pastTable.innerHTML += `<tr>
        <th>${category}</th>
        <th>U$S ${totalRevenue}</th>
        <th>${percentageAssist.toFixed(2)} %</th>
      </tr>`;
      }
        
  }
  } catch (error) {
    console.log(error);
  }
  
}

filterCategory(upcoming())
filterCategory(past())




 
  
