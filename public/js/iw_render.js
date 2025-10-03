function createIconElement(icon) {
    const iconIndex = icons.findIndex(i => i.id === icon.id);
    const iconDiv = document.createElement("div");
    iconDiv.className = "icon-element rounded-2xl p-4 hover:bg-white/15 transition-all duration-200 cursor-pointer group relative select-none flex flex-col items-center justify-center";
    iconDiv.setAttribute("data-icon-id", icon.id);
    iconDiv.draggable = true;

    iconDiv.addEventListener("dragstart", (e) => handleDragStart(e, icon, iconIndex));
    iconDiv.addEventListener("dragend", handleDragEnd);
    iconDiv.addEventListener("dragover", handleDragOver);
    iconDiv.addEventListener("dragenter", handleDragEnter);
    iconDiv.addEventListener("dragleave", handleDragLeave);

    let iconContent = '';

    if (icon.iconType === "fontawesome") {
        iconContent = `
            <div class="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center pointer-events-none mb-3">
                <i class="${icon.image} text-white text-3xl"></i>
            </div>
        `;
    } else {
        iconContent = `
            <div class="w-16 h-16 rounded-xl overflow-hidden bg-white/20 flex items-center justify-center pointer-events-none mb-3">
                <img src="${icon.image}" alt="${icon.name}" class="w-12 h-12 object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg hidden items-center justify-center text-white font-bold text-lg">
                    ${icon.name.charAt(0).toUpperCase()}
                </div>
            </div>
        `;
    }

    iconDiv.innerHTML = `
        ${iconContent}
        <span class="text-white text-sm font-medium text-center truncate w-full pointer-events-none">${icon.name}</span>
        <button class="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 rounded-full text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" onclick="event.stopPropagation(); deleteIcon(${icon.id})">
            <i class="fas fa-times"></i>
        </button>
    `;

    iconDiv.addEventListener("click", (e) => {
        if (!e.target.closest("button") && !isDraggingPage) {
            window.open(icon.url, "_blank");
        }
    });

    return iconDiv;
}

function createWidgetElement(widget) {
    const widgetDiv = document.createElement("div");
    widgetDiv.className = `liquid-glass rounded-2xl p-4 shadow-lg group relative select-none transition-all duration-200 hover:bg-white/25`;
    widgetDiv.style.gridColumn = `span ${Math.min(widget.size.width, 4)}`;
    widgetDiv.style.gridRow = `span ${Math.min(widget.size.height, 3)}`;
    widgetDiv.setAttribute("data-widget-id", widget.id);

    let content = '';

    switch (widget.type) {
        case "clock":
            const now = new Date();
            const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            const dateStr = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
            content = `
                <div class="text-center text-white h-full flex flex-col justify-center">
                    <div class="text-2xl font-bold mb-1" id="clock-time-${widget.id}">${timeStr}</div>
                    <div class="text-sm opacity-80" id="clock-date-${widget.id}">${dateStr}</div>
                </div>
            `;
            break;
        case "notes":
            content = `
                <div class="text-white h-full flex flex-col">
                    <div class="text-sm font-medium mb-2 flex items-center"><i class="fas fa-sticky-note mr-2"></i>Notes</div>
                    <textarea class="flex-1 bg-white/10 border border-white/20 rounded-lg p-2 text-white text-xs resize-none focus:outline-none focus:ring-1 focus:ring-white/40" 
                        placeholder="Add your notes here..." 
                        onchange="updateWidgetData(${widget.id}, 'content', this.value)">${widget.data.content}</textarea>
                </div>
            `;
            break;
        case "weather":
            content = `
                <div class="text-white h-full flex flex-col justify-center text-center">
                    <div class="text-3xl mb-2"><i class="fas fa-cloud-sun"></i></div>
                    <div class="text-xl font-bold">${widget.data.temp}</div>
                    <div class="text-sm opacity-80">${widget.data.condition}</div>
                    <div class="text-xs opacity-60 mt-1">${widget.data.location}</div>
                </div>
            `;
            break;
        case "links":
            const links = widget.data.links || [];
            const linkItems = links.slice(0, 3).map(link => 
                `<a href="${link.url}" target="_blank" class="text-xs text-white/80 hover:text-white truncate block">${link.name}</a>`
            ).join('');
            content = `
                <div class="text-white h-full flex flex-col cursor-pointer" onclick="editLinks(${widget.id})">
                    <div class="text-sm font-medium mb-2 flex items-center"><i class="fas fa-link mr-2"></i>Quick Links</div>
                    <div class="flex-1">
                        ${linkItems || '<div class="text-xs opacity-60 text-center">Click to add links</div>'}
                    </div>
                </div>
            `;
            break;
        default:
            content = '<div class="text-white text-center">Widget</div>';
    }

    widgetDiv.innerHTML = `
        ${content}
        <button class="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 rounded-full text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" onclick="event.stopPropagation(); deleteWidget(${widget.id})">
            <i class="fas fa-times"></i>
        </button>
    `;

    if (widget.type === "clock") {
        const updateClock = () => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            const dateStr = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
            const timeEl = document.getElementById(`clock-time-${widget.id}`);
            const dateEl = document.getElementById(`clock-date-${widget.id}`);
            if (timeEl) timeEl.textContent = timeStr;
            if (dateEl) dateEl.textContent = dateStr;
        };
        setInterval(updateClock, 60000); // Update every minute
    }

    return widgetDiv;
}
