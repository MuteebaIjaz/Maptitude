
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const resultsContainer = document.getElementById("resultsContainer");

async function getTravelData() {
    try {
        const response = await fetch("maptitude_api.json");

        if (!response.ok) {
            throw new Error("Unable to load travel data");
        }

        return await response.json();

    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

// Display recommendations
function displayRecommendations(recommendations) {
    resultsContainer.innerHTML = "";

    if (recommendations.length === 0) {
        resultsContainer.innerHTML =
            '<p class="placeholder">No recommendations found. Try another keyword.</p>';
        return;
    }

    recommendations.forEach((place) => {
        const card = document.createElement("div");
        card.className = "destination-card";

        const image = document.createElement("img");
        image.src = place.imageUrl;
        image.alt = place.name;

        image.onerror = function () {
            this.alt = "Destination image unavailable";
            this.style.display = "none";
        };

        const content = document.createElement("div");
        content.className = "destination-card-content";

        const heading = document.createElement("h3");
        heading.textContent = place.name;

        const description = document.createElement("p");
        description.textContent = place.description;

        content.appendChild(heading);
        content.appendChild(description);

        card.appendChild(image);
        card.appendChild(content);

        resultsContainer.appendChild(card);
    });
}

async function searchRecommendations() {
    const keyword = searchInput.value.trim().toLowerCase();

    if (!keyword) {
        resultsContainer.innerHTML =
            '<p class="placeholder">Please enter a search keyword.</p>';
        return;
    }

    const data = await getTravelData();

    if (!data) {
        resultsContainer.innerHTML =
            '<p class="placeholder">Unable to load recommendations. Please try again.</p>';
        return;
    }

    let recommendations = [];

    if (keyword.includes("beach")) {
        recommendations = data.beaches;
    } else if (keyword.includes("temple")) {
        recommendations = data.temples;
    }  else if (keyword.includes("country") || keyword.includes("countries")) {
        recommendations = data.countries;
    } else {
        resultsContainer.innerHTML =
            '<p class="placeholder">No recommendations found. Try beach, temple, or country.</p>';
        return;
    }

    displayRecommendations(recommendations);
}

// Clear search and results
function clearRecommendations() {
    searchInput.value = "";
    resultsContainer.innerHTML =
        '<p class="placeholder">Search for beaches, temples, or countries to discover amazing destinations.</p>';
}

// Event listeners
if (searchBtn) {
    searchBtn.addEventListener("click", searchRecommendations);
}

if (clearBtn) {
    clearBtn.addEventListener("click", clearRecommendations);
}

if (searchInput) {
    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            searchRecommendations();
        }
    });
}

// Contact form
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        const subject = encodeURIComponent("Maptitude Contact Message");
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        window.location.href =
            `mailto:contact@muteebabaloch08@gmail.com?subject=${subject}&body=${body}`;
    });
}
