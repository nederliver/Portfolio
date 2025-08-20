// Make items open in a new tab - works for multiple item types
const itemSelectors = [
    '.link-item-modrinth',
    '.link-item-youtube',
    '.link-item-github',
    '.link-item-builtbybit'
    // Add more selectors as needed
];

// Combine all selectors into one query
const allItems = document.querySelectorAll(itemSelectors.join(', '));

allItems.forEach(item => {
    item.addEventListener('click', (event) => {
        // Prevent default behavior
        event.preventDefault();
        
        // Get URL from various possible data attributes or href
        const url = item.dataset.url || 
                   item.dataset.href || 
                   item.dataset.link || 
                   item.href || 
                   item.getAttribute('data-target');
        
        if (url) {
            window.open(url, "_blank");
        } else {
            console.warn('No URL found for item:', item);
        }
    });
});

// Alternative approach: Use a single class and data attribute
// Add class "external-link" and data-url attribute to any clickable element
const externalLinks = document.querySelectorAll('.external-link[data-url]');
externalLinks.forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault();
        window.open(item.dataset.url, "_blank");
    });
});