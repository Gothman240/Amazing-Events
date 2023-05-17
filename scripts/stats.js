let tablaGeneral = document.getElementById("tbody-general");
let tablaUpcoming = document.getElementById("tbody-upcoming");
let tablaPast = document.getElementById("tbody-past");

let info2 = [];
let upcoming;
let past;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((res) => res.json())
  .then((data) => {
    let info = data.events;

    info2 = [...info];

    past = data.events.filter((event) => event.date < data.currentDate);
    upcoming = data.events.filter((event) => event.date > data.currentDate);

    console.log(upcoming)

    pintarTablaPrincipal(past, info2, tablaGeneral);

    let sinRepetir = Array.from(
      new Set(info2.map((categoria) => categoria.category))
    );

    console.log(sinRepetir);
    
    const ObjetoCategoriaPasadas = {  };

    const arraysCategoriasPasadas = sinRepetir.reduce((acumulador, categoria) => {
      const objetosCategoria = past.filter(
        (objeto) => objeto.category === categoria
      );
      acumulador[categoria] = objetosCategoria;
      return acumulador;
    }, []);

    for (const categoria in arraysCategoriasPasadas) {
      const itemsCategoria = arraysCategoriasPasadas[categoria];

      let gananciaTotal = 0;
      let porcentajeTotal = 0;
      for (let i = 0; i < itemsCategoria.length; i++) {
        const item = itemsCategoria[i];
        const gananciaItem = item.price * item.assistance;
        const porcentaje = ((item.assistance / item.capacity) * 100)/itemsCategoria.length
        gananciaTotal += gananciaItem;
        porcentajeTotal += porcentaje;
      }

      ObjetoCategoriaPasadas[categoria] = {
        nombre: categoria,
        ganancia: gananciaTotal,
        porcentaje: porcentajeTotal.toFixed(2),
      };
    }

    console.log(ObjetoCategoriaPasadas)

    const ObjetoCategoriaFuturas = {  };

    const arraysCategoriasFuturas = sinRepetir.reduce((acumulador, categoria) => {
      const objetosCategoria = upcoming.filter(
        (objeto) => objeto.category === categoria
      );
      if(objetosCategoria.length != 0){
        acumulador[categoria] = objetosCategoria;
      }
        return acumulador;
    }, []);

    for (const categoria in arraysCategoriasFuturas) {
      const itemsCategoria = arraysCategoriasFuturas[categoria];

      let gananciaTotal = 0;
      let porcentajeTotal = 0;
      for (let i = 0; i < itemsCategoria.length; i++) {
        const item = itemsCategoria[i];
      
        const gananciaItem = item.price * item.estimate;
        const porcentaje = ((item.estimate / item.capacity) * 100)/itemsCategoria.length
        gananciaTotal += gananciaItem;
        porcentajeTotal += porcentaje;
      
      }

      ObjetoCategoriaFuturas[categoria] = {
        nombre: categoria,
        ganancia: gananciaTotal,
        porcentaje: porcentajeTotal.toFixed(2),
      };
    }

    console.log(ObjetoCategoriaFuturas)

    imprimirTablasPorFiltro(ObjetoCategoriaFuturas, tablaUpcoming)

    imprimirTablasPorFiltro(ObjetoCategoriaPasadas, tablaPast)
  })
  .catch((err) => console.log(err));

function eventoMayorAsistencia(data) {
  const array = data.slice();

  let porcentaje = (evento) => (evento.assistance / evento.capacity) * 100;

  array.sort((a, b) => {
    return porcentaje(b) - porcentaje(a);
  });

  return `${array[0].name} | ${porcentaje(array[0]).toFixed(2)}%`;
}

function eventoMenorAsistencia(data) {
  const array = data.slice();

  let porcentaje = (evento) => (evento.assistance / evento.capacity) * 100;

  array.sort((a, b) => {
    return porcentaje(a) - porcentaje(b);
  });

  return `${array[0].name} | ${porcentaje(array[0]).toFixed(2)}%`;
}

function eventoMasCapacidad(data) {
  const array = data.slice();

  array.sort((a, b) => {
    return b.capacity - a.capacity;
  });

  return `${array[0].name} | ${array[0].capacity}`;
}

function pintarTablaPrincipal(pasado, todos, container) {
  let mayorPorcentaje = eventoMayorAsistencia(pasado);
  let menorPorcentaje = eventoMenorAsistencia(pasado);
  let masCapacidad = eventoMasCapacidad(todos);

  container.innerHTML += `
    <tr>
        <td>${mayorPorcentaje}</td>
        <td>${menorPorcentaje}</td>
        <td>${masCapacidad}</td>
    </tr>`;
}

/* --------- */

function imprimirTablasPorFiltro(data, tabla){
  let template = ""
  for (const categoria in data) {
    template += `<tr class="text-center">
        <td>${data[categoria].nombre}</td>
        <td>$${data[categoria].ganancia.toLocaleString()}</td>
        <td>${data[categoria].porcentaje}%</td>
    </tr>`;
  }
  tabla.innerHTML = template
}

