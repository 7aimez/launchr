function getTotalPages() {
    let pages = 0;
    let currentWidgets = 0;
    let currentIcons = 0;

    for (let i = 0; i < widgets.length + icons.length; i++) {
        const isWidget = i < widgets.length;

        if (isWidget) {
            if (currentWidgets >= MAX_WIDGETS_PER_PAGE || (currentWidgets + currentIcons) >= MAX_ITEMS_PER_PAGE) {
                pages++;
                currentWidgets = 1;
                currentIcons = 0;
            } else {
                currentWidgets++;
            }
        } else {
            if (currentIcons >= MAX_ICONS_PER_PAGE || (currentWidgets + currentIcons) >= MAX_ITEMS_PER_PAGE) {
                pages++;
                currentWidgets = 0;
                currentIcons = 1;
            } else {
                currentIcons++;
            }
        }
    }

    return Math.max(1, pages + (currentWidgets > 0 || currentIcons > 0 ? 1 : 0));
}

function goToPage(pageIndex) {
    const totalPages = getTotalPages();
    currentPage = Math.max(0, Math.min(pageIndex, totalPages - 1));

    const pagesWrapper = document.getElementById("pagesWrapper");
    const offset = -currentPage * window.innerWidth;
    pagesWrapper.style.transform = `translateX(${offset}px)`;

    updatePageIndicators();
}
