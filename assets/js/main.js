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
            return false;
        } else {
            $(this).css('border-color','#0aa827');
            $("#phone_button").removeClass('disabled');
        }
    });

    $("input[name=phone]").change(function(event) {
        var prefijo = $("input[name=prefix-phone]").val();

        if (prefijo == "+56" && ($("input[name=phone]").val().length != 9 || isNaN($("input[name=phone]").val()))) {
            Materialize.toast('Debes ingresar un número válido', 2000)
            return false;
        }
    });

    $("#listado-paises a").click(function(event) {
        var ids = $(this).attr("id");
        console.log(ids);
        if( ids == $("#mexico")){
            $( "input[name=prefix-phone]" ).replaceWith( "OK" );
            console.log("si cumpli");
        }
    });
});