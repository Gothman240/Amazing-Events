let detailsContainer = document.getElementById("details");
let info = data.events;

let urlParams = new URLSearchParams(location.search);
let getId = urlParams.get("_id");
let buscarPorId = info.find((item) => item._id == getId);

detailsContainer.innerHTML = `
<div class="col-12 col-md-6">
    <img src=${buscarPorId.image} class="w-100 h-100 object-fit-cover rounded-start" alt="${buscarPorId.name}">
</div>
<div class="col-12 col-md-6">
    <div class="card-body d-flex flex-column align-items-center">
        <h5 class="card-title details-title mb-5">${buscarPorId.name}</h5>
        <div class="py-2">
            <ul>
                <li class="list">Date: ${buscarPorId.date}</li>
                <li class="list">Description: ${buscarPorId.description}</li>
                <li class="list">Category: ${buscarPorId.category}</li>
                <li class="list">Place: ${buscarPorId.place}</li>
                <li class="list">Capacity: ${buscarPorId.capacity}</li>
                <li class="list">${buscarPorId.assistance ? "Assistance" : "Estimate"}: ${buscarPorId.assistance ? buscarPorId.assistance :buscarPorId.estimate}</li>
                <li class="list">Price: $${buscarPorId.price}</li>
            </ul>
        </div>
        <a class="btn align-self-end" href="javascript:history.back()">Go Back</a>
</div>`;

