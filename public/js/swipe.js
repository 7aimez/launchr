function setupSwipeHandlers() {
    const pagesContainer = document.getElementById("pagesContainer");
    pagesContainer.addEventListener("touchstart", handleTouchStart, { passive: false });
    pagesContainer.addEventListener("touchmove", handleTouchMove, { passive: false });
    pagesContainer.addEventListener("touchend", handleTouchEnd, { passive: false });

    pagesContainer.addEventListener("mousedown", handleMouseStart);
    pagesContainer.addEventListener("mousemove", handleMouseMove);
    pagesContainer.addEventListener("mouseup", handleMouseEnd);
    pagesContainer.addEventListener("mouseleave", handleMouseEnd);
}
