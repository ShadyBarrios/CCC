const artists = {1:"Joey", 2:"Joey", 3:"Joey", 4:"Simon"}
const thumbnails = {1: "volume_one_thumbnail.png", 2: "volume_two_thumbnail.png", 3: "volume_three_thumbnail.png", 4: "volume_four_thumbnail.png"}

/*
<div class="carousel-item" data-index=i data-top=`Vol. {i+1}` data-bottom=`Art: {artists[i+1]}`>
    <a href=`zines/{editions[i+1]}` target="_blank" rel="noopener noreferrer">
    <img src=`images/{thumbsnails[i+1]}` alt=`Vol. {i+1} Cover`>
    </a>
</div>
*/

function generateCarouselItemHTML(idx) {
  const zine_num = idx + 1;

  return `<div class="carousel-item" data-index="${idx}" data-top="Vol. ${zine_num}" data-bottom="Art: ${artists[zine_num]}">
    <a href="zines/${editions[zine_num]}" target="_blank" rel="noopener noreferrer">
        <img src="images/${thumbnails[zine_num]}" alt="Vol. ${zine_num} Cover">
    </a>
</div>`;
}


document.addEventListener("DOMContentLoaded", function () {
    const num_of_zines = Object.keys(thumbnails).length;

    const carouselItemsHTML = Array.from({ length: num_of_zines }, (_, i) => generateCarouselItemHTML(num_of_zines - 1 - i)).join("");
    document.getElementById("carousel-stage").innerHTML = carouselItemsHTML;

    const items = Array.from(document.querySelectorAll(".carousel-item"));
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const topTextEl = document.getElementById("top-text");
    const bottomTextEl = document.getElementById("bottom-text");

    let currentIndex = 0;
    const totalItems = items.length;

    // Function to update item positioning classes and text
    function updateCarousel() {
    items.forEach((item, index) => {
        // Remove all state classes
        item.classList.remove("is-center", "is-left", "is-right", "is-hidden-left", "is-hidden-right");

        if (index === currentIndex) {
        item.classList.add("is-center");
        } else if (index === currentIndex - 1) {
        item.classList.add("is-left");
        } else if (index === currentIndex + 1) {
        item.classList.add("is-right");
        } else if (index < currentIndex) {
        item.classList.add("is-hidden-left");
        } else {
        item.classList.add("is-hidden-right");
        }
    });

    // Update Text Above and Below for focused option
    const activeItem = items[currentIndex];
    topTextEl.textContent = activeItem.getAttribute("data-top") || "";
    bottomTextEl.textContent = activeItem.getAttribute("data-bottom") || "";

    // Enforce hard left and right bounds on buttons
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalItems - 1;
    }

    // Event Listeners for Navigation Buttons
    prevBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
    });

    nextBtn.addEventListener("click", function () {
    if (currentIndex < totalItems - 1) {
        currentIndex++;
        updateCarousel();
    }
    });

    // Allow clicking side items directly to focus them
    items.forEach((item, index) => {
    item.addEventListener("click", function (e) {
        if (index !== currentIndex) {
        // Prevent link click when selecting side items
        e.preventDefault();
        currentIndex = index;
        updateCarousel();
        }
    });
    });

    // Keyboard Arrow Key Navigation
    document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft" && currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    } else if (e.key === "ArrowRight" && currentIndex < totalItems - 1) {
        currentIndex++;
        updateCarousel();
    }
    });

    // Initialize initial state
    updateCarousel();
});