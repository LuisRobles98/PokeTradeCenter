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
    return await fetch('http://localhost:8080/coleccionCartas', parameters);
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