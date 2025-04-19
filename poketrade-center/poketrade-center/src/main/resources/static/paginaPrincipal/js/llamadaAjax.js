
const guardarUsuario = function(usuario) {
	return new Promise((resolve) => {
        let parameters = {
            appContext: appContext,
            method: 'POST',
            action: "/usuario",
            data: usuario,
            disableMe: true,
            callback: resolve,
        };
        ajaxController.executeNew(parameters);
    });
}