document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.comparison-image'); // Selecteer alle afbeeldingen
    const overlay = document.getElementById('imageOverlay');
    const overlayImg = document.getElementById('overlayImg');
    const closeOverlay = document.querySelector('.close-overlay');

    // Klik op afbeelding → toon overlay
    images.forEach((img) => {
        img.addEventListener('click', function () {
            overlayImg.src = this.src; // Stel de bron van de overlay-afbeelding in
            overlay.style.display = 'flex'; // Toon de overlay
        });
    });

    // Klik op sluitknop → sluit overlay
    closeOverlay.addEventListener('click', function () {
        overlay.style.display = 'none';
    });

    // Klik buiten de afbeelding → sluit overlay
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            overlay.style.display = 'none';
        }
    });

    // Druk op Escape → sluit overlay
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.style.display === 'flex') {
            overlay.style.display = 'none';
        }
    });
});