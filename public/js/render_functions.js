function renderPages() {
    const totalPages = getTotalPages();
    const pagesWrapper = document.getElementById("pagesWrapper");
    const indicatorsContainer = document.getElementById("pageIndicators");

    pagesWrapper.innerHTML = '';
    indicatorsContainer.innerHTML = '';

    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        const page = createPage(pageIndex);
        pagesWrapper.appendChild(page);

        const indicator = createPageIndicator(pageIndex);
        indicatorsContainer.appendChild(indicator);
    }

    if (currentPage >= totalPages) {
        currentPage = Math.max(0, totalPages - 1);
    }

    goToPage(currentPage);
}

function createPage(pageIndex) {
    const page = document.createElement("div");
    page.className = "page flex-shrink-0";
    page.style.width = "100vw";
    page.style.minHeight = "100%";

    const grid = document.createElement("div");
    grid.className = "icon-grid";

    const pageItems = getPageItems(pageIndex);

    pageItems.forEach(item => {
        let itemElement;
        if (item.type) {
            itemElement = createWidgetElement(item);
        } else {
            itemElement = createIconElement(item);
        }
        grid.appendChild(itemElement);
    });

    page.appendChild(grid);
    return page;
}

function getPageItems(pageIndex) {
    const allItems = [...widgets, ...icons];
    const pageItems = [];
    let currentPage = 0;
    let currentWidgets = 0;
    let currentIcons = 0;

    for (let i = 0; i < allItems.length; i++) {
        const item = allItems[i];
        const isWidget = item.type !== undefined;

        if (isWidget) {
            if (currentWidgets >= MAX_WIDGETS_PER_PAGE || (currentWidgets + currentIcons) >= MAX_ITEMS_PER_PAGE) {
                currentPage++;
                currentWidgets = 0;
                currentIcons = 0;
            }
        } else {
            if (currentIcons >= MAX_ICONS_PER_PAGE || (currentWidgets + currentIcons) >= MAX_ITEMS_PER_PAGE) {
                currentPage++;
                currentWidgets = 0;
                currentIcons = 0;
            }
        }

        if (currentPage === pageIndex) {
            pageItems.push(item);
            if (isWidget) {
                currentWidgets++;
            } else {
                currentIcons++;
            }
        } else if (currentPage > pageIndex) {
            break;
        }

        if (currentPage < pageIndex) {
            if (isWidget) {
                currentWidgets++;
            } else {
                currentIcons++;
            }
        }
    }

    return pageItems;
}
