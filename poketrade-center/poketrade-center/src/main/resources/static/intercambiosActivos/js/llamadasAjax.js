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

async function recuperarUsuarioIntercambio(criterios) {
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

async function actualizarIntercambio(intercambio) {
    let parameters = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(intercambio),
    };
    let response = await fetch('http://localhost:8080/intercambiosActivos', parameters);
    if (!response.ok) {
        let msg = await response.text();
        throw new Error(msg || 'Error desconocido del servidor');
    }
};

async function recuperarTotalCartasExpansion(expansionId) {
    return fetch(`http://localhost:8080/intercambiosActivos/${expansionId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json());
};