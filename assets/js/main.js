 $(document).ready(function(){
 	//COLLAPSE
    $('.collapsible').collapsible();

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
});

 //CAMBIO DE IMAGEN CON JAVASCRIPT
function archivo(evt) {
      var files = evt.target.files;
       
        //Obtenemos la imagen del campo "file". 
      for (var i = 0, f; f = files[i]; i++) {         
           //Solo admitimos imágenes.
           if (!f.type.match('image.*')) {
                continue;
           }
       
           var reader = new FileReader();
           
           reader.onload = (function(theFile) {
               return function(e) {
               // Creamos la imagen.
                      document.getElementById("cambio").innerHTML = ['<img width="100%" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');
               };
           })(f);
 
           reader.readAsDataURL(f);
       };
};    
      document.getElementById('files').addEventListener('change', archivo, false);


      