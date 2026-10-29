// Vergroten.js — image modal (handled by skyArt.js initImageModal)
// Kept as fallback for standalone use

document.addEventListener('DOMContentLoaded', function () {
    const modal    = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.querySelector('.close');

    if (!modal) return;

    document.querySelectorAll('.comparison-image').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function () {
            modal.style.display = 'flex';
            modalImg.src = this.src;
            document.body.style.overflow = 'hidden';
        });
    });

    function close() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
});