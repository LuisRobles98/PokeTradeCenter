
const guardarUsuario = function(usuario) {
    let parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    };
    fetch('http://localhost:8080/usuario', parameters);
};

const recuperarUsuariosPorEmail = function(correo) {
	return fetch('http://localhost:8080/usuario/' + encodeURIComponent(correo))
	.then(response => response.json());
};

const recuperarUsuariosPorEmailYPassword = function(correo, password) {
	return fetch('http://localhost:8080/usuario/' + encodeURIComponent(correo) + "/" + encodeURIComponent(password))
	.then(response => response.json());
};