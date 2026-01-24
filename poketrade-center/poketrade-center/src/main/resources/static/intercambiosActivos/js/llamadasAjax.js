async function recuperarIntercambiosActivos(criterios) {
	let query = QueryURL.formar(criterios);
    return fetch(`http://localhost:8080/intercambiosActivos?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json());
};

async function recuperarCreadorIntercambio(criterios) {
	let query = QueryURL.formar(criterios);
    return fetch(`http://localhost:8080/intercambiosActivos/usuario?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json());
};

async function recuperarCartaIntercambio(criterios) {
	let query = QueryURL.formar(criterios);
    return fetch(`http://localhost:8080/intercambiosActivos/carta?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json());
};