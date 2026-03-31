document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');
    const loginForm = document.querySelector('#userLoginForm');

    // Toggle Password Visibility
    togglePassword.addEventListener('click', function () {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.classList.toggle('bi-eye');
        this.classList.toggle('bi-eye-slash');
    });

    // Basic Validation
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailValue = document.querySelector('#email').value;
        const passValue = password.value;

        if (!emailValue || !passValue) {
            Swal.fire({ icon: 'error', title: 'Empty Fields', text: 'Please fill in all requirements.' });
            return;
        }
    });
});