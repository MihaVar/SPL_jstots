document.addEventListener("DOMContentLoaded", (): void => {
    const coffeeImages: NodeListOf<HTMLImageElement> = document.querySelectorAll('.coffee_img img');
    const lightbox: HTMLElement | null = document.getElementById('lightbox');
    const lightboxImg: HTMLImageElement | null = document.querySelector('#lightbox-img') as HTMLImageElement;
    const closeBtn: HTMLElement | null = document.querySelector('.close');

    coffeeImages.forEach((image: HTMLImageElement) => {
        image.addEventListener('click', () => {
            if (lightbox && lightboxImg) {
                lightbox.style.display = 'flex';
                lightboxImg.src = image.src;
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e: MouseEvent) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    const formInputs: { [key: string]: HTMLInputElement | HTMLTextAreaElement | null } = {
        name: document.querySelector('input[name="Your Name"]'),
        email: document.querySelector('input[name="Your Email"]'),
        phone: document.querySelector('input[name="Your Phone"]'),
        message: document.querySelector('textarea[name="Massage"]')
    };

    const sendButton: HTMLElement | null = document.getElementById('sendBtn');

    if (sendButton) {
        sendButton.addEventListener('click', (event: MouseEvent) => {
            event.preventDefault();
            const formData: { [key: string]: string | null } = {
                name: formInputs.name?.value || '',
                email: formInputs.email?.value || '',
                phone: formInputs.phone?.value || '',
                message: formInputs.message?.value || ''
            };

            fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    alert("You have contacted us successfully!");
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert("There was a problem sending your message. Please try again.");
                });
        });
    }
});
