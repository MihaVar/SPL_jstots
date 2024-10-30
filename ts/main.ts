import { initLightbox } from './modules/lightbox';
import { initContactForm } from './modules/contactForm';

document.addEventListener("DOMContentLoaded", (): void => {
    initLightbox();
    initContactForm();
});
