document.getElementById('adminAuthForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const key = document.getElementById('adminKey').value;

    if (key === 'My_admin@444') {
        Swal.fire({
            title: 'Identity Verified',
            text: 'Redirecting to console...',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            background: '#FAFAF7'
        }).then(() => {
            window.location.href = '/admin'; // Redirects to admin dashboard
        });
    } else {
        Swal.fire({
            title: 'Restricted Access',
            text: 'Invalid Administrator Credentials.',
            icon: 'error',
            background: '#FAFAF7'
        });
    }
});