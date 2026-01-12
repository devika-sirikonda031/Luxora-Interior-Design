function searchPage() {
  const input = document.getElementById("searchBox").value.toLowerCase().trim();

  // Check if current page is inside Extra_Files folder
  const isInsideExtra = window.location.pathname.toLowerCase().includes("extra_files");

  // Dynamic base path depending on page location
  const basePath = isInsideExtra ? "./" : "./Extra_Files/";

  const pages = {
    // Living Rooms
    "modern": "modern.html",
    "modern living": "modern.html",
    "living room": "modern.html",
    "stylish living room": "modern.html",

    "cozy": "Lclozy.html",
    "cozy living": "Lclozy.html",

    "minimal": "Lminimal.html",
    "minimal living": "Lminimal.html",

    "luxury": "Lluxury.html",
    "luxury living": "Lluxury.html",

    // Kitchen & Dining
    "kitchen": "kitchen.html",
    "modern kitchen": "KModern.html",
    "white modular kitchen": "WKmodular.html",

    "dining": "Dcozy.html",
    "cozy dining": "Dcozy.html",

    // Bedrooms
    "minimal bedroom": "Bminimal.html",
    "luxury bedroom": "Lbedroom.html",
    "bedroom makeover": "Bmakeover.html",

    // Other Designs
    "rustic": "Rustic.html",
    "elegant": "Elegant.html",

    // kids design
    "kids": "kids.html",
    "kids Bedroom": "kids.html"

  };

  if (pages[input]) {
    window.location.href = basePath + pages[input];
  } else {
    alert("No results found! Try: Modern, Cozy, Kitchen, Bedroom, Rustic, Elegant…");
  }

  return false;
}




//project

// const container = document.getElementById("baContainer");
// const after = document.getElementById("baAfterWrapper");
// const handle = document.getElementById("baHandle");

// let active = false;

// handle.addEventListener("mousedown", () => active = true);
// window.addEventListener("mouseup", () => active = false);
// window.addEventListener("mousemove", (e)=> active && move(e.clientX));

// handle.addEventListener("touchstart", () => active = true);
// window.addEventListener("touchend", () => active = false);
// window.addEventListener("touchmove", (e)=> active && move(e.touches[0].clientX));

// function move(x){
//   const rect = container.getBoundingClientRect();
//   let pos = Math.max(0, Math.min(x - rect.left, rect.width));
//   after.style.width = pos + "px";
//   handle.style.left = pos + "px";
// }


// ---------- SEARCH (your existing code can stay here) ----------

// ... your searchPage() function above ...

// ---------- PROJECTS : BEFORE–AFTER SLIDER + CATEGORY SWITCH ----------

// Data for each room (mixed elegant styles)
const projectData = {
  living: {
    before:
      "https://images.pexels.com/photos/279719/pexels-photo-279719.jpeg",
    after:
      "https://images.pexels.com/photos/1082355/pexels-photo-1082355.jpeg",
    mini1Title: "Veronica’s Living Room",
    mini1Text: "Warm stone wall, layered lights and comfortable sectional sofa.",
    mini2Title: "Laura’s Cozy Corner",
    mini2Text: "Reading nook with plants, soft rug and accent chair."
  },
  dining: {
    before:
      "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg",

    after:
      "https://images.pexels.com/photos/6284237/pexels-photo-6284237.jpeg",
    mini1Title: "Family Dining Upgrade",
    mini1Text: "Simple wooden table turned into a styled family dining zone.",
    mini2Title: "Brunch-Ready Space",
    mini2Text: "Soft chairs, pendant lights and a bright neutral palette."
  },
  bedroom: {
    before:
      "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?cs=srgb&dl=pexels-jvdm-1454806.jpg&fm=jpg",
    after:
      "https://images.pexels.com/photos/3659683/pexels-photo-3659683.jpeg",
    mini1Title: "Calm Master Suite",
    mini1Text: "Muted tones with upholstered headboard and warm lamps.",
    mini2Title: "Storage + Style",
    mini2Text: "Wardrobes blended with wall panelling for a clean look."
  },
  kitchen: {
    before:

      "https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg",
    after:
      "https://images.pexels.com/photos/4469151/pexels-photo-4469151.jpeg",
    mini1Title: "Compact City Kitchen",
    mini1Text: "Old parallel kitchen redesigned with glossy shutters.",
    mini2Title: "Smart Storage",
    mini2Text: "Tall units, drawers and under-cabinet lighting for daily ease."
  },
  decor: {
    before:
      "https://images.pexels.com/photos/6585763/pexels-photo-6585763.jpeg",
    after:
      "https://images.pexels.com/photos/6585760/pexels-photo-6585760.jpeg",
    mini1Title: "Accent Wall Styling",
    mini1Text: "Plain wall transformed with frames, mirrors and lamps.",
    mini2Title: "Finishing Touches",
    mini2Text: "Cushions, throws and art added for a complete styled look."
  }
};

