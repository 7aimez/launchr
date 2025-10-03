let icons = JSON.parse(localStorage.getItem("icons")) || [
    { id: 1, name: "Google", iconType: "fontawesome", image: "fab fa-google", url: "https://www.google.com" },
    { id: 2, name: "GitHub", iconType: "fontawesome", image: "fab fa-github", url: "https://www.github.com" },
    { id: 3, name: "HTML Viewer", iconType: "fontawesome", image: "fas fa-code", url: "https://htmlvi.onrender.com" }
];
let widgets = JSON.parse(localStorage.getItem("widgets")) || [];
let currentPage = 0;
let currentIconType = "url";
let currentBackgroundType = "url";
let currentEditingWidget = null;
const MAX_WIDGETS_PER_PAGE = 2;
const MAX_ICONS_PER_PAGE = 6;
const MAX_ITEMS_PER_PAGE = 8;

let draggedIcon = null;
let draggedIconIndex = -1;
let dropTargetIndex = -1;

let touchStartX = 0;
let touchStartY = 0;
let touchCurrentX = 0;
let touchCurrentY = 0;
let isDraggingPage = false;
let isDraggingIcon = false;
let initialTransform = 0;

document.addEventListener("DOMContentLoaded", function() {
    setupEventListeners();
    setupKeyboardShortcuts();
    renderPages();
    setupSwipeHandlers();
});

function setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.key >= "1" && e.key <= "9") {
            e.preventDefault();
            const pageNum = parseInt(e.key) - 1;
            const totalPages = getTotalPages();
            if (pageNum < totalPages) {
                goToPage(pageNum);
            }
        }
        if (e.key === "ArrowLeft" && currentPage > 0) {
            e.preventDefault();
            goToPage(currentPage - 1);
        } else if (e.key === "ArrowRight" && currentPage < getTotalPages() - 1) {
            e.preventDefault();
            goToPage(currentPage + 1);
        }
    });
}

// Add the rest of your JavaScript functions here...
