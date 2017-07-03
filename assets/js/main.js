 $(document).ready(function(){
    $(".button-collapse").sideNav();


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
    });;
   

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
    /*var nom = localStorage.getItem('nombres').toUpperCase();
    $('#espacio-nombre').html(nom);

    $("#perfil-correo").html();
    $("#perfil-fono").html();*/

    $(document).ready(function(){
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
       });
    });

});


  
     

