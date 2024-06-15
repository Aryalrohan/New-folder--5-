document.addEventListener('DOMContentLoaded', () => {
    // Function to update budget value and corresponding display
    function updateBudgetValue(value) {
        document.getElementById('budgetValue').innerText = `₹${parseInt(value).toLocaleString()}`;
        const min = document.getElementById('budgetRange').min;
        const max = document.getElementById('budgetRange').max;
        document.getElementById('selectedBudget').innerText = `Selected Budget: ₹${parseInt(min).toLocaleString()} - ₹${parseInt(max).toLocaleString()}`;
    }

    // Function to handle filter update when budget range slider stops moving
    function handleBudgetRangeChange(value) {
        // Update selected budget display
        updateBudgetValue(value);

        // Implement corresponding effects in filter section and photo
        const selectedBudget = document.getElementById('selectedBudget').innerText;
        const selectedDuration = document.getElementById('selectedDuration').innerText;
        const selectedHotelCategory = document.getElementById('selectedHotelCategory').innerText;

        // Actual image URL from the link
        const actualImageURL = 'https://c8.alamy.com/comp/P60TM0/mustang-taj-hotel-jomsom-mustang-region-nepal-P60TM0.jpg';

        const filteredResultsHTML = generateImageContainers(6, actualImageURL);

        document.getElementById('filteredResults').innerHTML = filteredResultsHTML;
    }

    // Function to generate HTML for each image container
    function generateImageContainers(num, imageURL) {
        let html = '';

        for (let i = 0; i < num; i++) {
            html += `
                <div class="image-container">
                    <img src="${imageURL}" alt="Filtered Result">
                </div>
            `;
        }

        return html;
    }

    // Event listener for budget range slider input (while dragging)
    document.getElementById('budgetRange').addEventListener('input', (event) => {
        updateBudgetValue(event.target.value);
    });

    // Event listener for budget range slider change (when stopped moving)
    document.getElementById('budgetRange').addEventListener('change', (event) => {
        handleBudgetRangeChange(event.target.value);
    });

    // Function to update duration value and corresponding display
    function updateDurationValue(value) {
        document.getElementById('durationValue').innerText = `${value} days`;
        document.getElementById('selectedDuration').innerText = `Selected Duration: ${value} days`;
    }

    // Function to handle filter update when duration range slider stops moving
    function handleDurationRangeChange(value) {
        updateDurationValue(value);
    }

    // Event listener for duration range slider input (while dragging)
    document.getElementById('durationRange').addEventListener('input', (event) => {
        updateDurationValue(event.target.value);
    });

    // Event listener for duration range slider change (when stopped moving)
    document.getElementById('durationRange').addEventListener('change', (event) => {
        handleDurationRangeChange(event.target.value);
    });

    // Function to update selected hotel category display
    function updateHotelCategory(value) {
        document.getElementById('selectedHotelCategory').innerText = `Selected Hotel Category: ${value}`;
    }

    // Event listener for duration checkboxes
    document.querySelectorAll('.duration-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const min = parseInt(checkbox.getAttribute('data-min'));
            const max = parseInt(checkbox.getAttribute('data-max'));
            updateDurationValue(`${min}-${max}`);
        });
    });

    // Event listener for hotel category checkboxes
    document.querySelectorAll('.hotel-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateHotelCategory(checkbox.value);
        });
    });

    // Event listener for budget checkboxes
    document.querySelectorAll('.budget-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                const min = checkbox.getAttribute('data-min');
                const max = checkbox.getAttribute('data-max');
                const budgetRange = document.getElementById('budgetRange');
                budgetRange.min = min;
                budgetRange.max = max;
                budgetRange.value = min;
                handleBudgetRangeChange(min);
            }
        });
    });

    // Submit button event listener to update filtered results (photo) only
    document.getElementById('submitFilters').addEventListener('click', () => {
        handleBudgetRangeChange(document.getElementById('budgetRange').value);
    });
});
