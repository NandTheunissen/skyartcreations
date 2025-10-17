// Wacht tot de pagina volledig is geladen
document.addEventListener('DOMContentLoaded', function() {
    // Haal alle zoombare afbeeldingen op
    const images = document.querySelectorAll('.comparison-image');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.querySelector('.close');

    // Voeg click event toe aan alle afbeeldingen
    images.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
        });
    });

    // Sluit modal wanneer op X wordt geklikt
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });

    // Sluit modal wanneer buiten de afbeelding wordt geklikt
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Sluit modal met escape toets
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === "block") {
            modal.style.display = "none";
        }
    });
});