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
    await fetch('http://localhost:8080/cartasBarajas/guardar', parameters);
};

async function guardarPublicar(baraja) {
    let parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(baraja),
    };
    await fetch('http://localhost:8080/cartasBarajas/guardarPublicar', parameters);
};