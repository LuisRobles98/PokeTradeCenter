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