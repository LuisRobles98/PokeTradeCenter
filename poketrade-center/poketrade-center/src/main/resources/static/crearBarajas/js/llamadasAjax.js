async function recuperarCartasBarajasPorCriterios(cartas) {
	let query = QueryURL.formar(cartas);
    return fetch(`http://localhost:8080/cartasBarajas?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json());
};

async function guardar(baraja) {
    let parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(baraja),
    };
    let response = await fetch('http://localhost:8080/cartasBarajas/guardar', parameters);
    if (!response.ok) {
        let msg = await response.text();
        throw new Error(msg || 'Error desconocido del servidor');
    }
};

async function publicar(baraja) {
    let parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(baraja),
    };
    let response = await fetch('http://localhost:8080/cartasBarajas/publicar', parameters);
    if (!response.ok) {
        let msg = await response.text();
        throw new Error(msg || 'Error desconocido del servidor');
    }
};