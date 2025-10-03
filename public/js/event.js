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
