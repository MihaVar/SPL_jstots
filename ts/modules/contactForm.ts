type FormDataType = {
    name: string;
    email: string;
    phone: string;
    message: string;
};

export function initContactForm(): void {
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
            const formData: FormDataType = {
                name: formInputs.name?.value || '',
                email: formInputs.email?.value || '',
                phone: formInputs.phone?.value || '',
                message: formInputs.message?.value || ''
            };

            submitForm(formData);
        });
    }
}

function submitForm(formData: FormDataType): void {
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
}
