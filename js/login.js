// login.js

document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'profesor' && password === '1234') {
        window.location.href = '/html/dashboard.html';
    } else {
        alert('Credenciales incorrectas');
    }
});
