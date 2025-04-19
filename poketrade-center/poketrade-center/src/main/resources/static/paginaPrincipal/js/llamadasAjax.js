
const guardarUsuario = function(usuario) {
    let parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    };
    fetch('http://localhost:8080/usuario', parameters);
};