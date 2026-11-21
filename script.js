
const images = [
    {
        title: "Mountain Dreams",
        category: "nature",
        description: "Beautiful mountains covered in clouds",
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Ocean Waves",
        category: "nature",
        description: "Peaceful blue ocean",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Modern Building",
        category: "architecture",
        description: "Beautiful modern architecture",
        url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "City Design",
        category: "architecture",
        description: "A beautiful city view",
        url: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Wild Elephant",
        category: "animals",
        description: "Elephant in its natural habitat",
        url: "https://images.unsplash.com/photo-1557050543-4d5f8a6b6f0?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Cute Fox",
        category: "animals",
        description: "A fox in the wild",
        url: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=800&q=80"
    }
];

const gallery = document.getElementById("gallery");
const filterButtons = document.querySelector(".filters");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeBtn = document.getElementById("closeBtn");

// Promise example: load gallery data
const getGalleryImages = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(images), 300);
    });
};

// Closure: stores the selected category privately
const createFilter = () => {
    let currentCategory = "all";

    return (category) => {
        currentCategory = category;

        document.querySelectorAll(".card").forEach(card => {
            const show =
                currentCategory === "all" ||
                card.dataset.category === currentCategory;

            card.classList.toggle("hidden", !show);
        });
    };
};

const filterGallery = createFilter();

// Display images
const displayImages = (imageData) => {
    gallery.innerHTML = imageData.map((image, index) => `
        <div class="card" data-category="${image.category}" data-index="${index}">
            <img src="${image.url}" alt="${image.title}" loading="lazy">
            <div class="card-info">
                <h3>${image.title}</h3>
                <p>${image.description}</p>
                <span class="category">${image.category}</span>
            </div>
        </div>
    `).join("");
};

// Async/Await
const loadGallery = async () => {
    try {
        const data = await getGalleryImages();
        displayImages(data);
    } catch (error) {
        gallery.innerHTML = "<p>Unable to load images.</p>";
        console.error(error);
    }
};

// Event delegation: one listener for all filter buttons
filterButtons.addEventListener("click", (event) => {
    if (event.target.classList.contains("filter-btn")) {
        const category = event.target.dataset.category;

        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.remove("active");
        });

        event.target.classList.add("active");
        filterGallery(category);
    }
});

// Event delegation: one listener for all gallery cards
gallery.addEventListener("click", (event) => {
    const card = event.target.closest(".card");

    if (!card) return;

    const index = card.dataset.index;
    const image = images[index];

    lightboxImage.src = image.url;
    lightboxCaption.textContent = image.title + " — " + image.description;

    lightbox.showModal();
});

// Close lightbox
closeBtn.addEventListener("click", () => {
    lightbox.close();
});

// Close when clicking outside the image/dialog content
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        lightbox.close();
    }
});

// Start application
loadGallery();