// Grab elements (only if we are on Project page)
const baContainer = document.getElementById("baContainer");
const baOverlay = document.getElementById("baOverlay");
const baHandle = document.getElementById("baHandle");
const baBefore = document.getElementById("baBefore");
const baAfter = document.getElementById("baAfter");
const tabs = document.querySelectorAll(".btn-cat");
const miniTitle1 = document.getElementById("miniTitle1");
const miniText1 = document.getElementById("miniText1");
const miniTitle2 = document.getElementById("miniTitle2");
const miniText2 = document.getElementById("miniText2");

if (baContainer && baOverlay && baHandle && baBefore && baAfter) {
  // ---- Slider Drag Logic ----
  let isDragging = false;

  function updateSlider(clientX) {
    const rect = baContainer.getBoundingClientRect();
    let posX = clientX - rect.left;

    if (posX < 0) posX = 0;
    if (posX > rect.width) posX = rect.width;

    baOverlay.style.width = posX + "px";
    baHandle.style.left = posX + "px";
  }

  // Mouse
  baHandle.addEventListener("mousedown", () => {
    isDragging = true;
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  // Touch
  baHandle.addEventListener("touchstart", () => {
    isDragging = true;
  });

  window.addEventListener("touchend", () => {
    isDragging = false;
  });

  window.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  });

  // ---- Category switch ----
  function setRoom(roomKey) {
    const data = projectData[roomKey];
    if (!data) return;

    // Update images
    baBefore.src = data.before;
    baAfter.src = data.after;

    // Reset slider to center
    const rect = baContainer.getBoundingClientRect();
    const middle = rect.width / 2;
    baOverlay.style.width = middle + "px";
    baHandle.style.left = middle + "px";

    // Update small text
    miniTitle1.textContent = data.mini1Title;
    miniText1.textContent = data.mini1Text;
    miniTitle2.textContent = data.mini2Title;
    miniText2.textContent = data.mini2Text;
  }

  // Default: living
  setRoom("living");

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabs.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const room = btn.getAttribute("data-room");
      setRoom(room);
    });
  });
}


// Contact Form Submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Stop page reload

  // Show success message
  document.getElementById("formSuccess").style.display = "block";

  // Clear form
  document.getElementById("contactForm").reset();

  // Hide success message after 3 seconds
  setTimeout(() => {
    document.getElementById("formSuccess").style.display = "none";
  }, 3000);
});
// Full Screen Image Zoom Popup
const popup = document.getElementById("imgPopup");
const popupImg = document.getElementById("popupImage");
const closeBtn = document.querySelector(".close-btn");

// Add click to all gallery / card images
document.querySelectorAll(".gallery-card img, .card img").forEach(img => {
  img.addEventListener("click", () => {
    popup.style.display = "flex";
    popupImg.src = img.src;
  });
});

// Close popup when clicking X
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

// Close popup when clicking outside image
popup.addEventListener("click", (e) => {
  if (e.target === popup) popup.style.display = "none";
});










