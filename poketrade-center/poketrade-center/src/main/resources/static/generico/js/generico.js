// funciones genericas

//popupErrores
const popupErroresOConfirmacion = {
    mostrar: function(icono, titulo, errores) {
        Swal.fire({
            icon: icono,
            title: titulo,
            html: errores ? `<ul style="text-align: left; margin-left: 20px;">${errores}</ul>` : "",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6"
        });
    }
};
