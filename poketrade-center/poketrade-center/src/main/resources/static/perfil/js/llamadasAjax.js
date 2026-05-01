async function actualizarUsuario(usuario) {
    let parameters = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    };
    let response = await fetch('http://localhost:8080/usuario', parameters);
    if (!response.ok) {
        let msg = await response.text();
        throw new Error(msg || 'Error desconocido del servidor');
    }
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

async function eliminarUsuario(usuario) {
	let parameters = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    };
    let response = await fetch('http://localhost:8080/usuario', parameters);
    if (!response.ok) {
        let msg = await response.text();
        throw new Error(msg || 'Error desconocido del servidor');
    }
};