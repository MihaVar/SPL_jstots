export function initLightbox(): void {
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
}
