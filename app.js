document.addEventListener("DOMContentLoaded", () => {
  // 1. Límites geográficos definidos
  const bounds = L.latLngBounds(
    [3.7, -74.8],
    [5.4, -73.0]
  );

  // Inicializar el mapa (centrado más hacia el norte para abarcar Bogotá y la región)
  const map = L.map('map', {
    center: [4.5500, -74.1000],
    zoom: 10,
    minZoom: 3,
    maxZoom: 19
  });

  // 2. Mapa colorido de OpenStreetMap Alemania
  L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Icono marcador rojo personalizado (Tamaño reducido para no saturar)
  const iconoRojo = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [15, 25],      // Ancho: 15px, Alto: 25px
    iconAnchor: [7, 25],     // Punto de apoyo en la punta del marcador
    popupAnchor: [1, -20],   // Posición del popup
    shadowSize: [25, 25]     // Sombra proporcional
  });

  // 3. BASE DE DATOS COMPLETA (VERIFICADA PARA USAQUÉN Y REGIÓN)
  const eventosHistoricos = [
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
      descripcion: "Se declaró protegido el páramo continuo más grande del mundo, fábrica vital de agua y epicentro de biodiversidad de la región central.",
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
        { texto: "Sumapaz y Jaime Garzón", url: "https://www.elespectador.com/entretenimiento/gente/entre-sumapaz-y-las-sonrisas-de-jaime-garzon/" },
        { texto: "Jaime Garzón y su huella en Sumapaz", url: "https://www.prensarural.org/spip/spip.php?article14834" }
      ]
    },
    {
      id: 17,
      titulo: "Territorio Ancestral Indígena Sutagao",
      lat: 4.3333,
      lng: -74.3833,
      fecha: "Época Prehispánica (Siglo XVI)",
      categoria: "Patrimonio Indígena",
      descripcion: "La cuenca del Río Sumapaz fue asentamiento de la comunidad indígena Sutagao, pertenecientes a la familia Chibcha, tenian multiples encuentros con los Panches que eran el grupo indigena mas cercano que tenian ",
      imgAntes: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=328,h=320,fit=crop/d95pOyGgb5T5oyza/sutagaos2-YX4P9Mryz0H5bg01.jpg",
      imgAhora: "https://static.wixstatic.com/media/404813_aa39b986cceb4b54aa220ec2f7759b78~mv2.jpg/v1/fill/w_750,h_1000,al_c,q_85,usm_0.66_1.00_0.01/404813_aa39b986cceb4b54aa220ec2f7759b78~mv2.jpg",
      links: [
        { texto: "Pueblo Sutagao", url: "https://eldoradocolombia.com/los-sutagaos" }
      ]
    },
    {
      id: 18,
      titulo: "Casona de Llano Grande",
      lat: 4.218333,
      lng: -74.146111,
      fecha: "Siglo XIX - XX",
      categoria: "Patrimonio Arquitectónico",
      descripcion: "Propiedad de los Pardo Roche, familia de terratenientes que se apropiaron de mas de 200.000 hectareas generando multiples formas de violencia hacia los habitantes de estas zonas apropiandose incluso de sus tierras, esto dio paso a las Luchas Agrarias de la region.",
      imgAntes: "https://www.archivogeneral.gov.co/sites/default/files/2025-01/1_3.jpg",
      imgAhora: "https://www.archivogeneral.gov.co/sites/default/files/2025-01/intro_agraria.png",
      links: [
        { texto: "Historia Casona llano Grande", url: "https://www.facebook.com/alcaldial.sumapaz/videos/nuestro-alcalde-local-diego-garc%C3%ADa-bejarano-nos-comparte-la-historia-de-un-verda/767007089708232/" },
        { texto: "La lucha por la tierra", url: "https://www.bibliotecadigitaldebogota.gov.co/expositions/sumapaz-del-cielo-la-tierra/residencia-en-la-tierra/" }
      ]
    },
    {
      id: 19,
      titulo: "Guarnición Militar Base Navas Pardo",
      lat: 4.1550,
      lng: -74.3180,
      fecha: "1953-1957",
      categoria: "Historia Militar y Territorial",
      descripcion: "Carcel mandada construir por el Dictador Rojas Pinilla, para recluir opositores politicos, sindicalistas, campesinos y guerrilleros ",
      imgAntes: "https://www.infobae.com/resizer/v2/ZGWPGSE36ZCRZI6CL7AY7FIKVU.png?auth=8a6e6e86f1c21c000a27c4e8e66215245449be021cf45f0485b67a3b8f494e36&smart=true&width=1200&height=900&quality=85",
      imgAhora: "https://bogota.gov.co/sites/default/files/u3859/Sumapaz_5.jpg",
      links: [
        { texto: "Carcel secreta de Rojas Pinilla", url: "https://www.infobae.com/colombia/2025/03/09/asi-se-encuentra-la-carcel-secreta-abandonada-de-colombia-queda-llegando-al-sumapaz/" },
        { texto: "Secretos de la carcel de Rojas Pinilla", url: "https://www.cronista.com/colombia/tiempo-libre/los-aterradores-secretos-de-nazaret-la-oscura-y-aislada-carcel-colombiana/" }
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
      titulo: "Terremoto de Sumapaz",
      lat: 4.2167,
      lng: -74.2500,
      fecha: "31 de Agosto 1917",
      categoria: "Evento Natural",
      descripcion: "Sismo de magnitud 6.7 con epicentro en el Paramo de Sumapaz.",
      imgAntes: "https://www2.sgc.gov.co/Noticias/PublishingImages/Noticias/simicidad2.jpg",
      imgAhora: "https://estaticos.elcolombiano.com/binrepository/720x473/0c-91/780d565/none/11101/IGAI/terremoto-bogota-1917-twitter-historia-bogota_43179732_20230831181533.jpg",
      links: [
        { texto: "100 años del ultimo gran terremoto en Bogota", url: "https://www2.sgc.gov.co/Noticias/Paginas/31-DE-AGOSTO,-100-A%C3%91OS-DEL-%C3%9ALTIMO-GRAN-TERREMOTO-EN-BOGOT%C3%81.aspx" },
        { texto: "El ultimo gran terremoto en Bogota", url: "https://www.bluradio.com/nacion/cuando-fue-el-ultimo-gran-terremoto-en-bogota-so35" }
      ]
    },

    // --- LOCALIDAD 1: USAQUÉN Y SECTOR NORTE ---
    {
      id: 23,
      titulo: "Hacienda Santa Bárbara - Historia y Rescate Arquitectónico",
      lat: 4.6942,
      lng: -74.0326,
      fecha: "Siglo XVII - XX",
      categoria: "Patrimonio Arquitectónico",
      descripcion: "Patrimonio arquitectonico e historioco de Bogota, propiedad de Don Pepe Sierra, convertido tiempo despues en centro comercial",
      imgAntes: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY9GeIiyXFuAyko8jI4FKy5ZrLpDNoppJTOfRLv8TSdeKCx0kR4xoGt4Q&s=10",
      imgAhora: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCDWhJCoe1RugJnWTHKZsZJYhRcu2-T_yfmHN_wJ6tgRrQnhUIRd0R85pl&s=10",
      links: [
        { texto: "Hacienda Santa Barbara", url: "https://www.pulzo.com/nacion/bogota/que-era-hacienda-santa-barbara-centro-comercial-bogota-que-tuvo-dueno-famoso-PP4358773" },
        { texto: "Historia de Hacienda Santa Barbara", url: "https://www.youtube.com/watch?v=5fQoEtbXokQ&t=22s" }
      ]
    },
    {
      id: 24,
      titulo: "Hacienda Santa Ana",
      lat: 4.6920,
      lng: -74.0330,
      fecha: "Época Colonial",
      categoria: "Patrimonio Histórico",
      descripcion: "Histórica hacienda colonial surgió hace seis décadas en la antigua hacienda de don Tomás Rueda Vargas. El territorio fue participe directo de los diferentes sucesos de Usaquen.",
      imgAntes: "https://repository.uniminuto.edu/server/api/core/bitstreams/c160b033-3e79-45f6-8256-f7926b6f900b/content",
      imgAhora: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Y8nd5uM3DXjrPe-huOTENRyvJKgwgB3pz3ozcGdLv20HNcMY4SQqFxg&s=10",
      links: [
        { texto: "El fin de Santa Ana de acerca", url: "https://guilletovar.blogspot.com/2018/03/el-fin-de-santa-ana-se-acerca.html" },
        { texto: "Historia de Hacienda Santa Barbara", url: "https://www.youtube.com/watch?v=5fQoEtbXokQ&t=22s" }
      ]
    },
    {
      id: 25,
      titulo: "Antigua Estación de Tren de Usaquén",
      lat: 4.6900,
      lng: -74.0390,
      fecha: "1926",
      categoria: "Infraestructura Histórica",
      descripcion: "Estación de ferrocarril construida en 1926 fundamental para la conexión del norte con la Sabana de Bogotá durante el siglo XX.",
      imgAntes: "https://scontent.fbog2-5.fna.fbcdn.net/v/t51.82787-15/572353551_18326510686209393_4369474174965207648_n.webp?stp=dst-jpg_tt6&cstp=mx1440x928&ctp=p180x540&_nc_cat=107&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=127cfc&_nc_ohc=1Yp1DvN1kLAQ7kNvwEjwRzE&_nc_oc=Adr1vZoxVoKbv16ZAivVO6k4MH8jVm-cuZ7M3D5BifZW3JFbye-V2cdK14vtB2_QeKBKhOXuZMAZK9RIJfFBLU1r&_nc_zt=23&_nc_ht=scontent.fbog2-5.fna&_nc_gid=fgf9Iz75ejKFlr-hX6de5w&_nc_ss=7b289&oh=00_AQS6JgqkSy6AOlbIyWh8_8XZtbh5iHKtj03RBVFsrxEZPQ&oe=6AF2DC7D",
      imgAhora: "https://imagenes2.eltiempo.com/files/image_1200_535/uploads/2018/08/05/5b6795dcdd57d.jpeg",
      links: [
        { texto: "Antigua estacion de Tren de Usaquen", url: "https://www.facebook.com/historias.de.colombia/posts/estaci%C3%B3n-del-tren-de-usaqu%C3%A9n-a%C3%B1os-1920durante-buena-parte-del-siglo-xx-el-tren-f/1140973108237421/" },
        { texto: "Pagina web actual del tren de la sabana", url: "https://turistren.com.co/" }
      ]
    },
    {
      id: 26,
      titulo: "Campamento Tropas Francisco de Paula Santander",
      lat: 4.7322,
      lng: -74.0365,
      fecha: "Época de la Independencia",
      categoria: "Historia Militar",
      descripcion: "Las tropas libertadoras (patriotas) acamparon en Usaquén en marzo de 1816 bajo el mando del general francés Miguel Serviez y el entonces coronel Francisco de Paula Santander.",
      imgAntes: "https://d37rmf1ynyg9aw.cloudfront.net/fit-in/1280x1280/data/v4/resources/images/a2e2571f-5be1-43cd-b6da-1ae801ff39ad.jpg",
      imgAhora: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFMxbqxPOFmcJ7Ihlqqeq2SXMMKjUw_e0yYYfo3_hgSw&s=10",
      links: [
        { texto: "Centro Cultural Hacienda El Cedro", url: "https://centroculturalhaciendaelcedro.com/portfolio/museosantander/" },
        { texto: "Vlog casa museo de Francisco De Paula Santander", url: "https://www.youtube.com/watch?v=TuNGSdMhuPs" }
      ]
    },
    {
      id: 27,
      titulo: "Guerra Civil de 1861 en Usaquén",
      lat: 4.6950,
      lng: -74.0310,
      fecha: "12 y 13 de Junio de 1861",
      categoria: "Conflicto Histórico",
      descripcion: "Escenario de enfrentamientos entre las tropas de el presidente Mariano Ospina y las tropas revolucionarias dirigidas por el general Santos Gutierrez, llevo a que el General Gutierrez terminara asumiendo el mando del pais.",
      imgAntes: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Santos_Guti%C3%A9rrez_1.jpg/500px-Santos_Guti%C3%A9rrez_1.jpg?utm_source=es.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
      imgAhora: "https://bogota.gov.co/sites/default/files/styles/1050px/public/field/image/usaquen2.jpg",
      links: [
        { texto: "Usaquen su verdadera historia", url: "https://bogotasocial.org/2025/11/06/usaquen-su-verdadera-historia-hasta-el-2024/" },
        { texto: "Historia del poblamiento de Usaquen", url: "https://bogota.gov.co/mi-ciudad/usaquen/historia-del-poblamiento-de-usaquen" }
      ]
    },
    {
      id: 29,
      titulo: "Av Calle Don Pepe Sierra",
      lat: 4.6937,
      lng: -74.0339,
      fecha: "Siglo XX",
      categoria: "Historia Local y Tradición",
      descripcion: "Fue uno de los empresarios y prestamistas más acaudalados en la historia de Colombia, poseia grandes extensiones de terrirotio en Usaquen incluyendo la Hacienda Santa Barbara",
      imgAntes: "https://d3nmwx7scpuzgc.cloudfront.net/sites/default/files/5_8.jpg",
      imgAhora: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAOp8pUDF1dIc7vqoRGWBOATQq0l76GEDxPBffvtMarV-ktV3BpzeV8boT&s=10",
      links: [
        { texto: "Jose Maria Sierra", url: "https://es.wikipedia.org/wiki/Jos%C3%A9_Mar%C3%ADa_Sierra" },
        { texto: "Biografia Don Pepe Sierra", url: "https://enciclopedia.banrepcultural.org/Jos%C3%A9_Mar%C3%ADa_Sierra" }
      ]
    },
    {
      id: 30,
      titulo: "Centro Comercial Unicentro",
      lat: 4.7018,
      lng: -74.0411,
      fecha: "27 de abril de 1976",
      categoria: "Desarrollo Urbano",
      descripcion: "Construido en los predios de la antigua Hacienda Multicentro por Pedro Gómez y Cía. Su inauguración aceleró la urbanización y modernización de Usaquén.",
      imgAntes: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVoGMZTLWUi74Hs1kTe9n6n12iujDfEpWg-C1uIWG1K23_WxDNrI0Xvyg&s=10",
      imgAhora: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/c8/6e/9e/centro-comercial-unicentro.jpg?w=900&h=500&s=1",
      links: [
        { texto: "50 años de  UnicentroT", url: "https://visitbogota.co/es/blog/cumple-50-anos-unicentro-bogota-mas-que-un-centro-comercial-es-un-simbolo-de-compras-diversion" },
        { texto: "Quien fue el primer dueño de Unicentro", url: "https://www.pulzo.com/economia/unicentro-bogota-cumple-50-anos-se-preguntan-quien-fue-su-primer-dueno-PP5172815A" }
      ]
    },
    {
      id: 31,
      titulo: "Antigua Fábrica de Telas Huatay",
      lat: 4.6975,
      lng: -74.0302,
      fecha: "Década de 1960 (Calle 119 con Cra 6a)",
      categoria: "Patrimonio Industrial e Hito Histórico",
      descripcion: "Sede de la taller-fábrica Telas Huatay creada por Raquel Vivas. Aquí se tejieron artesanalmente los paños ignífugos de lana virgen usados para forrar el módulo de la nave Apolo 11 de la NASA.",
      imgAntes: "https://boyaca7dias.com.co/wp-content/uploads/2024/06/Raquel-Vivas-Rincon-y-su-empresa-Telas-Huatay.jpg",
      imgAhora: "https://www2.culturarecreacionydeporte.gov.co/sites/default/files/styles/escala_800_px/public/2018_articulos/whatsapp_image_2019-05-22_at_14_opt.jpg?itok=qA2PLZ9A",
      links: [
        { texto: "Usaquen presente en el Apolo 11", url: "https://usaquen.gobiernobogota.gov.co/noticias/usaquen-presente-apolo-ii" },
        { texto: "Los años 50 en Usaquen", url: "https://www2.culturarecreacionydeporte.gov.co/en/node/53102" },
        { texto: "El recuerdo de la boyacence que tejio en lana de oveja el plano que forro el apolo 11", url: "https://boyaca7dias.com.co/2024/06/07/el-recuerdo-de-la-boyacense-que-tejio-en-lana-de-oveja-el-pano-que-forro-el-apolo-11-tolditos7dias/" }
      ]
    },
    {
      id: 32,
      titulo: "Cementerio Parroquial de Usaquén",
      lat: 4.6967,
      lng: -74.02917,
      fecha: "Siglo XIX",
      categoria: "Patrimonio Funerario y Memoria Campesina",
      descripcion: "Tambien conocido como el cementerio de los colores, era propiedad del municipio de Usaquen,cuando se anexo a Bogota paso a ser parte de una catesis que aun lo sigue dirigiendo,en el reposan trabajadores y campesinos del siglo XIX, se pueden observar desde entierros en el suelo hasta Mausoleos",
      imgAntes: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-YVhkzZjmpmkE1cgvhWgO8id4OQA2K2ojOelI8SBtswX1YGVU7NQPV0KK&s=10",
      imgAhora: "https://photos.wikimapia.org/p/00/00/83/99/09_big.jpg",
      links: [
        { texto: "Cementerio de Usaquén", url: "https://www.youtube.com/watch?v=WJVIIhKyxb8" },
        { texto: "Cementerio de Usaquén", url: "https://www.youtube.com/watch?v=WJVIIhKyxb8" }
      ]
    },
    {
      id: 33,
      titulo: "Toldos de San Pelayo - Origen Mercado de las Pulgas",
      lat: 4.6968,
      lng: -74.0305,
      fecha: "1990",
      categoria: "Tradición y Comercio Tradicional",
      descripcion: "Punto donde surgió la Asociación de Expositores Toldos de San Pelayo en 1990, dando origen al célebre e icónico Mercado de las Pulgas del parque de Usaquén.",
      imgAntes: "https://live.staticflickr.com/3304/3448005209_aeb185a410_b.jpg",
      imgAhora: "https://visitbogota.co/sites/default/files/styles/vn_gallery/public/2026-02/5.Mercado%20de%20las%20Pulgas%20Usaque%CC%81n_04122021_Ricardo%20Ba%CC%81ez_4.jpg.webp?itok=dAwSBv-q",
      links: [
        { texto: "Historia del Mercado de las Pulgas", url: "https://www.mercadopulgasusaquen.com/la-asociacion/historia/" }
      ]
    },
    {
      id: 34,
      titulo: "Extinción del Resguardo Indígena de Usaquén",
      lat: 4.6955,
      lng: -74.0315,
      fecha: "1777-1799  Época Virreinal",
      categoria: "Memoria y Territorio Ancestral",
      descripcion: "Por un decreto Virreinal  del visitador Moreno y Escandón se disolvió la comunidad Indigena Muiscas de Usaquén, expulsando a sus pobladores originarios hacia Soacha para rematar las tierras a hacendados criollos debido al incremento en las familias.",
      imgAntes: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcd_y4LYo-rEKaaFQXYWbOO3PLWgbgdRkQDXoBCfAjkYevN0w6PkAfdheO&s=10",
      imgAhora: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKP4eCm6eCb0-W3BfdIBUPatfCxi9CU0ucvQYf5ieAagmGtXRct013BaY&s=10",
      links: [
        { texto: "El misterio de Usaquén", url: "https://www.youtube.com/watch?v=A7FHZN7OryE" },
        { texto: "Usaquen su verdadera historia", url: "https://bogotasocial.org/2025/11/06/usaquen-su-verdadera-historia-hasta-el-2024/" }
      ]
    },
    {
      id: 35,
      titulo: "Parroquia Santa Bárbara de Usaquén",
      lat: 4.6930,
      lng: -74.0320,
      fecha: "1585- 16566",
      categoria: "Patrimonio Religioso y Arquitectónico",
      descripcion: "Inicio como una pequeña capilla construida por los colonos en el medio de una comunidad Indigena forzando a la creencia Cartolica, con el tiempo se construyo una iglesia en su lugar.",
      imgAntes: "https://www.elcatolicismo.com.co/sites/default/files/inline-images/FOTO%20B-%20PARROQUIA%20USAQU%C3%89N%201940%20-1941.jpg",
      imgAhora: "https://visitbogota.co/sites/default/files/styles/large/public/2026-02/5.Parroquia%20Santa%20Barbara%20-%20Usaquen_11zon_1.jpg.webp?itok=i_z-LcTZ",
      links: [
        { texto: "Parroquia Santa Bárbara de Usaquén", url: "https://visitbogota.co/es/que-hacer-en-bogota/cultura/parroquia-santa-barbara-de-usaquen" }
      ]
    },
    // --- NUEVOS PUNTOS VERIFICADOS DE USAQUÉN Y NORTE ---
    {
      id: 39,
      titulo: "Robo de Armas del Cantón Norte",
      lat: 4.6850,
      lng: -74.0380,
      fecha: "1 de enero de 1979",
      categoria: "Historia Militar y Conflicto",
      descripcion: "Tambien conocido como Operacion Ballena Azul fue un robo perpetuado por el M19  mediante un tunel, robaron armas del Canton Norte esto genero un gran simbolismo en la historia del M19, sin embargo trajo graves concecuencias para el movimiento.",
      imgAntes: "https://www.pantallazosnoticias.com.co/wp-content/uploads/2021/12/Robo-de-armas-del-canton-norte.jpg",
      imgAhora: "https://i.ytimg.com/vi/79SmjXPey3Y/sddefault.jpg",
      links: [
        { texto: "Robo de armas del Cantón Norte - M19", url: "https://www.senalmemoria.co/piezas/m-19-robo-de-armas-canton-norte" },
        { texto: "El asalto del M19 al canton Norte profundiza la represion", url: "https://www.comisiondelaverdad.co/asalto-del-m-19-al-canton-norte-profundiza-la-represion" }
      ]
    },
    {
      id: 41,
      titulo: "Hacienda y Humedal de Torca",
      lat: 4.7800,
      lng: -74.0400,
      fecha: "Siglo XIX - XX",
      categoria: "Patrimonio Ambiental e Histórico",
      descripcion: "Antiguos predios de la sabana norte y la hacienda Torca, testigos de procesos de adjudicación de tierras, conflictos agrarios y la preservación ecológica del humedal.",
      imgAntes: "https://via.placeholder.com/320?text=Hacienda+Torca",
      imgAhora: "https://via.placeholder.com/320?text=Humedal+Torca",
      links: [
        { texto: "Humedal y zona de Torca", url: "https://oab.ambientebogota.gov.co/" }
      ]
    },
    {
      id: 42,
      titulo: "La Cuna del Calzado Artesanal",
      lat: 4.5800,
      lng: -74.0980,
      fecha: "Década de 1940",
      categoria: "Patrimonio Industrial e Identidad",
      descripcion: "Talleres familiares que nacieron con el barrio hasta consolidarlo como uno el punto de venta de zapatos mas importante de Bogota.",
      imgAntes: "https://scontent.fbog2-5.fna.fbcdn.net/v/t39.30808-6/487441617_1152211483367574_826648789286386908_n.jpg?stp=dst-jpg_tt6&cstp=mx604x373&ctp=s604x373&_nc_cat=102&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=7DQ8JjcgMMUQ7kNvwG8f1Vw&_nc_oc=AdqhR6VcGFQ7QJuuraq4VX-xCTQIqDRcIMYyG8r6Y13Nw4FWbILxrMZu39m91Qxv1BZ89ebXEk_vC2bFd6YtbU6O&_nc_zt=23&_nc_ht=scontent.fbog2-5.fna&_nc_gid=v9R-Xgi5z3Zi04U4JOBmDw&_nc_ss=7b289&oh=00_AQQOE5l_1B3lc5zfnLza3cW9h-ZVctqHdAHIeBfBEW8QqA&oe=6B01697F",
      imgAhora: "https://www.semana.com/resizer/v2/BOVUW4CJMVH75BKZTZ2O42KGXU.jpg?smart=true&auth=670619c83d1a7ed6ba1deb32aac9fae8bed93ca38e77ed0f46d04c3289ba6674&width=1280&height=720",
      links: [
        { texto: "Ruta del Cuero", url: "https://visitbogota.co/es/rutas-turisticas/ruta-del-cuero-el-restrepo-hecho-mano" },
        { texto: "Restrepo el corazon en los pies", url: "https://historico.gobiernobogota.gov.co/noticias/nivel-central/restrepo-corazon-los-pies" }
      ]
    },
    {
      id: 43,
      titulo: "El Parque y Lago de Diversiones 'Luna Park'",
      lat: 4.5915,
      lng: -74.0898,
      fecha: "1920 - 1945",
      categoria: "Patrimonio Urbano y Recreación",
      descripcion: "Laguna artificial alimentada por el río Fucha donde familias  de la época paseaban en botes de remo, luego de 1948 fue rellenado con escombros para poder construir el barrio EL Restrepo.",
      imgAntes: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/PFF3HSXZU5AZLAUKFGQYMAEDYY.jpeg",
      imgAhora: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBg_cIiSCoTAZO8cJKCuN88eC4URKShuZqXapEQ-OIjIUNBuRehdV4rrl5&s=10",
      links: [
        { texto: "El gigante lago sobre el cual se levanto El Restrepo.", url: "https://www.las2orillas.co/lunapark-el-gigante-lago-sobre-el-cual-se-levanto-el-restrepo-el-popular-barrio-de-bogota/" },
        { texto: "La historia del parque perdido de Bogota.", url: "https://www.youtube.com/watch?v=Z6HsmtS2rEY" }
      ]
    },
    {
      id: 44,
      titulo: "La Toma y Fundación del Barrio Policarpa Salavarrieta",
      lat: 4.5885,
      lng: -74.0880,
      fecha: "26 de mayo de 1961",
      categoria: "Memoria y Lucha Social",
      descripcion: "Apropiacion de tierras por parte de victimas desplazadas de la violencia bipartidista, proceso que duro aproximadamente 6 años llenos de represion por parte de la policia hasta abril 8 de 1966 cuando fue consolidado como barrio. Yira Castro y Manuel Cepeda participaron de forma activa en la creación del barrio, y en mostrar los abusos policiales.",
      imgAntes: "https://prensarural.org/spip/IMG/jpg/pola_.jpg",
      imgAhora: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmr8SBkr6d36n4lVYrkAyJDSw-PFzhYegQy5ptn4BMLKzSVYrCo1KqJ8ZD&s=10",
      links: [
        { texto: "Barrio Policarpa Salavarrieta - Archivo histórico", url: "https://www.youtube.com/watch?v=vGNo-Z2OEL8" } ,
        { texto: "El barrio bogotano que nacion de la resistencia femenina - Archivo histórico", url: "https://www.las2orillas.co/el-barrio-bogotano-que-nacio-de-la-resistencia-femenina-y-que-fue-casa-politica-de-la-mama-de-ivan-cepeda/" }
      ]
    },
    {
      id: 50,
      titulo: "El Tranvía del Sur",
      lat:4.5922,
      lng: -74.1094,
      fecha: "1927 - 1951",
      categoria: "Infraestructura de Transporte",
      descripcion: "Línea de tranvía eléctrico que conectaba la Plaza de Bolívar con el Restrepo, Fue la ultima extension que se le realizo dentro de la Ciudad llegando al barrio Santander.",
      imgAntes: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxuqyYoOItLJxxRO94IA76vkuSD0XuOmkhzLIuzp6tBWHpoYL7X0dvKggz&s=10",
      imgAhora: "https://bogota.gov.co/sites/default/files/u3878/Tranv%C3%ADa%20texto.jpg",
      links: [
        { texto: "TransMilenio S.A. - Historia del transporte", url: "https://www.transmilenio.gov.co" }
      ]
    },
    {
      id: 55,
      titulo: "Centro Urbano Antonio Nariño",
      lat: 4.6279,
      lng: -74.0888,
      fecha: "1952-1958",
      categoria: "Patrimonio Arquitectonico",
      descripcion: "Bastión de la cultura alimentaria popular y mercado minorista más vibrante del sur con productos de Boyacá y Santander.",
      imgAntes: "https://via.placeholder.com/320?text=Plaza+Mercado+Restrepo",
      imgAhora: "https://via.placeholder.com/320?text=Plaza+Restrepo+Actual",
      links: [
        { texto: "IPES - Plazas distritales de mercado", url: "https://www.ipes.gov.co" }
      ]
    },
    {
      id: 56,
      titulo: "Casa de la juventúd Antonio Nariño",
      lat: 4.5849866,
      lng: -74.1032411,
      fecha: "2016",
      categoria: "Espacio social",
      descripcion: "Espacio gratuiro dirigido a jovenes, cuenta con diferentes servicios desde cursos de formacion hasta espacios practicos",
      imgAntes: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsZrBJs9z6pys9wNh9rStjtIzH2jwLtKWXJ-HPK7AMyomdNfA3f6SIjLA&s=10",
      imgAhora: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsZrBJs9z6pys9wNh9rStjtIzH2jwLtKWXJ-HPK7AMyomdNfA3f6SIjLA&s=10",
      links: [
        { texto: "Casa de la juventud Antonio Nariño", url: "https://www.facebook.com/CasadejuventudAN/" }
      ]
    },
    {
      id: 57,
      titulo: "La Valvanera",
      lat: 4.5896202,
      lng: -74.1036612,
      fecha: "1942",
      categoria: "Espacio social",
      descripcion: "Desde hace decadas es punto de encuentro para vecinos, deportistas y comerciantes, hace poco paso por proceso de recuperación",
      imgAntes: "https://www.elcatolicismo.com.co/sites/default/files/inline-images/FOTO%202%20PARROQUIA.jpg",
      imgAhora: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe8nPTDpiUW1154Med8sCspWHlqIrexVDUvkSYYB8GTHJdDvoSxnMW7enL&s=10",
      links: [
        { texto: "El parque Vlavanera renacio", url: "https://www.gobiernobogota.gov.co/noticias/valvanera-renacio-antonio-narino-entrega" }
      ]
    },
    {
      id: 57,
      titulo: "El cementerio del Sur",
      lat: 4.5897,
      lng: -74.1178,
      fecha: "1944",
      categoria: "Espacio social",
      descripcion: "Tambien conocido como el cementerio de Matatigres, es el segundo mas antiguo de Bogota ha sido fundamental en la historia de la localidad, ademas despues de los hechos de la toma del Palacio fue usado para inhumar en fosas comunes cuerpos de los fallecidos sin siquiera terminar la investigacion, años despues la JEP lo resignifico como un lugar de memoria y reconocimiento de victimas.",
      imgAntes: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGuf_NZNZyJVCE_aRBPui9jVpJwFXxAgB2kDuF0Ia3eOTBYSZC2PdT8wH1&s=10",
      imgAhora: "https://www.elespectador.com/wp-content/uploads/elespectador/2NWKDDJWHNAPZBJVWV4UZ32KVQ.JPG",
      links: [
        { texto: "Cementerio del sur la fosa del holocausto del palacio de justicia", url: "https://www.elespectador.com/judicial/cementerio-del-sur-la-fosa-del-holocausto-del-palacio-de-justicia-article-594085/" },
        { texto: "El Cementerio del Sur, un refugio de memorias y leyendas en el Día de los Muertos", url: "https://www.youtube.com/watch?v=yDRTE3zOBpg" }
      ]
    },
    
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
      if (evento.links && evento.links.length > 0) {
        evento.links.forEach(link => {
          const li = document.createElement('li');
          li.innerHTML = `<a href="${link.url}" target="_blank" rel="noopener noreferrer">🔗 ${link.texto}</a>`;
          contenedorLinks.appendChild(li);
        });
      } else {
        const li = document.createElement('li');
        li.innerText = "Sin enlaces adicionales registrados.";
        contenedorLinks.appendChild(li);
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
