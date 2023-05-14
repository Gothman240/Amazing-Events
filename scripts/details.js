let detailsContainer = document.getElementById("details");
let info;

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then( data => data.json())
  .then( res => {
    info = res.events
   
    let urlParams = new URLSearchParams(location.search);
    let getId = urlParams.get("_id");
    let buscarPorId = info.find((item) => item._id == getId);

    imprimirDetails(buscarPorId, detailsContainer)
  })
  .catch(err => console.log(err))

  function imprimirDetails(data, container){
    return container.innerHTML = `
    <div class="col-12 col-md-6">
        <img src=${data.image} class="w-100 h-100 object-fit-cover rounded-start" alt="${data.name}">
    </div>
    <div class="col-12 col-md-6">
        <div class="card-body d-flex flex-column align-items-center">
            <h5 class="card-title details-title mb-5">${data.name}</h5>
            <div class="py-2">
                <ul>
                    <li class="list">Date: ${data.date}</li>
                    <li class="list">Description: ${data.description}</li>
                    <li class="list">Category: ${data.category}</li>
                    <li class="list">Place: ${data.place}</li>
                    <li class="list">Capacity: ${data.capacity}</li>
                    <li class="list">${data.assistance ? "Assistance" : "Estimate"}: ${data.assistance ? data.assistance :data.estimate}</li>
                    <li class="list">Price: $${data.price}</li>
                </ul>
            </div>
            <a class="btn align-self-end" href="javascript:history.back()">Go Back</a>
    </div>`;
  }


