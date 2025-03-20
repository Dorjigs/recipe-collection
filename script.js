// script.js

// Function to handle responsive adjustments
function adjustLayout() {
    const navbar = document.querySelector('.navbar');
    if (window.innerWidth < 768) {
        navbar.classList.add('mobile-view');
    } else {
        navbar.classList.remove('mobile-view');
    }
}

// Event listener for window resize
window.addEventListener('resize', adjustLayout);

// Initial call to set layout on page load
adjustLayout();

// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('recipe-search');
    const searchResults = document.getElementById('search-results');
    
    // Complete recipe database
    const recipes = [
        // Main Dishes
        { 
            name: 'Ema Datshi', 
            category: 'Main Dishes', 
            url: 'main-dishes.html#emaDatshiInstructions',
            description: 'Bhutanese national dish - Chilies and cheese stew'
        },
        { 
            name: 'Kewa Datshi', 
            category: 'Main Dishes', 
            url: 'main-dishes.html#kewaInstructions',
            description: 'Potato and cheese curry'
        },
        { 
            name: 'Shakam Datshi', 
            category: 'Main Dishes', 
            url: 'main-dishes.html#shakamInstructions',
            description: 'Dried beef with cheese'
        },
        { 
            name: 'Phaksha Paa', 
            category: 'Main Dishes', 
            url: 'main-dishes.html#phakshaInstructions',
            description: 'Pork with red chilies'
        },
        { 
            name: 'Jasha Maru', 
            category: 'Main Dishes', 
            url: 'main-dishes.html#jashaInstructions',
            description: 'Minced chicken dish'
        },
        { 
            name: 'Sikam Paa', 
            category: 'Main Dishes', 
            url: 'main-dishes.html#sikamInstructions',
            description: 'Dried pork with chilies'
        },

        // Side Dishes
        { 
            name: 'Goen Hogay', 
            category: 'Side Dishes', 
            url: 'sidedishes.html#goenHogayInstructions',
            description: 'Cucumber salad'
        },
        { 
            name: 'Ezay', 
            category: 'Side Dishes', 
            url: 'sidedishes.html#ezayInstructions',
            description: 'Chili paste condiment'
        },
        { 
            name: 'Lomba', 
            category: 'Side Dishes', 
            url: 'sidedishes.html#lombaInstructions',
            description: 'Fermented turnip pickle'
        },

        // Soups and Beverages
        { 
            name: 'Bathup', 
            category: 'Soups', 
            url: 'soups-beverages.html#bathupInstructions',
            description: 'Traditional noodle soup'
        },
        { 
            name: 'Suja', 
            category: 'Beverages', 
            url: 'soups-beverages.html#sujaInstructions',
            description: 'Butter tea'
        },
        { 
            name: 'Ara', 
            category: 'Beverages', 
            url: 'soups-beverages.html#araInstructions',
            description: 'Traditional rice wine'
        }
    ];

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            if (searchTerm.length < 2) {
                searchResults.style.display = 'none';
                return;
            }

            const matches = recipes.filter(recipe => 
                recipe.name.toLowerCase().includes(searchTerm) ||
                recipe.category.toLowerCase().includes(searchTerm) ||
                recipe.description.toLowerCase().includes(searchTerm)
            );

            if (matches.length > 0) {
                searchResults.innerHTML = matches.map(recipe => `
                    <a href="${recipe.url}" class="search-result-item">
                        <div class="result-content">
                            <strong>${recipe.name}</strong>
                            <span class="category-badge">${recipe.category}</span>
                            <small class="description">${recipe.description}</small>
                        </div>
                    </a>
                `).join('');
                searchResults.style.display = 'block';
            } else {
                searchResults.innerHTML = '<div class="no-results">No recipes found</div>';
                searchResults.style.display = 'block';
            }
        });

        // Hide search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
});

//feedback part
document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would normally send the data to a server
            // For now, we'll just show the success modal
            const modal = new bootstrap.Modal(document.getElementById('feedbackModal'));
            modal.show();
            
            // Reset form after submission
            feedbackForm.reset();
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Star Rating
    const starsContainer = document.querySelector('.stars');
    const ratingInput = document.getElementById('rating');
    const stars = document.querySelectorAll('.stars i');

    if (starsContainer) {
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = this.getAttribute('data-rating');
                ratingInput.value = value;
                
                // Update stars appearance
                stars.forEach(s => {
                    s.classList.remove('active');
                    if (s.getAttribute('data-rating') <= value) {
                        s.classList.add('active');
                    }
                });
            });
        });
    }

    // Form Submission
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate rating
            if (!ratingInput.value) {
                alert('Please select a rating');
                return;
            }

            // Show toast
            const toastElement = document.getElementById('feedbackToast');
            const toast = new bootstrap.Toast(toastElement, {
                animation: true,
                autohide: true,
                delay: 3000
            });
            toast.show();

            // Reset form after delay
            setTimeout(() => {
                feedbackForm.reset();
                stars.forEach(star => star.classList.remove('active'));
                ratingInput.value = '';
            }, 1000);

            // Redirect after toast hides
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        });
    }
});