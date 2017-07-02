 $(document).ready(function() {
    $('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        startingTop: '4%', // Starting top style attribute
        endingTop: '100%' // Ending top style attribute
    });

    $("#sign-up-phone").on("keyup", "input[name=phone]", function(event) {
        var prefijo = $("input[name=prefix-phone]").val();
        if (prefijo == "+56") {
            validatePhone(9);
        } else if (prefijo == "+51") {
            validatePhone(9);
        } else if (prefijo == "52") {
            validatePhone(10);
        }
    });

    $("#listado-paises").on("click", "a", function(event) {
        var ids = $(this).attr("id");
        if( ids == "mexico"){
            $( "input[name=prefix-phone]" ).val( "+52" );
            $("#sign-up-phone img").attr('src', "assets/img/Mexico.png");
            $("#sign-up-phone input").attr('placeholder', "1234567890");
        } else if (ids == "peru") {
            $( "input[name=prefix-phone]" ).val( "+51" );
            $("#sign-up-phone img").attr('src', "assets/img/Peru.png");
            $("#sign-up-phone input").attr('placeholder', "123456789");
        }else if (ids == "chile") {
            $( "input[name=prefix-phone]" ).val( "+56" );
            $("#sign-up-phone img").attr('src', "assets/img/Chile.png");
            $("#sign-up-phone input").attr('placeholder', "123456789");
        }
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
        }
    }
});