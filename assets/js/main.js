 $(document).ready(function() {
    $('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        startingTop: '4%', // Starting top style attribute
        endingTop: '100%' // Ending top style attribute
    });

    $("input[name=phone]").keyup(function(event) {
        var prefijo = $("input[name=prefix-phone]").val();

        if (prefijo == "+56" && ($(this).val().length != 9 || isNaN($(this).val()))) {
            $(this).css('border-color','#FF0000');
            $("#phone_button").addClass('disabled');
            $(this).removeClass('valid').addClass('invalid');
            return false;
        } else {
            $(this).css('border-color','#0aa827');
            $("#phone_button").removeClass('disabled');
            $(this).removeClass('invalid').addClass('valid');
        }
    });

    $("#listado-paises").on("click", "a", function(event) {
        var ids = $(this).attr("id");
        if( ids == "mexico"){
            $( "input[name=prefix-phone]" ).val( "+52" );
            $("#sign-up-phone img").attr('src', "assets/img/Mexico.png");
            $("#sign-up-phone input").attr('placeholder', "1234567890");
            var prefijo = $("input[name=prefix-phone]").val();

            if (prefijo == "+52" && ($(this).val().length != 10 || isNaN($(this).val()))) {
                $(this).css('border-color','#FF0000');
                $("#phone_button").addClass('disabled');
                $(this).removeClass('valid').addClass('invalid');
                return false;
            } else {
                $(this).css('border-color','#0aa827');
                $("#phone_button").removeClass('disabled');
                $(this).removeClass('invalid').addClass('valid');
            }
        } else if (ids == "peru") {
            $( "input[name=prefix-phone]" ).val( "+51" );
            $("#sign-up-phone img").attr('src', "assets/img/Peru.png");
            $("#sign-up-phone input").attr('placeholder', "123456789");
            var prefijo = $("input[name=prefix-phone]").val();

            if (prefijo == "+51" && ($(this).val().length != 9 || isNaN($(this).val()))) {
                $(this).css('border-color','#FF0000');
                $("#phone_button").addClass('disabled');
                $(this).removeClass('valid').addClass('invalid');
                return false;
            } else {
                $(this).css('border-color','#0aa827');
                $("#phone_button").removeClass('disabled');
                $(this).removeClass('invalid').addClass('valid');
            }
        }else if (ids == "chile") {
            $( "input[name=prefix-phone]" ).val( "+56" );
            $("#sign-up-phone img").attr('src', "assets/img/Chile.png");
            $("#sign-up-phone input").attr('placeholder', "123456789");
        }
    });
});