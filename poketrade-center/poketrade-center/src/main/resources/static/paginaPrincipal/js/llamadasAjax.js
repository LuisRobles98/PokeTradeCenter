
function guardarUsuario(usuario) {
    let parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    };
    fetch('http://localhost:8080/usuario', parameters);
};

async function recuperarUsuario(usuario) {
    let query = QueryURL.formar(usuario);
    return fetch(`http://localhost:8080/usuario?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json());
};

function recuperarUsuariosPorEmail(correo) {
	return fetch('http://localhost:8080/usuario/' + encodeURIComponent(correo))
	.then(response => response.json());
};

function recuperarUsuariosPorEmailYPassword(correo, password) {
	return fetch('http://localhost:8080/usuario/' + encodeURIComponent(correo) + "/" + encodeURIComponent(password))
	.then(response => response.json());
};