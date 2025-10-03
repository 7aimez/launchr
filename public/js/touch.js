function handleTouchStart(e) {
    if (e.target.closest("button") || e.target.closest("input") || e.target.closest("textarea")) return;
    const iconElement = e.target.closest("[data-icon-id]");
    if (iconElement) {
        isDraggingIcon = true;
        return;
    }
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchCurrentX = touchStartX;
    touchCurrentY = touchStartY;

    const pagesWrapper = document.getElementById("pagesWrapper");
    const transform = getComputedStyle(pagesWrapper).transform;
    initialTransform = transform !== "none" ? new DOMMatrix(transform).m41 : 0;
    isDraggingPage = false;
}

function handleTouchMove(e) {
    if (isDraggingIcon) return;
    if (!touchStartX || e.target.closest("button") || e.target.closest("input") || e.target.closest("textarea")) return;

    touchCurrentX = e.touches[0].clientX;
    touchCurrentY = e.touches[0].clientY;

    const deltaX = touchCurrentX - touchStartX;
    const deltaY = touchCurrentY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        isDraggingPage = true;
        e.preventDefault();

        const pagesWrapper = document.getElementById("pagesWrapper");
        const newTransform = initialTransform + deltaX;
        pagesWrapper.style.transform = `translateX(${newTransform}px)`;
    }
}

function handleTouchEnd(e) {
    if (isDraggingIcon) {
        isDraggingIcon = false;
        return;
    }

    if (!isDraggingPage || !touchStartX) {
        touchStartX = 0;
        return;
    }

    const deltaX = touchCurrentX - touchStartX;
    const threshold = window.innerWidth * 0.3;

    if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0 && currentPage > 0) {
            goToPage(currentPage - 1);
        } else if (deltaX < 0 && currentPage < getTotalPages() - 1) {
            goToPage(currentPage + 1);
        } else {
            goToPage(currentPage);
        }
    } else {
        goToPage(currentPage);
    }

    touchStartX = 0;
    isDraggingPage = false;
}
