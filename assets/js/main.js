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
            window.open('phone.html','_self',false);
        }
    });

});

 