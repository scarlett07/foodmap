var map;

var restaurantes = data.restaurantes;
var gallery = $('#gallery');

$(document).ready(initApp());

function initMap() {
  map = new google.maps.Map(document.getElementById('mapa'), {
    center: {
      lat: 19.4203024,
      lng: -99.1631142
    },
    zoom: 15
  });
}

function initApp() {
  loadAllData('');
  $('#search').keyup(function(event) {
    // Borramos el contenido de gallery
    gallery.empty();
    var text = $('#search').val();
    loadAllData(text.trim().toLowerCase());
  });
}

function loadAllData(filter) {
  $.each(restaurantes, function(index, value) {
    if (value.type.includes(filter) ||
    value.address.toLowerCase().includes(filter) ||
    value.name.toLowerCase().includes(filter)
  ) {
      var div = $('<div class="col-sm-4 col-xs-6 col-md-4"></div>');
      var a = $('<a href="#" data-toggle="modal" data-target="#myModal" class="thumbnail"></a>')
      var image = $('<img src="' + value.picture + '" alt="' + value.name + '">');
      a.append(image);
      div.append(a);
      gallery.append(div);
    }
  });
}
