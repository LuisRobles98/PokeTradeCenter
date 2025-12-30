async function recuperarCartasIntercambioPorCriterios(cartas) {
	let query = QueryURL.formar(cartas);
    return fetch(`http://localhost:8080/cartasIntercambio?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json());
};

async function publicar(intercambio) {
    let parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(intercambio),
    };
    let response = await fetch('http://localhost:8080/cartasIntercambio/publicar', parameters);
    if (!response.ok) {
        let msg = await response.text();
        throw new Error(msg || 'Error desconocido del servidor');
    }
};