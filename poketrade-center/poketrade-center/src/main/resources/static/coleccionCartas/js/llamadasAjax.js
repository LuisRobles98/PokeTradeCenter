async function recuperarCartasUsuarioPorCriterios(cartas) {
	let query = QueryURL.formar(cartas);
    return fetch(`http://localhost:8080/cartasUsuario?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json());
};