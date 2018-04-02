//variables globales
var map;
var restaurantes = data.restaurantes;
var gallery = $('#gallery');

//mapa
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCoodinates);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
};

const getCoodinates = position => {
  const latitude =  position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(latitude, longitude);
  initMap(latitude, longitude);
};

function initMap(latitude, longitude) {
  map = new google.maps.Map(document.getElementById('mapa'), {
    center: {
      lat: latitude,
      lng: longitude
    },
    zoom: 15
  });
  var marker = new google.maps.Marker({
    position: {
      lat: latitude,
      lng: longitude
    },
    map: map,
    title: '¡Usted esta aquí!'
  });
//  marker.setMap(map);
};// END map main view

function drawMap(latitude, longitude) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: latitude,
      lng: longitude
    },
    zoom: 15
  });
  var marker = new google.maps.Marker({
    position: {
      lat: latitude,
      lng: longitude
    },
    map: map,
    title: '¡Restaurante!'
  }); //END marker
}; // END map modal


function loadAllData(filter) {
  $.each(restaurantes, function(index, value) {
    if (value.type.includes(filter) ||
    value.address.toLowerCase().includes(filter) ||
    value.name.toLowerCase().includes(filter)
  ) {
      var div = $('<div class="imageMini col-sm-6 col-xs-12 col-md-4"></div>');
      var a = $('<a href="#" data-toggle="modal" data-target="#myModal" class="thumbnail"></a>')
      var image = $('<img src="' + value.picture + '" alt="' + value.name + '">');
      a.append(image);
      div.append(a);
      gallery.append(div);
    }
  });
}; //END loadAllData


//modal
function loadModal(event){
  var datosRestaurant = event.target.alt
  console.log(datosRestaurant);
  var restaurant = document.getElementById('restaurant');
  var description = document.getElementById('description');
  var photo = document.getElementById('imagen');
  restaurant.innerText= datosRestaurant;
  var selection = restaurantes
  .filter(element =>element.name==datosRestaurant);
  description.innerText= selection[0].address;
  drawMap(selection[0].latitude, selection[0].longitude)
}; //END loadModal

//cargando funciones
$(document).ready(initApp());

function initApp() {
  loadAllData('');
  getLocation();
  //Eventos
  $(document).on("click", ".imageMini", loadModal);
  $('#search').keyup(function(event) {
    // Borramos el contenido de gallery
    gallery.empty();
    var text = $('#search').val();
    loadAllData(text.trim().toLowerCase());
  });
};
