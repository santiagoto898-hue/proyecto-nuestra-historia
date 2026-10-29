document.addEventListener("DOMContentLoaded", () => {
  // 1. Límites geográficos definidos
  const bounds = L.latLngBounds(
    [3.7, -74.8],
    [5.4, -73.0]
  );

  // Inicializar el mapa
  const map = L.map('map', {
    center: [4.4000, -74.1500],
    zoom: 10,
    minZoom: 3,
    maxZoom: 19
  });

  // 2. Mapa colorido de OpenStreetMap Alemania
  L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Icono marcador rojo personalizado
  const iconoRojo = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // 3. BASE DE DATOS COMPLETA (22 EVENTOS HISTÓRICOS, CULTURALES Y NATURALES)
  const eventosHistoricos = [
    // --- BOGOTÁ CENTRO & HISTORIA POLÍTICA ---
    {
      id: 1,
      titulo: "Palacio de Justicia",
      lat: 4.5988,
      lng: -74.0754,
      fecha: "6 y 7 de noviembre de 1985",
      categoria: "Suceso Nacional",
      descripcion: "Lugar de la toma y retoma del Palacio de Justicia. Acontecimientos determinantes en la historia contemporánea del país.",
      imgAntes: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Palacio_de_Justicia_Bogota_1985.jpg/320px-Palacio_de_Justicia_Bogota_1985.jpg",
      imgAhora: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Palacio_de_Justicia_de_Colombia_2019.jpg/320px-Palacio_de_Justicia_de_Colombia_2019.jpg",
      links: [
        { texto: "Artículo en Wikipedia", url: "https://es.wikipedia.org/wiki/Toma_del_Palacio_de_Justicia" }
      ]
    },
    {
      id: 2,
      titulo: "Casa del Florero",
      lat: 4.5980,
      lng: -74.0752,
      fecha: "20 de julio de 1810",
      categoria: "Gesta de Independencia",
      descripcion: "Escenario del préstamo del florero de Llorente, hecho simbólico que desencadenó el grito de Independencia.",
      imgAntes: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=320",
      imgAhora: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=320",
      links: [
        { texto: "Museo de la Independencia", url: "https://www.museodelaindependencia.gov.co" }
      ]
    },
    {
      id: 3,
      titulo: "El Bogotazo",
      lat: 4.6015,
      lng: -74.0728,
      fecha: "9 de abril de 1948",
      categoria: "Acontecimiento Político",
      descripcion: "Lugar del asesinato del caudillo Jorge Eliécer Gaitán, evento que marcó un antes y un después en la historia del siglo XX en Colombia.",
      imgAntes: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=320",
      imgAhora: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=320",
      links: [
        { texto: "Historia de El Bogotazo", url: "https://es.wikipedia.org/wiki/Bogotazo" }
      ]
    },

    // --- CIENCIA, BOTÁNICA Y EXPLORACIÓN ---
    {
      id: 4,
      titulo: "Real Expedición Botánica del Nuevo Reino de Granada",
      lat: 4.6680,
      lng: -74.0890,
      fecha: "1783 - José Celestino Mutis",
      categoria: "Ciencia y Botánica",
      descripcion: "Iniciada por el sabio José Celestino Mutis, esta expedición catalogó e ilustró miles de especies vegetales originarias de los cerros y valles aledaños a Bogotá.",
      imgAntes: "https://via.placeholder.com/320?text=Ilustracion+Expedicion+Botanica",
      imgAhora: "https://via.placeholder.com/320?text=Jardin+Botanico+Bogota",
      links: [
        { texto: "Jardín Botánico José Celestino Mutis", url: "https://jbb.gov.co" }
      ]
    },
    {
      id: 5,
      titulo: "Estudios Científicos de Humboldt y Caldas en el Tequendama",
      lat: 4.5815,
      lng: -74.2985,
      fecha: "1801 - Exploración Científica",
      categoria: "Ciencia y Geografía",
      descripcion: "Alexander von Humboldt y Francisco José de Caldas midieron el Salto del Tequendama con altímetros barométricos y documentaron la geografía botánica de las montañas.",
      imgAntes: "https://via.placeholder.com/320?text=Dibujo+Humboldt+Tequendama",
      imgAhora: "https://via.placeholder.com/320?text=Salto+del+Tequendama",
      links: [
        { texto: "Humboldt en Colombia", url: "https://es.wikipedia.org/wiki/Alexander_von_Humboldt" }
      ]
    },

    // --- ARQUEOLOGÍA Y MITOS MUISCAS ---
    {
      id: 6,
      titulo: "Mito de Bochica y la Creación del Salto del Tequendama",
      lat: 4.5822,
      lng: -74.2990,
      fecha: "Época Prehispánica",
      categoria: "Mitología Muisca",
      descripcion: "Según la tradición Muisca, el sabio Bochica golpeó las rocas con su báculo para drenar la Sabana de Bogotá inundada por Huitaca, creando el majestuoso Salto del Tequendama.",
      imgAntes: "https://via.placeholder.com/320?text=Bochica+Mito+Muisca",
      imgAhora: "https://via.placeholder.com/320?text=Cascada+Tequendama",
      links: [
        { texto: "Mitología Muisca", url: "https://es.wikipedia.org/wiki/Mitolog%C3%ADa_muisca" }
      ]
    },
    {
      id: 7,
      titulo: "Laguna Sacra de Guatavita y la Leyenda de El Dorado",
      lat: 4.9797,
      lng: -73.7744,
      fecha: "Época Prehispánica Muisca",
      categoria: "Patrimonio Arqueológico",
      descripcion: "Escenario sagrado donde el Zipa muisca se cubría en polvo de oro para realizar ofrendas rituales en el centro de la laguna, dando origen a la leyenda de El Dorado.",
      imgAntes: "https://via.placeholder.com/320?text=Balsa+Muisca+Dorado",
      imgAhora: "https://via.placeholder.com/320?text=Laguna+de+Guatavita",
      links: [
        { texto: "Leyenda de El Dorado", url: "https://es.wikipedia.org/wiki/El_Dorado" }
      ]
    },
    {
      id: 8,
      titulo: "Pinturas Rupestres de Facatativá (Piedras del Tunjo)",
      lat: 4.8089,
      lng: -74.3525,
      fecha: "Época Prehispánica",
      categoria: "Arte Rupestre",
      descripcion: "Parque arqueológico con abrigos rocosos decorados con pictogramas indígenas en pigmentos rojos que reflejan la cosmogonomía Muisca.",
      imgAntes: "https://via.placeholder.com/320?text=Pictogramas+Muiscas",
      imgAhora: "https://via.placeholder.com/320?text=Piedras+del+Tunjo",
      links: [
        { texto: "Piedras del Tunjo", url: "https://es.wikipedia.org/wiki/Parque_Arqueol%C3%B3gico_de_Facatativ%C3%A1" }
      ]
    },

    // --- ARTE, LITERATURA, INFRAESTRUCTURA Y DEPORTE ---
    {
      id: 9,
      titulo: "José Asunción Silva - Casa de Poesía Silva",
      lat: 4.5972,
      lng: -74.0722,
      fecha: "1896 - Literatura Colombiana",
      categoria: "Patrimonio Literario",
      descripcion: "Hogar del célebre poeta romántico José Asunción Silva en La Candelaria, autor del inmortal poema 'Nocturno III'.",
      imgAntes: "https://via.placeholder.com/320?text=Jose+Asuncion+Silva",
      imgAhora: "https://via.placeholder.com/320?text=Casa+Poesia+Silva",
      links: [
        { texto: "Casa de Poesía Silva", url: "https://www.casadepoesiasilva.com" }
      ]
    },
    {
      id: 10,
      titulo: "Inauguración del Ferrocarril de la Sabana",
      lat: 4.6083,
      lng: -74.0819,
      fecha: "1889 - Modernización",
      categoria: "Infraestructura Histórica",
      descripcion: "La Estación de la Sabana conectó la capital con los municipios de Cundinamarca y el río Magdalena.",
      imgAntes: "https://via.placeholder.com/320?text=Tren+de+la+Sabana+1889",
      imgAhora: "https://via.placeholder.com/320?text=Estacion+de+la+Sabana",
      links: [
        { texto: "Ferrocarriles Nacionales de Colombia", url: "https://es.wikipedia.org/wiki/Ferrocarriles_Nacionales_de_Colombia" }
      ]
    },
    {
      id: 11,
      titulo: "Hotel Refugio del Salto del Tequendama",
      lat: 4.5828,
      lng: -74.2980,
      fecha: "1923 - Arquitectura Republicana",
      categoria: "Patrimonio Arquitectónico",
      descripcion: "Joya de la arquitectura republicana diseñada por el arquitecto Pablo de la Cruz. Funcionó como estación de tren y hotel de lujo.",
      imgAntes: "https://via.placeholder.com/320?text=Hotel+del+Salto+1920",
      imgAhora: "https://via.placeholder.com/320?text=Casa+Museo+Tequendama",
      links: [
        { texto: "Casa Museo Salto del Tequendama", url: "https://es.wikipedia.org/wiki/Hotel_del_Salto" }
      ]
    },
    {
      id: 12,
      titulo: "Triunfo de Efraín 'El Zipa' Forero - Primera Vuelta a Colombia",
      lat: 5.0231,
      lng: -74.0039,
      fecha: "1951 - Hito Deportivo",
      categoria: "Historia Deportiva",
      descripcion: "En Zipaquirá nació y celebró el indomable ciclista Efraín Forero, campeón de la edición inaugural de la Vuelta a Colombia.",
      imgAntes: "https://via.placeholder.com/320?text=El+Zipa+Forero+1951",
      imgAhora: "https://via.placeholder.com/320?text=Zipaquira+Cundinamarca",
      links: [
        { texto: "Historia de la Vuelta a Colombia", url: "https://es.wikipedia.org/wiki/Vuelta_a_Colombia" }
      ]
    },

    // --- LOCALIDAD 20: SUMAPAZ Y REGIÓN ---
    {
      id: 13,
      titulo: "Monumento a Juan de la Cruz Varela",
      lat: 3.9785,
      lng: -74.4855,
      fecha: "Siglo XX - Liderazgo Agrario",
      categoria: "Memoria y Resistencia",
      descripcion: "Homenaje a Juan de la Cruz Varela, líder campesino que organizó grupos de resistencia en búsqueda de la defensa de los habitantes.",
      imgAntes: "https://d3nmwx7scpuzgc.cloudfront.net/sites/default/files/media/image/ch-397-siglo-xx-campesinos-juan-de-la-cru-varela.jpg",
      imgAhora: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOBM87NTaM5afevX1zWqmCjWjYVngMiPexUiJl0B4_01HezkSI5Z8_-Sg&s=10",
      links: [
        { texto: "Credencial Historia - Banrepcultural", url: "https://www.banrepcultural.org/biblioteca-virtual/credencial-historia/numero-397/juan-de-la-cruz-varela" },
        { texto: "Video documental sobre Juan de la Cruz Varela", url: "https://www.youtube.com/watch?v=h2vNlnGwe4c" }
      ]
    },
    {
      id: 14,
      titulo: "La Cuarta Guerra - Corregimiento San Juan de Sumapaz",
      lat: 4.0283,
      lng: -74.3125,
      fecha: "9 de diciembre de 1990",
      categoria: "Conflicto Armado",
      descripcion: "Operación militar llevada a cabo en contra de las FARC, genero grandes repercuciones violentas y de estigmatización hacia los y las habitantes de Sumapaz.",
      imgAntes: "https://www.infobae.com/resizer/v2/XWM2XE4Q3RFP3AX67ATH5654SE?auth=055e9f04447e7c5b3e1d65083a1d6c86776f66d54ef91f53e4968589737cfbf4&smart=true&width=350&height=263&quality=85",
      imgAhora: "https://www.paramodesumapaz.com/wp-content/uploads/2019/12/vereda-san-juan-de-sumapaz.jpg",
      links: [
        { texto: "Comisión de la verdad", url: "https://www.comisiondelaverdad.co/caso-84-transformaciones-violentas-en-sumapaz" },
        { texto: "Relatos para la no repetición", url: "https://www.youtube.com/watch?v=0KjpfWwRLYY" }
      ]
    },
    {
      id: 15,
      titulo: "Declaratoria del Parque Nacional Natural Sumapaz",
      lat: 4.2833,
      lng: -74.2000,
      fecha: "1977 - Conservación Ambiental",
      categoria: "Ciencia y Naturaleza",
      descripcion: "Junto a la Laguna de Chisacá, se declaró protegido el páramo continuo más grande del mundo, fábrica vital de agua y epicentro de biodiversidad de la región central.",
      imgAntes: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/Laguna_de_Chisac%C3%A1%2C_P%C3%A1ramo_de_Sumapaz%2C_Colombia.JPG/1280px-Laguna_de_Chisac%C3%A1%2C_P%C3%A1ramo_de_Sumapaz%2C_Colombia.JPG?utm_source=es.wikipedia.org&utm_campaign=index&utm_content=thumbnail",
      imgAhora: "https://i0.wp.com/humedalesbogota.com/wp-content/uploads/2015/12/P1020050.jpg?resize=690%2C500&ssl=1",
      links: [
        { texto: "Parques Nacionales Naturales de Colombia", url: "https://www.parquesnacionales.gov.co/nuestros-parques/pnn-sumapaz/" }
      ]
    },
    {
      id: 16,
      titulo: "Jaime Garzón - Corregimiento de Betania",
      lat: 4.215,
      lng: -74.145,
      fecha: "1988 - 1989",
      categoria: "Gestión Pública y Paz",
      descripcion: "Durante su gestión como alcalde local de Sumapaz, el periodista y humorista Jaime Garzón recorrió y promovió el desarrollo comunal y social en el corregimiento de Betania y sus veredas.",
      imgAntes: "https://www.prensarural.org/spip/IMG/jpg/IMAGEN-14376777-2.jpg",
      imgAhora: "https://www.bogotaauctions.com/img/thumbs/500/001/852/001-852-9.jpg?a=1701889754",
      links: [
        { texto: "Sumapaz y Jaime Garzón", url: "https://www.elespectador.com/entretenimiento/gente/entre-sumapaz-y-las-sonrisas-de-jaime-garzon/"},
        {  texto: "Jaime Garzón y su huella en Sumapaz", url: "https://www.prensarural.org/spip/spip.php?article14834"
         }
      ]
    },
    {
      id: 17,
      titulo: "Territorio Ancestral Indígena Sutagao",
      lat: 4.3333,
      lng: -74.3833,
      fecha: "Época Prehispánica (Siglo XVI)",
      categoria: "Patrimonio Indígena",
      descripcion: "La cuenca del Río Sumapaz fue asentamiento de la comunidad indígena Sutagao, pertenecientes a la familia Chibcha.",
      imgAntes: "https://via.placeholder.com/320?text=Comunidad+Sutagao",
      imgAhora: "https://via.placeholder.com/320?text=Cuenca+Rio+Sumapaz",
      links: [
        { texto: "Pueblo Sutagao en Wikipedia", url: "https://es.wikipedia.org/wiki/Sutagaos" }
      ]
    },
    {
      id: 18,
      titulo: "Casona de Llano Grande",
      lat: 4.218333,
      lng: -74.146111,
      fecha: "Siglo XIX - XX",
      categoria: "Patrimonio Arquitectónico",
      descripcion: "Antigua casona de hacienda campesina que testimonia la época de los grandes latifundios y luchas agrarias.",
      imgAntes: "https://via.placeholder.com/320?text=Casona+Antigua",
      imgAhora: "https://via.placeholder.com/320?text=Llano+Grande+Sumapaz",
      links: [
        { texto: "La lucha por la tierra", url: "https://www.bibliotecadigitaldebogota.gov.co/expositions/sumapaz-del-cielo-la-tierra/residencia-en-la-tierra/" }
      ]
    },
    {
      id: 19,
      titulo: "Guarnición Militar Base Navas Pardo",
      lat: 4.1550,
      lng: -74.3180,
      fecha: "28 de junio de 2001",
      categoria: "Historia Militar y Territorial",
      descripcion: "Sede del Batallón de Alta Montaña No. 1 'General José María Navas Pardo' en San Juan de Sumapaz.",
      imgAntes: "https://via.placeholder.com/320?text=Base+Navas+Pardo",
      imgAhora: "https://via.placeholderhttps://via.placeholder.com/320?t.com/320?text=San+Juan+de+Sumapaz",
      links: [
        { texto: "Batallón de Alta Montaña No. 1", url: "https://www.ejercito.mil.co" }
      ]
    },
    {
      id: 20,
      titulo: "Frenado del Proyecto Hidroeléctrico El Paso",
      lat: 3.9500,
      lng: -74.4500,
      fecha: "2014 - Resistencia Ambiental",
      categoria: "Defensa del Territorio",
      descripcion: "La organización comunitaria de la población logró la cancelación del proyecto hidroeléctrico sobre el río Sumapaz.",
      imgAntes: "https://imagenes2.eltiempo.com/files/image_600_455/uploads/2023/08/09/64d3b0880b07e.jpeg",
      imgAhora: "https://oab.ambientebogota.gov.co/wp-content/uploads/2024/06/DJI_0120-scaled.jpg",
      links: [
        { texto: "Defensa del Río Sumapaz", url: "https://www.hchr.org.co/noticias/lucha-por-proteger-el-sumapaz/" },
        { texto: "No a la hidroelectrica", url: "https://www.youtube.com/watch?v=5red_mTQQzU" }
      ]
    },
    {
      id: 21,
      titulo: "Mural de las Víctimas del Conflicto Armado",
      lat: 4.237933,
      lng: -74.188494,
      fecha: "Siglo XXI - Memoria Viva",
      categoria: "Memoria y Paz",
      descripcion: "Expresión artística comunitaria en San Juan de Sumapaz que rinde homenaje a Maria Fanny Torres Ramirez, Fernando Morales Pabon, Guillermo Leal, Deiver Hernando Romero Perez, Edwin Gamboa Rojas.",
      imgAntes: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1ZIf9wmFmScU75xkFfsINYOtm2Qs3PHVJBcSxgoN2-A&s",
      imgAhora: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYyHvGnAcuO5cF221UEZU_sFyQA6CxRI6XYtoXvF7SNQ&s",
      links: [
        { texto: "Donde la memoria florece", url: "https://www.youtube.com/watch?v=S62Yf2hpEtI" }
      ]
    },
    {
      id: 22,
      titulo: "Terremoto de Sumapaz (Laguna Verde - Nazareth)",
      lat: 4.2167,
      lng: -74.2500,
      fecha: "4 de septiembre de 1966",
      categoria: "Evento Natural",
      descripcion: "Sismo de magnitud ~5.5 con epicentro telúrico entre Laguna Verde y Nazareth que sacudió la cordillera.",
      imgAntes: "https://via.placeholder.com/320?text=Sismo+1966",
      imgAhora: "https://via.placeholder.com/320?text=Laguna+Verde+Nazareth",
      links: [
        { texto: "Red Sismológica Nacional", url: "https://www.sgc.gov.co" }
      ]
    }
  ];

  // 4. Renderizar marcadores
  eventosHistoricos.forEach(evento => {
    const marker = L.marker([evento.lat, evento.lng], { icon: iconoRojo }).addTo(map);
    marker.bindTooltip(evento.titulo);
    marker.on('click', () => mostrarDetalle(evento));
  });

  // Función para abrir la ventana modal
  function mostrarDetalle(evento) {
    const elTitulo = document.getElementById('modal-titulo');
    const elFecha = document.getElementById('modal-fecha');
    const elCategoria = document.getElementById('modal-categoria');
    const elDescripcion = document.getElementById('modal-descripcion');
    const elImgAntes = document.getElementById('modal-img-antes');
    const elImgAhora = document.getElementById('modal-img-ahora');
    const contenedorLinks = document.getElementById('modal-links');

    if (elTitulo) elTitulo.innerText = evento.titulo;
    if (elFecha) elFecha.innerText = `📅 ${evento.fecha}`;
    if (elCategoria) elCategoria.innerText = evento.categoria;
    if (elDescripcion) elDescripcion.innerText = evento.descripcion;

    if (elImgAntes) elImgAntes.src = evento.imgAntes || 'https://via.placeholder.com/150?text=Sin+Foto';
    if (elImgAhora) elImgAhora.src = evento.imgAhora || 'https://via.placeholder.com/150?text=Sin+Foto';

    if (contenedorLinks) {
      contenedorLinks.innerHTML = '';
      if (evento.links) {
        evento.links.forEach(link => {
          const li = document.createElement('li');
          li.innerHTML = `<a href="${link.url}" target="_blank" rel="noopener noreferrer">🔗 ${link.texto}</a>`;
          contenedorLinks.appendChild(li);
        });
      }
    }

    const modal = document.getElementById('modal-historico');
    if (modal) modal.classList.remove('oculto');
  }

  // Evento cerrar modal
  const btnCerrar = document.getElementById('cerrar-modal');
  if (btnCerrar) {
    btnCerrar.addEventListener('click', () => {
      const modal = document.getElementById('modal-historico');
      if (modal) modal.classList.add('oculto');
    });
  }

  // 5. Visor para ver fotos en grande (Lightbox)
  const imgAntes = document.getElementById('modal-img-antes');
  const imgAhora = document.getElementById('modal-img-ahora');
  const visorModal = document.getElementById('modal-visor-imagen');
  const imagenAmpliada = document.getElementById('imagen-ampliada');
  const btnCerrarVisor = document.getElementById('cerrar-visor');

  function abrirVisor(url) {
    if (url && imagenAmpliada && visorModal && !url.includes('placeholder')) {
      imagenAmpliada.src = url;
      visorModal.classList.remove('oculto');
    }
  }

  if (imgAntes) imgAntes.addEventListener('click', () => abrirVisor(imgAntes.src));
  if (imgAhora) imgAhora.addEventListener('click', () => abrirVisor(imgAhora.src));

  if (btnCerrarVisor) {
    btnCerrarVisor.addEventListener('click', () => visorModal.classList.add('oculto'));
  }

  if (visorModal) {
    visorModal.addEventListener('click', (e) => {
      if (e.target === visorModal) visorModal.classList.add('oculto');
    });
  }

  // 6. Geolocalización por GPS y Verificación de Proximidad
  let userMarker = null;

  const btnLocation = document.getElementById('btn-location');
  if (btnLocation) {
    btnLocation.addEventListener('click', () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          if (userMarker) {
            userMarker.setLatLng([lat, lng]);
          } else {
            userMarker = L.circleMarker([lat, lng], {
              radius: 10,
              fillColor: "#ffd100",
              color: "#ce1126",
              weight: 3,
              opacity: 1,
              fillOpacity: 0.9
            }).addTo(map);
            userMarker.bindPopup("<b>¡Tu posición actual!</b>").openPopup();
          }

          map.setView([lat, lng], 18);
          verificarCercania(lat, lng);

        }, () => {
          alert("No se pudo obtener tu ubicación. Por favor activa el GPS en tu navegador.");
        });
      } else {
        alert("Tu navegador no soporta geolocalización.");
      }
    });
  }

  // Cálculo de distancia en metros (Fórmula Haversine)
  function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  // Alerta a 300 metros de distancia
  function verificarCercania(userLat, userLng) {
    const RADIO_CERCANIA = 300; 
    let encontrado = false;

    eventosHistoricos.forEach(evento => {
      const distancia = calcularDistancia(userLat, userLng, evento.lat, evento.lng);
      
      if (distancia <= RADIO_CERCANIA) {
        encontrado = true;
        alert(`🔔 ¡Atención! Estás a ${Math.round(distancia)}m de: "${evento.titulo}".`);
        mostrarDetalle(evento);
      }
    });

    if (!encontrado) {
      console.log("No hay eventos a menos de 300m.");
    }
  }
});
