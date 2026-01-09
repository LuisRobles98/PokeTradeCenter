async function recuperarBarajasUsuario(criterios) {
	let query = QueryURL.formar(criterios);
    return fetch(`http://localhost:8080/misBarajas?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json());
};

async function recuperarCartaPrincipal(criterios) {
	let query = QueryURL.formar(criterios);
    return fetch(`http://localhost:8080/misBarajas/carta?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json());
};

async function eliminar(barajaUsuario) {
    let parameters = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(barajaUsuario),
    };
    let response = await fetch('http://localhost:8080/misBarajas', parameters);
    if (!response.ok) {
        let msg = await response.text();
        throw new Error(msg || 'Error desconocido del servidor');
    }
};

async function recuperarCreador(criterios) {
	let query = QueryURL.formar(criterios);
    return fetch(`http://localhost:8080/misBarajas/usuario?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json());
};