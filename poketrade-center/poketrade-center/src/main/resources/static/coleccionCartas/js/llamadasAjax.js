async function recuperarCartasUsuarioPorCriterios(cartas) {
	let query = QueryURL.formar(cartas);
    return fetch(`http://localhost:8080/coleccionCartas?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json());
};


async function actualizarCarta(carta) {
    let parameters = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(carta),
    };
    let response = await fetch('http://localhost:8080/coleccionCartas', parameters);
    if (!response.ok) {
        let msg = await response.text();
        throw new Error(msg || 'Error desconocido del servidor');
    }
};

async function recuperarTotalCartasExpansion(expansionId) {
    return fetch(`http://localhost:8080/coleccionCartas/${expansionId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json());
};