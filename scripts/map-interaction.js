const MapInteraction = {
  elements: {
    tooltip: null,
    tooltipImage: null,
    tooltipTitle: null,
    tooltipDescription: null,
    mapAreas: null,
  },

  init() {
    // Initialize DOM elements
    this.elements.tooltip = document.getElementById("tooltip");
    this.elements.tooltipImage = document.getElementById("tooltip-image");
    this.elements.tooltipTitle = document.getElementById("tooltip-title");
    this.elements.tooltipDescription = document.getElementById(
      "tooltip-description"
    );

    // Get all map areas
    this.elements.mapAreas = document.querySelectorAll(".map__area area");

    // Add event listeners to all areas
    this.elements.mapAreas.forEach((area) => {
      area.addEventListener("mouseover", (e) => {
        e.preventDefault();
        const locationId = area.parentElement.dataset.locationId;
        this.handleMouseOver(locationId, e);
      });

      area.addEventListener("mouseout", () => {
        this.hideTooltip();
      });
    });
  },

  handleMouseOver(locationId, event) {
    const location = LocationsData.locations.find(
      (loc) => loc.id === locationId
    );
    if (!location) return;

    this.updateTooltip(location, event);
  },

  updateTooltip(location, event) {
    const { elements } = this;

    // Update tooltip content
    elements.tooltipImage.src =
      location.image === "" ? "images/placeholder.png" : location.image;
    elements.tooltipImage.alt = location.name;
    elements.tooltipTitle.textContent = location.name;
    elements.tooltipDescription.textContent = location.description;

    // Position tooltip
    const x = event.pageX;
    const y = event.pageY;

    // Adjust position based on viewport
    const tooltipRect = elements.tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = x + 20;
    let top = y - 250;

    // Prevent tooltip from going off-screen
    if (left + tooltipRect.width > viewportWidth) {
      left = x - tooltipRect.width - 20;
    }

    if (top < 0) {
      top = y + 20;
    } else if (top + tooltipRect.height > viewportHeight) {
      top = y - tooltipRect.height - 20;
    }

    // Special case for NALALRC (id: 9)
    if (location.id === "9") {
      top = y + 50;
    }

    // Apply position
    elements.tooltip.style.left = `${left}px`;
    elements.tooltip.style.top = `${top}px`;
    elements.tooltip.style.display = "block";
  },

  hideTooltip() {
    this.elements.tooltip.style.display = "none";
  },
};

// const CoordinateTracker = {
//   elements: {
//     coordDisplay: null,
//   },

//   init() {
//     // Create coordinate display element
//     const coordDiv = document.createElement("div");
//     coordDiv.className = "coord-display";
//     coordDiv.innerHTML = `
//           <div class="coord-display__content">
//               <span>X: <span id="coord-x">0</span></span>
//               <span>Y: <span id="coord-y">0</span></span>
//               <button id="coord-copy" class="coord-display__button">Copy Coords</button>
//           </div>
//       `;
//     document.body.appendChild(coordDiv);

//     // Store elements
//     this.elements.coordDisplay = coordDiv;
//     this.elements.coordX = document.getElementById("coord-x");
//     this.elements.coordY = document.getElementById("coord-y");
//     this.elements.copyButton = document.getElementById("coord-copy");

//     // Add event listeners
//     document
//       .querySelector(".map__image")
//       .addEventListener("mousemove", this.updateCoordinates.bind(this));
//     this.elements.copyButton.addEventListener(
//       "click",
//       this.copyCoordinates.bind(this)
//     );
//   },

//   updateCoordinates(event) {
//     const rect = event.target.getBoundingClientRect();
//     const x = Math.round(event.clientX - rect.left);
//     const y = Math.round(event.clientY - rect.top);

//     this.elements.coordX.textContent = x;
//     this.elements.coordY.textContent = y;
//   },

//   copyCoordinates() {
//     const x = this.elements.coordX.textContent;
//     const y = this.elements.coordY.textContent;
//     navigator.clipboard.writeText(`${x},${y}`);

//     // Show feedback
//     this.elements.copyButton.textContent = "Copied!";
//     setTimeout(() => {
//       this.elements.copyButton.textContent = "Copy Coords";
//     }, 1000);
//   },
// };

// Initialize the coordinate tracker
document.addEventListener("DOMContentLoaded", () => {
  MapInteraction.init();
  // CoordinateTracker.init();
});
