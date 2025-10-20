// Wacht tot de pagina volledig is geladen
document.addEventListener('DOMContentLoaded', function() {
    // Selecteer ALLE afbeeldingen met de juiste class uit jouw HTML
    const images = document.querySelectorAll('.comparison-image');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.querySelector('#imageModal .close');

    // Klik op afbeelding → toon modal
    images.forEach(img => {
        img.addEventListener('click', function() {
            modalImg.src = this.src;
            modal.style.display = "flex"; // gebruik flex zodat het in het midden staat
        });
    });

    // Klik op X → sluit modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });

    // Klik buiten de afbeelding → sluit modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Druk op Escape → sluit modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === "flex") {
            modal.style.display = "none";
        }
    });
});
