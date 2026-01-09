async function recuperarBarajasPublicas(criterios) {
	let query = QueryURL.formar(criterios);
    return fetch(`http://localhost:8080/barajasPublicas?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json());
};

async function recuperarCreador(criterios) {
	let query = QueryURL.formar(criterios);
    return fetch(`http://localhost:8080/barajasPublicas/usuario?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json());
};

async function recuperarCartaPrincipal(criterios) {
	let query = QueryURL.formar(criterios);
    return fetch(`http://localhost:8080/barajasPublicas/carta?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json());
};

async function comprobarSiLikeABaraja(criterios) {
	let query = QueryURL.formar(criterios);
    return fetch(`http://localhost:8080/barajasPublicas/like?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json());
};

async function darLikeABaraja(barajaLike) {
    let parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(barajaLike),
    };
    let response = await fetch('http://localhost:8080/barajasPublicas', parameters);
    if (!response.ok) {
        let msg = await response.text();
        throw new Error(msg || 'Error desconocido del servidor');
    }
};

async function comprobarSiBarajaYaGuardada(criterios) {
	let query = QueryURL.formar(criterios);
    return fetch(`http://localhost:8080/barajasPublicas/barajaGuardada?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json());
};

async function guardarBarajaPublica(barajaUsuario) {
    let parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(barajaUsuario),
    };
    let response = await fetch('http://localhost:8080/barajasPublicas/guardar', parameters);
    if (!response.ok) {
        let msg = await response.text();
        throw new Error(msg || 'Error desconocido del servidor');
    }
};