document.getElementById('adminAuthForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const key = document.getElementById('adminKey').value;

    if (key === 'My_admin@444') {
        Swal.fire({
            title: 'Verified',
            text: 'Redirecting to console...',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            background: '#FAFAF7'
        }).then(() => {
            window.location.href = 'admin.html';
        });
    } else {
        const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
        Toast.fire({ icon: 'error', title: 'Restricted Access' });
    }
});