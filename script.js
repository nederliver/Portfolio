// Make items open in a new tab - works for multiple item types
const itemSelectors = [
    '.link-item-modrinth',
    '.link-item-youtube',
    '.link-item-github',
    '.donate-title',
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

// Software List functionality
document.addEventListener('DOMContentLoaded', function() {
    // Only run software list functionality if we're on the software list page
    const softwareGrid = document.getElementById('softwareGrid');
    if (!softwareGrid) return;

    // Software data with categories and download links
    const softwareData = [
        {
            title: "Aseprite",
            description: "Best professional pixel art tool with many cool features.",
            category: "Art & Design",
            downloadUrl: "https://www.aseprite.org/"
        },
        {
            title: "Blender",
            description: "Best free and open-source 3D modeling software.",
            category: "Art & Design",
            downloadUrl: "https://www.blender.org/download/"
        },
        {
            title: "Discord",
            description: "Best communication platform with for gamers and developers.",
            category: "Communication",
            downloadUrl: "https://discord.com/download"
        },
        {
            title: "Telegram",
            description: "Fast and secure messaging app.",
            category: "Communication",
            downloadUrl: "https://discord.com/download"
        },
        {
            title: "IntelliJ IDEA",
            description: "Powerful IDE primary used for Java.",
            category: "Development",
            downloadUrl: "https://www.jetbrains.com/idea/download/"
        },
        {
            title: "OBS Studio",
            description: "Best free software for video recording and streaming.",
            category: "Recording",
            downloadUrl: "https://obsproject.com/download"
        },
        {
            title: "Unity",
            description: "Most popular game engine for creating 2D and 3D games.",
            category: "Development",
            downloadUrl: "https://unity.com/download"
        },
        {
            title: "Visual Studio Code",
            description: "Lightweight but powerful code editor with extensive extension support.",
            category: "Development",
            downloadUrl: "https://code.visualstudio.com/download"
        },
        {
            title: "Audacity",
            description: "Best free and open-source audio editing software.",
            category: "Recording",
            downloadUrl: "https://www.audacityteam.org/download/"
        },
        {
            title: "Music Bee",
            description: "Best free and open source offline music player.",
            category: "Music",
            downloadUrl: "https://getmusicbee.com/downloads/"
        },
        {
            title: "GIMP",
            description: "Best free alternative to Photoshop, although it lacks some features.",
            category: "Art & Design",
            downloadUrl: "https://www.gimp.org/downloads/"
        },
        {
            title: "Minecraft",
            description: "Probably my favorite game of all time.",
            category: "Gaming",
            downloadUrl: "https://www.minecraft.net/en-us/download"
        },
        {
            title: "Prism Launcher",
            description: "Best free and open source, highly customizable Minecraft launcher.",
            category: "Gaming",
            downloadUrl: "https://prismlauncher.org/download/"
        },
        {
            title: "Zen Browser",
            description: "Best actively developed, firefox based browser and my personal choice.",
            category: "Browsers",
            downloadUrl: "https://zen-browser.app/download/"
        },
        {
            title: "Steam",
            description: "Digital distribution platform for video games and gaming-related content.",
            category: "Gaming",
            downloadUrl: "https://store.steampowered.com/about/"
        }
    ];

    // Get all unique categories
    const allCategories = [...new Set(softwareData.map(item => item.category))].sort();
    let selectedCategory = null;
    let searchQuery = '';

    // DOM elements
    const categoriesContainer = document.getElementById('categoriesContainer');
    const searchInput = document.getElementById('searchInput');

    // Initialize the page
    function init() {
        renderCategories();
        renderSoftware();
        setupEventListeners();
    }

    // Render category buttons
    function renderCategories() {
        categoriesContainer.innerHTML = `
            <div class="category ${selectedCategory === null ? 'active' : ''}" data-category="all">All</div>
            ${allCategories.map(category => 
                `<div class="category ${selectedCategory === category ? 'active' : ''}" data-category="${category}">${category}</div>`
            ).join('')}
        `;
    }

    // Render software items
    function renderSoftware() {
        const filteredSoftware = filterSoftware();
        
        if (filteredSoftware.length === 0) {
            softwareGrid.innerHTML = '<div class="no-results">No software found matching your criteria.</div>';
            return;
        }

        softwareGrid.innerHTML = filteredSoftware.map(item => `
            <div class="software-item">
                <div class="software-title">${item.title}</div>
                <div class="software-description">${item.description}</div>
                <div class="software-tags">
                    <a href="${item.downloadUrl}" class="software-download external-link" target="_blank" rel="noopener noreferrer">DOWNLOAD</a>
                </div>
            </div>
        `).join('');
    }

    // Filter software based on selected category and search query
    function filterSoftware() {
        let filtered = softwareData;

        // Filter by selected category
        if (selectedCategory && selectedCategory !== 'all') {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(item => {
                const titleMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
                const descriptionMatch = item.description.toLowerCase().includes(searchQuery.toLowerCase());
                const categoryMatch = item.category.toLowerCase().includes(searchQuery.toLowerCase());
                return titleMatch || descriptionMatch || categoryMatch;
            });

            // Sort by relevance (title matches first)
            filtered.sort((a, b) => {
                const aTitle = a.title.toLowerCase().includes(searchQuery.toLowerCase());
                const bTitle = b.title.toLowerCase().includes(searchQuery.toLowerCase());
                if (aTitle && !bTitle) return -1;
                if (!aTitle && bTitle) return 1;
                return a.title.localeCompare(b.title);
            });
        } else {
            // Sort alphabetically when no search query
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        }

        return filtered;
    }

    // Setup event listeners
    function setupEventListeners() {
        // Category click events
        categoriesContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('category')) {
                const category = e.target.dataset.category;
                
                // Remove active class from all categories
                document.querySelectorAll('.category').forEach(cat => cat.classList.remove('active'));
                
                // Add active class to clicked category
                e.target.classList.add('active');
                
                // Set selected category
                selectedCategory = category === 'all' ? null : category;
                
                renderSoftware();
            }
        });

        // Search input events
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim();
            renderSoftware();
        });
    }

    // Initialize when DOM is ready
    init();
});