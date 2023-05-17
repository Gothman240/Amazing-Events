let cards = document.getElementById("main-cards");
let checkContain = document.getElementById ("check-contain")
let inputSearch = document.getElementById("search")


let info;

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then( data => data.json())
  .then( res => {
    
    info = res.events

    pintarCheck(arraySinRepetir(info), checkContain)
    pintarCartas(info, cards, "card p-0")

  })
  .catch(err => console.log(err))

  /* search */
  inputSearch.addEventListener("input", dobleFiltro)

  /* check */
  checkContain.addEventListener("change", dobleFiltro)

function mostrarCartas(data) {
  return `
    <img src="${data.image}" class="card-img-top object-fit-cover w-100" alt="cine img">
    <div class="card-body text-center">
    <h5 class="card-title">${data.name}</h5>
    <p class="card-text">${data.description}</p>
    </div>
    <div class="card-footer d-flex justify-content-between align-items-center">
    <h6 class="m-0">$${data.price}</h6>
    <a href="./pages/details.html?_id=${data._id}" class="btn btn-primary">Details</a>
    </div>
`;
}

function pintarCartas(data, container, clase=""){
    let fragment = document.createDocumentFragment();
    if(data.length == 0){
      let h1 = document.createElement("h1")
      h1.classList = "text-center fw-bold opacity-25"
      h1.innerText = "Oops nothing to see here..."
      fragment.appendChild(h1)
    }
    for (const item of data) {
       let div = document.createElement("div")
       div.classList = clase

       div.innerHTML += mostrarCartas(item);
       fragment.appendChild(div)
    }
    container.innerHTML = "";
    container.appendChild(fragment)

}

function mostrarCheck(data){
  return `<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" value="${data}" id="${data}">
  <label class="form-check-label" for="${data}">
  ${data}
  </label>
</div>`
}

function pintarCheck(data, container){
  let template = ""
  for (const item of data) {
    template += mostrarCheck(item)
  }
  container.innerHTML = template;
}

/* se repetian los check */
function arraySinRepetir(array){
  let categorias = array.map(item => item.category )
  let nuevasCategorias = Array.from(new Set (categorias))
  return nuevasCategorias;
}


/* filtrando lo que viene del input */
function filtroSearch (array, valueSearch) {
  let arrayaux = array.filter (item => item.name.toLowerCase().includes( valueSearch.toLowerCase().trim()))
  return arrayaux
}


/* filtrar valor por check */
function filtrarPorCategoria(array, categoria){
  if(categoria.length == 0){
    return array
  }

  return array.filter(item =>  categoria.includes(item.category) )
}

function dobleFiltro(){

  let checkboxCaptured = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map( check => check.value)
 
  let searchInput = filtroSearch (info, inputSearch.value)
  let checkFilter = filtrarPorCategoria(searchInput, checkboxCaptured)

  pintarCartas(checkFilter, cards, "card p-0")
}

