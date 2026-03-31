document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.querySelector('#togglePassword');
    const passwordInput = document.querySelector('#password');
    const loginForm = document.querySelector('#userLoginForm');

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('bi-eye');
        togglePassword.classList.toggle('bi-eye-slash');
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.querySelector('#email').value;
        const pass = passwordInput.value;

        if (!email || !pass) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please fill in all fields.', background: '#FAFAF7' });
        } else {
            // Static version: Simulate successful login and redirect to homepage
            Swal.fire({
                icon: 'success',
                title: 'Welcome!',
                text: 'Login successful',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = '../../index.html';
            });
        }
    });
});