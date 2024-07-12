document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const recipesContainer = document.getElementById('recipesContainer');
    const recipeModal = document.getElementById('recipeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    const APP_ID = '9938dec9';
    const APP_KEY = 'ad4aaf6a4fa8516ab8b204544a16fd51';
    const API_URL = `https://api.edamam.com/search`;
    
    function showLoader() {
        document.getElementById('loader').style.display = 'block';
      }
  
      // Hide loader
      function hideLoader() {
        document.getElementById('loader').style.display = 'none';
      }
    async function fetchRecipes(query) {
        showLoader();
        try {
          const response = await fetch(`${API_URL}?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
          const data = await response.json();
          return data.hits.map(hit => ({
            title: hit.recipe.label,
            ingredients: hit.recipe.ingredients.map(ingredient => ingredient.text)
          }));
        } catch (error) {
          console.error('Error fetching recipes:', error);
          return [];
        } finally {
          hideLoader();
        }
      }

    // Function to display recipes
    function displayRecipes(recipes) {
        recipesContainer.innerHTML = '';
        recipes.forEach((recipe, index) => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe');
            recipeCard.innerHTML = `
                <h3>${recipe.title}</h3>
                <p>Ingredients: ${recipe.ingredients.join(', ')}</p>
            `;
            recipeCard.addEventListener('click', () => openModal(recipe));
            recipesContainer.appendChild(recipeCard);
        });
    }

    // Function to open modal and display recipe details
    function openModal(recipe) {
        modalTitle.textContent = recipe.title;
        modalBody.innerHTML = `
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
        `;
        recipeModal.style.display = 'block';

        // Close modal when clicking outside of it or on close button
        window.onclick = function(event) {
            if (event.target == recipeModal) {
                recipeModal.style.display = 'none';
            }
        }
    }

    // Event listener for form submission
    searchForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const searchTerm = searchInput.value.trim();

        if (searchTerm !== '') {
            try {
                const recipes = await fetchRecipes(searchTerm);
                displayRecipes(recipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        }
    });

    // Display all recipes initially (optional)
    // displayRecipes([]);

});