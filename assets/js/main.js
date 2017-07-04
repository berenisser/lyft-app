
function initMap() {
    var map = new google.maps.Map(document.getElementById("map"),{
        zoom: 10,
        center: {lat: -33.4724728, lng: -70.9100251},
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl:false
    });

    var inputOrigen = document.getElementById('origen');
    var autocompleteOrigen = new google.maps.places.Autocomplete(inputOrigen);
    autocompleteOrigen.bindTo('bounds', map);
    var detalleUbicacionOrigen = new google.maps.InfoWindow();
    var markerOrigen = crearMarcador(map);

    crearListener(autocompleteOrigen, detalleUbicacionOrigen, markerOrigen);

    var inputDestino = document.getElementById('destino');
    var autocompleteDestino = new google.maps.places.Autocomplete(inputDestino);
    autocompleteDestino.bindTo('bounds', map);
    var detalleUbicacionDestino = new google.maps.InfoWindow();
    var markerDestino = crearMarcador(map);

    crearListener(autocompleteDestino, detalleUbicacionDestino, markerDestino);

    /* Mi ubicación actual */
    document.getElementById("encuentrame").addEventListener("click", buscarMiUbicacion);
    /* Ruta */
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    document.getElementById("ruta").addEventListener("click", function(){dibujarRuta(directionsService, directionsDisplay)});

    directionsDisplay.setMap(map);

    function crearListener(autocomplete, detalleUbicacion, marker) {
        autocomplete.addListener('place_changed', function() {
            detalleUbicacion.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            marcarUbicacion(place, detalleUbicacion, marker);
        });
    }

    function buscarMiUbicacion() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(marcarUbicacionAutomatica,funcionError);
        }
    }

    var funcionError = function(error) {
        alert("Tenemos un problema para encontrar tu ubicación");
    }

    var marcarUbicacionAutomatica = function(posicion) {
        var latitud,longitud;
        latitud = posicion.coords.latitude;
        longitud = posicion.coords.longitude;

        markerOrigen.setPosition(new google.maps.LatLng(latitud,longitud));
        map.setCenter({lat:latitud,lng:longitud});
        map.setZoom(17);

        //inputOrigen.value = new google.maps.LatLng(latitud,longitud); //CON ESTO LOGRO QUE EN EL INPUT ORIGEN SALGA LAS COORDENADAS DE MI UBICACION

        markerOrigen.setVisible(true);

        detalleUbicacionOrigen.setContent('<div><strong>Mi ubicación actual</strong><br>');
        detalleUbicacionOrigen.open(map, markerOrigen);
    }

    var marcarUbicacion = function(place, detalleUbicacion, marker) {
        if (!place.geometry) {
            // Error si no encuentra el lugar indicado
            window.alert("No encontramos el lugar que indicaste: '" + place.name + "'");
            return;
        }
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        detalleUbicacion.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        detalleUbicacion.open(map, marker);
    }

    function crearMarcador(map) {
        var icono = {
            url: 'http://icons.iconarchive.com/icons/iconshow/transport/96/Sportscar-car-2-icon.png',
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        };

        var marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            icon: icono,
            anchorPoint: new google.maps.Point(0, -29)
        });

        return marker;
    }

    function dibujarRuta(directionsService, directionsDisplay) {
        var origin = document.getElementById("origen").value;
        var destination = document.getElementById('destino').value;

        if(destination != "" && destination != "") {
            directionsService.route({
                origin: origin,
                destination: destination,
                travelMode: "DRIVING"
            },
            function(response, status) {
                if (status === "OK") {
                    directionsDisplay.setDirections(response);
                } else {
                    funcionErrorRuta();
                }
            });
        }
    }

    function funcionErrorRuta() {
        alert("No ingresaste un origen y un destino validos");
    }

}

