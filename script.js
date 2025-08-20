document.addEventListener('DOMContentLoaded', () => {
    const nonDraggableImages = document.querySelectorAll('.no-drag');
    nonDraggableImages.forEach(img => img.setAttribute('draggable', false));

    // Make the links on the "links" page open in a new tab
    const linkItems = document.querySelectorAll('.link-item');
    linkItems.forEach(item => {
        item.addEventListener('click', () => {
            window.open(item.dataset.url, "_blank");
        });
    });
    const donate = document.querySelectorAll('.donate-title');
    donate.forEach(item => {
        item.addEventListener('click', () => {
            window.open(item.dataset.url, "_blank");
        });
    });
}); 
//add tooltip