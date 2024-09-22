document.addEventListener("DOMContentLoaded", function () {
    var coffeeImages = document.querySelectorAll('.coffee_img img');
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.querySelector('#lightbox-img');
    var closeBtn = document.querySelector('.close');
    coffeeImages.forEach(function (image) {
        image.addEventListener('click', function () {
            if (lightbox && lightboxImg) {
                lightbox.style.display = 'flex';
                lightboxImg.src = image.src;
            }
        });
    });
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            if (lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
    var formInputs = {
        name: document.querySelector('input[name="Your Name"]'),
        email: document.querySelector('input[name="Your Email"]'),
        phone: document.querySelector('input[name="Your Phone"]'),
        message: document.querySelector('textarea[name="Massage"]')
    };
    var sendButton = document.getElementById('sendBtn');
    if (sendButton) {
        sendButton.addEventListener('click', function (event) {
            var _a, _b, _c, _d;
            event.preventDefault();
            var formData = {
                name: ((_a = formInputs.name) === null || _a === void 0 ? void 0 : _a.value) || '',
                email: ((_b = formInputs.email) === null || _b === void 0 ? void 0 : _b.value) || '',
                phone: ((_c = formInputs.phone) === null || _c === void 0 ? void 0 : _c.value) || '',
                message: ((_d = formInputs.message) === null || _d === void 0 ? void 0 : _d.value) || ''
            };
            fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                console.log('Success:', data);
                alert("You have contacted us successfully!");
            })
                .catch(function (error) {
                console.error('Error:', error);
                alert("There was a problem sending your message. Please try again.");
            });
        });
    }
});