$(document).ready(function() {
    /* Arreglo de objetos phone */
    function pais (id,imagen,nombre,codigo,cantidad_digitos) {
        this.id = id;
        this.imagen = imagen;
        this.nombre = nombre;
        this.codigo = codigo;
        this.cantidad_digitos = cantidad_digitos;
    }

    var chile = new pais("chile", "assets/img/Chile.png", "Chile", "+56", 9);
    var mexico = new pais("mexico", "assets/img/Mexico.png", "México", "+52", 10);
    var peru = new pais("peru", "assets/img/Peru.png", "Perú", "+51", 9);

    var arr_paises = [];
    arr_paises.push(chile);
    arr_paises.push(mexico);
    arr_paises.push(peru);

    var pais_actual = chile;

    generarListadoDePaises();
    /* FIN Arreglo de objetos phone */

    $('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        startingTop: '4%', // Starting top style attribute
        endingTop: '100%' // Ending top style attribute
    });

    $("#sign-up-phone").on("keyup", "input[name=phone]", function(event) {
        validatePhone(pais_actual.cantidad_digitos);
    });

    $("#listado-paises").on("click", "a", function(event) {
        var id_pais = $(this).attr("id");

        $.each(arr_paises, function(index, pais){
            if(pais.id == id_pais) {
                $("input[name=prefix-phone]").val(pais.codigo);
                $("#sign-up-phone img").attr('src', pais.imagen);
                validatePhone(pais.cantidad_digitos);
                pais_actual = pais;
            }
        });
    });

    function validatePhone(phone_size) {
        if ($("input[name=phone]").val().length != phone_size || isNaN($("input[name=phone]").val())) {
            $("input[name=phone]").css('border-color','#FF0000');
            $("#phone_button").addClass('disabled');
            $("input[name=phone]").removeClass('valid').addClass('invalid');
            return false;
        } else {
            $("input[name=phone]").css('border-color','#0aa827');
            $("#phone_button").removeClass('disabled');
            $("input[name=phone]").removeClass('invalid').addClass('valid');

            //guardamos el numero de telefono a localStorage
            localStorage.setItem('phone',$("input[name=phone]").val());
            //funcion que al presionar boton lleva a la siguiente pagina con codigo aleatorio
            $("#phone_button").click(function() {
                var randomCode = Math.floor((Math.random()*333)+111);
                localStorage.setItem('code',randomCode);
                window.open('codigo.html','_self',false);
            });
        }
    }

    function generarListadoDePaises() {
        $.each(arr_paises, function(index, pais) {
            $('<a>',{
                'href':'#!',
                'class': 'modal-action modal-close waves-effect btn-flat',
                'id': pais.id,
            }).append(
                $('<img>',{
                    'src': pais.imagen
                })
            ).appendTo('#listado-paises');
            $("#"+pais.id).append(pais.nombre);
        });
    }

    //Seccion Phone 2
    //Imprime el codigo el + convierte el string a un numero
    var codigo = +localStorage.getItem('code');
    $('#imprimir-codigo').html(codigo); 
    
    
    //Extrae val de codigo de verificacion
    paraf = $("<p id='error-codigo'>Invalid Code</p>"); //Si lo incluyo dentro del if remove no lo reconoce
    $("#btn-padre").on("click", $("#btn-verify"), function(e) {
        e.preventDefault();
        paraf.remove();
        if($('#codigo-input').val() != codigo || $('#codigo-input').val() == ""){
            //paraf = $("<p id='error-codigo'>Invalid Code</p>");
            $("#error-codigo").append(paraf);
            $('#codigo-input').val("");
            console.log($('#codigo-input').val());
            //alert("Noooooo");
            return false;
        }else{
            //location.href = 'phone.html';
            window.open('datos.html','_self',false);
        }
    });
  
  //Navegador de costado
      $(".button-collapse").sideNav();

  //Seccion profile.html
    //EDIT
    //INPUT1
    $('a.btn-enlace1').click(function() {
    	$('.input1').show(400);
    });
    $('.btn-input').click(function() {
    	$('.input1').hide(400);
    });
    //INPUT2
    $('a.btn-enlace2').click(function() {
    	$('.input2').show(400);
    });
    $('.btn-input').click(function() {
    	$('.input2').hide(400);
    });
    //INPUT3
    $('a.btn-enlace3').click(function() {
    	$('.input3').show(400);
    });
    $('.btn-input').click(function() {
    	$('.input3').hide(400);
    });
  
    $('.btn-guardar').click(function(){
    	var home = $('.home-profile').val();
        var music =  $('.music-profile').val();
        var places = $('.place-profile').val();

        if(home != ""){
        	var span1 = $('.homeP');
        	    span1.html(home);
        	    $('.home-profile').val("");
        }
        if(music != ""){
        	var span2 = $('.musicP');
        	    span2.html(music);
        	    $('.music-profile').val("");
        }
        if(places != ""){
        	var span3 = $('.placeP');
        	    span3.html(places);
        	    $('.place-profile').val("");
        }
    })

    //Seccion de imprimir el nombre guardado en localStorage
    var nom = localStorage.getItem('name');
    $('#espacio-nombre-profile').html(nom);
    $("#espacio-nombre-modal").html(nom);
    $("#espacio-nombre-modal-mapa").html(nom);
    //Seccion obtener e imprimir correo y numero de telefono
    var correoElec = localStorage.getItem('email');
    var fonoProfile = localStorage.getItem('phone');
    $("#perfil-correo").html(correoElec);
    $("#perfil-fono").html(fonoProfile);
  
    $('#files').on('click', function(){

            $('#files').change(function(){

             var reader = new FileReader();

                reader.onload = function(file){

                    var fileContent = file.target.result;

                     //creamos img y guardamos en localStorage
                    var fotico = '<img width="100%" src="' + fileContent + '">';
                    localStorage.setItem('foto',fotico);

                    var fotoStorage = localStorage.getItem('foto');
                    $("#cambio").html(fotoStorage);
                }

                reader.readAsDataURL(this.files[0]);

      });
      
    // FIN Seccion profile.html
    
    });
});

   //Seccion Sign Up obtener Nombre y correo
$(document).ready(function(){
    $("#btn-guardar-padre").on("click", $("#btn-guardar-datos"), function(e) {

        $(".red").remove();

        if(nombre()){
            if(correo()){
                if(seleccion()){
                    window.open('map.html','_self',false);
                }
            }
        }
    });

    //validación nombre
    function nombre(){
        var nameValue = $("#nombre-signup").val();
        console.log(nameValue);
        if (!(/^[A-Z][a-z]{3,19}$/).test(nameValue)){
            $("#espacio-error-nombre").append('<p class="red">Invalid name. First letter must be capitalized</p>');
            $("#nombre-signup").val("");
            console.log("primera");
            return false;
        }else{
            localStorage.setItem('name',nameValue);
            return true;
        }
    }

    //validacion correo 
    function correo(){
        var emailValue = $("#email-signup").val();
        console.log(emailValue);
        if (!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/).test(emailValue)){
            $("#espacio-error-nombre").append('<p class="red">Invalid email</p>');
            $("#email-signup").val("");
            console.log("segunda");
            return false;
        } else{
            localStorage.setItem('email',emailValue);
            return true;
        }
    }

    function seleccion(){
        if (! $('#checkbox-verify')[0].checked){
            console.log("tercera");
            $("#espacio-error-nombre").append('<p  class="red">You must agree to the terms</p>');
           return false;
        } else{
            return true;
        }
    }

});

// FIN Seccion Sign Up obtener Nombre y correo

