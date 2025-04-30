document.addEventListener("DOMContentLoaded", function () {
    // Handle category selection
    document.getElementById("category").addEventListener("change", function() {
        const category = this.value;
        const ingredientSelect = document.getElementById("ingredient");
        const ingredientOptionsDiv = document.getElementById("ingredient-options");

        // Clear previous ingredient options
        ingredientSelect.innerHTML = "<option value=''>Select Ingredient</option>";

        if (category === "sorbets") {
            const sorbetIngredients = [
                "Acai", "Strawberry", "Mango", "Dragon Fruit", "Passion Fruit", 
                "Coconut Milk", "Stabiliser", "Sugar", "Citric Acid"
            ];
            sorbetIngredients.forEach(function(ingredient) {
                const option = document.createElement("option");
                option.value = ingredient;
                option.textContent = ingredient;
                ingredientSelect.appendChild(option);
            });
        } else if (category === "overnight-oats") {
            const oatsIngredients = [
                "Oats", "Protein Powder", "Coconut", "Peanuts", "Peanut Butter", 
                "Hazelnut Butter", "Oat Milk", "Raspberry Puree", "Cacao Powder", 
                "Beetroot Powder", "Lemon Juice"
            ];
            oatsIngredients.forEach(function(ingredient) {
                const option = document.createElement("option");
                option.value = ingredient;
                option.textContent = ingredient;
                ingredientSelect.appendChild(option);
            });
        }

        // Show the ingredient dropdown once a category is selected
        if (category) {
            ingredientOptionsDiv.style.display = "block";
        } else {
            ingredientOptionsDiv.style.display = "none";
        }
    });

    // Handle form submission (send data to the server)
    const form = document.getElementById("addDeliveryForm");
    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent the default form submission

        // Get form values
        const category = document.getElementById("category").value;
        const ingredient = document.getElementById("ingredient").value;
        const deliveryDate = document.getElementById("deliveryDate").value;
        const batchCode = document.getElementById("batchCode").value;
        const useByDate = document.getElementById("useBy").value;
        const quantity = document.getElementById("quantity").value;

        const data = {
            category,
            ingredient,
            deliveryDate,
            batchCode,
            useByDate,
            quantity
        };

        // Send data to the server via AJAX (fetch)
        fetch('http://localhost:3000/add-delivery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Upload successful!');
                form.reset(); // Optionally reset the form after submission
            } else {
                alert('There was an error saving the delivery.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error saving the delivery.');
        });
    });
});
