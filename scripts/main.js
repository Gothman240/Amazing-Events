let cards = document.getElementById("main-cards");

let info = data.events

function showAllCards(data) {
  return `
    <img src="${data.image}" class="card-img-top object-fit-cover w-100" alt="cine img">
    <div class="card-body text-center">
    <h5 class="card-title">${data.name}</h5>
    <p class="card-text">${data.description}</p>
    </div>
    <div class="card-footer d-flex justify-content-between align-items-center">
    <h6 class="m-0">$${data.price}</h6>
    <a href="./pages/details.html" class="btn btn-primary">Details</a>
    </div>
`;
}

function getData(data, container, clase=""){
    let fragment = document.createDocumentFragment();
    for (const item of data) {
       let div = document.createElement("div")
       div.classList = clase

       div.innerHTML += showAllCards(item);
       fragment.appendChild(div)
    }

    container.appendChild(fragment)

}

getData(info, cards, "card p-0")

