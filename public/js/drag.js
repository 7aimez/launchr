function setupDragAndDrop() {
    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("drop", handleDrop);
}

function handleDragStart(e, icon, index) {
    draggedIcon = icon;
    draggedIconIndex = index;
    e.target.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.outerHTML);
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    const iconElement = e.target.closest("[data-icon-id]");
    if (iconElement && !iconElement.classList.contains("dragging")) {
        iconElement.classList.add("drag-over");
        const iconId = parseInt(iconElement.getAttribute("data-icon-id"));
        dropTargetIndex = icons.findIndex(icon => icon.id === iconId);
    }
}

function handleDrop(e) {
    e.preventDefault();

    const iconElement = e.target.closest("[data-icon-id]");
    if (iconElement && draggedIcon && draggedIconIndex !== -1 && dropTargetIndex !== -1) {
        const [movedIcon] = icons.splice(draggedIconIndex, 1);
        icons.splice(dropTargetIndex, 0, movedIcon);
        renderPages();
    }

    document.querySelectorAll(".dragging").forEach(el => {
        el.classList.remove("dragging");
    });
    document.querySelectorAll(".drag-over").forEach(el => {
        el.classList.remove("drag-over");
    });

    draggedIcon = null;
    draggedIconIndex = -1;
    dropTargetIndex = -1;
}
