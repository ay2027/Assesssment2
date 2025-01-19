$(document).ready(function () {
    $('#registrationForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the form from reloading the page

        const formData = {
            fullName: $('#fullName').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            dob: $('#dob').val(),
            grade: $('#grade').val(),
            address: $('#address').val(),
            notes: $('#notes').val(),
        };

        $.ajax({
            url: '/register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                alert(response.message);
                $('#registrationForm')[0].reset(); // Reset the form fields
            },
            error: function () {
                alert('An error occurred while submitting your registration. Please try again.');
            },
        });
    });
});
