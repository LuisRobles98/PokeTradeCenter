async function recuperarIntercambiosPublicos(criterios) {
	let query = QueryURL.formar(criterios);
    return fetch(`http://localhost:8080/intercambiosPublicos?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json());
};

async function recuperarCreadorIntercambio(criterios) {
	let query = QueryURL.formar(criterios);
    return fetch(`http://localhost:8080/intercambiosPublicos/usuario?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json());
};

async function recuperarCartaIntercambio(criterios) {
	let query = QueryURL.formar(criterios);
    return fetch(`http://localhost:8080/intercambiosPublicos/carta?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json());
};

async function solicitarIntercambio(intercambio) {
    let parameters = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(intercambio),
    };
    let response = await fetch('http://localhost:8080/intercambiosPublicos', parameters);
    if (!response.ok) {
        let msg = await response.text();
        throw new Error(msg || 'Error desconocido del servidor');
    }
};